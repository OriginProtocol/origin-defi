import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type HoldersCountQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
}>;


export type HoldersCountQuery = { __typename?: 'Query', oTokenAddressesConnection: { __typename?: 'OTokenAddressesConnection', totalCount: number } };



export const HoldersCountDocument = `
    query HoldersCount($token: String!, $chainId: Int!) {
  oTokenAddressesConnection(
    orderBy: id_ASC
    where: {otoken_containsInsensitive: $token, chainId_eq: $chainId, balance_gt: 0}
  ) {
    totalCount
  }
}
    `;

export const useHoldersCountQuery = <
      TData = HoldersCountQuery,
      TError = unknown
    >(
      variables: HoldersCountQueryVariables,
      options?: Omit<UseQueryOptions<HoldersCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<HoldersCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<HoldersCountQuery, TError, TData>(
      {
    queryKey: ['HoldersCount', variables],
    queryFn: graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, variables),
    ...options
  }
    )};

useHoldersCountQuery.getKey = (variables: HoldersCountQueryVariables) => ['HoldersCount', variables];


useHoldersCountQuery.fetcher = (variables: HoldersCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, variables, options);
