import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OTokenApyQueryVariables = Types.Exact<{
  chainId: Types.Scalars['Int']['input'];
  token: Types.Scalars['String']['input'];
}>;


export type OTokenApyQuery = { __typename?: 'Query', oTokenApies: Array<{ __typename?: 'OTokenAPY', apy7DayAvg: number, apy14DayAvg: number, apy30DayAvg: number, apr: number, apy: number }> };

export type OTokenAddressQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  token: Types.Scalars['String']['input'];
}>;


export type OTokenAddressQuery = { __typename?: 'Query', oTokenAddresses: Array<{ __typename?: 'OTokenAddress', balance: string, earned: string, isContract: boolean, rebasingOption: Types.RebasingOption, lastUpdated: string }> };

export type OTokenHistoriesQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  filters?: Types.InputMaybe<Array<Types.HistoryType> | Types.HistoryType>;
  chainId: Types.Scalars['Int']['input'];
  token: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OTokenHistoriesQuery = { __typename?: 'Query', oTokenHistories: Array<{ __typename?: 'OTokenHistory', type: Types.HistoryType, value: string, txHash: string, timestamp: string, balance: string }> };



export const OTokenApyDocument = `
    query OTokenApy($chainId: Int!, $token: String!) {
  oTokenApies(
    limit: 1
    orderBy: timestamp_DESC
    where: {chainId_eq: $chainId, otoken_containsInsensitive: $token}
  ) {
    apy7DayAvg
    apy14DayAvg
    apy30DayAvg
    apr
    apy
  }
}
    `;

export const useOTokenApyQuery = <
      TData = OTokenApyQuery,
      TError = unknown
    >(
      variables: OTokenApyQueryVariables,
      options?: Omit<UseQueryOptions<OTokenApyQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenApyQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenApyQuery, TError, TData>(
      {
    queryKey: ['OTokenApy', variables],
    queryFn: graphqlClient<OTokenApyQuery, OTokenApyQueryVariables>(OTokenApyDocument, variables),
    ...options
  }
    )};

useOTokenApyQuery.getKey = (variables: OTokenApyQueryVariables) => ['OTokenApy', variables];


useOTokenApyQuery.fetcher = (variables: OTokenApyQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenApyQuery, OTokenApyQueryVariables>(OTokenApyDocument, variables, options);

export const OTokenAddressDocument = `
    query OTokenAddress($address: String!, $chainId: Int!, $token: String!) {
  oTokenAddresses(
    where: {address_containsInsensitive: $address, chainId_eq: $chainId, otoken_containsInsensitive: $token}
  ) {
    balance
    earned
    isContract
    rebasingOption
    lastUpdated
  }
}
    `;

export const useOTokenAddressQuery = <
      TData = OTokenAddressQuery,
      TError = unknown
    >(
      variables: OTokenAddressQueryVariables,
      options?: Omit<UseQueryOptions<OTokenAddressQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenAddressQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenAddressQuery, TError, TData>(
      {
    queryKey: ['OTokenAddress', variables],
    queryFn: graphqlClient<OTokenAddressQuery, OTokenAddressQueryVariables>(OTokenAddressDocument, variables),
    ...options
  }
    )};

useOTokenAddressQuery.getKey = (variables: OTokenAddressQueryVariables) => ['OTokenAddress', variables];


useOTokenAddressQuery.fetcher = (variables: OTokenAddressQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenAddressQuery, OTokenAddressQueryVariables>(OTokenAddressDocument, variables, options);

export const OTokenHistoriesDocument = `
    query OTokenHistories($address: String!, $filters: [HistoryType!], $chainId: Int!, $token: String!, $limit: Int = 1000) {
  oTokenHistories(
    orderBy: timestamp_DESC
    limit: $limit
    where: {address: {id_containsInsensitive: $address}, type_in: $filters, chainId_eq: $chainId, otoken_containsInsensitive: $token}
  ) {
    type
    value
    txHash
    timestamp
    balance
  }
}
    `;

export const useOTokenHistoriesQuery = <
      TData = OTokenHistoriesQuery,
      TError = unknown
    >(
      variables: OTokenHistoriesQueryVariables,
      options?: Omit<UseQueryOptions<OTokenHistoriesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenHistoriesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenHistoriesQuery, TError, TData>(
      {
    queryKey: ['OTokenHistories', variables],
    queryFn: graphqlClient<OTokenHistoriesQuery, OTokenHistoriesQueryVariables>(OTokenHistoriesDocument, variables),
    ...options
  }
    )};

useOTokenHistoriesQuery.getKey = (variables: OTokenHistoriesQueryVariables) => ['OTokenHistories', variables];


useOTokenHistoriesQuery.fetcher = (variables: OTokenHistoriesQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenHistoriesQuery, OTokenHistoriesQueryVariables>(OTokenHistoriesDocument, variables, options);
