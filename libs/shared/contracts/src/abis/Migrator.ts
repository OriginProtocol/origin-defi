export const MigratorABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_ogv',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_ogn',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_ogvStaking',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_ognStaking',
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
        name: 'expectedOGN',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'availableOGN',
        type: 'uint256',
      },
    ],
    type: 'error',
    name: 'ContractInsolvent',
  },
  {
    inputs: [],
    type: 'error',
    name: 'InvalidStakeAmount',
  },
  {
    inputs: [],
    type: 'error',
    name: 'LockupIdsRequired',
  },
  {
    inputs: [],
    type: 'error',
    name: 'MigrationAlreadyStarted',
  },
  {
    inputs: [],
    type: 'event',
    name: 'Decommissioned',
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
    name: 'GovernorshipTransferred',
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
        internalType: 'uint256[]',
        name: 'ogvLockupIds',
        type: 'uint256[]',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'newStakeAmount',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'newDuration',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'LockupsMigrated',
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
        name: 'ogvAmountIn',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'ognAmountOut',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'TokenExchanged',
    anonymous: false,
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'CONVERSION_RATE',
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
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'claimGovernance',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'endTime',
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
    name: 'isMigrationActive',
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
        name: 'ogvAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'migrate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'ognReceived',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'lockupIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'ogvAmountFromWallet',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'ognAmountFromWallet',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'migrateRewards',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'newStakeAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'newStakeDuration',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'migrate',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'ogn',
    outputs: [
      {
        internalType: 'contract ERC20Burnable',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'ognStaking',
    outputs: [
      {
        internalType: 'contract IStaking',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'ogv',
    outputs: [
      {
        internalType: 'contract ERC20Burnable',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'ogvStaking',
    outputs: [
      {
        internalType: 'contract IStaking',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'start',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'treasury',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transferExcessTokens',
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
