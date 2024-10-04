export const ARMPoolControllerABI = [
  {
    inputs: [{ internalType: 'address', name: '_arm', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'InvalidInitialization', type: 'error' },
  { inputs: [], name: 'NotInitializing', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'bool', name: 'enabled', type: 'bool' },
    ],
    name: 'AccountCapEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'liquidityProvider',
        type: 'address',
      },
      { indexed: false, internalType: 'uint256', name: 'cap', type: 'uint256' },
    ],
    name: 'LiquidityProviderCap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'OperatorChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'cap', type: 'uint256' },
    ],
    name: 'TotalAssetsCap',
    type: 'event',
  },
  {
    inputs: [],
    name: 'accountCapEnabled',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'arm',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_operator', type: 'address' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'liquidityProvider', type: 'address' },
    ],
    name: 'liquidityProviderCaps',
    outputs: [{ internalType: 'uint256', name: 'cap', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operator',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'liquidityProvider', type: 'address' },
      { internalType: 'uint256', name: 'assets', type: 'uint256' },
    ],
    name: 'postDepositHook',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: '_accountCapEnabled', type: 'bool' },
    ],
    name: 'setAccountCapEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_liquidityProviders',
        type: 'address[]',
      },
      { internalType: 'uint256', name: 'cap', type: 'uint256' },
    ],
    name: 'setLiquidityProviderCaps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOperator', type: 'address' }],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint248', name: '_totalAssetsCap', type: 'uint248' },
    ],
    name: 'setTotalAssetsCap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalAssetsCap',
    outputs: [{ internalType: 'uint248', name: '', type: 'uint248' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
