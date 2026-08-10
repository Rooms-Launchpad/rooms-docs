# Rooms Protocol Changelog

## [0.1.0] — 2026-08-10

### Program ID
`CyenP3qnD453Lr6YD7aWzWajM1ytcYdjPmHpHgMrooms`

### Instructions
- `initialize_global_config` — Bootstrap GlobalConfig PDA
- `create_room` — Create a room with PumpFun or Meteora platform
- `increase_contribution` — Contribute SOL; triggers finalization at target
- `withdraw_contribution` — Withdraw SOL before finalization
- `airdrop_tokens` — Distribute allocated tokens post-finalization. `allocation_basis_points` is a cumulative vesting-level target (0-10000), not a per-call increment — each `RoomUser` tracks its own `claimed_basis_points`, so retrying a call with an uncertain outcome is a safe no-op instead of a double payout.
- `claim_rewards` — Claim trading fee share
- `verify_access` — Verify user for gated rooms
- `finalize_pump` — Launch token on PumpFun bonding curve
- `finalize_meteora` — Launch token on Meteora DAMM v2
- `swap_pump` — Buy/sell via PumpSwap AMM
- `swap_meteora` — Buy/sell via Meteora AMM
- `collect_pump_fees` — Collect fees from PumpSwap pool
- `collect_meteora_fees` — Collect fees from Meteora DFS. Diverts 20% of collected fees into the global `referral_vault` PDA; the remainder is distributed to participants as usual.
- `migrate_pump_pool` — Migrate bonding curve to PumpSwap AMM
- `initialize_meteora_dfs` — Setup Meteora DFS fee vault
- `freeze_rewards` — Freeze reward accumulation for an Equal-room contributor who dropped below 50% token holding; called by the Rooms cron via `rooms_authority`
- `initialize_referral_vault` — One-time (idempotent) bootstrap that funds the global `referral_vault` PDA to the rent-exempt minimum
- `claim_referral` — Pays out a `rooms_authority`-signed voucher for lifetime referral earnings; the voucher carries a cumulative total, so resubmitting a stale voucher is a no-op
- `sweep_referral_vault` — Sweeps an explicit amount from the `referral_vault` to `admin_vault`
- `begin_escrow` — Opens (or tops up) a sender→recipient SOL escrow
- `approve_escrow` — Recipient approves a pending escrow
- `reject_escrow` — Recipient rejects a pending escrow, allowing the sender to withdraw
- `withdraw_escrow` — Sender reclaims funds from an escrow that isn't approved
- `claim_escrow` — Recipient claims funds from an approved escrow; a 5% fee goes to `admin_vault`
