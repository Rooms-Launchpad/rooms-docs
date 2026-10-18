# Rooms Protocol V1

Rooms is a Solana protocol for community-funded token launches, token allocation, trading fee rewards, team custody and SOL escrow.

## Current interface

Program: `TWexqA2EZiSZEvu2vVdvmHnpew3Xx9wkjgLToBrooms`
IDL program version: `1.0.0` · Anchor IDL specification: `0.1.0`
Updated: **18 October 2026**.

The canonical interface is [idl/rooms.json](./idl/rooms.json), with its generated TypeScript type at [idl/rooms.ts](./idl/rooms.ts). There is one current IDL pair, including the team trading vault instructions. [Historical V1 changelog](./changelog/CHANGELOG.md) records the earlier interface; the current README and IDL pair describe this release.

| Network | Program address | Interface status |
| --- | --- | --- |
| Devnet | `TWexqA2EZiSZEvu2vVdvmHnpew3Xx9wkjgLToBrooms` | Deployed and matches the published IDL. Raydium launches require an on-chain permission that is currently absent. |
| Mainnet | — | This program/interface is not deployed on mainnet. |

The canonical IDL targets the current Devnet deployment, including Devnet Raydium CPMM config 6. It does not describe the retired program's accounts. Program-derived addresses change with the Rooms program ID; accounts from earlier deployments are not migrated or compatible with this fresh interface.

## Protocol model

A room accepts SOL contributions before finalization. PumpFun launches migrate to PumpSwap; Raydium launches create CPMM pools. Raydium raise targets are 30, 90 or 180 SOL. Token allocations are proportional to contributions, and `airdrop_tokens` uses a cumulative allocation target so an already-paid target cannot pay twice.

The IDL defines room types `Open`, `AccessCode`, `Riddle` and `Approval`. Open rooms verify access automatically; other types require a verified `RoomAccess`. Reward structures are `Equal`, `Creator`, `Custom` and `Team`. Equal rewards use contribution weights with the creator bonus; Creator and Custom rewards pay the designated recipient. Team rooms seal a reward snapshot from a persistent Team roster. Later membership changes do not alter that room's sealed reward owners.

Team fee rewards and team trading funds use separate vaults. Trading participation is a per-member flag. Free SOL belongs to each trader and can only be paid to their recorded wallet. Every buy takes the same fraction of eligible free balances, using integer largest-remainder allocation. Position parts stay fixed; subsequent deposits do not gain ownership of earlier trades. Sales credit the original owners in those fixed proportions.

The default trade limit is 2000 bps (20%), with a program-enforced range of 100–5000 bps (1–50%), checked at execution. Up to 16 positions may be open, with 50 ledger slots. Only an eligible opener or the owner can sell a position. Switching a trader off or removing a member is blocked while their money is in an open position. Owner transfer requires both owners' signatures and does not transfer balances or enable a trader flag.

On Devnet, the current governance owner or an admin may set trader flags and the trade limit using their own `actor` signature, provided they remain on the team roster. Trader status alone does not grant these permissions. Manual vault initialization and admin-role changes remain owner-only; the separate authority-funded automatic initialization creates only an empty vault. Ownership transfer still requires both owners to sign. These permissions apply to the current Devnet program.

Vault token trading calls the Rooms PumpSwap or Raydium swap instruction directly; it does not route through Jupiter. Only supported Rooms-launched tokens and canonical route accounts are accepted. Swap minimum outputs are mandatory. Launch rewards enter trading balances only through the claimant's explicit `commit_rewards_to_vault`, sharing the same claim checkpoint as a wallet claim.

**Vault presales are disabled.** Their instruction/account definitions are present in the IDL, but entry and the complete allocation/refund lifecycle are not enabled.

## Raydium CPMM interface

`RoomPlatform` is `PumpFun = 0`, `Raydium = 1`. This is a fresh deployment ABI; historical platform discriminants must not be interpreted with the current IDL. The former Meteora launch, swap, fee-collection and dynamic-fee-sharing instructions are absent.

| Devnet account | Address |
| --- | --- |
| Raydium CPMM program | `DRaycpLY18LhpbydsBWbVJtxpNv9oXPgjRSfpF2bWpYb` |
| CPMM config 6 | `8Pg5wr9H5i2GKbiH8315UiM1W9LJQT2tNiuqBeaoGKjz` |
| Pool creation-fee receiver | `3oE58BKVt8KuYkGxx8zBojugnymWmBiyafWgMrnb6eYy` |

The shared launch authority is derived from `[b"raydium_launch_authority"]` under the Rooms program. Raydium's permission is derived from `[b"permission", launch_authority]` under CPMM. Finalization requires this permission; the current Devnet permission is absent as of 18 October 2026. Each room's `room_vault` is its pool creator and creator-fee recipient.

