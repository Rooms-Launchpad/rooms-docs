/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/rooms.json`.
 */
export type Rooms = {
  "address": "FYs1kpav5Zb8SHYGfGixmKm623ijyPB93zmV5Grooms",
  "metadata": {
    "name": "rooms",
    "version": "1.0.0",
    "spec": "0.1.0",
    "description": "Pre-sale token launch platform — rooms.run"
  },
  "instructions": [
    {
      "name": "addTeamMember",
      "docs": [
        "Adds one wallet to a team's live roster. Touches no room — only a",
        "room sealed *after* this call will include the new member."
      ],
      "discriminator": [
        64,
        13,
        248,
        67,
        55,
        245,
        184,
        173
      ],
      "accounts": [
        {
          "name": "team",
          "writable": true
        },
        {
          "name": "roomsAuthority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "wallet",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "airdropTokens",
      "discriminator": [
        242,
        252,
        19,
        227,
        43,
        233,
        89,
        122
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "writable": true
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "roomVaultAta",
          "writable": true
        },
        {
          "name": "roomsAuthority",
          "signer": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "allocationBasisPoints",
          "type": "u16"
        }
      ]
    },
    {
      "name": "approveEscrow",
      "discriminator": [
        79,
        143,
        76,
        129,
        122,
        177,
        12,
        122
      ],
      "accounts": [
        {
          "name": "escrow",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "escrow.sender",
                "account": "escrow"
              },
              {
                "kind": "account",
                "path": "escrow.escrow_id",
                "account": "escrow"
              }
            ]
          }
        },
        {
          "name": "recipient",
          "signer": true,
          "relations": [
            "escrow"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "beginEscrow",
      "discriminator": [
        132,
        70,
        196,
        57,
        18,
        169,
        158,
        44
      ],
      "accounts": [
        {
          "name": "escrow",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "sender"
              },
              {
                "kind": "arg",
                "path": "escrowId"
              }
            ]
          }
        },
        {
          "name": "recipient"
        },
        {
          "name": "escrowVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "escrow"
              }
            ]
          }
        },
        {
          "name": "sender",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "escrowId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimEscrow",
      "discriminator": [
        200,
        80,
        182,
        159,
        61,
        75,
        9,
        205
      ],
      "accounts": [
        {
          "name": "escrow",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "escrow.sender",
                "account": "escrow"
              },
              {
                "kind": "account",
                "path": "escrow.escrow_id",
                "account": "escrow"
              }
            ]
          }
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true
        },
        {
          "name": "escrowVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "escrow"
              }
            ]
          }
        },
        {
          "name": "recipient",
          "writable": true,
          "signer": true,
          "relations": [
            "escrow"
          ]
        },
        {
          "name": "sender",
          "writable": true,
          "relations": [
            "escrow"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "claimReferral",
      "discriminator": [
        219,
        247,
        18,
        148,
        63,
        247,
        112,
        198
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "referralVault",
          "docs": [
            "collections across all rooms, pending referral payout."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  102,
                  101,
                  114,
                  114,
                  97,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "referralClaim",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  102,
                  101,
                  114,
                  114,
                  97,
                  108,
                  95,
                  99,
                  108,
                  97,
                  105,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "instructionSysvar",
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "cumulativeEarned",
          "type": "u64"
        },
        {
          "name": "expiry",
          "type": "i64"
        }
      ]
    },
    {
      "name": "claimRewards",
      "discriminator": [
        4,
        144,
        132,
        71,
        116,
        23,
        151,
        80
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "room",
          "writable": true
        },
        {
          "name": "roomUser",
          "docs": [
            "Created on first claim if the signer never contributed (e.g. creator/reward_wallet).",
            "Checkpoint starts at 0 so creators earn fees from room inception."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "docs": [
            "pays out of this; a Team room only ever reads its",
            "`treasury_fee_accumulator` from `room` and pays out of `team_vault`",
            "instead (see below) — but the account still has to be present in",
            "every call because the struct is shared across all reward structures."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "roomTeam",
          "docs": [
            "Required for `RewardStructure::Team` rooms, absent for every other kind.",
            "Trailing and optional so pre-team clients keep working (see the",
            "`allow-missing-optionals` note in Cargo.toml)."
          ],
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  116,
                  101,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "teamVault",
          "docs": [
            "place of `room_vault`. Deliberately unconstrained here (no seeds/bump",
            "in this macro) and validated by hand in the handler instead: its",
            "address depends on `room.team`, itself an `Option`, and deriving one",
            "optional account's seeds from another optional account's contents is",
            "a real panic risk if a caller supplies them inconsistently. Manual",
            "validation lets every case fail cleanly through `require!`/`ok_or`",
            "instead."
          ],
          "writable": true,
          "optional": true
        }
      ],
      "args": []
    },
    {
      "name": "collectMeteoraFees",
      "discriminator": [
        18,
        65,
        200,
        231,
        64,
        14,
        5,
        135
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true
        },
        {
          "name": "adminWsolVault",
          "writable": true
        },
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "writable": true
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "roomVaultAta",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wsolMint",
          "address": "So11111111111111111111111111111111111111112"
        },
        {
          "name": "meteoraFeeVault",
          "writable": true
        },
        {
          "name": "meteoraFeeVaultAuthority"
        },
        {
          "name": "meteoraTokenVault",
          "writable": true
        },
        {
          "name": "roomsFeeClaimAdmin",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  99,
                  108,
                  97,
                  105,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "dynamicFeeSharingEventAuthority"
        },
        {
          "name": "dynamicFeeSharingProgram",
          "address": "dfsdo2UqvwfN8DuUVrMRNfQe11VaiNoKcMqLHVvDPzh"
        },
        {
          "name": "meteoraSourceProgram"
        },
        {
          "name": "meteoraPoolAuthority"
        },
        {
          "name": "meteoraPool",
          "writable": true
        },
        {
          "name": "meteoraPosition",
          "writable": true
        },
        {
          "name": "meteoraTokenAAccount",
          "writable": true
        },
        {
          "name": "meteoraTokenBAccount",
          "writable": true
        },
        {
          "name": "meteoraTokenAVault",
          "writable": true
        },
        {
          "name": "meteoraTokenBVault",
          "writable": true
        },
        {
          "name": "meteoraTokenAMint"
        },
        {
          "name": "meteoraTokenBMint"
        },
        {
          "name": "meteoraPositionNftAccount"
        },
        {
          "name": "meteoraOwner"
        },
        {
          "name": "meteoraTokenAProgram"
        },
        {
          "name": "meteoraTokenBProgram"
        },
        {
          "name": "meteoraEventAuthority"
        },
        {
          "name": "referralVault",
          "docs": [
            "via `initialize_referral_vault` before the first collection."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  102,
                  101,
                  114,
                  114,
                  97,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "collectPumpFees",
      "discriminator": [
        117,
        129,
        9,
        79,
        108,
        55,
        145,
        38
      ],
      "accounts": [
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "writable": true
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "wsolMint",
          "address": "So11111111111111111111111111111111111111112"
        },
        {
          "name": "pumpfunCreatorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  45,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "roomVault"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpfunProgram"
            }
          }
        },
        {
          "name": "pumpfunEventAuthority",
          "address": "Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1"
        },
        {
          "name": "pumpswapCreatorVaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "roomVault"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpswapProgram"
            }
          }
        },
        {
          "name": "pumpswapCreatorVaultAta",
          "writable": true
        },
        {
          "name": "pumpswapCreatorTokenAccount",
          "docs": [
            "Closed at the end of each call; room_vault recreates it next time."
          ],
          "writable": true
        },
        {
          "name": "pumpswapEventAuthority",
          "address": "GS4CU59F31iL7aR2Q8zVS8DRrcRnXX1yjQ66TqNVQnaR"
        },
        {
          "name": "pumpfunProgram",
          "address": "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
        },
        {
          "name": "pumpswapProgram",
          "address": "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
        },
        {
          "name": "claimer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "commitRewardsToVault",
      "discriminator": [
        20,
        166,
        188,
        216,
        30,
        193,
        112,
        98
      ],
      "accounts": [
        {
          "name": "access",
          "accounts": [
            {
              "name": "team",
              "writable": true,
              "relations": [
                "governance",
                "tradingVault"
              ]
            },
            {
              "name": "governance",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      101,
                      97,
                      109,
                      95,
                      103,
                      111,
                      118,
                      101,
                      114,
                      110,
                      97,
                      110,
                      99,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "tradingVault",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      114,
                      97,
                      100,
                      105,
                      110,
                      103,
                      95,
                      118,
                      97,
                      117,
                      108,
                      116
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "ledger",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      108,
                      101,
                      100,
                      103,
                      101,
                      114
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "vaultSol",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      115,
                      111,
                      108
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "actor",
              "writable": true,
              "signer": true
            },
            {
              "name": "wallet",
              "writable": true
            },
            {
              "name": "systemProgram",
              "address": "11111111111111111111111111111111"
            }
          ]
        },
        {
          "name": "room",
          "writable": true
        },
        {
          "name": "roomUser",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "trader"
              }
            ]
          }
        },
        {
          "name": "roomTeam",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  116,
                  101,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "teamVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "access.team",
                "account": "vaultAccess"
              }
            ]
          }
        },
        {
          "name": "trader",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createRoom",
      "discriminator": [
        130,
        166,
        32,
        2,
        247,
        120,
        178,
        53
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "signer": true
        },
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "rewardWallet"
        },
        {
          "name": "rewardWalletRoomUser",
          "docs": [
            "RoomUser PDA for the reward wallet, created at room creation time."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "rewardWallet"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "roomPlatform",
          "type": {
            "defined": {
              "name": "roomPlatform"
            }
          }
        },
        {
          "name": "roomType",
          "type": {
            "defined": {
              "name": "roomType"
            }
          }
        },
        {
          "name": "rewardStructure",
          "type": {
            "defined": {
              "name": "rewardStructure"
            }
          }
        },
        {
          "name": "metadataUri",
          "type": "string"
        },
        {
          "name": "rewardWallet",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "raiseLamports",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "team",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "createTeam",
      "docs": [
        "Creates (idempotently) the persistent on-chain roster for one team.",
        "Lazy — called the first time a team's membership needs syncing on",
        "chain, not eagerly for every team — and rooms_authority-signed, since",
        "team membership stays exactly as backend-authorized as it is off",
        "chain today."
      ],
      "discriminator": [
        122,
        161,
        98,
        67,
        178,
        128,
        116,
        113
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "team",
          "docs": [
            "Allocated once, on first sync, and reused for every room this team",
            "ever launches — see `Team`'s own doc comment for why this differs",
            "from `RoomTeam`'s per-room allocation."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109
                ]
              },
              {
                "kind": "arg",
                "path": "teamId"
              }
            ]
          }
        },
        {
          "name": "teamVault",
          "docs": [
            "funded to the zero-data rent minimum when the team is created so a",
            "later fee sweep can never try to create the PDA with a sub-rent",
            "transfer after an earlier payout round drained its distributable SOL."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "roomsAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "teamId",
          "type": {
            "array": [
              "u8",
              16
            ]
          }
        }
      ]
    },
    {
      "name": "decreaseContribution",
      "discriminator": [
        235,
        175,
        148,
        85,
        120,
        1,
        186,
        91
      ],
      "accounts": [
        {
          "name": "room",
          "writable": true
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true
        },
        {
          "name": "roomUser",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "roomAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "roomTeam",
          "docs": [
            "Required for `RewardStructure::Team` rooms, absent for every other kind.",
            "",
            "Last in the list, and optional, so clients built before team splits",
            "existed keep working unchanged against non-team rooms (see the",
            "`allow-missing-optionals` note in Cargo.toml). The seeds constraint",
            "means a team room cannot be satisfied by passing some other account."
          ],
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  116,
                  101,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalizeMeteora",
      "discriminator": [
        60,
        135,
        220,
        179,
        252,
        25,
        239,
        24
      ],
      "accounts": [
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "roomVaultAta",
          "writable": true
        },
        {
          "name": "tokenMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "meteoraProgram"
        },
        {
          "name": "meteoraPoolAuthority",
          "address": "HLnpSz9h2S4hiLQ43rnSD9XkcUThA7B8hQMKmDaiTLcC"
        },
        {
          "name": "meteoraPositionNftMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110,
                  95,
                  110,
                  102,
                  116,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "meteoraPositionNftAccount",
          "writable": true
        },
        {
          "name": "meteoraPosition",
          "writable": true
        },
        {
          "name": "meteoraPool",
          "writable": true
        },
        {
          "name": "meteoraTokenAVault",
          "writable": true
        },
        {
          "name": "meteoraTokenBVault",
          "writable": true
        },
        {
          "name": "tokenAMint"
        },
        {
          "name": "tokenBMint"
        },
        {
          "name": "payerTokenA",
          "writable": true
        },
        {
          "name": "payerTokenB",
          "writable": true
        },
        {
          "name": "meteoraEventAuthority"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "tokenMetadata",
          "writable": true
        },
        {
          "name": "sysvarInstructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "tokenAProgram"
        },
        {
          "name": "tokenBProgram"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "finalizePump",
      "discriminator": [
        127,
        189,
        77,
        124,
        52,
        157,
        18,
        129
      ],
      "accounts": [
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "roomVaultAta",
          "writable": true
        },
        {
          "name": "tokenMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "pumpfunMintAuthority",
          "address": "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM"
        },
        {
          "name": "pumpfunBondingCurve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpfunProgram"
            }
          }
        },
        {
          "name": "pumpfunAssociatedBondingCurve",
          "writable": true
        },
        {
          "name": "pumpfunGlobal",
          "address": "4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf"
        },
        {
          "name": "pumpfunGlobalParams",
          "address": "13ec7XdrjF3h3YcqBTFDSReRcUFwbCnJaAQspM4j6DDJ"
        },
        {
          "name": "pumpfunSolVault",
          "writable": true,
          "address": "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s"
        },
        {
          "name": "pumpfunCreatorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  45,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "roomVault"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpfunProgram"
            }
          }
        },
        {
          "name": "pumpfunProgram",
          "address": "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
        },
        {
          "name": "pumpfunEventAuthority",
          "address": "Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1"
        },
        {
          "name": "pumpfunFeeRecipient",
          "writable": true
        },
        {
          "name": "pumpfunGlobalVolumeAccumulator",
          "address": "Hq2wp8uJ9jCPsYgNHex8RtqdvMPfVGoYwjvF1ATiwn2Y"
        },
        {
          "name": "pumpfunUserVolumeAccumulator",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "roomVault"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpfunProgram"
            }
          }
        },
        {
          "name": "pumpfunFeeConfig"
        },
        {
          "name": "pumpfunFeeProgram",
          "address": "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
        },
        {
          "name": "pumpfunBondingCurveV2",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101,
                  45,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpfunProgram"
            }
          }
        },
        {
          "name": "pumpfunBuybackFeeRecipient",
          "writable": true,
          "address": "GXPFM2caqTtQYC2cJ5yJRi9VDkpsYZXzYdwYpGnLmtDL"
        },
        {
          "name": "pumpfunMayhemProgram",
          "writable": true,
          "address": "MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e"
        },
        {
          "name": "pumpfunMayhemState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  121,
                  104,
                  101,
                  109,
                  45,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpfunMayhemProgram"
            }
          }
        },
        {
          "name": "pumpfunMayhemVault",
          "writable": true
        },
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "freezeRewards",
      "discriminator": [
        132,
        73,
        148,
        69,
        166,
        208,
        24,
        98
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "roomUser",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "room_user.user",
                "account": "roomUser"
              }
            ]
          }
        },
        {
          "name": "userTokenAccount"
        },
        {
          "name": "roomsAuthority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "increaseContribution",
      "discriminator": [
        144,
        208,
        182,
        185,
        26,
        149,
        18,
        207
      ],
      "accounts": [
        {
          "name": "room",
          "writable": true
        },
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true
        },
        {
          "name": "roomUser",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "roomAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "roomTeam",
          "docs": [
            "Required for `RewardStructure::Team` rooms, absent for every other kind.",
            "",
            "Last in the list, and optional, so clients built before team splits",
            "existed keep working unchanged against non-team rooms (see the",
            "`allow-missing-optionals` note in Cargo.toml). The seeds constraint",
            "means a team room cannot be satisfied by passing some other account."
          ],
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  116,
                  101,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "lamportsAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeGlobalConfig",
      "discriminator": [
        113,
        216,
        122,
        131,
        225,
        209,
        22,
        55
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true
        },
        {
          "name": "wsolMint",
          "address": "So11111111111111111111111111111111111111112"
        },
        {
          "name": "adminWsolVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "adminVault"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "wsolMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "roomsAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeMeteoraDfs",
      "discriminator": [
        197,
        166,
        159,
        120,
        29,
        35,
        183,
        35
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "roomVaultAta",
          "writable": true
        },
        {
          "name": "tokenMint",
          "writable": true
        },
        {
          "name": "wsolMint",
          "address": "So11111111111111111111111111111111111111112"
        },
        {
          "name": "roomsFeeClaimAdmin",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  95,
                  99,
                  108,
                  97,
                  105,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "dynamicFeeSharingProgram",
          "address": "dfsdo2UqvwfN8DuUVrMRNfQe11VaiNoKcMqLHVvDPzh"
        },
        {
          "name": "dynamicFeeSharingEventAuthority",
          "address": "EjRrm5Ptzzbp4fft5k4oC9LvbXqVA4UV4Sc9RNULDhCA"
        },
        {
          "name": "meteoraPositionNftAccount",
          "writable": true
        },
        {
          "name": "meteoraFeeVault",
          "writable": true
        },
        {
          "name": "meteoraTokenVault",
          "writable": true
        },
        {
          "name": "meteoraFeeVaultAuthority",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeReferralVault",
      "discriminator": [
        106,
        119,
        165,
        237,
        30,
        68,
        212,
        193
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "referralVault",
          "docs": [
            "every subsequent `collect_meteora_fees` transfer into it is guaranteed to succeed."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  102,
                  101,
                  114,
                  114,
                  97,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "roomsAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeTeamGovernance",
      "discriminator": [
        232,
        247,
        145,
        62,
        99,
        173,
        91,
        159
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "team"
        },
        {
          "name": "governance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "roomsAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "owner",
          "type": "pubkey"
        },
        {
          "name": "admins",
          "type": {
            "vec": "pubkey"
          }
        }
      ]
    },
    {
      "name": "migratePumpPool",
      "discriminator": [
        224,
        239,
        90,
        233,
        231,
        188,
        197,
        147
      ],
      "accounts": [
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "roomVaultAta",
          "writable": true
        },
        {
          "name": "tokenMint",
          "writable": true
        },
        {
          "name": "pumpfunBondingCurve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  45,
                  99,
                  117,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpfunProgram"
            }
          }
        },
        {
          "name": "pumpfunAssociatedBondingCurve",
          "writable": true
        },
        {
          "name": "pumpfunAssociatedQuoteBondingCurve",
          "writable": true
        },
        {
          "name": "pumpfunGlobal",
          "address": "4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf"
        },
        {
          "name": "pumpfunProgram",
          "address": "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
        },
        {
          "name": "pumpfunEventAuthority",
          "address": "Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1"
        },
        {
          "name": "pumpfunWithdrawAuthority",
          "writable": true
        },
        {
          "name": "pumpswapProgram",
          "address": "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
        },
        {
          "name": "wsolMint",
          "address": "So11111111111111111111111111111111111111112"
        },
        {
          "name": "pumpswapEventAuthority",
          "address": "GS4CU59F31iL7aR2Q8zVS8DRrcRnXX1yjQ66TqNVQnaR"
        },
        {
          "name": "pumpswapPoolAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  45,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpfunProgram"
            }
          }
        },
        {
          "name": "pumpswapPool",
          "writable": true
        },
        {
          "name": "pumpswapPoolAuthorityMintAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "pumpswapPoolAuthority"
              },
              {
                "kind": "account",
                "path": "token2022Program"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "pumpswapPoolAuthorityWsolAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "pumpswapPoolAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "wsolMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "pumpswapAmmGlobalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpswapProgram"
            }
          }
        },
        {
          "name": "pumpswapLpMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  108,
                  112,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pumpswapPool"
              }
            ],
            "program": {
              "kind": "account",
              "path": "pumpswapProgram"
            }
          }
        },
        {
          "name": "pumpswapUserPoolTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "pumpswapPoolAuthority"
              },
              {
                "kind": "account",
                "path": "token2022Program"
              },
              {
                "kind": "account",
                "path": "pumpswapLpMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "pumpswapPoolBaseTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "pumpswapPool"
              },
              {
                "kind": "account",
                "path": "token2022Program"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "pumpswapPoolQuoteTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "pumpswapPool"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "wsolMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "pumpswapBoostVaultAuthority"
        },
        {
          "name": "pumpswapBoostVault",
          "writable": true
        },
        {
          "name": "token2022Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "rejectEscrow",
      "discriminator": [
        232,
        10,
        254,
        237,
        106,
        176,
        247,
        149
      ],
      "accounts": [
        {
          "name": "escrow",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "escrow.sender",
                "account": "escrow"
              },
              {
                "kind": "account",
                "path": "escrow.escrow_id",
                "account": "escrow"
              }
            ]
          }
        },
        {
          "name": "recipient",
          "signer": true,
          "relations": [
            "escrow"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "removeTeamMember",
      "docs": [
        "Removes one wallet from a team's live roster. Touches no room — a",
        "departing member keeps their share of every room already sealed."
      ],
      "discriminator": [
        224,
        54,
        115,
        192,
        42,
        203,
        4,
        15
      ],
      "accounts": [
        {
          "name": "team",
          "writable": true
        },
        {
          "name": "tradingLedger",
          "docs": [
            "cannot omit an initialized ledger to bypass the custody exit guard."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "const",
                "value": [
                  80,
                  117,
                  98,
                  107,
                  101,
                  121,
                  32,
                  58,
                  58,
                  10,
                  102,
                  105,
                  110,
                  100,
                  95,
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  97,
                  100,
                  100,
                  114,
                  101,
                  115,
                  115,
                  40,
                  38,
                  32,
                  91,
                  98,
                  34,
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                  34,
                  44,
                  32,
                  116,
                  101,
                  97,
                  109
                ]
              }
            ]
          }
        },
        {
          "name": "governance",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "roomsAuthority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "wallet",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "sealRoomTeam",
      "docs": [
        "Freezes this room's payout split from its team's *current* roster.",
        "One call, one transaction — the wallet list is already on chain in",
        "`team`, so there's nothing left to transmit or chunk across multiple",
        "calls the way the old `set_room_team` had to. `contribute` refuses",
        "the room until this lands."
      ],
      "discriminator": [
        10,
        2,
        223,
        165,
        175,
        203,
        126,
        226
      ],
      "accounts": [
        {
          "name": "room",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "team",
          "docs": [
            "The team this room launched under. Its *current* roster is what gets",
            "copied into `room_team` below — not a client-supplied wallet list —",
            "so the program itself, not just the backend, ties a room's split to",
            "the team it actually belongs to.",
            "",
            "No seeds/bump here: `room.team` already pins the one correct address",
            "(set once, at `create_room`), so re-deriving it from `team_id` would",
            "only re-prove what the equality constraint below already proves."
          ]
        },
        {
          "name": "roomTeam",
          "docs": [
            "`init`, not `init_if_needed`: sealing a room's team is now exactly",
            "one call, so a second attempt fails at the account-already-in-use",
            "constraint rather than needing a runtime `sealed` check."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  116,
                  101,
                  97,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true,
          "relations": [
            "room"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "swapMeteora",
      "discriminator": [
        208,
        69,
        36,
        115,
        209,
        44,
        77,
        171
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true
        },
        {
          "name": "adminWsolVault",
          "docs": [
            "Admin's WSOL vault for receiving fees"
          ],
          "writable": true
        },
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "inputTokenAccount",
          "writable": true
        },
        {
          "name": "outputTokenAccount",
          "writable": true
        },
        {
          "name": "referralTokenAccount",
          "writable": true
        },
        {
          "name": "meteoraPool",
          "writable": true
        },
        {
          "name": "meteoraPoolAuthority"
        },
        {
          "name": "meteoraTokenAMint",
          "docs": [
            "Meteora token A mint"
          ]
        },
        {
          "name": "meteoraTokenBMint",
          "docs": [
            "Meteora token B mint"
          ]
        },
        {
          "name": "meteoraTokenAVault",
          "writable": true
        },
        {
          "name": "meteoraTokenBVault",
          "writable": true
        },
        {
          "name": "meteoraEventAuthority"
        },
        {
          "name": "meteoraProgram"
        },
        {
          "name": "meteoraTokenAAccount",
          "writable": true
        },
        {
          "name": "meteoraTokenBAccount",
          "writable": true
        },
        {
          "name": "meteoraTokenAProgram"
        },
        {
          "name": "meteoraTokenBProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountIn",
          "type": "u64"
        },
        {
          "name": "minOut",
          "type": "u64"
        },
        {
          "name": "isBuy",
          "type": "bool"
        }
      ]
    },
    {
      "name": "swapPump",
      "discriminator": [
        27,
        23,
        63,
        99,
        51,
        106,
        9,
        21
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true
        },
        {
          "name": "adminWsolVault",
          "docs": [
            "Admin's WSOL vault for receiving sell fees"
          ],
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "writable": true
        },
        {
          "name": "pumpGlobalConfig"
        },
        {
          "name": "baseMint",
          "writable": true
        },
        {
          "name": "quoteMint",
          "writable": true
        },
        {
          "name": "userBaseTokenAccount",
          "writable": true
        },
        {
          "name": "userQuoteTokenAccount",
          "writable": true
        },
        {
          "name": "poolBaseTokenAccount",
          "writable": true
        },
        {
          "name": "poolQuoteTokenAccount",
          "writable": true
        },
        {
          "name": "protocolFeeRecipient"
        },
        {
          "name": "protocolFeeRecipientTokenAccount",
          "writable": true
        },
        {
          "name": "baseTokenProgram"
        },
        {
          "name": "quoteTokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                12,
                20,
                222,
                252,
                130,
                94,
                198,
                118,
                148,
                37,
                8,
                24,
                187,
                101,
                64,
                101,
                244,
                41,
                141,
                49,
                86,
                213,
                113,
                180,
                212,
                248,
                9,
                12,
                24,
                233,
                168,
                99
              ]
            }
          }
        },
        {
          "name": "program",
          "address": "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
        },
        {
          "name": "coinCreatorVaultAta",
          "writable": true
        },
        {
          "name": "coinCreatorVaultAuthority"
        },
        {
          "name": "globalVolumeAccumulator",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                12,
                20,
                222,
                252,
                130,
                94,
                198,
                118,
                148,
                37,
                8,
                24,
                187,
                101,
                64,
                101,
                244,
                41,
                141,
                49,
                86,
                213,
                113,
                180,
                212,
                248,
                9,
                12,
                24,
                233,
                168,
                99
              ]
            }
          }
        },
        {
          "name": "userVolumeAccumulator",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  118,
                  111,
                  108,
                  117,
                  109,
                  101,
                  95,
                  97,
                  99,
                  99,
                  117,
                  109,
                  117,
                  108,
                  97,
                  116,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                12,
                20,
                222,
                252,
                130,
                94,
                198,
                118,
                148,
                37,
                8,
                24,
                187,
                101,
                64,
                101,
                244,
                41,
                141,
                49,
                86,
                213,
                113,
                180,
                212,
                248,
                9,
                12,
                24,
                233,
                168,
                99
              ]
            }
          }
        },
        {
          "name": "feeConfig"
        },
        {
          "name": "feeProgram",
          "address": "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"
        },
        {
          "name": "poolV2",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  45,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "baseMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                12,
                20,
                222,
                252,
                130,
                94,
                198,
                118,
                148,
                37,
                8,
                24,
                187,
                101,
                64,
                101,
                244,
                41,
                141,
                49,
                86,
                213,
                113,
                180,
                212,
                248,
                9,
                12,
                24,
                233,
                168,
                99
              ]
            }
          }
        },
        {
          "name": "feeRecipient"
        },
        {
          "name": "feeRecipientQuoteAta",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "minOut",
          "type": "u64"
        },
        {
          "name": "isBuy",
          "type": "bool"
        }
      ]
    },
    {
      "name": "sweepReferralVault",
      "discriminator": [
        51,
        28,
        21,
        180,
        14,
        189,
        216,
        184
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "adminVault",
          "writable": true
        },
        {
          "name": "referralVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  102,
                  101,
                  114,
                  114,
                  97,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "roomsAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sweepRoomToTeamVault",
      "docs": [
        "Forwards `amount` lamports from a team_split room's own `room_vault`",
        "into its team's shared `team_vault`. Called right after",
        "`collect_pump_fees`/`collect_meteora_fees` for team_split rooms,",
        "`amount` being exactly what that sweep just collected."
      ],
      "discriminator": [
        155,
        199,
        240,
        135,
        68,
        114,
        247,
        15
      ],
      "accounts": [
        {
          "name": "room",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "roomVault",
          "docs": [
            "collection always lands here first (their on-chain \"creator\"/fee",
            "recipient was registered as this exact PDA at graduation and can't be",
            "redirected afterward), so this instruction is the forwarding step",
            "that consolidates it into the team's shared vault. It also carries",
            "operational reserves unrelated to fees (the per-contributor ATA-fee",
            "float `airdrop_tokens` spends from, the WSOL-ATA-recycling reserve",
            "`collect_pump_fees` needs) — see why `amount` is explicit, below."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "teamVault",
          "docs": [
            "`room.team` — nothing the caller chooses — and validated by hand",
            "below rather than via seeds on this account, for the same reason",
            "`claim_rewards`'s `team_vault` is: deriving one optional account's",
            "seeds from another account's `Option` field is a needless panic risk",
            "when it can just be checked with `require!` instead."
          ],
          "writable": true
        },
        {
          "name": "caller",
          "docs": [
            "Permissionless, like `collect_pump_fees`/`collect_meteora_fees`: the",
            "destination is entirely PDA-derived, so the caller's identity can't",
            "misdirect anything — they only pay the transaction fee."
          ],
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vaultAcknowledgeTrade",
      "discriminator": [
        134,
        230,
        152,
        1,
        182,
        148,
        220,
        68
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "tradingVault"
        },
        {
          "name": "trade",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  116,
                  114,
                  97,
                  100,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "indexerAuthority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vaultBuy",
      "discriminator": [
        50,
        62,
        149,
        247,
        4,
        116,
        213,
        250
      ],
      "accounts": [
        {
          "name": "access",
          "accounts": [
            {
              "name": "team",
              "writable": true,
              "relations": [
                "governance",
                "tradingVault"
              ]
            },
            {
              "name": "governance",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      101,
                      97,
                      109,
                      95,
                      103,
                      111,
                      118,
                      101,
                      114,
                      110,
                      97,
                      110,
                      99,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "tradingVault",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      114,
                      97,
                      100,
                      105,
                      110,
                      103,
                      95,
                      118,
                      97,
                      117,
                      108,
                      116
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "ledger",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      108,
                      101,
                      100,
                      103,
                      101,
                      114
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "vaultSol",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      115,
                      111,
                      108
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "actor",
              "writable": true,
              "signer": true
            },
            {
              "name": "wallet",
              "writable": true
            },
            {
              "name": "systemProgram",
              "address": "11111111111111111111111111111111"
            }
          ]
        },
        {
          "name": "trade",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  116,
                  114,
                  97,
                  100,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "access.trading_vault",
                "account": "vaultAccess"
              },
              {
                "kind": "account",
                "path": "access.trading_vault.next_trade_id",
                "account": "vaultAccess"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "route",
          "accounts": [
            {
              "name": "room",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      114,
                      111,
                      111,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "room.token_mint",
                    "account": "room"
                  }
                ]
              }
            },
            {
              "name": "vaultAuthority",
              "writable": true
            },
            {
              "name": "tokenMint"
            },
            {
              "name": "tokenAccount",
              "writable": true
            },
            {
              "name": "wsolAccount",
              "writable": true
            },
            {
              "name": "wsolMint",
              "address": "So11111111111111111111111111111111111111112"
            },
            {
              "name": "tokenProgram"
            },
            {
              "name": "wsolProgram",
              "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            },
            {
              "name": "associatedTokenProgram",
              "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
            },
            {
              "name": "roomsProgram",
              "address": "FYs1kpav5Zb8SHYGfGixmKm623ijyPB93zmV5Grooms"
            }
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "minTokensOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vaultCloseTradeAccount",
      "discriminator": [
        193,
        108,
        145,
        173,
        69,
        244,
        143,
        33
      ],
      "accounts": [
        {
          "name": "tradingVault"
        },
        {
          "name": "trade",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  116,
                  114,
                  97,
                  100,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "rentPayer",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vaultDeposit",
      "discriminator": [
        231,
        150,
        41,
        113,
        180,
        104,
        162,
        120
      ],
      "accounts": [
        {
          "name": "team",
          "writable": true,
          "relations": [
            "governance",
            "tradingVault"
          ]
        },
        {
          "name": "governance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "tradingVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "ledger",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultSol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "actor",
          "writable": true,
          "signer": true
        },
        {
          "name": "wallet",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vaultEnterPresale",
      "discriminator": [
        22,
        62,
        43,
        130,
        230,
        92,
        37,
        156
      ],
      "accounts": [
        {
          "name": "access",
          "accounts": [
            {
              "name": "team",
              "writable": true,
              "relations": [
                "governance",
                "tradingVault"
              ]
            },
            {
              "name": "governance",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      101,
                      97,
                      109,
                      95,
                      103,
                      111,
                      118,
                      101,
                      114,
                      110,
                      97,
                      110,
                      99,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "tradingVault",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      114,
                      97,
                      100,
                      105,
                      110,
                      103,
                      95,
                      118,
                      97,
                      117,
                      108,
                      116
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "ledger",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      108,
                      101,
                      100,
                      103,
                      101,
                      114
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "vaultSol",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      115,
                      111,
                      108
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "actor",
              "writable": true,
              "signer": true
            },
            {
              "name": "wallet",
              "writable": true
            },
            {
              "name": "systemProgram",
              "address": "11111111111111111111111111111111"
            }
          ]
        },
        {
          "name": "trade",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  116,
                  114,
                  97,
                  100,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "access.trading_vault",
                "account": "vaultAccess"
              },
              {
                "kind": "account",
                "path": "access.trading_vault.next_trade_id",
                "account": "vaultAccess"
              }
            ]
          }
        },
        {
          "name": "position",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "access.trading_vault",
                "account": "vaultAccess"
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "access.trading_vault",
                "account": "vaultAccess"
              }
            ]
          }
        },
        {
          "name": "roomUser",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "vaultAuthority"
              }
            ]
          }
        },
        {
          "name": "roomAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "vaultAuthority"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "roomsProgram",
          "address": "FYs1kpav5Zb8SHYGfGixmKm623ijyPB93zmV5Grooms"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vaultExit",
      "discriminator": [
        181,
        16,
        199,
        191,
        117,
        168,
        91,
        122
      ],
      "accounts": [
        {
          "name": "team",
          "writable": true,
          "relations": [
            "governance",
            "tradingVault"
          ]
        },
        {
          "name": "governance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "tradingVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "ledger",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultSol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "actor",
          "writable": true,
          "signer": true
        },
        {
          "name": "wallet",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "wallet",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "vaultInit",
      "discriminator": [
        122,
        77,
        201,
        111,
        70,
        97,
        114,
        22
      ],
      "accounts": [
        {
          "name": "team",
          "relations": [
            "governance"
          ]
        },
        {
          "name": "governance",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "tradingVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "ledger",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultSol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "governance"
          ]
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "vaultInitAutomatic",
      "discriminator": [
        182,
        148,
        230,
        255,
        89,
        93,
        110,
        5
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "team",
          "relations": [
            "governance"
          ]
        },
        {
          "name": "governance",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "tradingVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "ledger",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultSol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "vaultSell",
      "discriminator": [
        24,
        112,
        147,
        205,
        47,
        183,
        178,
        4
      ],
      "accounts": [
        {
          "name": "access",
          "accounts": [
            {
              "name": "team",
              "writable": true,
              "relations": [
                "governance",
                "tradingVault"
              ]
            },
            {
              "name": "governance",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      101,
                      97,
                      109,
                      95,
                      103,
                      111,
                      118,
                      101,
                      114,
                      110,
                      97,
                      110,
                      99,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "tradingVault",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      114,
                      97,
                      100,
                      105,
                      110,
                      103,
                      95,
                      118,
                      97,
                      117,
                      108,
                      116
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "ledger",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      108,
                      101,
                      100,
                      103,
                      101,
                      114
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "vaultSol",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      115,
                      111,
                      108
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "actor",
              "writable": true,
              "signer": true
            },
            {
              "name": "wallet",
              "writable": true
            },
            {
              "name": "systemProgram",
              "address": "11111111111111111111111111111111"
            }
          ]
        },
        {
          "name": "trade",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  116,
                  114,
                  97,
                  100,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "access.trading_vault",
                "account": "vaultAccess"
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "route",
          "accounts": [
            {
              "name": "room",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      114,
                      111,
                      111,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "room.token_mint",
                    "account": "room"
                  }
                ]
              }
            },
            {
              "name": "vaultAuthority",
              "writable": true
            },
            {
              "name": "tokenMint"
            },
            {
              "name": "tokenAccount",
              "writable": true
            },
            {
              "name": "wsolAccount",
              "writable": true
            },
            {
              "name": "wsolMint",
              "address": "So11111111111111111111111111111111111111112"
            },
            {
              "name": "tokenProgram"
            },
            {
              "name": "wsolProgram",
              "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            },
            {
              "name": "associatedTokenProgram",
              "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
            },
            {
              "name": "roomsProgram",
              "address": "FYs1kpav5Zb8SHYGfGixmKm623ijyPB93zmV5Grooms"
            }
          ]
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        },
        {
          "name": "tokenAmount",
          "type": "u64"
        },
        {
          "name": "minLamportsOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vaultSetAdmin",
      "discriminator": [
        23,
        246,
        212,
        196,
        48,
        34,
        13,
        197
      ],
      "accounts": [
        {
          "name": "team",
          "writable": true,
          "relations": [
            "governance",
            "tradingVault"
          ]
        },
        {
          "name": "governance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "tradingVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "ledger",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultSol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "actor",
          "writable": true,
          "signer": true
        },
        {
          "name": "wallet",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "wallet",
          "type": "pubkey"
        },
        {
          "name": "isAdmin",
          "type": "bool"
        }
      ]
    },
    {
      "name": "vaultSetTradeLimit",
      "discriminator": [
        225,
        244,
        124,
        165,
        137,
        172,
        128,
        101
      ],
      "accounts": [
        {
          "name": "team",
          "writable": true,
          "relations": [
            "governance",
            "tradingVault"
          ]
        },
        {
          "name": "governance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "tradingVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "ledger",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultSol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "actor",
          "writable": true,
          "signer": true
        },
        {
          "name": "wallet",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "bps",
          "type": "u16"
        }
      ]
    },
    {
      "name": "vaultSetTrader",
      "discriminator": [
        79,
        68,
        217,
        25,
        195,
        123,
        49,
        233
      ],
      "accounts": [
        {
          "name": "team",
          "writable": true,
          "relations": [
            "governance",
            "tradingVault"
          ]
        },
        {
          "name": "governance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "tradingVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "ledger",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultSol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "actor",
          "writable": true,
          "signer": true
        },
        {
          "name": "wallet",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "wallet",
          "type": "pubkey"
        },
        {
          "name": "isTrader",
          "type": "bool"
        }
      ]
    },
    {
      "name": "vaultSettlePresale",
      "discriminator": [
        69,
        81,
        180,
        221,
        57,
        244,
        74,
        3
      ],
      "accounts": [
        {
          "name": "access",
          "accounts": [
            {
              "name": "team",
              "writable": true,
              "relations": [
                "governance",
                "tradingVault"
              ]
            },
            {
              "name": "governance",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      101,
                      97,
                      109,
                      95,
                      103,
                      111,
                      118,
                      101,
                      114,
                      110,
                      97,
                      110,
                      99,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "tradingVault",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      114,
                      97,
                      100,
                      105,
                      110,
                      103,
                      95,
                      118,
                      97,
                      117,
                      108,
                      116
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "ledger",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      108,
                      101,
                      100,
                      103,
                      101,
                      114
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "vaultSol",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      115,
                      111,
                      108
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "actor",
              "writable": true,
              "signer": true
            },
            {
              "name": "wallet",
              "writable": true
            },
            {
              "name": "systemProgram",
              "address": "11111111111111111111111111111111"
            }
          ]
        },
        {
          "name": "trade",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  116,
                  114,
                  97,
                  100,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "access.trading_vault",
                "account": "vaultAccess"
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "room",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "trade.token_mint",
                "account": "vaultTrade"
              }
            ]
          }
        },
        {
          "name": "position",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "access.trading_vault",
                "account": "vaultAccess"
              },
              {
                "kind": "account",
                "path": "room"
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "access.trading_vault",
                "account": "vaultAccess"
              }
            ]
          }
        },
        {
          "name": "roomUser",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "vaultAuthority"
              }
            ]
          }
        },
        {
          "name": "tokenAccount"
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "vaultTransferOwner",
      "discriminator": [
        45,
        155,
        119,
        43,
        5,
        152,
        228,
        108
      ],
      "accounts": [
        {
          "name": "access",
          "accounts": [
            {
              "name": "team",
              "writable": true,
              "relations": [
                "governance",
                "tradingVault"
              ]
            },
            {
              "name": "governance",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      101,
                      97,
                      109,
                      95,
                      103,
                      111,
                      118,
                      101,
                      114,
                      110,
                      97,
                      110,
                      99,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "tradingVault",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      116,
                      114,
                      97,
                      100,
                      105,
                      110,
                      103,
                      95,
                      118,
                      97,
                      117,
                      108,
                      116
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "team"
                  }
                ]
              }
            },
            {
              "name": "ledger",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      108,
                      101,
                      100,
                      103,
                      101,
                      114
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "vaultSol",
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      118,
                      97,
                      117,
                      108,
                      116,
                      95,
                      115,
                      111,
                      108
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "tradingVault"
                  }
                ]
              }
            },
            {
              "name": "actor",
              "writable": true,
              "signer": true
            },
            {
              "name": "wallet",
              "writable": true
            },
            {
              "name": "systemProgram",
              "address": "11111111111111111111111111111111"
            }
          ]
        },
        {
          "name": "newOwner",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "vaultWithdraw",
      "discriminator": [
        98,
        28,
        187,
        98,
        87,
        69,
        46,
        64
      ],
      "accounts": [
        {
          "name": "team",
          "writable": true,
          "relations": [
            "governance",
            "tradingVault"
          ]
        },
        {
          "name": "governance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  101,
                  97,
                  109,
                  95,
                  103,
                  111,
                  118,
                  101,
                  114,
                  110,
                  97,
                  110,
                  99,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "tradingVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  100,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "team"
              }
            ]
          }
        },
        {
          "name": "ledger",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  108,
                  101,
                  100,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "vaultSol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "tradingVault"
              }
            ]
          }
        },
        {
          "name": "actor",
          "writable": true,
          "signer": true
        },
        {
          "name": "wallet",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "verifyAccess",
      "discriminator": [
        198,
        35,
        119,
        166,
        140,
        214,
        241,
        222
      ],
      "accounts": [
        {
          "name": "globalConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "room",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room.token_mint",
                "account": "room"
              }
            ]
          }
        },
        {
          "name": "roomAccess",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  111,
                  109,
                  95,
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "room"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "instructionSysvar",
          "address": "Sysvar1nstructions1111111111111111111111111"
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "timestamp",
          "type": "i64"
        }
      ]
    },
    {
      "name": "withdrawEscrow",
      "discriminator": [
        81,
        84,
        226,
        128,
        245,
        47,
        96,
        104
      ],
      "accounts": [
        {
          "name": "escrow",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "escrow.sender",
                "account": "escrow"
              },
              {
                "kind": "account",
                "path": "escrow.escrow_id",
                "account": "escrow"
              }
            ]
          }
        },
        {
          "name": "escrowVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "escrow"
              }
            ]
          }
        },
        {
          "name": "sender",
          "writable": true,
          "signer": true,
          "relations": [
            "escrow"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "escrow",
      "discriminator": [
        31,
        213,
        123,
        187,
        186,
        22,
        218,
        155
      ]
    },
    {
      "name": "globalConfig",
      "discriminator": [
        149,
        8,
        156,
        202,
        160,
        252,
        176,
        217
      ]
    },
    {
      "name": "referralClaim",
      "discriminator": [
        216,
        60,
        207,
        48,
        188,
        213,
        100,
        13
      ]
    },
    {
      "name": "room",
      "discriminator": [
        156,
        199,
        67,
        27,
        222,
        23,
        185,
        94
      ]
    },
    {
      "name": "roomAccess",
      "discriminator": [
        67,
        109,
        128,
        117,
        156,
        151,
        35,
        99
      ]
    },
    {
      "name": "roomTeam",
      "discriminator": [
        251,
        175,
        85,
        253,
        246,
        55,
        202,
        129
      ]
    },
    {
      "name": "roomUser",
      "discriminator": [
        239,
        106,
        103,
        202,
        65,
        40,
        157,
        62
      ]
    },
    {
      "name": "team",
      "discriminator": [
        140,
        218,
        177,
        140,
        193,
        241,
        199,
        106
      ]
    },
    {
      "name": "teamGovernance",
      "discriminator": [
        124,
        207,
        138,
        47,
        108,
        213,
        189,
        136
      ]
    },
    {
      "name": "tradingVault",
      "discriminator": [
        234,
        54,
        29,
        121,
        16,
        231,
        220,
        228
      ]
    },
    {
      "name": "vaultLedger",
      "discriminator": [
        65,
        246,
        194,
        60,
        156,
        78,
        21,
        135
      ]
    },
    {
      "name": "vaultPresalePosition",
      "discriminator": [
        223,
        131,
        243,
        50,
        147,
        141,
        208,
        8
      ]
    },
    {
      "name": "vaultTrade",
      "discriminator": [
        72,
        63,
        215,
        118,
        109,
        243,
        66,
        238
      ]
    }
  ],
  "events": [
    {
      "name": "airdrop",
      "discriminator": [
        97,
        226,
        238,
        215,
        49,
        4,
        194,
        161
      ]
    },
    {
      "name": "contributionIncreased",
      "discriminator": [
        144,
        65,
        114,
        231,
        18,
        148,
        214,
        132
      ]
    },
    {
      "name": "contributionWithdrawn",
      "discriminator": [
        124,
        236,
        51,
        5,
        29,
        2,
        142,
        62
      ]
    },
    {
      "name": "escrowApproved",
      "discriminator": [
        87,
        181,
        230,
        68,
        208,
        43,
        121,
        31
      ]
    },
    {
      "name": "escrowBegun",
      "discriminator": [
        27,
        212,
        185,
        223,
        143,
        53,
        199,
        59
      ]
    },
    {
      "name": "escrowClaimed",
      "discriminator": [
        32,
        116,
        46,
        229,
        165,
        72,
        108,
        78
      ]
    },
    {
      "name": "escrowIncreased",
      "discriminator": [
        55,
        246,
        166,
        163,
        46,
        192,
        171,
        50
      ]
    },
    {
      "name": "escrowRejected",
      "discriminator": [
        219,
        99,
        54,
        24,
        131,
        139,
        249,
        185
      ]
    },
    {
      "name": "escrowWithdrawn",
      "discriminator": [
        43,
        206,
        174,
        47,
        105,
        219,
        216,
        239
      ]
    },
    {
      "name": "feesCollected",
      "discriminator": [
        233,
        23,
        117,
        225,
        107,
        178,
        254,
        8
      ]
    },
    {
      "name": "launchFinalized",
      "discriminator": [
        133,
        100,
        148,
        180,
        31,
        64,
        210,
        203
      ]
    },
    {
      "name": "poolMigrated",
      "discriminator": [
        250,
        204,
        24,
        195,
        37,
        253,
        152,
        6
      ]
    },
    {
      "name": "referralClaimed",
      "discriminator": [
        195,
        109,
        77,
        196,
        134,
        226,
        78,
        108
      ]
    },
    {
      "name": "referralVaultCredited",
      "discriminator": [
        107,
        186,
        8,
        38,
        212,
        181,
        245,
        245
      ]
    },
    {
      "name": "rewardsClaimed",
      "discriminator": [
        75,
        98,
        88,
        18,
        219,
        112,
        88,
        121
      ]
    },
    {
      "name": "rewardsFrozen",
      "discriminator": [
        239,
        12,
        132,
        183,
        160,
        132,
        72,
        16
      ]
    },
    {
      "name": "roomCreated",
      "discriminator": [
        9,
        177,
        128,
        166,
        26,
        19,
        14,
        243
      ]
    },
    {
      "name": "roomTeamSealed",
      "discriminator": [
        199,
        177,
        210,
        5,
        221,
        117,
        42,
        94
      ]
    },
    {
      "name": "swapExecuted",
      "discriminator": [
        150,
        166,
        26,
        225,
        28,
        89,
        38,
        79
      ]
    },
    {
      "name": "teamGovernanceChanged",
      "discriminator": [
        167,
        141,
        3,
        44,
        212,
        46,
        88,
        157
      ]
    },
    {
      "name": "vaultDeposited",
      "discriminator": [
        59,
        62,
        43,
        200,
        220,
        104,
        100,
        67
      ]
    },
    {
      "name": "vaultInitialized",
      "discriminator": [
        180,
        43,
        207,
        2,
        18,
        71,
        3,
        75
      ]
    },
    {
      "name": "vaultMemberExited",
      "discriminator": [
        203,
        69,
        27,
        119,
        10,
        109,
        146,
        202
      ]
    },
    {
      "name": "vaultPresaleSettled",
      "discriminator": [
        169,
        129,
        105,
        36,
        156,
        45,
        58,
        238
      ]
    },
    {
      "name": "vaultRewardsCommitted",
      "discriminator": [
        93,
        108,
        6,
        120,
        76,
        140,
        195,
        189
      ]
    },
    {
      "name": "vaultTradeClosed",
      "discriminator": [
        182,
        35,
        155,
        30,
        194,
        255,
        179,
        192
      ]
    },
    {
      "name": "vaultTradeLimitChanged",
      "discriminator": [
        129,
        165,
        168,
        190,
        254,
        177,
        20,
        120
      ]
    },
    {
      "name": "vaultTradeOpened",
      "discriminator": [
        68,
        138,
        172,
        73,
        160,
        21,
        207,
        55
      ]
    },
    {
      "name": "vaultTradeSold",
      "discriminator": [
        130,
        77,
        60,
        191,
        239,
        137,
        205,
        137
      ]
    },
    {
      "name": "vaultTraderSet",
      "discriminator": [
        80,
        90,
        51,
        84,
        153,
        149,
        165,
        57
      ]
    },
    {
      "name": "vaultWithdrawn",
      "discriminator": [
        238,
        9,
        219,
        172,
        188,
        77,
        72,
        104
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Rooms Authority must be a signer"
    },
    {
      "code": 6001,
      "name": "unauthorizedAdmin",
      "msg": "Unauthorized Admin"
    },
    {
      "code": 6002,
      "name": "invalidAdminVault",
      "msg": "Invalid admin vault"
    },
    {
      "code": 6003,
      "name": "invalidMintAddress",
      "msg": "Invalid mint address"
    },
    {
      "code": 6004,
      "name": "minimumContribution",
      "msg": "Contribution is below the minimum required amount"
    },
    {
      "code": 6005,
      "name": "exceedsMaxContribution",
      "msg": "Contribution exceeds maximum allowed per user"
    },
    {
      "code": 6006,
      "name": "invalidRoomVault",
      "msg": "Room vault PDA does not match the expected address"
    },
    {
      "code": 6007,
      "name": "minimumWithdraw",
      "msg": "Not enough lamports to withdraw"
    },
    {
      "code": 6008,
      "name": "alreadyFinalized",
      "msg": "Already Finalized"
    },
    {
      "code": 6009,
      "name": "targetNotReached",
      "msg": "Target has not been reached"
    },
    {
      "code": 6010,
      "name": "invalidCreator",
      "msg": "Invalid Creator"
    },
    {
      "code": 6011,
      "name": "insufficientFunds",
      "msg": "Insufficient funds to cover contribution"
    },
    {
      "code": 6012,
      "name": "invalidVaultAuthority",
      "msg": "Vault authority does not match the expected address"
    },
    {
      "code": 6013,
      "name": "roomNotFinalized",
      "msg": "Room has not been finalized yet."
    },
    {
      "code": 6014,
      "name": "invalidRoomUser",
      "msg": "Invalid Room User"
    },
    {
      "code": 6015,
      "name": "alreadyClaimedAllocation",
      "msg": "Already Claimed Allocation"
    },
    {
      "code": 6016,
      "name": "invalidTokenAccount",
      "msg": "Invalid token account"
    },
    {
      "code": 6017,
      "name": "noRewardsToClaim",
      "msg": "No rewards available to claim"
    },
    {
      "code": 6018,
      "name": "mathOverflow",
      "msg": "Math overflow"
    },
    {
      "code": 6019,
      "name": "invalidAccount",
      "msg": "Invalid account"
    },
    {
      "code": 6020,
      "name": "accessSignatureRequired",
      "msg": "Access signature required for this room type"
    },
    {
      "code": 6021,
      "name": "invalidAccessSignature",
      "msg": "Invalid access signature"
    },
    {
      "code": 6022,
      "name": "accessSignatureExpired",
      "msg": "Access signature expired"
    },
    {
      "code": 6023,
      "name": "notFinalized",
      "msg": "Room must be finalized first"
    },
    {
      "code": 6024,
      "name": "invalidFeeClaimAuthority",
      "msg": "Invalid fee claim authority"
    },
    {
      "code": 6025,
      "name": "invalidClaimPayload",
      "msg": "Invalid claim payload"
    },
    {
      "code": 6026,
      "name": "invalidRoomPlatform",
      "msg": "You cannot use this instruction for this room's platform"
    },
    {
      "code": 6027,
      "name": "invalidRewardStructure",
      "msg": "Invalid reward structure for this instruction"
    },
    {
      "code": 6028,
      "name": "roomFull",
      "msg": "Room is full"
    },
    {
      "code": 6029,
      "name": "invalidRaiseAmount",
      "msg": "Invalid raise amount: must be exactly 30, 90, or 180 SOL for Rooms platform"
    },
    {
      "code": 6030,
      "name": "withdrawalsLocked",
      "msg": "Withdrawals are locked once the room target is reached"
    },
    {
      "code": 6031,
      "name": "rewardsFrozen",
      "msg": "Rewards are frozen for this user"
    },
    {
      "code": 6032,
      "name": "holdingSufficient",
      "msg": "User is holding sufficient tokens, freeze not applicable"
    },
    {
      "code": 6033,
      "name": "cannotFreezeCreator",
      "msg": "Cannot freeze creator rewards"
    },
    {
      "code": 6034,
      "name": "invalidAllocationBasisPoints",
      "msg": "Allocation basis points must be between 0 and 10000"
    },
    {
      "code": 6035,
      "name": "invalidReferralSignature",
      "msg": "Invalid referral claim signature"
    },
    {
      "code": 6036,
      "name": "referralVoucherExpired",
      "msg": "Referral claim voucher has expired"
    },
    {
      "code": 6037,
      "name": "invalidEscrowAmount",
      "msg": "Escrow amount must fund the vault's rent-exempt minimum"
    },
    {
      "code": 6038,
      "name": "invalidEscrowIncrease",
      "msg": "Escrow increase amount must be greater than zero"
    },
    {
      "code": 6039,
      "name": "invalidEscrowRecipient",
      "msg": "Escrow sender and recipient must be different"
    },
    {
      "code": 6040,
      "name": "escrowRecipientMismatch",
      "msg": "Escrow recipient does not match"
    },
    {
      "code": 6041,
      "name": "escrowNotPending",
      "msg": "Escrow is not pending"
    },
    {
      "code": 6042,
      "name": "escrowNotApproved",
      "msg": "Escrow has not been approved"
    },
    {
      "code": 6043,
      "name": "escrowAlreadyApproved",
      "msg": "Approved escrow cannot be withdrawn by the sender"
    },
    {
      "code": 6044,
      "name": "missingRoomTeam",
      "msg": "This room splits rewards with a team; its room_team account is required"
    },
    {
      "code": 6045,
      "name": "notTeamMember",
      "msg": "Signer is not a member of this room's launch team"
    },
    {
      "code": 6046,
      "name": "roomTeamNotSealed",
      "msg": "The room's team must be sealed before the room can accept contributions"
    },
    {
      "code": 6047,
      "name": "roomTeamAlreadySealed",
      "msg": "The room's team is already sealed and cannot be changed"
    },
    {
      "code": 6048,
      "name": "tooFewTeamMembers",
      "msg": "A team split needs at least 2 members"
    },
    {
      "code": 6049,
      "name": "tooManyTeamMembers",
      "msg": "Team member count exceeds the maximum a single room can split between"
    },
    {
      "code": 6050,
      "name": "teamMemberCountMismatch",
      "msg": "Team member list does not match the declared member count"
    },
    {
      "code": 6051,
      "name": "duplicateTeamMember",
      "msg": "Duplicate wallet in the team member list"
    },
    {
      "code": 6052,
      "name": "invalidTeamMember",
      "msg": "Team member wallet cannot be the default pubkey"
    },
    {
      "code": 6053,
      "name": "teamFull",
      "msg": "This team's roster is already at its maximum size"
    },
    {
      "code": 6054,
      "name": "teamMemberNotFound",
      "msg": "Wallet is not a member of this team"
    },
    {
      "code": 6055,
      "name": "invalidWithdrawAmount",
      "msg": "Withdrawal amount must be greater than zero"
    },
    {
      "code": 6056,
      "name": "withdrawExceedsContribution",
      "msg": "Withdrawal exceeds the user's contribution"
    },
    {
      "code": 6057,
      "name": "remainingBelowMinimum",
      "msg": "Remaining contribution is below the room minimum"
    },
    {
      "code": 6058,
      "name": "notTrader",
      "msg": "Only vault traders may do this"
    },
    {
      "code": 6059,
      "name": "notOwner",
      "msg": "Only the team owner may do this"
    },
    {
      "code": 6060,
      "name": "tradeLimitOutOfRange",
      "msg": "Trade limit must be 100 to 5000 bps"
    },
    {
      "code": 6061,
      "name": "overTradeLimit",
      "msg": "Trade exceeds the execution-time vault limit"
    },
    {
      "code": 6062,
      "name": "noFreeMoney",
      "msg": "No free money available"
    },
    {
      "code": 6063,
      "name": "insufficientFree",
      "msg": "Insufficient personal free balance"
    },
    {
      "code": 6064,
      "name": "tradersFull",
      "msg": "No available trader slots"
    },
    {
      "code": 6065,
      "name": "maxOpenTrades",
      "msg": "Close a trade before opening another"
    },
    {
      "code": 6066,
      "name": "traderInOpenTrades",
      "msg": "Trader owns an open trade"
    },
    {
      "code": 6067,
      "name": "memberHasOpenTrades",
      "msg": "Member owns an open trade"
    },
    {
      "code": 6068,
      "name": "tradeNotOpen",
      "msg": "Trade is not open"
    },
    {
      "code": 6069,
      "name": "sellForbidden",
      "msg": "Only the opener while a trader or owner may sell"
    },
    {
      "code": 6070,
      "name": "slippageExceeded",
      "msg": "Output below the signed minimum"
    },
    {
      "code": 6071,
      "name": "routeNotAllowed",
      "msg": "Route is not allowed"
    },
    {
      "code": 6072,
      "name": "vaultInvariant",
      "msg": "Trading vault invariant violated"
    },
    {
      "code": 6073,
      "name": "tradeNotIndexed",
      "msg": "Closed trade has not been acknowledged by the indexer"
    },
    {
      "code": 6074,
      "name": "presaleNotReady",
      "msg": "Presale has not completed allocation or refund"
    },
    {
      "code": 6075,
      "name": "ownerMustTransfer",
      "msg": "Owner must transfer ownership before exiting"
    }
  ],
  "types": [
    {
      "name": "airdrop",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "lamportsClaimed",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "contributionIncreased",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "lamportsAdded",
            "type": "u64"
          },
          {
            "name": "currentContribution",
            "type": "u64"
          },
          {
            "name": "targetMet",
            "type": "bool"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "users",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "contributionWithdrawn",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "lamportsWithdrawn",
            "type": "u64"
          },
          {
            "name": "currentContribution",
            "type": "u64"
          },
          {
            "name": "targetMet",
            "type": "bool"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "users",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "escrow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sender",
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "escrowId",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "escrowStatus"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "escrowApproved",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "escrowBegun",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow",
            "type": "pubkey"
          },
          {
            "name": "sender",
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "escrowId",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "escrowClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow",
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "escrowIncreased",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow",
            "type": "pubkey"
          },
          {
            "name": "sender",
            "type": "pubkey"
          },
          {
            "name": "amountAdded",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "escrowRejected",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "escrowStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pending"
          },
          {
            "name": "approved"
          },
          {
            "name": "rejected"
          }
        ]
      }
    },
    {
      "name": "escrowWithdrawn",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrow",
            "type": "pubkey"
          },
          {
            "name": "sender",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "feesCollected",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "lamportsCollected",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "globalConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminVault",
            "type": "pubkey"
          },
          {
            "name": "adminWsolVault",
            "type": "pubkey"
          },
          {
            "name": "roomsAuthority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "launchFinalized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "room",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "poolMigrated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "room",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "bondingCurve",
            "type": "pubkey"
          },
          {
            "name": "poolAddress",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "referralClaim",
      "docs": [
        "Tracks lifetime referral SOL claimed by a single user, across all rooms.",
        "`claimed` is compared against the `cumulative_earned` figure in each signed",
        "voucher so that resubmitting the same (or a stale) voucher pays out zero."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "claimed",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "referralClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "lamports",
            "type": "u64"
          },
          {
            "name": "cumulativeEarned",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "referralVaultCredited",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "lamports",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "rewardStructure",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "equal"
          },
          {
            "name": "creator"
          },
          {
            "name": "custom"
          },
          {
            "name": "team"
          }
        ]
      }
    },
    {
      "name": "rewardsClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "lamportsClaimed",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "rewardsFrozen",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "frozenAtAccumulator",
            "type": "u128"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "room",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "roomType",
            "type": {
              "defined": {
                "name": "roomType"
              }
            }
          },
          {
            "name": "platform",
            "type": {
              "defined": {
                "name": "roomPlatform"
              }
            }
          },
          {
            "name": "rewardStructure",
            "type": {
              "defined": {
                "name": "rewardStructure"
              }
            }
          },
          {
            "name": "maxContribution",
            "type": "u64"
          },
          {
            "name": "minContribution",
            "type": "u64"
          },
          {
            "name": "metadataUri",
            "type": "string"
          },
          {
            "name": "systemBuyLamports",
            "type": "u64"
          },
          {
            "name": "targetLamports",
            "type": "u64"
          },
          {
            "name": "raisedLamports",
            "type": "u64"
          },
          {
            "name": "users",
            "type": "u16"
          },
          {
            "name": "finalized",
            "type": "bool"
          },
          {
            "name": "tokenAllocation",
            "type": "u64"
          },
          {
            "name": "treasuryFeeAccumulator",
            "type": "u128"
          },
          {
            "name": "frozenContributionLamports",
            "docs": [
              "Sum of lamports_contributed for all frozen users (Equal rooms only).",
              "Excluded from the fee distribution denominator so their share is",
              "redistributed to active participants on each fee collection."
            ],
            "type": "u64"
          },
          {
            "name": "rewardWallet",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "team",
            "docs": [
              "The launching team's persistent on-chain account, set once at",
              "creation when `reward_structure == Team`. `None` for every other",
              "room. This is what lets `seal_room_team`, `claim_rewards` and",
              "`sweep_room_to_team_vault` derive `team_vault` and prove the",
              "room-to-team link on chain, instead of trusting a client-supplied",
              "team identity."
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "roomAccess",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "room",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "verifiedAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "roomCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "room",
            "type": "pubkey"
          },
          {
            "name": "platform",
            "type": {
              "defined": {
                "name": "roomPlatform"
              }
            }
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "metadataUri",
            "type": "string"
          },
          {
            "name": "targetLamports",
            "type": "u64"
          },
          {
            "name": "systemBuyLamports",
            "type": "u64"
          },
          {
            "name": "maxContribution",
            "type": "u64"
          },
          {
            "name": "minContribution",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "roomPlatform",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pumpFun"
          },
          {
            "name": "rooms"
          }
        ]
      }
    },
    {
      "name": "roomTeam",
      "docs": [
        "The immutable payout list for a `RewardStructure::Team` room.",
        "",
        "One per room (the room's address is in the seed), written before the room",
        "can take a single lamport, and never touched again once sealed. Teams churn",
        "off-chain; this is the snapshot of who launched *this* room.",
        "",
        "No `InitSpace`/`#[max_len]`: `members` is sized from the persistent team's",
        "current roster when `seal_room_team` creates this account, so rent tracks",
        "the snapshot's real size."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "room",
            "type": "pubkey"
          },
          {
            "name": "expectedMembers",
            "docs": [
              "Member count copied atomically from the persistent team roster."
            ],
            "type": "u16"
          },
          {
            "name": "sealed",
            "docs": [
              "Contributions are refused until this is true. Write-once."
            ],
            "type": "bool"
          },
          {
            "name": "members",
            "docs": [
              "Weights sum to exactly 10_000 once sealed."
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "teamShare"
                }
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "roomTeamSealed",
      "docs": [
        "Emitted when a room's team payout list is finalized.",
        "",
        "Deliberately carries only the COUNT, not the member list. Serializing two",
        "more vectors here was the single largest heap allocation in the sealing",
        "call, and it cost about 80 members of headroom: with the lists included the",
        "program ran out of the 32KB BPF heap at ~120 members, and without them it",
        "seals 200+ on the default heap. The list is recoverable from the RoomTeam",
        "account at any time, so nothing is lost but a round trip nobody makes — the",
        "backend reconciles from the account and skips this event's payload entirely."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "room",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "memberCount",
            "type": "u16"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "roomType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "open"
          },
          {
            "name": "accessCode"
          },
          {
            "name": "riddle"
          },
          {
            "name": "approval"
          }
        ]
      }
    },
    {
      "name": "roomUser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "authorized",
            "type": "bool"
          },
          {
            "name": "lamportsContributed",
            "type": "u64"
          },
          {
            "name": "claimedAllocationAmount",
            "type": "u64"
          },
          {
            "name": "treasuryFeeCheckpoint",
            "type": "u128"
          },
          {
            "name": "treasuryFeeClaimed",
            "type": "u64"
          },
          {
            "name": "rewardsFrozen",
            "type": "bool"
          },
          {
            "name": "frozenAtAccumulator",
            "type": "u128"
          },
          {
            "name": "claimedBasisPoints",
            "docs": [
              "Cumulative vesting-level target (basis points, 0-10000) already",
              "fulfilled by `airdrop_tokens`. Lets callers pass the target level as a",
              "cumulative value instead of a per-call increment, making retries of a",
              "lost/ambiguous `airdrop_tokens` confirmation a harmless no-op."
            ],
            "type": "u16"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "swapExecuted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          },
          {
            "name": "isBuy",
            "type": "bool"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "team",
      "docs": [
        "The persistent, mutable roster of a team — one per team, not one per room.",
        "",
        "Unlike `RoomTeam` (a per-room, write-once snapshot), `Team` is meant to",
        "change over time: members join and leave, and every future room the team",
        "launches reads this account's *current* contents at seal time to build",
        "its own `RoomTeam` snapshot. A room's own payout split, once sealed, is",
        "still never retroactively affected by later changes here — only new",
        "rooms see them.",
        "",
        "Seeds: `[b\"team\", team_id]`. `team_id` is the backend's own team",
        "identifier (16 raw bytes — a UUID), so both the backend and any client",
        "can derive this account's address deterministically with no RPC read.",
        "",
        "Fixed capacity (`MAX_TEAM_MEMBERS`), allocated once at creation, rather",
        "than `realloc`-based growth: this account is reused indefinitely, so its",
        "size can't be redeclared per call the way a `RoomTeam`'s can."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "teamId",
            "docs": [
              "Redundant with the seed, matching `RoomTeam.room`'s existing",
              "defense-in-depth pattern: a caller-supplied `Team` account still has",
              "to carry the identity it claims."
            ],
            "type": {
              "array": [
                "u8",
                16
              ]
            }
          },
          {
            "name": "authority",
            "docs": [
              "The signer allowed to call `add_team_member`/`remove_team_member`.",
              "Always `global_config.rooms_authority` today — kept as its own field",
              "(rather than re-reading `GlobalConfig` in every mutating instruction)",
              "so authority checks are a single equality against this account."
            ],
            "type": "pubkey"
          },
          {
            "name": "memberCount",
            "type": "u16"
          },
          {
            "name": "members",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "teamGovernance",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "admins",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "teamGovernanceChanged",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "admins",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "teamShare",
      "docs": [
        "One wallet's share of a team-split room's trading fees.",
        "",
        "`weight_bps` is written at seal time, not on append: an even split is",
        "`10_000 / n`, so no weight can be assigned until `n` is final."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "weightBps",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "traderSlot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "isTrader",
            "type": "bool"
          },
          {
            "name": "free",
            "type": "u64"
          },
          {
            "name": "openTrades",
            "type": "u16"
          },
          {
            "name": "depositedTotal",
            "type": "u64"
          },
          {
            "name": "withdrawnTotal",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "tradingVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "tradeLimitBps",
            "type": "u16"
          },
          {
            "name": "freeTotal",
            "type": "u64"
          },
          {
            "name": "openTradeCount",
            "type": "u16"
          },
          {
            "name": "nextTradeId",
            "type": "u64"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "solBump",
            "type": "u8"
          },
          {
            "name": "authorityBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultDeposited",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "slot",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "freeAfter",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "teamId",
            "type": {
              "array": [
                "u8",
                16
              ]
            }
          },
          {
            "name": "admins",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "vaultLedger",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "slots",
            "type": {
              "vec": {
                "defined": {
                  "name": "traderSlot"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "vaultMemberExited",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "slot",
            "type": "u8"
          },
          {
            "name": "payout",
            "type": "u64"
          },
          {
            "name": "by",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultPart",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "lamports",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultPresalePosition",
      "docs": [
        "One pending presale per room/vault prevents an aggregate RoomUser's later",
        "allocations from being attributed to a different set of owners (R6/R14)."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "room",
            "type": "pubkey"
          },
          {
            "name": "tradeId",
            "type": "u64"
          },
          {
            "name": "settled",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultPresaleSettled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "tradeId",
            "type": "u64"
          },
          {
            "name": "launched",
            "type": "bool"
          },
          {
            "name": "tokensAcquired",
            "type": "u64"
          },
          {
            "name": "refund",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultRewardsCommitted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "slot",
            "type": "u8"
          },
          {
            "name": "room",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "freeAfter",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultTrade",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "tradeId",
            "type": "u64"
          },
          {
            "name": "openedBy",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "kind",
            "type": {
              "defined": {
                "name": "vaultTradeKind"
              }
            }
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "vaultTradeStatus"
              }
            }
          },
          {
            "name": "cost",
            "type": "u64"
          },
          {
            "name": "tokensAcquired",
            "type": "u64"
          },
          {
            "name": "tokensRemaining",
            "type": "u64"
          },
          {
            "name": "proceedsTotal",
            "type": "u64"
          },
          {
            "name": "parts",
            "type": {
              "array": [
                "u64",
                50
              ]
            }
          },
          {
            "name": "openedAt",
            "type": "i64"
          },
          {
            "name": "closedAt",
            "type": "i64"
          },
          {
            "name": "rentPayer",
            "type": "pubkey"
          },
          {
            "name": "indexed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultTradeClosed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "tradeId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultTradeKind",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "buy"
          },
          {
            "name": "presale"
          }
        ]
      }
    },
    {
      "name": "vaultTradeLimitChanged",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "oldBps",
            "type": "u16"
          },
          {
            "name": "newBps",
            "type": "u16"
          },
          {
            "name": "by",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultTradeOpened",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "tradeId",
            "type": "u64"
          },
          {
            "name": "kind",
            "type": {
              "defined": {
                "name": "vaultTradeKind"
              }
            }
          },
          {
            "name": "openedBy",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "cost",
            "type": "u64"
          },
          {
            "name": "tokensAcquired",
            "type": "u64"
          },
          {
            "name": "parts",
            "type": {
              "vec": {
                "defined": {
                  "name": "vaultPart"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "vaultTradeSold",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "tradeId",
            "type": "u64"
          },
          {
            "name": "by",
            "type": "pubkey"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "proceeds",
            "type": "u64"
          },
          {
            "name": "shares",
            "type": {
              "vec": {
                "defined": {
                  "name": "vaultPart"
                }
              }
            }
          },
          {
            "name": "tokensRemaining",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultTradeStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "open"
          },
          {
            "name": "presalePending"
          },
          {
            "name": "closed"
          }
        ]
      }
    },
    {
      "name": "vaultTraderSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "slot",
            "type": "u8"
          },
          {
            "name": "isTrader",
            "type": "bool"
          },
          {
            "name": "by",
            "type": "pubkey"
          },
          {
            "name": "payout",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultWithdrawn",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingVault",
            "type": "pubkey"
          },
          {
            "name": "team",
            "type": "pubkey"
          },
          {
            "name": "revision",
            "type": "u64"
          },
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "slot",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "freeAfter",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
