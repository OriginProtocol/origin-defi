export const LrtDepositPoolABI = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_weth',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_withdrawAsset',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'LST_NDC_INDEX',
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
    name: 'WETH',
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
    name: 'WITHDRAW_ASSET',
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
    name: 'addNodeDelegatorContractToQueue',
    inputs: [
      {
        name: 'nodeDelegatorContracts',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'claimWithdrawal',
    inputs: [
      {
        name: 'withdrawal',
        type: 'tuple',
        internalType: 'struct IDelegationManager.Withdrawal',
        components: [
          {
            name: 'staker',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'delegatedTo',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'withdrawer',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'nonce',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'startBlock',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'strategies',
            type: 'address[]',
            internalType: 'contract IStrategy[]',
          },
          {
            name: 'shares',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositAsset',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'depositAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'minPrimeETH',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'referralId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getAssetCurrentLimit',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
    ],
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
    name: 'getAssetDistributionData',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'depositPoolAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'ndcAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'eigenAssets',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMintAmount',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'primeEthAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getNodeDelegatorQueue',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getSwapAssetReturnAmount',
    inputs: [
      {
        name: 'fromAsset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'toAsset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'fromAssetAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'returnAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTotalAssetDeposits',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'totalAssetDeposit',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: 'lrtConfigAddr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isNodeDelegator',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
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
    name: 'lrtConfig',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract ILRTConfig',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxNodeDelegatorLimit',
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
    name: 'minAmountToDeposit',
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
    name: 'nodeDelegatorQueue',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
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
    name: 'optIn',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'pause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'paused',
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
    name: 'removeManyNodeDelegatorContractsFromQueue',
    inputs: [
      {
        name: 'nodeDelegatorContracts',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeNodeDelegatorContractFromQueue',
    inputs: [
      {
        name: 'nodeDelegatorAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'requestWithdrawal',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'assetAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'maxPrimeETH',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'primeETHAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMinAmountToDeposit',
    inputs: [
      {
        name: 'minAmountToDeposit_',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'swapAssetWithinDepositPool',
    inputs: [
      {
        name: 'fromAsset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'toAsset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'fromAssetAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'minToAssetAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferAssetToNodeDelegator',
    inputs: [
      {
        name: 'ndcIndex',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'asset',
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
    type: 'function',
    name: 'transferAssetsToNodeDelegator',
    inputs: [
      {
        name: 'ndcIndex',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'assets',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'unpause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateLRTConfig',
    inputs: [
      {
        name: 'lrtConfigAddr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateMaxNodeDelegatorLimit',
    inputs: [
      {
        name: 'maxNodeDelegatorLimit_',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'AssetDeposit',
    inputs: [
      {
        name: 'depositor',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'depositAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'primeEthMintAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'referralId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'AssetSwapped',
    inputs: [
      {
        name: 'fromAsset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'toAsset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'fromAssetAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'toAssetAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ETHDeposit',
    inputs: [
      {
        name: 'depositor',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'depositAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'primeEthMintAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'referralId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MaxNodeDelegatorLimitUpdated',
    inputs: [
      {
        name: 'maxNodeDelegatorLimit',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MinAmountToDepositUpdated',
    inputs: [
      {
        name: 'minAmountToDeposit',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NodeDelegatorAddedInQueue',
    inputs: [
      {
        name: 'nodeDelegatorContracts',
        type: 'address[]',
        indexed: false,
        internalType: 'address[]',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NodeDelegatorRemovedFromQueue',
    inputs: [
      {
        name: 'nodeDelegatorContracts',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Paused',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Unpaused',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UpdatedLRTConfig',
    inputs: [
      {
        name: 'lrtConfig',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'WithdrawalClaimed',
    inputs: [
      {
        name: 'withdrawer',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'WithdrawalRequested',
    inputs: [
      {
        name: 'withdrawer',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'strategy',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'primeETHAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'assetAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'sharesAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AssetNotSupported',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CallerNotLRTConfigAdmin',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CallerNotLRTConfigManager',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CallerNotLRTConfigOperator',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidAmountToDeposit',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidMaximumNodeDelegatorLimit',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MaxBurnAmount',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MaximumDepositLimitReached',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MaximumNodeDelegatorLimitReached',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MinimumAmountToReceiveNotMet',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NodeDelegatorHasAssetBalance',
    inputs: [
      {
        name: 'assetAddress',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'assetBalance',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'NodeDelegatorNotFound',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughAssetToTransfer',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotWithdrawAsset',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TokenTransferFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ZeroAddressNotAllowed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ZeroAmount',
    inputs: [],
  },
] as const;
