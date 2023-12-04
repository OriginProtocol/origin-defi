import type { ProposalsQuery } from './queries.generated';

export type Proposal =
  ProposalsQuery['ogvProposalsConnection']['edges'][0]['node'];
