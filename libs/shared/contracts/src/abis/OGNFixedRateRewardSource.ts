export const OGNFixedRateRewardSourceABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_rewardToken',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    type: 'error',
    name: 'InvalidRewardRate',
  },
  {
    inputs: [],
    type: 'error',
    name: 'UnauthorizedCaller',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'previousGovernor',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'newGovernor',
        type: 'address',
        indexed: true,
      },
    ],
    type: 'event',
    name: 'GovernorshipTransferred',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'previousGovernor',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'newGovernor',
        type: 'address',
        indexed: true,
      },
    ],
    type: 'event',
    name: 'PendingGovernorshipTransfer',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountCollected',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'RewardCollected',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newRPS',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'oldRPS',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'RewardsPerSecondChanged',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
        indexed: false,
      },
      {
        internalType: 'address',
        name: 'previousTarget',
        type: 'address',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'RewardsTargetChange',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'StrategistUpdated',
    anonymous: false,
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'claimGovernance',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'collectRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'governor',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_strategistAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_rewardsTarget',
        type: 'address',
      },
      {
        internalType: 'uint192',
        name: '_rewardsPerSecond',
        type: 'uint192',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'initialize',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'isGovernor',
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
    name: 'previewRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'rewardConfig',
    outputs: [
      {
        internalType: 'uint64',
        name: 'lastCollect',
        type: 'uint64',
      },
      {
        internalType: 'uint192',
        name: 'rewardsPerSecond',
        type: 'uint192',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'rewardToken',
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
    name: 'rewardsTarget',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint192',
        name: '_rewardsPerSecond',
        type: 'uint192',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setRewardsPerSecond',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_rewardsTarget',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setRewardsTarget',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setStrategistAddr',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'strategistAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newGovernor',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transferGovernance',
  },
] as const;
