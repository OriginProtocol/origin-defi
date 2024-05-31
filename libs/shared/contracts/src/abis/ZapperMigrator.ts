export const ZapperMigratorABI = [
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
        name: '_migrator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_ognStaking',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_governor',
        type: 'address',
        internalType: 'address',
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
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
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
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'migrator',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IMigrator',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ogn',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IMintableERC20',
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
        internalType: 'contract IMintableERC20',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferTokens',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    name: 'NotGovernor',
    inputs: [],
  },
] as const;
