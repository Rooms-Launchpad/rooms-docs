# Rooms Protocol V1

Rooms is a Solana protocol for community-funded token launches, token allocation, trading fee rewards, team custody and SOL escrow.

## Current interface

Program: `FYs1kpav5Zb8SHYGfGixmKm623ijyPB93zmV5Grooms`  
IDL program version: `1.0.0` · Anchor IDL specification: `0.1.0`  
Updated: **6 October 2026**.

The canonical interface is [idl/rooms.json](./idl/rooms.json), with its generated TypeScript type at [idl/rooms.ts](./idl/rooms.ts). There is one current IDL pair, including the team trading vault instructions. [V1 changelog](./changelog/CHANGELOG.md).

| Network | Program address | Interface status |
| --- | --- | --- |
| Devnet | `FYs1kpav5Zb8SHYGfGixmKm623ijyPB93zmV5Grooms` | Matches the published IDL, including team trading vaults. |
| Mainnet | `FYs1kpav5Zb8SHYGfGixmKm623ijyPB93zmV5Grooms` | Previous deployment; team trading vaults have not been deployed there. |

[Devnet upgrade transaction](https://explorer.solana.com/tx/3whB9yvp6whdZ9GrnrNF1z9T8cKgqK6B3huoX3K7pt9MD5CirAXEtYnTmHM5dsDTJX8k2Hya3BMK8f1SYFY6BDmW?cluster=devnet). This repository's current IDL targets Devnet; the same program address does not mean both networks expose the same ABI.

## Protocol model

A room accepts SOL contributions before finalization. PumpFun launches migrate to PumpSwap; Rooms launches create Meteora DAMM v2 pools. Rooms/Meteora raise targets are 30, 90 or 180 SOL. Token allocations are proportional to contributions, and `airdrop_tokens` uses a cumulative allocation target so an already-paid target cannot pay twice.

The IDL defines room types `Open`, `AccessCode`, `Riddle` and `Approval`. Open rooms verify access automatically; other types require a verified `RoomAccess`. Reward structures are `Equal`, `Creator`, `Custom` and `Team`. Equal rewards use contribution weights with the creator bonus; Creator and Custom rewards pay the designated recipient. Team rooms seal a reward snapshot from a persistent Team roster. Later membership changes do not alter that room's sealed reward owners.

Team fee rewards and team trading funds use separate vaults. Trading participation is a per-member flag. Free SOL belongs to each trader and can only be paid to their recorded wallet. Every buy takes the same fraction of eligible free balances, using integer largest-remainder allocation. Position parts stay fixed; subsequent deposits do not gain ownership of earlier trades. Sales credit the original owners in those fixed proportions.

The default trade limit is 2000 bps (20%), with a program-enforced range of 100–5000 bps (1–50%), checked at execution. Up to 16 positions may be open, with 50 ledger slots. Only an eligible opener or the owner can sell a position. Switching a trader off or removing a member is blocked while their money is in an open position. Owner transfer requires both owners' signatures and does not transfer balances or enable a trader flag.

Vault token trading calls the Rooms PumpSwap or Meteora swap instruction directly; it does not route through Jupiter. Only supported Rooms-launched tokens and canonical route accounts are accepted. Swap minimum outputs are mandatory. Launch rewards enter trading balances only through the claimant's explicit `commit_rewards_to_vault`, sharing the same claim checkpoint as a wallet claim.

**Vault presales are disabled.** Their instruction/account definitions are present in the IDL, but entry and the complete allocation/refund lifecycle are not enabled.

## Instruction reference

Account order, signer/writable flags, arguments, discriminators, layouts and error numbers are defined by the JSON IDL. All SOL values use integer lamports; token amounts use raw integer base units. Use integer arithmetic and preserve `u64`/`u128` precision when consuming the interface.

### Configuration and access

| Instruction | Behavior |
| --- | --- |
| `initialize_global_config` | Initialize the protocol configuration and fee accounts. |
| `verify_access` | Verify a signed, time-bounded authorization for a gated room. |

### Launches and contributions

| Instruction | Behavior |
| --- | --- |
| `create_room` | Create a PumpFun or Rooms/Meteora launch, including optional team association. |
| `increase_contribution` | Add SOL to an unfinalized room within its contribution limits. |
| `decrease_contribution` | Withdraw a specified amount before finalization, subject to contribution rules. |
| `finalize_pump` | Finalize a PumpFun launch with token metadata. |
| `migrate_pump_pool` | Migrate the finalized PumpFun launch to PumpSwap. |
| `finalize_meteora` | Finalize a Rooms launch and create its Meteora DAMM v2 pool. |
| `initialize_meteora_dfs` | Initialize dynamic fee sharing for a Meteora launch. |
| `airdrop_tokens` | Distribute token allocations using a cumulative allocation target in basis points. |

### Swaps and fee rewards

| Instruction | Behavior |
| --- | --- |
| `swap_pump` | Buy or sell through the Rooms PumpSwap route with a mandatory minimum output. |
| `swap_meteora` | Buy or sell through the Rooms Meteora route with a mandatory minimum output. |
| `collect_pump_fees` | Collect PumpSwap creator fees into the room reward flow. |
| `collect_meteora_fees` | Collect Meteora fee-sharing rewards into the room reward flow. |
| `claim_rewards` | Claim the signer's eligible accumulated launch rewards. |
| `freeze_rewards` | Freeze eligible Equal-room reward accumulation under the holding rule. |

### Teams and reward snapshots

| Instruction | Behavior |
| --- | --- |
| `create_team` | Create a persistent team roster and its separate fee-reward vault. |
| `add_team_member` | Add a wallet to the persistent team roster. |
| `remove_team_member` | Remove a wallet with governance and trading-ledger custody guards. |
| `seal_room_team` | Snapshot and seal a Team room's reward owners from the linked roster. |
| `sweep_room_to_team_vault` | Move collected Team-room fee rewards into the team reward vault. |

### Team trading vaults

| Instruction | Behavior |
| --- | --- |
| `initialize_team_governance` | Bootstrap the team owner/admin identities. |
| `vault_init` | Create separate trading-vault accounts and enable the owner as the initial trader. |
| `vault_set_admin` | Update a team admin flag under owner authority. |
| `vault_transfer_owner` | Transfer ownership with signatures from both owners; balances and trader flags remain unchanged. |
| `vault_set_trade_limit` | Set the immediate vault-wide trade limit from 100 to 5000 basis points. |
| `vault_set_trader` | Enable a member as trader, or pay out and disable a trader with no open positions. |
| `vault_deposit` | Deposit the trader's own SOL into their free balance. |
| `vault_withdraw` | Withdraw only the trader's own free balance to their recorded wallet. |
| `vault_buy` | Open a proportional position in a Rooms-launched token through an allowed direct swap route. |
| `vault_sell` | Partially or fully sell a position as its eligible opener or the owner; distribute net proceeds by fixed parts. |
| `vault_exit` | Atomically pay a member's free balance and remove them, rejecting open positions and owner departure. |
| `commit_rewards_to_vault` | Commit the signer's whole eligible claim for a room into their own free balance using shared claim accounting. |
| `vault_acknowledge_trade` | Acknowledge indexing of a closed trade under Rooms authority before account reclamation. |
| `vault_close_trade_account` | Reclaim an acknowledged, closed trade account's rent to its original payer. |
| `vault_enter_presale` | Reserved ABI; vault presale entry is disabled in this release. |
| `vault_settle_presale` | Reserved settlement ABI; the vault presale lifecycle is not enabled in this release. |

### Referrals

| Instruction | Behavior |
| --- | --- |
| `initialize_referral_vault` | Initialize the separate referral reward vault. |
| `claim_referral` | Claim against a signed cumulative referral entitlement with expiry. |
| `sweep_referral_vault` | Move an authorized explicit amount of referral-vault SOL to the configured admin vault. |

### Escrow

| Instruction | Behavior |
| --- | --- |
| `begin_escrow` | Create or top up a sender-to-recipient SOL escrow. |
| `approve_escrow` | Approve a pending escrow as recipient. |
| `reject_escrow` | Reject an escrow as recipient. |
| `withdraw_escrow` | Reclaim an unapproved escrow as sender. |
| `claim_escrow` | Claim an approved escrow as recipient, applying the protocol fee. |

## Account and event definitions

The IDL includes `Escrow`, `GlobalConfig`, `ReferralClaim`, `Room`, `RoomAccess`, `RoomTeam`, `RoomUser`, `Team`, `TeamGovernance`, `TradingVault`, `VaultLedger`, `VaultPresalePosition`, `VaultTrade`. System-owned SOL vaults and authority PDAs are supplied as instructed by the account definitions; their native SOL is not an Anchor account struct.

Events expose contributions, launches, allocations, swaps, reward collection/claims, referral credits, escrow transitions, governance changes and trading-vault activity. Their exact fields and the program error codes are defined in the IDL.

## Compatibility details

- The current `remove_team_member` account order is `team`, `trading_ledger`, `governance`, `rooms_authority`. Derive and supply the guard PDAs even before a trading vault exists. The ledger seed uses the trading-vault PDA; do not interpret Anchor's stringified Rust expression in its seed metadata as a literal Solana seed.
- For non-Team contribution/claim instructions, an Anchor TypeScript client should pass the optional `roomTeam` as `null` explicitly, avoiding an uninitialized derived account.
- Account seed annotations are convenience metadata; the program enforces the actual account relationships. Consult the argument/account definitions rather than constructing arbitrary signed route instructions.
- `vault_exit` performs payout and membership removal atomically. Closed trading positions require indexing acknowledgement before rent reclamation.
- The program remains upgradeable. Confirm the deployed network interface before submitting transactions.
