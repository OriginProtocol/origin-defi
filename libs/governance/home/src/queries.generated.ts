import * as Types from '@origin/governance/shared';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type ProposalsQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ProposalsQuery = { __typename?: 'Query', ogvProposalsConnection: { __typename?: 'OGVProposalsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, endCursor: string }, edges: Array<{ __typename?: 'OGVProposalEdge', node: { __typename?: 'OGVProposal', id: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.OgvProposalState } }> } };


export const ProposalsDocument = `
    query Proposals($cursor: String) {
  ogvProposalsConnection(first: 10, after: $cursor, orderBy: timestamp_DESC) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        description
        timestamp
        startBlock
        endBlock
        lastUpdated
        status
      }
    }
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