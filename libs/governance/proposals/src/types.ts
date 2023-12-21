import type { governanceChoices } from './constants';
import type { ProposalQuery } from './queries.generated';

export type ProposalLog = ProposalQuery['ogvProposalById']['logs'][number];

export type GovernanceChoice = (typeof governanceChoices)[number];

export type ProposalType = 'onchain' | 'offchain';

export type Proposal = {
  id: string;
  index: number;
  type: ProposalType;
  title: string;
  created: string;
  start: string;
  end: string;
  updated?: string;
  status: string;
  choices: GovernanceChoice[];
  scores?: number[];
  quorum?: number;
  link?: string;
};
