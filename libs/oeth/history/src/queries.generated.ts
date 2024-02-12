import * as Types from '@origin/oeth/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/oeth/shared';
export type HistoryUserStatQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type HistoryUserStatQuery = { __typename?: 'Query', oethAddresses: Array<{ __typename?: 'OETHAddress', balance: string, earned: string, isContract: boolean, rebasingOption: Types.RebasingOption, lastUpdated: string }> };

export type HistoryApyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HistoryApyQuery = { __typename?: 'Query', oethapies: Array<{ __typename?: 'OETHAPY', apy7DayAvg: number, apy30DayAvg: number }> };

export type HistoryTransactionQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  filters?: Types.InputMaybe<Array<Types.HistoryType> | Types.HistoryType>;
}>;


export type HistoryTransactionQuery = { __typename?: 'Query', oethHistories: Array<{ __typename?: 'OETHHistory', type: Types.HistoryType, value: string, txHash: string, timestamp: string, balance: string }> };



export const HistoryUserStatDocument = `
    query HistoryUserStat($address: String!) {
  oethAddresses(where: {id_containsInsensitive: $address}) {
    balance
    earned
    isContract
    rebasingOption
    lastUpdated
  }
}
    `;

export const useHistoryUserStatQuery = <
      TData = HistoryUserStatQuery,
      TError = unknown
    >(
      variables: HistoryUserStatQueryVariables,
      options?: Omit<UseQueryOptions<HistoryUserStatQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<HistoryUserStatQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<HistoryUserStatQuery, TError, TData>(
      {
    queryKey: ['HistoryUserStat', variables],
    queryFn: graphqlClient<HistoryUserStatQuery, HistoryUserStatQueryVariables>(HistoryUserStatDocument, variables),
    ...options
  }
    )};

useHistoryUserStatQuery.getKey = (variables: HistoryUserStatQueryVariables) => ['HistoryUserStat', variables];


useHistoryUserStatQuery.fetcher = (variables: HistoryUserStatQueryVariables, options?: RequestInit['headers']) => graphqlClient<HistoryUserStatQuery, HistoryUserStatQueryVariables>(HistoryUserStatDocument, variables, options);

export const HistoryApyDocument = `
    query HistoryApy {
  oethapies(limit: 1, orderBy: timestamp_DESC) {
    apy7DayAvg
    apy30DayAvg
  }
}
    `;

export const useHistoryApyQuery = <
      TData = HistoryApyQuery,
      TError = unknown
    >(
      variables?: HistoryApyQueryVariables,
      options?: Omit<UseQueryOptions<HistoryApyQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<HistoryApyQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<HistoryApyQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['HistoryApy'] : ['HistoryApy', variables],
    queryFn: graphqlClient<HistoryApyQuery, HistoryApyQueryVariables>(HistoryApyDocument, variables),
    ...options
  }
    )};

useHistoryApyQuery.getKey = (variables?: HistoryApyQueryVariables) => variables === undefined ? ['HistoryApy'] : ['HistoryApy', variables];


useHistoryApyQuery.fetcher = (variables?: HistoryApyQueryVariables, options?: RequestInit['headers']) => graphqlClient<HistoryApyQuery, HistoryApyQueryVariables>(HistoryApyDocument, variables, options);

export const HistoryTransactionDocument = `
    query HistoryTransaction($address: String!, $filters: [HistoryType!]) {
  oethHistories(
    orderBy: timestamp_DESC
    offset: 0
    limit: 2000
    where: {AND: {address: {id_containsInsensitive: $address}, type_in: $filters}}
  ) {
    type
    value
    txHash
    timestamp
    balance
  }
}
    `;

export const useHistoryTransactionQuery = <
      TData = HistoryTransactionQuery,
      TError = unknown
    >(
      variables: HistoryTransactionQueryVariables,
      options?: Omit<UseQueryOptions<HistoryTransactionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<HistoryTransactionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<HistoryTransactionQuery, TError, TData>(
      {
    queryKey: ['HistoryTransaction', variables],
    queryFn: graphqlClient<HistoryTransactionQuery, HistoryTransactionQueryVariables>(HistoryTransactionDocument, variables),
    ...options
  }
    )};

useHistoryTransactionQuery.getKey = (variables: HistoryTransactionQueryVariables) => ['HistoryTransaction', variables];


useHistoryTransactionQuery.fetcher = (variables: HistoryTransactionQueryVariables, options?: RequestInit['headers']) => graphqlClient<HistoryTransactionQuery, HistoryTransactionQueryVariables>(HistoryTransactionDocument, variables, options);
