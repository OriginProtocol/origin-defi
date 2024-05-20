export const xOGNGovernanceABI = [
  {
    inputs: [
      {
        internalType: 'contract ERC20Votes',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'contract TimelockController',
        name: '_timelock',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    type: 'error',
    name: 'Empty',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'oldVoteExtension',
        type: 'uint64',
        indexed: false,
      },
      {
        internalType: 'uint64',
        name: 'newVoteExtension',
        type: 'uint64',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'LateQuorumVoteExtensionSet',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'ProposalCanceled',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'address',
        name: 'proposer',
        type: 'address',
        indexed: false,
      },
      {
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
        indexed: false,
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
        indexed: false,
      },
      {
        internalType: 'string[]',
        name: 'signatures',
        type: 'string[]',
        indexed: false,
      },
      {
        internalType: 'bytes[]',
        name: 'calldatas',
        type: 'bytes[]',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'startBlock',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'endBlock',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'ProposalCreated',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'ProposalExecuted',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
        indexed: true,
      },
      {
        internalType: 'uint64',
        name: 'extendedDeadline',
        type: 'uint64',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'ProposalExtended',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'eta',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'ProposalQueued',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'oldProposalThreshold',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'newProposalThreshold',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'ProposalThresholdSet',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'oldQuorumNumerator',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'newQuorumNumerator',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'QuorumNumeratorUpdated',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'oldTimelock',
        type: 'address',
        indexed: false,
      },
      {
        internalType: 'address',
        name: 'newTimelock',
        type: 'address',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'TimelockChange',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint8',
        name: 'support',
        type: 'uint8',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'VoteCast',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint8',
        name: 'support',
        type: 'uint8',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
        indexed: false,
      },
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'VoteCastWithParams',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'oldVotingDelay',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'newVotingDelay',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'VotingDelaySet',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'oldVotingPeriod',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'newVotingPeriod',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'VotingPeriodSet',
    anonymous: false,
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'BALLOT_TYPEHASH',
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
    stateMutability: 'pure',
    type: 'function',
    name: 'COUNTING_MODE',
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
    name: 'EXTENDED_BALLOT_TYPEHASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'cancel',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'support',
        type: 'uint8',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'castVote',
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
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'support',
        type: 'uint8',
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
    name: 'castVoteBySig',
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
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'support',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'castVoteWithReason',
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
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'support',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'castVoteWithReasonAndParams',
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
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'support',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
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
    name: 'castVoteWithReasonAndParamsBySig',
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
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'calldatas',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'descriptionHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'execute',
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
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'execute',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'getActions',
    outputs: [
      {
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: 'signatures',
        type: 'string[]',
      },
      {
        internalType: 'bytes[]',
        name: 'calldatas',
        type: 'bytes[]',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'getReceipt',
    outputs: [
      {
        internalType: 'struct IGovernorCompatibilityBravo.Receipt',
        name: '',
        type: 'tuple',
        components: [
          {
            internalType: 'bool',
            name: 'hasVoted',
            type: 'bool',
          },
          {
            internalType: 'uint8',
            name: 'support',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'votes',
            type: 'uint256',
          },
        ],
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
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'getVotesWithParams',
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
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'hasVoted',
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
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'calldatas',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'descriptionHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
    name: 'hashProposal',
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
    name: 'lateQuorumVoteExtension',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
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
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'proposalDeadline',
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
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'proposalEta',
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
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'proposalSnapshot',
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
    name: 'proposalThreshold',
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
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'proposals',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'proposer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'eta',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'forVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'againstVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'abstainVotes',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'canceled',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'executed',
        type: 'bool',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'calldatas',
        type: 'bytes[]',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'propose',
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
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: 'signatures',
        type: 'string[]',
      },
      {
        internalType: 'bytes[]',
        name: 'calldatas',
        type: 'bytes[]',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'propose',
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
        internalType: 'address[]',
        name: 'targets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'calldatas',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes32',
        name: 'descriptionHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'queue',
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
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'queue',
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
    name: 'quorum',
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
    name: 'quorumDenominator',
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
    name: 'quorumNumerator',
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
    name: 'quorumVotes',
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
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'relay',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'newVoteExtension',
        type: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setLateQuorumVoteExtension',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newProposalThreshold',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setProposalThreshold',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newVotingDelay',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setVotingDelay',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newVotingPeriod',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setVotingPeriod',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'state',
    outputs: [
      {
        internalType: 'enum IGovernor.ProposalState',
        name: '',
        type: 'uint8',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'supportsInterface',
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
    name: 'timelock',
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
    name: 'token',
    outputs: [
      {
        internalType: 'contract IVotes',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newQuorumNumerator',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'updateQuorumNumerator',
  },
  {
    inputs: [
      {
        internalType: 'contract TimelockController',
        name: 'newTimelock',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'updateTimelock',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'version',
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
    name: 'votingDelay',
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
    name: 'votingPeriod',
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
    stateMutability: 'payable',
    type: 'receive',
  },
] as const;
