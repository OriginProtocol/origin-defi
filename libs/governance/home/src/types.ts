export type ProposalType = 'onchain' | 'offchain';

export type Proposal = {
  id: string;
  type: ProposalType;
  title: string;
  created: string;
  start: string;
  end: string;
  updated?: string;
  status: string;
  choices: string[];
  scores?: number[];
  quorum?: number;
  link?: string;
};
