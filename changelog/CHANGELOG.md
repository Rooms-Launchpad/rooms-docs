# Rooms Protocol Changelog

## [Unreleased]

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