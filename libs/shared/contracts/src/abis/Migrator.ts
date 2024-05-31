export const MigratorABI = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_ogv',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_ogn',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_ogvStaking',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_ognStaking',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'CONVERSION_RATE',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
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
    name: 'endTime',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
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
    name: 'isMigrationActive',
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
    name: 'migrate',
    inputs: [
      {
        name: 'ogvAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'ognReceived',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'migrate',
    inputs: [
      {
        name: 'lockupIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'ogvAmountFromWallet',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'ognAmountFromWallet',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'migrateRewards',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'newStakeAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'newStakeDuration',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'ogn',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract ERC20Burnable',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ognStaking',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IStaking',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ogv',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract ERC20Burnable',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ogvStaking',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IStaking',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'start',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferExcessTokens',
    inputs: [
      {
        name: 'treasury',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'Decommissioned',
    inputs: [],
    anonymous: false,
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
    name: 'LockupsMigrated',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'ogvLockupIds',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'newStakeAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newDuration',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
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
    name: 'TokenExchanged',
    inputs: [
      {
        name: 'ogvAmountIn',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'ognAmountOut',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'ContractInsolvent',
    inputs: [
      {
        name: 'expectedOGN',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'availableOGN',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidStakeAmount',
    inputs: [],
  },
  {
    type: 'error',
    name: 'LockupIdsRequired',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MigrationAlreadyStarted',
    inputs: [],
  },
] as const;
