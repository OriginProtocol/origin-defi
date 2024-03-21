import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OusdHistoryUserStatQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type OusdHistoryUserStatQuery = { __typename?: 'Query', ousdAddresses: Array<{ __typename?: 'OUSDAddress', balance: string, earned: string, isContract: boolean, rebasingOption: Types.RebasingOption, lastUpdated: string }> };

export type OusdHistoryTransactionQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  filters?: Types.InputMaybe<Array<Types.HistoryType> | Types.HistoryType>;
}>;


export type OusdHistoryTransactionQuery = { __typename?: 'Query', ousdHistories: Array<{ __typename?: 'OUSDHistory', type: Types.HistoryType, value: string, txHash: string, timestamp: string, balance: string }> };

export type OusdDailyYieldQueryVariables = Types.Exact<{
  start: Types.Scalars['DateTime']['input'];
}>;


export type OusdDailyYieldQuery = { __typename?: 'Query', ousdDailyStats: Array<{ __typename?: 'OUSDDailyStat', yieldETH: string, yieldETH7Day: string, yieldETHAllTime: string }> };



export const OusdHistoryUserStatDocument = `
    query OusdHistoryUserStat($address: String!) {
  ousdAddresses(where: {id_containsInsensitive: $address}) {
    balance
    earned
    isContract
    rebasingOption
    lastUpdated
  }
}
    `;

export const useOusdHistoryUserStatQuery = <
      TData = OusdHistoryUserStatQuery,
      TError = unknown
    >(
      variables: OusdHistoryUserStatQueryVariables,
      options?: Omit<UseQueryOptions<OusdHistoryUserStatQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OusdHistoryUserStatQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OusdHistoryUserStatQuery, TError, TData>(
      {
    queryKey: ['OusdHistoryUserStat', variables],
    queryFn: graphqlClient<OusdHistoryUserStatQuery, OusdHistoryUserStatQueryVariables>(OusdHistoryUserStatDocument, variables),
    ...options
  }
    )};

useOusdHistoryUserStatQuery.getKey = (variables: OusdHistoryUserStatQueryVariables) => ['OusdHistoryUserStat', variables];


useOusdHistoryUserStatQuery.fetcher = (variables: OusdHistoryUserStatQueryVariables, options?: RequestInit['headers']) => graphqlClient<OusdHistoryUserStatQuery, OusdHistoryUserStatQueryVariables>(OusdHistoryUserStatDocument, variables, options);

export const OusdHistoryTransactionDocument = `
    query OusdHistoryTransaction($address: String!, $filters: [HistoryType!]) {
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

export const useOusdHistoryTransactionQuery = <
      TData = OusdHistoryTransactionQuery,
      TError = unknown
    >(
      variables: OusdHistoryTransactionQueryVariables,
      options?: Omit<UseQueryOptions<OusdHistoryTransactionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OusdHistoryTransactionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OusdHistoryTransactionQuery, TError, TData>(
      {
    queryKey: ['OusdHistoryTransaction', variables],
    queryFn: graphqlClient<OusdHistoryTransactionQuery, OusdHistoryTransactionQueryVariables>(OusdHistoryTransactionDocument, variables),
    ...options
  }
    )};

useOusdHistoryTransactionQuery.getKey = (variables: OusdHistoryTransactionQueryVariables) => ['OusdHistoryTransaction', variables];


useOusdHistoryTransactionQuery.fetcher = (variables: OusdHistoryTransactionQueryVariables, options?: RequestInit['headers']) => graphqlClient<OusdHistoryTransactionQuery, OusdHistoryTransactionQueryVariables>(OusdHistoryTransactionDocument, variables, options);

export const OusdDailyYieldDocument = `
    query OusdDailyYield($start: DateTime!) {
  ousdDailyStats(orderBy: timestamp_DESC, where: {timestamp_gte: $start}) {
    yieldETH
    yieldETH7Day
    yieldETHAllTime
  }
}
    `;

export const useOusdDailyYieldQuery = <
      TData = OusdDailyYieldQuery,
      TError = unknown
    >(
      variables: OusdDailyYieldQueryVariables,
      options?: Omit<UseQueryOptions<OusdDailyYieldQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OusdDailyYieldQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OusdDailyYieldQuery, TError, TData>(
      {
    queryKey: ['OusdDailyYield', variables],
    queryFn: graphqlClient<OusdDailyYieldQuery, OusdDailyYieldQueryVariables>(OusdDailyYieldDocument, variables),
    ...options
  }
    )};

useOusdDailyYieldQuery.getKey = (variables: OusdDailyYieldQueryVariables) => ['OusdDailyYield', variables];


useOusdDailyYieldQuery.fetcher = (variables: OusdDailyYieldQueryVariables, options?: RequestInit['headers']) => graphqlClient<OusdDailyYieldQuery, OusdDailyYieldQueryVariables>(OusdDailyYieldDocument, variables, options);
