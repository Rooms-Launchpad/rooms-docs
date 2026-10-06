# Rooms Protocol Changelog

## V1 — 2026-10-06

Current program/IDL version: **1.0.0**. This V1 baseline describes the complete current interface published in `idl/rooms.json` and `idl/rooms.ts`; it is not a history imported from an earlier documentation repository.

Program: `FYs1kpav5Zb8SHYGfGixmKm623ijyPB93zmV5Grooms`. The current IDL matches **Devnet**. Mainnet remains on its previous deployment and does not yet expose team trading vaults.

### Current instruction surface

#### Configuration and access

- `initialize_global_config` — Initialize the protocol configuration and fee accounts.
- `verify_access` — Verify a signed, time-bounded authorization for a gated room.

#### Launches and contributions

- `create_room` — Create a PumpFun or Rooms/Meteora launch, including optional team association.
- `increase_contribution` — Add SOL to an unfinalized room within its contribution limits.
- `decrease_contribution` — Withdraw a specified amount before finalization, subject to contribution rules.
- `finalize_pump` — Finalize a PumpFun launch with token metadata.
- `migrate_pump_pool` — Migrate the finalized PumpFun launch to PumpSwap.
- `finalize_meteora` — Finalize a Rooms launch and create its Meteora DAMM v2 pool.
- `initialize_meteora_dfs` — Initialize dynamic fee sharing for a Meteora launch.
- `airdrop_tokens` — Distribute token allocations using a cumulative allocation target in basis points.

#### Swaps and fee rewards

- `swap_pump` — Buy or sell through the Rooms PumpSwap route with a mandatory minimum output.
- `swap_meteora` — Buy or sell through the Rooms Meteora route with a mandatory minimum output.
- `collect_pump_fees` — Collect PumpSwap creator fees into the room reward flow.
- `collect_meteora_fees` — Collect Meteora fee-sharing rewards into the room reward flow.
- `claim_rewards` — Claim the signer's eligible accumulated launch rewards.
- `freeze_rewards` — Freeze eligible Equal-room reward accumulation under the holding rule.

#### Teams and reward snapshots

- `create_team` — Create a persistent team roster and its separate fee-reward vault.
- `add_team_member` — Add a wallet to the persistent team roster.
- `remove_team_member` — Remove a wallet with governance and trading-ledger custody guards.
- `seal_room_team` — Snapshot and seal a Team room's reward owners from the linked roster.
- `sweep_room_to_team_vault` — Move collected Team-room fee rewards into the team reward vault.

#### Team trading vaults

- `initialize_team_governance` — Bootstrap the team owner/admin identities.
- `vault_init` — Create separate trading-vault accounts and enable the owner as the initial trader.
- `vault_set_admin` — Update a team admin flag under owner authority.
- `vault_transfer_owner` — Transfer ownership with signatures from both owners; balances and trader flags remain unchanged.
- `vault_set_trade_limit` — Set the immediate vault-wide trade limit from 100 to 5000 basis points.
- `vault_set_trader` — Enable a member as trader, or pay out and disable a trader with no open positions.
- `vault_deposit` — Deposit the trader's own SOL into their free balance.
- `vault_withdraw` — Withdraw only the trader's own free balance to their recorded wallet.
- `vault_buy` — Open a proportional position in a Rooms-launched token through an allowed direct swap route.
- `vault_sell` — Partially or fully sell a position as its eligible opener or the owner; distribute net proceeds by fixed parts.
- `vault_exit` — Atomically pay a member's free balance and remove them, rejecting open positions and owner departure.
- `commit_rewards_to_vault` — Commit the signer's whole eligible claim for a room into their own free balance using shared claim accounting.
- `vault_acknowledge_trade` — Acknowledge indexing of a closed trade under Rooms authority before account reclamation.
- `vault_close_trade_account` — Reclaim an acknowledged, closed trade account's rent to its original payer.
- `vault_enter_presale` — Reserved ABI; vault presale entry is disabled in this release.
- `vault_settle_presale` — Reserved settlement ABI; the vault presale lifecycle is not enabled in this release.

#### Referrals

- `initialize_referral_vault` — Initialize the separate referral reward vault.
- `claim_referral` — Claim against a signed cumulative referral entitlement with expiry.
- `sweep_referral_vault` — Move an authorized explicit amount of referral-vault SOL to the configured admin vault.

#### Escrow

- `begin_escrow` — Create or top up a sender-to-recipient SOL escrow.
- `approve_escrow` — Approve a pending escrow as recipient.
- `reject_escrow` — Reject an escrow as recipient.
- `withdraw_escrow` — Reclaim an unapproved escrow as sender.
- `claim_escrow` — Claim an approved escrow as recipient, applying the protocol fee.

### V1 accounting and compatibility

- Integer lamport/token accounting, including `u128` intermediates and fixed proportional position ownership.
- Persistent team rosters, immutable per-room reward snapshots, separate team reward/trading vaults, owner/admin governance and trader flags.
- Default 20% trade limit, enforced 1–50% range, 16 open-position limit and 50 trader ledger slots.
- Partial/full position sales, own-wallet free-balance withdrawals, payout on switch-off/exit, and open-position departure guards.
- Direct Rooms PumpSwap/Meteora vault routes with minimum outputs; no Jupiter route or arbitrary external-token route.
- Explicit reward commitment with shared claim checkpoints; no automatic trading of fee rewards.
- Mandatory trading-ledger/governance accounts for `remove_team_member`; cumulative token-allocation and referral-claim semantics.
- Vault presale instruction/account definitions are included as a reserved interface; presale entry and the complete settlement/refund lifecycle remain disabled.

### Accounts

- `Escrow`
- `GlobalConfig`
- `ReferralClaim`
- `Room`
- `RoomAccess`
- `RoomTeam`
- `RoomUser`
- `Team`
- `TeamGovernance`
- `TradingVault`
- `VaultLedger`
- `VaultPresalePosition`
- `VaultTrade`

### Events

- `Airdrop`
- `ContributionIncreased`
- `ContributionWithdrawn`
- `EscrowApproved`
- `EscrowBegun`
- `EscrowClaimed`
- `EscrowIncreased`
- `EscrowRejected`
- `EscrowWithdrawn`
- `FeesCollected`
- `LaunchFinalized`
- `PoolMigrated`
- `ReferralClaimed`
- `ReferralVaultCredited`
- `RewardsClaimed`
- `RewardsFrozen`
- `RoomCreated`
- `RoomTeamSealed`
- `SwapExecuted`
- `TeamGovernanceChanged`
- `VaultDeposited`
- `VaultInitialized`
- `VaultMemberExited`
- `VaultPresaleSettled`
- `VaultRewardsCommitted`
- `VaultTradeClosed`
- `VaultTradeLimitChanged`
- `VaultTradeOpened`
- `VaultTradeSold`
- `VaultTraderSet`
- `VaultWithdrawn`

### Errors and types

The current IDL contains 76 named program errors with their numeric codes/messages, and the full account, enum and event type definitions. The JSON IDL is authoritative for these values.
