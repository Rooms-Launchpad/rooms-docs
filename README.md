# Rooms Protocol

Rooms is a Solana smart contract for community-driven token launches. Contributors pool SOL into a room until a funding target is hit, at which point the program automatically launches a token on PumpFun or Meteora and distributes it proportionally to contributors. Contributors then earn ongoing trading fee rewards based on their share.

---

## Deployments

| Network | Program ID | API | API Docs |
|---|---|---|---|
| Mainnet | `CyenP3qnD453Lr6YD7aWzWajM1ytcYdjPmHpHgMrooms` | api.rooms.run | [View Here](https://api.rooms.run/swagger/index.html) |
| Devnet | `CyenP3qnD453Lr6YD7aWzWajM1ytcYdjPmHpHgMrooms` | devnet.rooms.run | [View Here](https://devnet.rooms.run/swagger/index.html) |

The IDL is available at [`idl/rooms.json`](./idl/rooms.json).

---

## Concepts

### Room

A room is an on-chain account that holds contributed SOL until a target is reached. Each room is configured at creation with a platform, access type, and reward structure. Once finalized (target met), a token is launched and the room is locked — contributions and withdrawals are no longer possible.

### Platforms

| Value | Description |
|---|---|
| `PumpFun` | Launches on PumpFun bonding curve; fixed raise target (~86.080 SOL) |
| `Rooms` (Meteora) | Launches on Meteora DAMM v2; configurable raise target (30, 90, or 180 SOL) |

### Room Types (Access Control)

| Value | Description |
|---|---|
| `Open` | Anyone can contribute |
| `AccessCode` | Contributor must be verified via an access code off-chain |

For `AccessCode` rooms, `rooms_authority` signs a timed verification payload off-chain and the user calls `verify_access` to produce an on-chain `RoomAccess` PDA before contributing.

### Reward Structures

| Value | Description |
|---|---|
| `Equal` | Contributors share fees proportionally to their contribution. The room creator additionally receives a virtual share equal to `max_contribution`, regardless of their actual contribution. |
| `Creator` | The room creator receives 100% of accumulated fees. |
| `Custom` | A designated `reward_wallet` (set at room creation) receives 100% of accumulated fees. |

**Equal — creator bonus:** the fee accumulator is divided by `raised_lamports + max_contribution` rather than `raised_lamports`, reserving the creator's slice from the pool without draining more than the fees collected. The creator's reward is calculated as if they contributed exactly `max_contribution`.

**50% holding rule (Equal only):** regular contributors must hold at least 50% of their allocated token amount. Enforcement is handled off-chain: the Rooms backend monitors balances and calls `freeze_rewards` when a contributor drops below the threshold. The room creator is **exempt** from this rule and can never be frozen.

---

## User Instructions

These are the instructions available to regular users.

### `create_room`

Creates a new room. The creator pays rent for the room account.

| Argument | Type | Description |
|---|---|---|
| `room_platform` | `RoomPlatform` | `PumpFun` or `Rooms` (Meteora) |
| `room_type` | `RoomType` | `Open` or `AccessCode` |
| `reward_structure` | `RewardStructure` | `Equal`, `Creator`, or `Custom` |
| `metadata_uri` | `string` | IPFS or URL pointing to token metadata JSON (max 200 chars) |
| `reward_wallet` | `pubkey?` | Required when `reward_structure` is `Custom`; ignored otherwise |
| `raise_lamports` | `u64?` | Target raise in lamports. Required for Meteora rooms (30–300 SOL). Ignored for PumpFun. |

**Constraints:**
- Meteora rooms: `raise_lamports` must be exactly 30 SOL, 90 SOL, or 180 SOL
- PumpFun rooms: raise target is fixed (~86.080 SOL); passing `raise_lamports` has no effect
- `reward_wallet` must be provided when using `Custom` reward structure

---

### `increase_contribution`

Contributes SOL to a room.

| Argument | Type | Description |
|---|---|---|
| `lamports_amount` | `u64` | Amount to contribute in lamports |

**Constraints:**
- Room must not be finalized
- Total contribution must not exceed `max_contribution` per user
- Must be at or above `min_contribution`
- For non-Open rooms: user must have a valid `RoomAccess` PDA (see `verify_access`)
- If this contribution causes `raised_lamports` to reach `target_lamports`, finalization is triggered automatically

**Fees charged:**
- 3% admin fee on the contribution amount, sent to `admin_vault`
- On a user's **first** contribution only: an additional 2,100,000 lamports (0.0021 SOL) ATA fee is collected into `room_vault`. This pre-funds the Token2022 token account created for the contributor during `airdrop_tokens` and is refunded in full on withdrawal.

---

### `withdraw_contribution`

Withdraws the user's full contribution from a room before finalization.

**No arguments** — withdrawal is always for the full contributed amount.

**Constraints:**
- Room must not be finalized — withdrawals are permanently blocked once a room finalizes

**Refund:** the user receives their `lamports_contributed` minus the 3% withdrawal fee, plus the 2,100,000 lamport ATA fee refunded in full.

---

### `verify_access` 🔒

Creates a `RoomAccess` PDA that permits a user to contribute to a non-Open room. The instruction validates an Ed25519 signature from `rooms_authority` embedded in the transaction's instruction sysvar.

| Argument | Type | Description |
|---|---|---|
| `timestamp` | `i64` | Timestamp included in the signed payload (used to prevent replay) |

**Constraints:**
- Room type must be `AccessCode`
- Transaction must include a preceding Ed25519 instruction signed by `rooms_authority`
- Signature must cover the correct room, user, and timestamp
- Only needs to be called once per user per room

---

### `claim_rewards`

Claims accumulated trading fee rewards for a contributor, the room creator, or the designated reward wallet.

**No arguments.**

**Constraints by reward structure:**

| Structure | Who can claim | Reward calculation |
|---|---|---|
| `Equal` (regular contributor) | Any non-frozen contributor | `accumulator_delta × lamports_contributed / (active_lamports + max_contribution)` |
| `Equal` (room creator) | Room creator | `accumulator_delta × max_contribution / (active_lamports + max_contribution)` |
| `Creator` | Room creator | `accumulator_delta / 1_000_000_000` (all fees) |
| `Custom` | `reward_wallet` set at room creation | `accumulator_delta / 1_000_000_000` (all fees) |

`active_lamports` = `raised_lamports − frozen_contribution_lamports`. Frozen users' contributions are excluded from the denominator so their share is redistributed to active participants on each fee collection.

**Frozen users:** if a contributor has been frozen via `freeze_rewards`, their claimable amount is capped at the accumulator value recorded at freeze time. They can drain that pre-freeze amount but earn nothing from subsequent fee collections.

A `RoomUser` PDA is created at room creation for the creator and reward wallet with `treasury_fee_checkpoint = 0`, so they earn fees from room inception.

---

### `claim_referral` 🔒

Claims accumulated referral SOL from the global `referral_vault`. Called directly by the referrer (not the Rooms backend) — the user pays their own transaction fee and, on their first claim, the rent for their own `ReferralClaim` PDA.

| Argument | Type | Description |
|---|---|---|
| `cumulative_earned` | `u64` | The referrer's total lifetime earnings in lamports, as tracked off-chain by the Rooms backend |
| `expiry` | `i64` | Unix timestamp after which the voucher is no longer valid |

The transaction must also include a preceding Ed25519 instruction signed by `rooms_authority`, verifying `keccak256(domain || user || cumulative_earned || expiry)`. See `docs/referral-backend.md` for the exact byte layout and signing procedure.

**Constraints:**
- `expiry` must not have passed
- The Ed25519 signature must be valid and from `rooms_authority`
- `cumulative_earned` must exceed the user's on-chain `claimed` total (resubmitting an already-fully-claimed voucher fails with `NoRewardsToClaim` — safe to retry)
- The vault must hold enough to cover the payout while remaining rent-exempt

**Payout:** `cumulative_earned − ReferralClaim.claimed`. Because the voucher carries a lifetime total rather than a delta, submitting the same or a stale voucher twice pays out at most once — the second submission is a no-op.

---

---

### `swap_pump`

Buys or sells the room token via PumpSwap AMM. Room must use the `PumpFun` platform.

| Argument | Type | Description |
|---|---|---|
| `amount` | `u64` | Input amount in lamports (buy) or tokens (sell) |
| `min_out` | `u64` | Minimum output amount (slippage protection) |
| `is_buy` | `bool` | `true` to buy tokens, `false` to sell |

**Constraints:**
- Room must be `PumpFun` platform and finalized
- Bonding curve must have already migrated to PumpSwap (see `migrate_pump_pool`)

---

### `swap_meteora`

Buys or sells the room token via Meteora DAMM v2. Room must use the `Rooms` (Meteora) platform.

| Argument | Type | Description |
|---|---|---|
| `amount_in` | `u64` | Input amount in lamports (buy) or tokens (sell) |
| `slippage_bps` | `u16` | Maximum slippage in basis points |
| `is_buy` | `bool` | `true` to buy tokens, `false` to sell |

**Constraints:**
- Room must be `Rooms` platform and finalized

---

## Protocol-Managed Instructions

These instructions are executed by the Rooms backend. On-chain authorization varies per instruction.

| Instruction | Authorization | Description |
|---|---|---|
| `airdrop_tokens` | 🔒 `rooms_authority` signer | Distributes token allocation to contributors in vesting rounds. `allocation_basis_points` is a **cumulative target level** (0-10000), not a per-call increment — each `RoomUser` tracks its own `claimed_basis_points`, and the instruction pays out only the gap between the target and that level, no-oping per-recipient if the target is already met. This makes retrying a call with an uncertain on-chain outcome (e.g. a timed-out confirmation) safe: a resend for a level already paid out costs nothing beyond the wasted transaction. `room_vault` pays for Token2022 ATA creation per recipient using the ATA fees pre-collected during contributions. Triggered automatically post-finalization. |
| `freeze_rewards` | 🔒 `rooms_authority` signer | Freezes reward accumulation for an Equal-room contributor who dropped below 50% token holding. Called by the Rooms cron. |
| `finalize_pump` | Permissionless | Launches token on PumpFun bonding curve. Triggered automatically when target is met. |
| `finalize_meteora` | Permissionless | Launches token on Meteora DAMM v2. Triggered automatically when target is met. |
| `migrate_pump_pool` | Permissionless | Migrates a PumpFun bonding curve to PumpSwap AMM after graduation. |
| `initialize_meteora_dfs` | Permissionless | Initializes Meteora Dynamic Fee Sharing vault post-finalization. |
| `collect_pump_fees` | Permissionless | Sweeps accumulated PumpSwap creator fees into the room vault for distribution. |
| `collect_meteora_fees` | Permissionless | Sweeps accumulated Meteora DFS fees into the room vault for distribution. Diverts 20% of the fees collected into the global `referral_vault` PDA; the remainder is distributed to participants as usual. Closes the WSOL ATA at the end of each call, unwrapping all collected WSOL to native SOL in `room_vault`. The ATA must be (re-)created by the caller before each invocation. |
| `initialize_referral_vault` | 🔒 `rooms_authority` signer | One-time (idempotent) bootstrap that funds the global `referral_vault` PDA to the rent-exempt minimum. Must be called before the first `collect_meteora_fees` invocation ever runs. |
---

## Fees

| Action | Fee | Rooms Protocol | Reward Pool | PumpFun / Meteora Take |
|---|---|---|---|---|
| Contribute / Withdraw | 3% + 0.0021 SOL ATA fee (first contribution only) | 3% | — | — |
| Any trade on PumpSwap | ~1.2–1.25% (tiered by market cap) | — | 100% of creator share | ✅ |
| Any trade on Meteora | 1.5% pool fee | 25% of LP fee (0.3%) | 75% of LP fee (0.9%), minus the 20% referral cut below | 20% of pool fee (0.3%) |
| `swap_pump` / `swap_meteora` | 0.5% | 0.5% | — | — |

The PumpSwap and Meteora fees apply to all trades on those AMMs regardless of interface — including trades made directly without going through Rooms. The +0.5% Rooms swap fee is an additional charge applied only when trading through `swap_pump` or `swap_meteora`.

For PumpFun, only the creator share flows to Rooms (30–95 bps depending on market cap); the remainder goes to PumpFun's LPs and protocol. The Reward Pool is distributed to contributors proportionally (`Equal`), to the room creator (`Creator`), or to the designated reward wallet (`Custom`).

### Referrals

Every time `collect_meteora_fees` is called, 20% of the SOL fees collected into `room_vault` is diverted into the global `referral_vault` PDA before the remainder is added to the reward accumulator for contributors. PumpFun fee collection (`collect_pump_fees`) does not divert a referral cut.

The 20% cut is split across three referral tiers, resolved entirely off-chain by the Rooms backend from its own referral-tree data — the program has no concept of tiers:

| Tier | Share of trading fees | Share of the 20% referral cut |
|---|---|---|
| Direct referrer | 15% | 75% |
| Indirect referrer (referred the direct referrer) | 3% | 15% |
| Extended referrer (one level further) | 2% | 10% |

The program's only job is to hold the pooled SOL and let each referrer redeem a lifetime total that the backend authorizes. There is no per-referrer or per-room state on-chain beyond each user's own `ReferralClaim` PDA (tracking how much they've claimed so far, globally). A referrer calls `claim_referral` themselves with a voucher signed by `rooms_authority`, paying their own transaction fee and (on first claim) the rent for their `ReferralClaim` PDA — so referrers who never claim cost the protocol nothing. `sweep_referral_vault` lets the protocol reclaim unallocated dust and orphaned tier cuts (e.g. a referral chain with fewer than three levels) to `admin_vault`, without touching SOL still owed to unclaimed referrers.

Full implementation details for the backend — the exact voucher byte layout, event-driven ledger design, idempotency guarantees, and sweep-safety formula — are in [`docs/referral-backend.md`](./referral-backend.md).

---

## Account PDAs

| Account | Seeds | Description |
|---|---|---|
| `GlobalConfig` | `[b"global_config"]` | Singleton protocol config |
| `Room` | `[b"room", token_mint]` | Per-launch state |
| `RoomVault` | `[b"room_vault", room]` | SOL vault that holds raised funds, pays for pool init, and receives fee distributions |
| `RoomUser` | `[b"room_user", room, user]` | Per-user contribution state |
| `RoomAccess` | `[b"room_access", room, user]` | Access verification for gated rooms |
| `ReferralVault` | `[b"referral_vault"]` | Global (not per-room) plain SOL PDA holding all pooled referral cuts, paid out via `claim_referral` |
| `ReferralClaim` | `[b"referral_claim", user]` | Per-user (not per-room) lifetime referral-claim tracker; created and paid for by the user on their first claim |

---

## External Programs

| Program | Address |
|---|---|
| PumpFun | `6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P` |
| PumpSwap | `pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA` |
| Meteora DAMM v2 | `cpamdpZCGKUy5JxQXB4dcpGPiikHawvSWAd6mEn1sGG` |
| Meteora DFS | `dfsdo2UqvwfN8DuUVrMRNfQe11VaiNoKcMqLHVvDPzh` |
| Token Metadata | `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s` |
