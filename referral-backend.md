# Referral System — Backend Implementation Guide

## 1. What the program does vs. what the backend does

The on-chain program knows **nothing** about referral tiers, percentages, or who referred whom. It only provides three primitives:

1. A single **global `referral_vault` PDA** that accumulates 20% of every Meteora fee collection, across all rooms.
2. A **signed-voucher claim mechanism** (`claim_referral`) that lets a user pull SOL out of that vault, up to a cumulative lifetime amount that the backend authorizes.
3. An admin **sweep** (`sweep_referral_vault`) to reclaim unclaimed/orphaned SOL.

Everything else — the referral tree, the 15% / 3% / 2% tier split, ledger bookkeeping, and deciding when/how much a user can claim — is entirely the backend's responsibility. This doc specifies exactly how to implement that.

**Why it's built this way:** referrers who never claim must cost the protocol nothing (no rent, no tx fees). Pushing money on-chain proactively would mean paying rent + a transaction for every referrer, including the long tail who never show up. Instead, the backend maintains an off-chain ledger and hands each user a "voucher" they can redeem themselves, whenever they want, at their own expense.

---

## 2. Tier model

| Tier | Who | Share of trading fees |
|---|---|---|
| Direct | The user who directly referred the contributor | 15% |
| Indirect | Whoever referred the direct referrer | 3% |
| Extended | Whoever referred the indirect referrer | 2% |
| **Total diverted on-chain** | | **20%** (matches `collect_meteora_fees`'s `fees_collected / 5` cut) |

The remaining 80% (`participant_cut`) flows into the room's `treasury_fee_accumulator` for contributors to claim via the existing `claim_rewards` flow — untouched by this work.

Within the 20% referral cut: **75% → direct, 15% → indirect, 10% → extended** (this is just 15/3/2 renormalized against the 20% pool: 15/20=75%, 3/20=15%, 2/20=10%).

---

## 3. On-chain primitives reference

### Accounts

**`referral_vault`** (global, no data — plain `SystemAccount`)
```
seeds = [b"referral_vault"]
```
Holds all undistributed referral SOL, across every room. Funded to rent-exempt minimum once via `initialize_referral_vault` (idempotent — safe to call again, it's a no-op if already funded).

**`ReferralClaim`** (per user, global — not per room)
```
seeds = [b"referral_claim", user_pubkey]
struct ReferralClaim {
    user: Pubkey,
    claimed: u64,   // lifetime lamports this user has claimed, ever
    bump: u8,
}
```
Created lazily, **paid for by the user** (`init_if_needed`, `payer = user`), on their first `claim_referral` call. The backend never funds this — that's the whole point.

### Events to subscribe to

**`ReferralVaultCredited`** — emitted every time `collect_meteora_fees` diverts the 20% cut into the vault:
```rust
struct ReferralVaultCredited {
    token_mint: Pubkey,  // identifies which room's collection this came from
    lamports: u64,       // the amount just added to the vault
    timestamp: i64,
}
```
This is the **only signal the backend needs to run the tier split**. One event = one pool of `lamports` to divide across that room's referral chains.

**`ReferralClaimed`** — emitted every time a user successfully claims:
```rust
struct ReferralClaimed {
    user: Pubkey,
    lamports: u64,            // the actual payout for this claim (delta, not cumulative)
    cumulative_earned: u64,   // the voucher total that was redeemed
    timestamp: i64,
}
```
Use this to reconcile your ledger's "claimed" column against on-chain truth (see §7).

### Instructions

**`initialize_referral_vault()`** — admin-only (`rooms_authority` signer), idempotent. Call once at deploy time, before the first `collect_meteora_fees` call ever happens. Safe to re-run.

**`claim_referral(cumulative_earned: u64, expiry: i64)`** — called by the **user**, not the backend. The backend's only job is to hand the user a signed voucher; the user (via your frontend) submits the transaction and pays their own fee. Accounts required:
- `global_config`
- `referral_vault`
- `referral_claim` (PDA per user, `init_if_needed`)
- `instruction_sysvar` (`SYSVAR_INSTRUCTIONS_PUBKEY`)
- `user` (signer, payer)
- `system_program`

Plus: the transaction **must also include an `Ed25519Program` instruction** (see §5) — the program verifies it via sysvar introspection, it does not take the signature as an instruction argument.

Pays out `cumulative_earned - referral_claim.claimed`. Fails with:
- `ReferralVoucherExpired` if `now > expiry`
- `InvalidReferralSignature` if no valid Ed25519 ix from `rooms_authority` is found in the tx
- `NoRewardsToClaim` if `cumulative_earned <= claim.claimed` (stale/replayed voucher)
- `InsufficientFunds` if the vault can't cover the payout while staying rent-exempt

**`sweep_referral_vault(amount: u64)`** — admin-only. Transfers `amount` from the vault to `admin_vault`. The program has no idea how much is still owed to un-claimed referrers, so **the backend must compute a safe amount** (see §8). Fails if it would leave the vault below rent-exempt.

---

## 4. Backend data model

You need a durable store (Postgres or equivalent) with roughly this shape:

```sql
-- Who referred whom. One row per user; a user has at most one direct referrer.
CREATE TABLE referral_edges (
    user_pubkey       TEXT PRIMARY KEY,
    referred_by       TEXT REFERENCES referral_edges(user_pubkey),  -- NULL if no referrer
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Per-room fee-collection events already processed, for idempotency.
CREATE TABLE processed_fee_collections (
    id                BIGSERIAL PRIMARY KEY,
    tx_signature      TEXT UNIQUE NOT NULL,
    token_mint        TEXT NOT NULL,
    lamports          BIGINT NOT NULL,     -- the ReferralVaultCredited.lamports value
    processed_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The ledger: cumulative lifetime earnings per user, per tier (for auditability).
CREATE TABLE referral_earnings (
    user_pubkey       TEXT NOT NULL,
    tier              TEXT NOT NULL CHECK (tier IN ('direct','indirect','extended')),
    source_token_mint TEXT NOT NULL,       -- which room this credit came from
    lamports          BIGINT NOT NULL,     -- amount credited in this single event
    fee_collection_id BIGINT NOT NULL REFERENCES processed_fee_collections(id),
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_pubkey, fee_collection_id, tier)  -- idempotency guard
);

-- Materialized/derived: current lifetime total earned per user (what goes in the voucher).
CREATE TABLE referral_balances (
    user_pubkey       TEXT PRIMARY KEY,
    cumulative_earned BIGINT NOT NULL DEFAULT 0,  -- sum of referral_earnings.lamports ever, for this user
    cumulative_claimed BIGINT NOT NULL DEFAULT 0, -- last known on-chain ReferralClaim.claimed
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Keep `referral_earnings` as an append-only audit log and `referral_balances` as the fast-lookup aggregate. Never mutate `referral_earnings` rows after insert.

---

## 5. Step-by-step: processing a fee collection

This runs every time you observe a `ReferralVaultCredited` event (poll via `getProgramAccounts`/logs subscription, or run it synchronously right after your own `collect_meteora_fees` cron call — you already have a cron for `freeze_rewards`, this can live alongside it).

```
1. Extract { token_mint, lamports, timestamp } and the tx_signature from the event.

2. Idempotency check: has this tx_signature already been recorded in
   processed_fee_collections? If yes, skip entirely (do not re-credit).
   This is the guard against your indexer replaying the same event twice.

3. Look up the room for token_mint. Determine the contributors whose activity
   generated this fee collection is NOT necessary — the referral split is based
   on WHO CONTRIBUTED to this room, not who triggered the specific swap. Simplify:
   split proportionally across every contributor's referral chain, weighted by
   that contributor's lamports_contributed share of the room (same weighting
   philosophy as the on-chain reward-per-contribution math).

   Concretely, for room R with contributors c_1..c_n and lamports_contributed
   w_1..w_n (raised_lamports = sum(w_i)):

     for each contributor c_i:
         contributor_share = lamports * w_i / raised_lamports   (integer division)
         direct_referrer   = referral_edges[c_i].referred_by
         indirect_referrer = referral_edges[direct_referrer].referred_by   (if direct exists)
         extended_referrer = referral_edges[indirect_referrer].referred_by (if indirect exists)

         if direct_referrer exists:
             credit(direct_referrer,   tier='direct',   amount = contributor_share * 75 / 100)
         if indirect_referrer exists:
             credit(indirect_referrer, tier='indirect', amount = contributor_share * 15 / 100)
         if extended_referrer exists:
             credit(extended_referrer, tier='extended', amount = contributor_share * 10 / 100)

         # if a tier's referrer doesn't exist, that slice is simply not credited
         # to anyone — it stays in the vault as unallocated. See §8 for sweep policy.

4. Each `credit(...)` call:
     a. INSERT INTO referral_earnings (user_pubkey, tier, source_token_mint,
        lamports, fee_collection_id) — this is your audit trail.
     b. UPDATE referral_balances SET cumulative_earned = cumulative_earned + amount
        WHERE user_pubkey = ...  (UPSERT if the row doesn't exist yet)

5. INSERT INTO processed_fee_collections (tx_signature, token_mint, lamports)
   to mark this event as done. Steps 3-5 should run inside a single DB
   transaction so a crash mid-split can't half-credit.
```

**Important nuance on rounding:** the per-contributor, per-tier amounts use integer division and will not sum exactly to `lamports`. That's fine and expected — the leftover dust simply never gets credited to any `referral_balances` row and stays in the vault. Do not try to force the split to sum exactly; matching the vault's actual balance is what matters, not matching every event's `lamports` figure to the cent.

**Simpler alternative if you don't want per-contributor weighting:** if your product only tracks "who referred the room's creator" or a single canonical referrer per room (rather than per-contributor), you can skip the weighted loop and instead resolve one direct/indirect/extended chain per room and credit the full 75/15/10 split against `lamports` directly. Pick whichever matches your actual referral UX — the guidance above assumes per-contributor referral tracking, which is the more general case.

---

## 6. Step-by-step: issuing a claim voucher

When a user wants to claim (e.g. they open the "claim rewards" screen in your app), your backend needs to produce a voucher they can submit on-chain.

```
1. Look up referral_balances.cumulative_earned for the user. This is the
   authoritative lifetime total — it only ever grows (from step 5 above).

2. Set an expiry, e.g. now + 15 minutes. Short expiries let you rotate/revoke
   compromised vouchers and force a fresh balance lookup on retry; they do NOT
   reduce the payout amount (payout is always cumulative_earned - on-chain
   claimed, never a delta you compute yourself).

3. Construct the exact message the program expects:

     message = REFERRAL_CLAIM_DOMAIN || user_pubkey || cumulative_earned_LE_u64 || expiry_LE_i64

   Where:
     REFERRAL_CLAIM_DOMAIN = the 17 raw ASCII bytes "rooms_referral_v1" (no length
                              prefix, no null terminator — just those 17 bytes)
     user_pubkey            = the raw 32-byte public key
     cumulative_earned      = 8 bytes, little-endian u64
     expiry                 = 8 bytes, little-endian i64 (Unix seconds)

   Total message length: 17 + 32 + 8 + 8 = 65 bytes.

4. Hash it: message_hash = keccak256(message)   (32 bytes)

5. Sign message_hash with the rooms_authority Ed25519 keypair (the same key
   already used to sign access-gate payloads for verify_access — this is NOT
   a new key, reuse your existing rooms_authority secret).

6. Return { cumulative_earned, expiry, signature, rooms_authority_pubkey } to
   the client. The client is responsible for submitting the transaction:
     - one Ed25519Program.createInstructionWithPublicKey instruction
       (publicKey = rooms_authority_pubkey, message = message_hash, signature)
     - one claim_referral(cumulative_earned, expiry) instruction
   in the same transaction, with the Ed25519 ix appearing anywhere except the
   claim_referral instruction's own index (the program scans all other
   instructions for it).
```

Reference implementation (Node/TS), matching what `verify_access` already does for access-gate signatures — this is the identical pattern, different domain and field layout:

```ts
import { keccak_256 } from "@noble/hashes/sha3";
import * as nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

const REFERRAL_CLAIM_DOMAIN = Buffer.from("rooms_referral_v1", "utf-8"); // 17 bytes

function buildReferralVoucher(
  userPubkey: PublicKey,
  cumulativeEarned: bigint,
  expiryUnixSeconds: number,
  roomsAuthoritySecretKey: Uint8Array
) {
  const cumulativeBuf = Buffer.alloc(8);
  cumulativeBuf.writeBigUInt64LE(cumulativeEarned);

  const expiryBuf = Buffer.alloc(8);
  expiryBuf.writeBigInt64LE(BigInt(expiryUnixSeconds));

  const message = Buffer.concat([
    REFERRAL_CLAIM_DOMAIN,
    userPubkey.toBuffer(),
    cumulativeBuf,
    expiryBuf,
  ]);

  const messageHash = keccak_256(message);
  const signature = nacl.sign.detached(messageHash, roomsAuthoritySecretKey);

  return { messageHash, signature, cumulativeEarned, expiry: expiryUnixSeconds };
}
```

**Do not compute a delta yourself and sign that.** Always sign the full lifetime `cumulative_earned`. The program subtracts `claim.claimed` on-chain; if you accidentally issue a voucher for a delta amount, the user will be paid `delta - already_claimed`, which is wrong (and could even revert with `NoRewardsToClaim` or, worse, silently underpay).

**Solvency check before signing:** verify `referral_vault` balance ≥ `(cumulative_earned - claim.claimed_on_chain) + rent_exempt_minimum` before returning a voucher. If the vault is short (shouldn't normally happen — see §8), refuse to sign rather than issuing a voucher the chain will reject.

---

## 7. Step-by-step: reconciling claims

Because `claim_referral` is idempotent (cumulative, not delta), your ledger can never be double-spent on-chain even if it drifts — but it can still get out of sync in ways that confuse your UI (e.g. showing a stale "unclaimed" balance). Reconcile like this:

```
1. Subscribe to (or poll) ReferralClaimed events.
2. On each event { user, lamports, cumulative_earned }:
     UPDATE referral_balances
     SET cumulative_claimed = cumulative_earned   -- not += lamports; always set to the absolute value
     WHERE user_pubkey = user
       AND cumulative_claimed < cumulative_earned;  -- guard against out-of-order event delivery
3. Periodically (e.g. hourly), for any user with a nonzero balance, fetch their
   on-chain ReferralClaim PDA directly and hard-reconcile cumulative_claimed
   to match. This is your source of truth if event indexing ever misses one.
```

Never trust `cumulative_claimed` for solvency decisions without this reconciliation — always prefer reading the live `ReferralClaim.claimed` account value over your cached copy when computing a new voucher's safety margin (step in §6).

---

## 8. Sweep policy (`sweep_referral_vault`)

The vault balance at any time equals: `sum of all ReferralVaultCredited.lamports ever` minus `sum of all ReferralClaimed.lamports ever`. Some of what's sitting in the vault is:
- Legitimately owed to referrers who haven't claimed yet (**must not be swept**)
- Unallocated dust from integer-division rounding (§5) — safe to sweep
- Unallocated tier slices where no referrer exists at that level (§5) — safe to sweep

Compute a safe sweep amount as:

```
outstanding_liability = SUM(referral_balances.cumulative_earned - referral_balances.cumulative_claimed)
                         across ALL users (only counting non-negative differences)

vault_balance = getBalance(referral_vault)   -- read live, don't cache
rent_exempt_minimum = getMinimumBalanceForRentExemption(0)

safe_sweep_amount = vault_balance - outstanding_liability - rent_exempt_minimum
```

Only call `sweep_referral_vault(safe_sweep_amount)` if `safe_sweep_amount > 0`, and do it infrequently (e.g. weekly) after a full reconciliation pass (§7). Sweeping aggressively or on a stale ledger risks leaving the vault unable to honor an outstanding voucher, which would make `claim_referral` fail with `InsufficientFunds` for a legitimate claim.

---

## 9. Edge cases and invariants

- **Self-referral / referral cycles:** enforce at the `referral_edges` write path — reject `referred_by = user_pubkey` and reject any insert that would create a cycle (walk up the `referred_by` chain before inserting; cap the walk at 3 hops since that's all that's ever paid out anyway).
- **Referrer sets/changes after a contribution:** decide (product decision, not a program constraint) whether `referral_edges` is mutable. If a user's referrer can change, note that historical `referral_earnings` rows already reflect the referrer at the time of that fee collection — do not retroactively rewrite past credits when a referral edge changes.
- **A contributor with no referrer:** no rows get credited for that contributor's share at any tier; that money stays in the vault as sweepable dust (§8). This is expected, not a bug.
- **A room with `RoomPlatform::PumpFun`:** no referral vault activity at all — `collect_pump_fees` doesn't touch `referral_vault`. The referral system is Meteora-only, matching the underlying `collect_meteora_fees` cut.
- **`swap_meteora`'s `referral_token_account`:** unrelated to this system. That's Meteora's own AMM-level referral hook and has nothing to do with the direct/indirect/extended tiers described here — don't conflate the two when building attribution logic.
- **Voucher replay:** submitting the exact same voucher twice is a guaranteed no-op on the second attempt (`NoRewardsToClaim`) — safe to let your frontend retry blindly on network errors.
- **Never let `cumulative_earned` decrease.** `referral_balances.cumulative_earned` must be monotonically non-decreasing per user. If you ever need to correct an over-credit, do it via a separate compensating mechanism off-chain — don't lower the stored value, since a previously-issued (still-valid, unexpired) voucher for the old higher value would then look like an "underpay" to the user, though the contract itself is safe (it would just pay based on whatever `cumulative_earned` the still-valid voucher specifies, which is bounded by what you originally signed).

---

## 10. One-time deploy checklist

1. Deploy the updated program.
2. Call `initialize_referral_vault()` once, before any `collect_meteora_fees` call ever runs against the new program version. (Idempotent, but must happen first — the vault must be rent-exempt before the first 20% transfer into it.)
3. Stand up the `referral_edges`, `processed_fee_collections`, `referral_earnings`, `referral_balances` tables (§4).
4. Wire an indexer/listener for `ReferralVaultCredited` (§5) and `ReferralClaimed` (§7).
5. Expose an API endpoint that returns a signed voucher for a given user (§6), backed by a live vault-solvency check.
6. Schedule the sweep job (§8) at a conservative cadence, gated on reconciliation having just run.
