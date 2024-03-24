import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OgvHoldersCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OgvHoldersCountQuery = { __typename?: 'Query', ogvAddressesConnection: { __typename?: 'OGVAddressesConnection', totalCount: number } };

export type OgvUserInfoQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type OgvUserInfoQuery = { __typename?: 'Query', ogvAddresses: Array<{ __typename?: 'OGVAddress', id: string, balance: string, staked: string, veogvBalance: string, votingPower: string, delegatee?: { __typename?: 'OGVAddress', id: string } | null }> };



export const OgvHoldersCountDocument = `
    query OgvHoldersCount {
  ogvAddressesConnection(orderBy: id_ASC, where: {staked_gt: 0}) {
    totalCount
  }
}
    `;

export const useOgvHoldersCountQuery = <
      TData = OgvHoldersCountQuery,
      TError = unknown
    >(
      variables?: OgvHoldersCountQueryVariables,
      options?: Omit<UseQueryOptions<OgvHoldersCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgvHoldersCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgvHoldersCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OgvHoldersCount'] : ['OgvHoldersCount', variables],
    queryFn: graphqlClient<OgvHoldersCountQuery, OgvHoldersCountQueryVariables>(OgvHoldersCountDocument, variables),
    ...options
  }
    )};

useOgvHoldersCountQuery.getKey = (variables?: OgvHoldersCountQueryVariables) => variables === undefined ? ['OgvHoldersCount'] : ['OgvHoldersCount', variables];


useOgvHoldersCountQuery.fetcher = (variables?: OgvHoldersCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgvHoldersCountQuery, OgvHoldersCountQueryVariables>(OgvHoldersCountDocument, variables, options);

export const OgvUserInfoDocument = `
    query OgvUserInfo($address: String!) {
  ogvAddresses(where: {id_containsInsensitive: $address}) {
    id
    balance
    staked
    veogvBalance
    votingPower
    delegatee {
      id
    }
  }
}
    `;

export const useOgvUserInfoQuery = <
      TData = OgvUserInfoQuery,
      TError = unknown
    >(
      variables: OgvUserInfoQueryVariables,
      options?: Omit<UseQueryOptions<OgvUserInfoQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgvUserInfoQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgvUserInfoQuery, TError, TData>(
      {
    queryKey: ['OgvUserInfo', variables],
    queryFn: graphqlClient<OgvUserInfoQuery, OgvUserInfoQueryVariables>(OgvUserInfoDocument, variables),
    ...options
  }
    )};

useOgvUserInfoQuery.getKey = (variables: OgvUserInfoQueryVariables) => ['OgvUserInfo', variables];


useOgvUserInfoQuery.fetcher = (variables: OgvUserInfoQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgvUserInfoQuery, OgvUserInfoQueryVariables>(OgvUserInfoDocument, variables, options);
