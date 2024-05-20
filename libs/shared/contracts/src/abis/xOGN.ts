export const xOGNABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epoch_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minStakeDuration_',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'rewardsSource_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
    ],
    type: 'error',
    name: 'PRBMathUD60x18__Exp2InputTooBig',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
    ],
    type: 'error',
    name: 'PRBMathUD60x18__LogInputTooSmall',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'prod1',
        type: 'uint256',
      },
    ],
    type: 'error',
    name: 'PRBMath__MulDivFixedPointOverflow',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'Approval',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'delegator',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'fromDelegate',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'toDelegate',
        type: 'address',
        indexed: true,
      },
    ],
    type: 'event',
    name: 'DelegateChanged',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'delegate',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'previousBalance',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'newBalance',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'DelegateVotesChanged',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'Penalty',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'Reward',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'lockupId',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'points',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'Stake',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'Transfer',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'lockupId',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'points',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'Unstake',
    anonymous: false,
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'accRewardPerShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'asset',
    outputs: [
      {
        internalType: 'contract ERC20',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'pos',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'checkpoints',
    outputs: [
      {
        internalType: 'struct ERC20Votes.Checkpoint',
        name: '',
        type: 'tuple',
        components: [
          {
            internalType: 'uint32',
            name: 'fromBlock',
            type: 'uint32',
          },
          {
            internalType: 'uint224',
            name: 'votes',
            type: 'uint224',
          },
        ],
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'collectRewards',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'delegatee',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'delegate',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'delegatee',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'expiry',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'delegateBySig',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'delegates',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'epoch',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'getPastTotalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'getPastVotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'getVotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'lockups',
    outputs: [
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'end',
        type: 'uint128',
      },
      {
        internalType: 'uint256',
        name: 'points',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'lockupsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'maxStakeDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'minStakeDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'pure',
    type: 'function',
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'numCheckpoints',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'permit',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'previewPoints',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'previewRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'previewWithdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'rewardDebtPerShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'rewardsSource',
    outputs: [
      {
        internalType: 'contract RewardsSource',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'duration',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'stakeRewards',
        type: 'bool',
      },
      {
        internalType: 'int256',
        name: 'lockupId',
        type: 'int256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'stake',
  },
  {
    inputs: [],
    stateMutability: 'pure',
    type: 'function',
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lockupId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'unstake',
  },
];
