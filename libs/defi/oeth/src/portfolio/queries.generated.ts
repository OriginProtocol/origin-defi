import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OethHistoryUserStatQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type OethHistoryUserStatQuery = { __typename?: 'Query', oTokenAddresses: Array<{ __typename?: 'OTokenAddress', balance: string, earned: string, isContract: boolean, rebasingOption: Types.RebasingOption, lastUpdated: string }> };

export type OethHistoryTransactionQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  filters?: Types.InputMaybe<Array<Types.HistoryType> | Types.HistoryType>;
}>;


export type OethHistoryTransactionQuery = { __typename?: 'Query', oTokenHistories: Array<{ __typename?: 'OTokenHistory', type: Types.HistoryType, value: string, txHash: string, timestamp: string, balance: string }> };

export type OethDailyYieldQueryVariables = Types.Exact<{
  start: Types.Scalars['DateTime']['input'];
}>;


export type OethDailyYieldQuery = { __typename?: 'Query', oethDailyStats: Array<{ __typename?: 'OETHDailyStat', yieldETH: string, yieldETH7Day: string, yieldETHAllTime: string }> };



export const OethHistoryUserStatDocument = `
    query OethHistoryUserStat($address: String!) {
  oTokenAddresses(
    where: {address_containsInsensitive: $address, chainId_eq: 1, otoken_eq: "0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3"}
  ) {
    balance
    earned
    isContract
    rebasingOption
    lastUpdated
  }
}
    `;

export const useOethHistoryUserStatQuery = <
      TData = OethHistoryUserStatQuery,
      TError = unknown
    >(
      variables: OethHistoryUserStatQueryVariables,
      options?: Omit<UseQueryOptions<OethHistoryUserStatQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OethHistoryUserStatQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OethHistoryUserStatQuery, TError, TData>(
      {
    queryKey: ['OethHistoryUserStat', variables],
    queryFn: graphqlClient<OethHistoryUserStatQuery, OethHistoryUserStatQueryVariables>(OethHistoryUserStatDocument, variables),
    ...options
  }
    )};

useOethHistoryUserStatQuery.getKey = (variables: OethHistoryUserStatQueryVariables) => ['OethHistoryUserStat', variables];


useOethHistoryUserStatQuery.fetcher = (variables: OethHistoryUserStatQueryVariables, options?: RequestInit['headers']) => graphqlClient<OethHistoryUserStatQuery, OethHistoryUserStatQueryVariables>(OethHistoryUserStatDocument, variables, options);

export const OethHistoryTransactionDocument = `
    query OethHistoryTransaction($address: String!, $filters: [HistoryType!]) {
  oTokenHistories(
    orderBy: timestamp_DESC
    offset: 0
    limit: 2000
    where: {address: {id_containsInsensitive: $address}, type_in: $filters, chainId_eq: 1, otoken_eq: "0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3"}
  ) {
    type
    value
    txHash
    timestamp
    balance
  }
}
    `;

export const useOethHistoryTransactionQuery = <
      TData = OethHistoryTransactionQuery,
      TError = unknown
    >(
      variables: OethHistoryTransactionQueryVariables,
      options?: Omit<UseQueryOptions<OethHistoryTransactionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OethHistoryTransactionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OethHistoryTransactionQuery, TError, TData>(
      {
    queryKey: ['OethHistoryTransaction', variables],
    queryFn: graphqlClient<OethHistoryTransactionQuery, OethHistoryTransactionQueryVariables>(OethHistoryTransactionDocument, variables),
    ...options
  }
    )};

useOethHistoryTransactionQuery.getKey = (variables: OethHistoryTransactionQueryVariables) => ['OethHistoryTransaction', variables];


useOethHistoryTransactionQuery.fetcher = (variables: OethHistoryTransactionQueryVariables, options?: RequestInit['headers']) => graphqlClient<OethHistoryTransactionQuery, OethHistoryTransactionQueryVariables>(OethHistoryTransactionDocument, variables, options);

export const OethDailyYieldDocument = `
    query OethDailyYield($start: DateTime!) {
  oethDailyStats(orderBy: timestamp_DESC, where: {timestamp_gte: $start}) {
    yieldETH
    yieldETH7Day
    yieldETHAllTime
  }
}
    `;

export const useOethDailyYieldQuery = <
      TData = OethDailyYieldQuery,
      TError = unknown
    >(
      variables: OethDailyYieldQueryVariables,
      options?: Omit<UseQueryOptions<OethDailyYieldQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OethDailyYieldQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OethDailyYieldQuery, TError, TData>(
      {
    queryKey: ['OethDailyYield', variables],
    queryFn: graphqlClient<OethDailyYieldQuery, OethDailyYieldQueryVariables>(OethDailyYieldDocument, variables),
    ...options
  }
    )};

useOethDailyYieldQuery.getKey = (variables: OethDailyYieldQueryVariables) => ['OethDailyYield', variables];


useOethDailyYieldQuery.fetcher = (variables: OethDailyYieldQueryVariables, options?: RequestInit['headers']) => graphqlClient<OethDailyYieldQuery, OethDailyYieldQueryVariables>(OethDailyYieldDocument, variables, options);
