import type { Token } from '@origin/shared/contracts';

export type ProposalStatus = 'active' | 'closed' | 'cancelled';

export type Proposal = {
  id: string;
  token: Token;
  title: string;
  status: ProposalStatus;
  outcomes: Outcome[];
  quorum: bigint;
  startDate: string;
  endDate: string;
};

export type Outcome = {
  title: string;
  votes: bigint;
};
