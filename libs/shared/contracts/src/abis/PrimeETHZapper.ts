export const PrimeETHZapperABI = [
  {
    inputs: [
      { internalType: 'address', name: '_primeEth', type: 'address' },
      { internalType: 'address', name: '_lrtDepositPool', type: 'address' },
      { internalType: 'address', name: '_weth', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'minter',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Zap',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'minPrimeEth', type: 'uint256' },
      { internalType: 'string', name: 'referralId', type: 'string' },
    ],
    name: 'deposit',
    outputs: [
      { internalType: 'uint256', name: 'primeEthAmount', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lrtDepositPool',
    outputs: [
      { internalType: 'contract ILRTDepositPool', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'primeEth',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'weth',
    outputs: [{ internalType: 'contract IWETH', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
] as const;
