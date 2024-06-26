// DO NOT EDIT - GENERATED
export const WOETHCCIPZapperABI = [
  {
    inputs: [
      { internalType: 'address', name: '_ccipRouter', type: 'address' },
      {
        internalType: 'uint64',
        name: '_destinationChainSelector',
        type: 'uint64',
      },
      {
        internalType: 'contract IERC4626',
        name: '_woethOnSourceChain',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_woethOnDestinationChain',
        type: 'address',
      },
      {
        internalType: 'contract IOETHZapper',
        name: '_oethZapper',
        type: 'address',
      },
      { internalType: 'contract IERC20', name: '_oeth', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'AmountLessThanFee', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
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
    inputs: [],
    name: 'ccipRouter',
    outputs: [
      { internalType: 'contract IRouterClient', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'destinationChainSelector',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
    ],
    name: 'getFee',
    outputs: [{ internalType: 'uint256', name: 'feeAmount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oeth',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oethZapper',
    outputs: [
      { internalType: 'contract IOETHZapper', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'woethOnDestinationChain',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'woethOnSourceChain',
    outputs: [{ internalType: 'contract IERC4626', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }],
    name: 'zap',
    outputs: [{ internalType: 'bytes32', name: 'messageId', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
] as const;
