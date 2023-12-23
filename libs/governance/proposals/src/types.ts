import type { governanceChoices } from './constants';
import type { ProposalQuery } from './queries.generated';

export type ProposalLog = ProposalQuery['ogvProposalById']['logs'][number];

export type GovernanceChoice = (typeof governanceChoices)[number];

export type ProposalType = 'onchain' | 'snapshot';

export type Proposal = {
  id: string;
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

export type Vote = {
  id: string;
  choice: string;
  created: string;
  proposal: Pick<Proposal, 'id' | 'type' | 'title' | 'status' | 'link'>;
};
