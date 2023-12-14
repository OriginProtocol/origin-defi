import * as Types from '@origin/governance/shared';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type HoldersCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HoldersCountQuery = { __typename?: 'Query', ogvAddressesConnection: { __typename?: 'OGVAddressesConnection', totalCount: number } };


export const HoldersCountDocument = `
    query HoldersCount {
  ogvAddressesConnection(orderBy: id_ASC, where: {balance_gt: 0}) {
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