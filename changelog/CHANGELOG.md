# Rooms Protocol Changelog

## [Unreleased]

### Security
- `withdraw_contribution` — restored a missing `withdraw_amount > 0` check. Without it, anyone (no prior contribution required) could repeatedly call `withdraw_contribution` on any room that hadn't yet hit its target and drain `room_vault` — which holds all contributors' pooled SOL, not just fee reserves — in 2,100,000-lamport (`ATA_FEE`) increments per call, since the function unconditionally paid out `net_amount + ATA_FEE` even when the caller's tracked contribution was zero.
- `swap_pump` / `swap_meteora` — both now take a client-supplied absolute `min_out` floor instead of deriving one from live pool reserves read inside the same instruction. The old approach only ever reflected pool state as of execution time — i.e. after any front-running transaction had already landed — so it gave no real protection against sandwich attacks regardless of the slippage tolerance requested. `swap_meteora`'s third argument changes from `slippage_bps: u16` to `min_out: u64` (breaking, see below). `swap_pump`'s argument was already named `min_out` in its public signature but was being treated internally as a bps tolerance; it now behaves as documented.
- `claim_escrow` — the 5% protocol fee is now computed from the escrow vault's actual lamport balance rather than the `Escrow.amount` field tracked by `begin_escrow`, so lamports sent to the vault PDA directly (bypassing `begin_escrow`'s accounting) can no longer reach the recipient fee-free.

Note: an audit pass also flagged `collect_pump_fees` / `collect_meteora_fees` as "permissionless" and initially added a `rooms_authority` signer requirement to both. That was reverted before this deploy — this README already documented both as intentionally permissionless (collected fees always land in the room's own vault regardless of caller), and `rooms-fe`'s dead-code `collect_fees.ts` builders confirm it (`claimer: wallet.publicKey`, any connected wallet). No behavior change here after all.

### Fixed
- `swap_pump` (sell) / `swap_meteora` (sell) — the 0.5% platform fee is now computed from the swap's actual output delta instead of the destination token account's total post-swap balance, so residual/dust balance already sitting in that account is no longer counted as proceeds of the swap and over-charged.
- `InvalidRaiseAmount` error message corrected — the Rooms platform accepts exactly 30, 90, or 180 SOL, not "between 30 and 300 SOL" as previously stated.

### Changed
- `airdrop_tokens` — `allocation_basis_points` is now a cumulative vesting-level target instead of a per-call increment. Added `claimed_basis_points` (u16, last field) to `RoomUser` to track the level already reached; a call is a no-op per-recipient if the target is already met, so retrying an ambiguous/lost confirmation can no longer double-pay a recipient.

### Breaking (devnet)
- `RoomUser` grew from 99 to 101 bytes to fit `claimed_basis_points`. No migration was added — `RoomUser` PDAs created before this deploy (devnet slot 482412967) fail to deserialize under the new layout and are abandoned; `contribute` / `claim_rewards` / `freeze_rewards` / `airdrop_tokens` will error for any of them. Accounts created after this deploy are unaffected. Pre-launch call — no mainnet impact.
- `swap_meteora`'s third argument changed from `slippage_bps: u16` to `min_out: u64` (devnet slot 482591335). Callers must compute an absolute minimum-output floor off-chain from a fresh quote — the same pattern PumpSwap's/Meteora's own native swap instructions expect — rather than passing a basis-point tolerance for the program to apply against its own (spoofable) reserve read. `rooms-fe`'s `swap.ts` was updated to do this internally; its public `slippage: BN` bps parameter is unchanged, so no caller-facing UI change was needed.

### Known gap
- Mainnet (program data last deployed at slot 422296380) is still running the pre-fix code, including the critical `withdraw_contribution` issue above. Mainnet has ~1,178 live program accounts (real usage) as of this writing. Deploy to mainnet is pending a separate, explicit decision — not bundled with this devnet deploy.

## [0.1.0] — 2026-05-02

### Program ID
`CyenP3qnD453Lr6YD7aWzWajM1ytcYdjPmHpHgMrooms`

### Instructions
- `initialize_global_config` — Bootstrap GlobalConfig PDA
- `create_room` — Create a room with PumpFun or Meteora platform
- `increase_contribution` — Contribute SOL; triggers finalization at target
- `withdraw_contribution` — Withdraw SOL before finalization
- `airdrop_tokens` — Distribute allocated tokens post-finalization
- `claim_rewards` — Claim trading fee share
- `verify_access` — Verify user for gated rooms
- `finalize_pump` — Launch token on PumpFun bonding curve
- `finalize_meteora` — Launch token on Meteora DAMM v2
- `swap_pump` — Buy/sell via PumpSwap AMM
- `swap_meteora` — Buy/sell via Meteora AMM
- `collect_pump_fees` — Collect fees from PumpSwap pool
- `collect_meteora_fees` — Collect fees from Meteora DFS
- `migrate_pump_pool` — Migrate bonding curve to PumpSwap AMM
- `initialize_meteora_dfs` — Setup Meteora DFS fee vault
- `freeze_rewards` — Freeze reward accumulation for an Equal-room contributor who dropped below 50% token holding; called by the Rooms cron via `rooms_authority`

)