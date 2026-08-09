# Rooms Protocol Changelog

## [Unreleased]

### Changed
- `airdrop_tokens` — `allocation_basis_points` is now a cumulative vesting-level target instead of a per-call increment. Added `claimed_basis_points` (u16, last field) to `RoomUser` to track the level already reached; a call is a no-op per-recipient if the target is already met, so retrying an ambiguous/lost confirmation can no longer double-pay a recipient.

### Breaking (devnet)
- `RoomUser` grew from 99 to 101 bytes to fit `claimed_basis_points`. No migration was added — `RoomUser` PDAs created before this deploy (devnet slot 482412967) fail to deserialize under the new layout and are abandoned; `contribute` / `claim_rewards` / `freeze_rewards` / `airdrop_tokens` will error for any of them. Accounts created after this deploy are unaffected. Pre-launch call — no mainnet impact.

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