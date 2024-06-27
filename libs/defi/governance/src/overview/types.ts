import type { GovernanceProposalEventType } from '@origin/defi/shared';
import type { Token } from '@origin/shared/contracts';

import type { governanceChoices } from './constants';

export type GovernanceChoice = (typeof governanceChoices)[number];

export type ProposalType =
  | 'onchain'
  | 'onchain_ogv'
  | 'snapshot'
  | 'snapshot_ogv';

export type Proposal = {
  id: string;
  proposalId?: bigint;
  type: ProposalType;
  token: Token;
  title: string;
  description?: string;
  created: string;
  start: string;
  end: string;
  startBlock?: number;
  endBlock?: number;
  updated?: string;
  status: string;
  choices: GovernanceChoice[];
  scores: number[] | undefined | null;
  quorum?: number;
  link?: string;
  events?: ProposalEvent[];
  proposer?: string;
};

export type Vote = {
  id: string;
  choice: string;
  created: string;
  proposal: Pick<
    Proposal,
    'id' | 'proposalId' | 'type' | 'title' | 'status' | 'link'
  >;
};

export type ProposalEvent = {
  id: string;
  txHash: string;
  event: GovernanceProposalEventType;
  timestamp: string;
};

export type ProposalVote = {
  id: string;
  voter: string;
  weight: bigint;
  type: GovernanceChoice;
  txHash: string;
  timestamp: string;
};
