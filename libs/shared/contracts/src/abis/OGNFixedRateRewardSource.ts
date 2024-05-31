export const OGNFixedRateRewardSourceABI = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_rewardToken',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'claimGovernance',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'collectRewards',
    inputs: [],
    outputs: [
      {
        name: 'rewardAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'governor',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: '_strategistAddr',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_rewardsTarget',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_rewardsPerSecond',
        type: 'uint192',
        internalType: 'uint192',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isGovernor',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewRewards',
    inputs: [],
    outputs: [
      {
        name: 'rewardAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'rewardConfig',
    inputs: [],
    outputs: [
      {
        name: 'lastCollect',
        type: 'uint64',
        internalType: 'uint64',
      },
      {
        name: 'rewardsPerSecond',
        type: 'uint192',
        internalType: 'uint192',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'rewardToken',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'rewardsTarget',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setRewardsPerSecond',
    inputs: [
      {
        name: '_rewardsPerSecond',
        type: 'uint192',
        internalType: 'uint192',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setRewardsTarget',
    inputs: [
      {
        name: '_rewardsTarget',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setStrategistAddr',
    inputs: [
      {
        name: '_address',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'strategistAddr',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferGovernance',
    inputs: [
      {
        name: '_newGovernor',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'GovernorshipTransferred',
    inputs: [
      {
        name: 'previousGovernor',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newGovernor',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PendingGovernorshipTransfer',
    inputs: [
      {
        name: 'previousGovernor',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newGovernor',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RewardCollected',
    inputs: [
      {
        name: 'amountCollected',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RewardsPerSecondChanged',
    inputs: [
      {
        name: 'newRPS',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'oldRPS',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RewardsTargetChange',
    inputs: [
      {
        name: 'target',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'previousTarget',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StrategistUpdated',
    inputs: [
      {
        name: '_address',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'InvalidRewardRate',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UnauthorizedCaller',
    inputs: [],
  },
] as const;
