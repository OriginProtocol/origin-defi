import * as Types from '@origin/ousd/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/ousd/shared';
export type HistoryUserStatQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type HistoryUserStatQuery = { __typename?: 'Query', ousdAddresses: Array<{ __typename?: 'OUSDAddress', balance: string, earned: string, isContract: boolean, rebasingOption: Types.RebasingOption, lastUpdated: string }> };

export type HistoryApyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HistoryApyQuery = { __typename?: 'Query', ousdapies: Array<{ __typename?: 'OUSDAPY', apy7DayAvg: number, apy30DayAvg: number }> };

export type HistoryTransactionQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  filters?: Types.InputMaybe<Array<Types.HistoryType> | Types.HistoryType>;
}>;


export type HistoryTransactionQuery = { __typename?: 'Query', ousdHistories: Array<{ __typename?: 'OUSDHistory', type: Types.HistoryType, value: string, txHash: string, timestamp: string, balance: string }> };


export const HistoryUserStatDocument = `
    query HistoryUserStat($address: String!) {
  ousdAddresses(where: {id_containsInsensitive: $address}) {
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
      options?: UseQueryOptions<HistoryUserStatQuery, TError, TData>
    ) =>
    useQuery<HistoryUserStatQuery, TError, TData>(
      ['HistoryUserStat', variables],
      graphqlClient<HistoryUserStatQuery, HistoryUserStatQueryVariables>(HistoryUserStatDocument, variables),
      options
    );

useHistoryUserStatQuery.getKey = (variables: HistoryUserStatQueryVariables) => ['HistoryUserStat', variables];
;

useHistoryUserStatQuery.fetcher = (variables: HistoryUserStatQueryVariables, options?: RequestInit['headers']) => graphqlClient<HistoryUserStatQuery, HistoryUserStatQueryVariables>(HistoryUserStatDocument, variables, options);
export const HistoryApyDocument = `
    query HistoryApy {
  ousdapies(limit: 1, orderBy: timestamp_DESC) {
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
      options?: UseQueryOptions<HistoryApyQuery, TError, TData>
    ) =>
    useQuery<HistoryApyQuery, TError, TData>(
      variables === undefined ? ['HistoryApy'] : ['HistoryApy', variables],
      graphqlClient<HistoryApyQuery, HistoryApyQueryVariables>(HistoryApyDocument, variables),
      options
    );

useHistoryApyQuery.getKey = (variables?: HistoryApyQueryVariables) => variables === undefined ? ['HistoryApy'] : ['HistoryApy', variables];
;

useHistoryApyQuery.fetcher = (variables?: HistoryApyQueryVariables, options?: RequestInit['headers']) => graphqlClient<HistoryApyQuery, HistoryApyQueryVariables>(HistoryApyDocument, variables, options);
export const HistoryTransactionDocument = `
    query HistoryTransaction($address: String!, $filters: [HistoryType!]) {
  ousdHistories(
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
      options?: UseQueryOptions<HistoryTransactionQuery, TError, TData>
    ) =>
    useQuery<HistoryTransactionQuery, TError, TData>(
      ['HistoryTransaction', variables],
      graphqlClient<HistoryTransactionQuery, HistoryTransactionQueryVariables>(HistoryTransactionDocument, variables),
      options
    );

useHistoryTransactionQuery.getKey = (variables: HistoryTransactionQueryVariables) => ['HistoryTransaction', variables];
;

useHistoryTransactionQuery.fetcher = (variables: HistoryTransactionQueryVariables, options?: RequestInit['headers']) => graphqlClient<HistoryTransactionQuery, HistoryTransactionQueryVariables>(HistoryTransactionDocument, variables, options);