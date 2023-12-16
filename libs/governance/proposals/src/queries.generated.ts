import * as Types from '@origin/governance/shared';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type ProposalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProposalsQuery = { __typename?: 'Query', ogvProposals: Array<{ __typename?: 'OGVProposal', id: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.OgvProposalState, choices: Array<string | null>, scores: Array<number | null> }> };


export const ProposalsDocument = `
    query Proposals {
  ogvProposals(orderBy: timestamp_DESC, limit: 1000) {
    id
    description
    timestamp
    startBlock
    endBlock
    lastUpdated
    status
    choices
    scores
  }
}
    `;
export const useProposalsQuery = <
      TData = ProposalsQuery,
      TError = unknown
    >(
      variables?: ProposalsQueryVariables,
      options?: UseQueryOptions<ProposalsQuery, TError, TData>
    ) =>
    useQuery<ProposalsQuery, TError, TData>(
      variables === undefined ? ['Proposals'] : ['Proposals', variables],
      graphqlClient<ProposalsQuery, ProposalsQueryVariables>(ProposalsDocument, variables),
      options
    );

useProposalsQuery.getKey = (variables?: ProposalsQueryVariables) => variables === undefined ? ['Proposals'] : ['Proposals', variables];
;

export const useInfiniteProposalsQuery = <
      TData = ProposalsQuery,
      TError = unknown
    >(
      variables?: ProposalsQueryVariables,
      options?: UseInfiniteQueryOptions<ProposalsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ProposalsQuery, TError, TData>(
      variables === undefined ? ['Proposals.infinite'] : ['Proposals.infinite', variables],
      (metaData) => graphqlClient<ProposalsQuery, ProposalsQueryVariables>(ProposalsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteProposalsQuery.getKey = (variables?: ProposalsQueryVariables) => variables === undefined ? ['Proposals.infinite'] : ['Proposals.infinite', variables];
;

useProposalsQuery.fetcher = (variables?: ProposalsQueryVariables, options?: RequestInit['headers']) => graphqlClient<ProposalsQuery, ProposalsQueryVariables>(ProposalsDocument, variables, options);