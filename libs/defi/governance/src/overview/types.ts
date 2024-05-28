import type { OgvProposalEvent } from '@origin/defi/shared';

import type { governanceChoices } from './constants';

export type ProposalLog = {
  id: string;
  hash: string;
  event: OgvProposalEvent;
  timestamp: string;
};

export type GovernanceChoice = (typeof governanceChoices)[number];

export type ProposalType =
  | 'onchain'
  | 'onchain_ogv'
  | 'snapshot'
  | 'snapshot_ogv';

export type Proposal = {
  id: string;
  type: ProposalType;
  title: string;
  description?: string;
  created: string;
  start: string;
  end: string;
  updated?: string;
  status: string;
  choices: GovernanceChoice[];
  scores: number[] | undefined | null;
  quorum?: number;
  link?: string;
};

export type Vote = {
  id: string;
  choice: string;
  created: string;
  proposal: Pick<Proposal, 'id' | 'type' | 'title' | 'status' | 'link'>;
};