| Raise target | Minimum contribution | Maximum contribution | Tokens deposited into liquidity | Contributor allocation |
| --- | ---: | ---: | ---: | ---: |
| 30 SOL | 0.045 SOL | 0.45 SOL | 333,333,334 | 666,666,666 |
| 90 SOL | 0.108 SOL | 1.08 SOL | 166,666,667 | 833,333,333 |
| 180 SOL | 0.2025 SOL | 2.025 SOL | 111,111,112 | 888,888,888 |

Launch tokens use Token-2022, six decimals and a total supply of one billion. Token allocation is `floor(room.token_allocation * user.lamports_contributed / room.raised_lamports)`, calculated in raw integer units. Mint authority is revoked at finalization.

The targets include the 0.15 SOL CPMM creation fee and launch account costs. Those costs are paid from the room vault, reducing the SOL deposited as liquidity; the finalization signer does not fund pool creation or launch rent. The transaction fee payer still pays Solana network fees. Contribution charges remain 3% in addition to accepted principal, plus a 0.0021 SOL first-contribution token-account reserve. Finalization retains contributor token-account reserves.

Config 6 currently charges 0.005% ordinary trading fees plus 1.495% creator fees, collected exclusively in WSOL in either trade direction. Its current default creator-fee protocol deduction is zero. Rates and creator-specific deductions may change; collection accounts for actual net WSOL. Finalization rejects disabled/repriced configurations and a default creator-fee deduction above 5%. All issued LP tokens are burned; ordinary LP fees remain in the pool and are not distributed.

For net collected creator fees `C`, the admin receives `floor(C / 4)`, referrals receive `floor((C - admin) / 5)`, and room rewards receive the remainder: approximately 25% / 15% / 60%. Collection includes earlier direct permissionless Raydium collections into the canonical room WSOL account, refunds temporary account rent, and supports zero-fee retries.

Swaps through Rooms additionally charge 0.5% from WSOL input on buys or WSOL output on sells. `min_out` is an absolute output floor from an off-chain quote, net of this wrapper fee. A sell closes the WSOL output account to the caller, including any preexisting WSOL and rent; the swap event reports only the new net trade output. New pools enforce their stored `open_time` before swaps.

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
| `create_room` | Create a PumpFun or Raydium CPMM launch, including optional team association. |
| `increase_contribution` | Add SOL to an unfinalized room within its contribution limits. |
| `decrease_contribution` | Withdraw a specified amount before finalization, subject to contribution rules. |
| `finalize_pump` | Finalize a PumpFun launch with token metadata. |
| `migrate_pump_pool` | Migrate the finalized PumpFun launch to PumpSwap. |
| `finalize_raydium` | Create a CPMM pool, revoke mint authority and burn all issued LP tokens atomically. |
| `airdrop_tokens` | Distribute token allocations using a cumulative allocation target in basis points. |

### Swaps and fee rewards

| Instruction | Behavior |
| --- | --- |
| `swap_pump` | Buy or sell through the Rooms PumpSwap route with a mandatory minimum output. |
| `swap_raydium` | Buy or sell through CPMM with an absolute minimum output net of the Rooms wrapper fee. |
| `collect_pump_fees` | Collect PumpSwap creator fees into the room reward flow. |
| `collect_raydium_fees` | Collect net WSOL creator fees, unwrap SOL and accrue room rewards. |
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
| `vault_init` | Owner-signed creation of separate trading-vault accounts; enables the owner as the initial trader. |
| `vault_init_automatic` | Configured Rooms authority creates an empty vault for the existing governance owner; defaults to 20% and owner participation. Cannot reinitialize existing vaults. |
| `vault_set_admin` | Update a team admin flag under owner authority. |
| `vault_transfer_owner` | Transfer ownership with signatures from both owners; balances and trader flags remain unchanged. |
| `vault_set_trade_limit` | Current team owner/admin signs to set the immediate vault-wide trade limit from 100 to 5000 basis points. |
| `vault_set_trader` | Current team owner/admin signs to enable a member as trader, or pay out to the recorded wallet and disable a trader with no open positions. |
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

- Clients use Solana V1 transactions with inline account addresses and explicit compute-unit and loaded-account-data limits. V0/address-lookup-table transactions and ComputeBudget instructions are not used for these protocol flows.

- The current `remove_team_member` account order is `team`, `trading_ledger`, `governance`, `rooms_authority`. Derive and supply the guard PDAs even before a trading vault exists. The ledger seed uses the trading-vault PDA; do not interpret Anchor's stringified Rust expression in its seed metadata as a literal Solana seed.
- For non-Team contribution/claim instructions, an Anchor TypeScript client should pass the optional `roomTeam` as `null` explicitly, avoiding an uninitialized derived account.
- Account seed annotations are convenience metadata; the program enforces the actual account relationships. Consult the argument/account definitions rather than constructing arbitrary signed route instructions.
- `vault_exit` performs payout and membership removal atomically. Closed trading positions require indexing acknowledgement before rent reclamation.
- The program remains upgradeable. Confirm the deployed network interface before submitting transactions.
