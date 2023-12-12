import * as Types from '@origin/governance/shared';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type ProposalsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  cursor?: Types.InputMaybe<Types.Scalars['String']['input']>;
  status?: Types.InputMaybe<Array<Types.OgvProposalState> | Types.OgvProposalState>;
}>;


export type ProposalsQuery = { __typename?: 'Query', ogvProposalsConnection: { __typename?: 'OGVProposalsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, endCursor: string }, edges: Array<{ __typename?: 'OGVProposalEdge', node: { __typename?: 'OGVProposal', id: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.OgvProposalState } }> } };

export type AllProposalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllProposalsQuery = { __typename?: 'Query', ogvProposals: Array<{ __typename?: 'OGVProposal', id: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.OgvProposalState }> };

export type ProposalsCountQueryVariables = Types.Exact<{
  status?: Types.InputMaybe<Array<Types.OgvProposalState> | Types.OgvProposalState>;
}>;


export type ProposalsCountQuery = { __typename?: 'Query', ogvProposalsConnection: { __typename?: 'OGVProposalsConnection', totalCount: number } };

export type HoldersCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HoldersCountQuery = { __typename?: 'Query', ogvAddressesConnection: { __typename?: 'OGVAddressesConnection', totalCount: number } };


export const ProposalsDocument = `
    query Proposals($first: Int, $cursor: String, $status: [OGVProposalState!]) {
  ogvProposalsConnection(
    first: $first
    after: $cursor
    orderBy: timestamp_DESC
    where: {status_in: $status}
  ) {
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
export const AllProposalsDocument = `
    query AllProposals {
  ogvProposals(orderBy: timestamp_DESC, limit: 1000) {
    id
    description
    timestamp
    startBlock
    endBlock
    lastUpdated
    status
  }
}
    `;
export const useAllProposalsQuery = <
      TData = AllProposalsQuery,
      TError = unknown
    >(
      variables?: AllProposalsQueryVariables,
      options?: UseQueryOptions<AllProposalsQuery, TError, TData>
    ) =>
    useQuery<AllProposalsQuery, TError, TData>(
      variables === undefined ? ['AllProposals'] : ['AllProposals', variables],
      graphqlClient<AllProposalsQuery, AllProposalsQueryVariables>(AllProposalsDocument, variables),
      options
    );

useAllProposalsQuery.getKey = (variables?: AllProposalsQueryVariables) => variables === undefined ? ['AllProposals'] : ['AllProposals', variables];
;

export const useInfiniteAllProposalsQuery = <
      TData = AllProposalsQuery,
      TError = unknown
    >(
      variables?: AllProposalsQueryVariables,
      options?: UseInfiniteQueryOptions<AllProposalsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<AllProposalsQuery, TError, TData>(
      variables === undefined ? ['AllProposals.infinite'] : ['AllProposals.infinite', variables],
      (metaData) => graphqlClient<AllProposalsQuery, AllProposalsQueryVariables>(AllProposalsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteAllProposalsQuery.getKey = (variables?: AllProposalsQueryVariables) => variables === undefined ? ['AllProposals.infinite'] : ['AllProposals.infinite', variables];
;

useAllProposalsQuery.fetcher = (variables?: AllProposalsQueryVariables, options?: RequestInit['headers']) => graphqlClient<AllProposalsQuery, AllProposalsQueryVariables>(AllProposalsDocument, variables, options);
export const ProposalsCountDocument = `
    query ProposalsCount($status: [OGVProposalState!]) {
  ogvProposalsConnection(orderBy: id_ASC, where: {status_in: $status}) {
    totalCount
  }
}
    `;
export const useProposalsCountQuery = <
      TData = ProposalsCountQuery,
      TError = unknown
    >(
      variables?: ProposalsCountQueryVariables,
      options?: UseQueryOptions<ProposalsCountQuery, TError, TData>
    ) =>
    useQuery<ProposalsCountQuery, TError, TData>(
      variables === undefined ? ['ProposalsCount'] : ['ProposalsCount', variables],
      graphqlClient<ProposalsCountQuery, ProposalsCountQueryVariables>(ProposalsCountDocument, variables),
      options
    );

useProposalsCountQuery.getKey = (variables?: ProposalsCountQueryVariables) => variables === undefined ? ['ProposalsCount'] : ['ProposalsCount', variables];
;

export const useInfiniteProposalsCountQuery = <
      TData = ProposalsCountQuery,
      TError = unknown
    >(
      variables?: ProposalsCountQueryVariables,
      options?: UseInfiniteQueryOptions<ProposalsCountQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ProposalsCountQuery, TError, TData>(
      variables === undefined ? ['ProposalsCount.infinite'] : ['ProposalsCount.infinite', variables],
      (metaData) => graphqlClient<ProposalsCountQuery, ProposalsCountQueryVariables>(ProposalsCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteProposalsCountQuery.getKey = (variables?: ProposalsCountQueryVariables) => variables === undefined ? ['ProposalsCount.infinite'] : ['ProposalsCount.infinite', variables];
;

useProposalsCountQuery.fetcher = (variables?: ProposalsCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<ProposalsCountQuery, ProposalsCountQueryVariables>(ProposalsCountDocument, variables, options);
export const HoldersCountDocument = `
    query HoldersCount {
  ogvAddressesConnection(orderBy: id_ASC) {
    totalCount
  }
}
    `;
export const useHoldersCountQuery = <
      TData = HoldersCountQuery,
      TError = unknown
    >(
      variables?: HoldersCountQueryVariables,
      options?: UseQueryOptions<HoldersCountQuery, TError, TData>
    ) =>
    useQuery<HoldersCountQuery, TError, TData>(
      variables === undefined ? ['HoldersCount'] : ['HoldersCount', variables],
      graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, variables),
      options
    );

useHoldersCountQuery.getKey = (variables?: HoldersCountQueryVariables) => variables === undefined ? ['HoldersCount'] : ['HoldersCount', variables];
;

export const useInfiniteHoldersCountQuery = <
      TData = HoldersCountQuery,
      TError = unknown
    >(
      variables?: HoldersCountQueryVariables,
      options?: UseInfiniteQueryOptions<HoldersCountQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<HoldersCountQuery, TError, TData>(
      variables === undefined ? ['HoldersCount.infinite'] : ['HoldersCount.infinite', variables],
      (metaData) => graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteHoldersCountQuery.getKey = (variables?: HoldersCountQueryVariables) => variables === undefined ? ['HoldersCount.infinite'] : ['HoldersCount.infinite', variables];
;

useHoldersCountQuery.fetcher = (variables?: HoldersCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, variables, options);