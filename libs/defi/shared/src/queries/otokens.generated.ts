import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type DailyStatFragment = { __typename?: 'OTokenDailyStat', id: string, blockNumber: number, timestamp: string, date: string, totalSupply: string, apy: number, apy7: number, apy14: number, apy30: number, rateETH: string, rateUSD: string, rebasingSupply: string, nonRebasingSupply: string, wrappedSupply: string, amoSupply?: string | null, yield: string, fees: string, dripperWETH: string };

export type OTokenApyQueryVariables = Types.Exact<{
  chainId: Types.Scalars['Int']['input'];
  token: Types.Scalars['String']['input'];
}>;


export type OTokenApyQuery = { __typename?: 'Query', oTokenApies: Array<{ __typename?: 'OTokenAPY', apy7DayAvg: number, apy14DayAvg: number, apy30DayAvg: number, apr: number, apy: number }> };

export type OTokenAddressQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  token: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
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

export type OTokenStatsQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.OTokenDailyStatOrderByInput> | Types.OTokenDailyStatOrderByInput>;
  from?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OTokenStatsQuery = { __typename?: 'Query', oTokenDailyStats: Array<{ __typename?: 'OTokenDailyStat', id: string, blockNumber: number, timestamp: string, date: string, totalSupply: string, apy: number, apy7: number, apy14: number, apy30: number, rateETH: string, rateUSD: string, rebasingSupply: string, nonRebasingSupply: string, wrappedSupply: string, amoSupply?: string | null, yield: string, fees: string, dripperWETH: string }> };

export type OTokenWithdrawalRequestsQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  withdrawer?: Types.InputMaybe<Types.Scalars['String']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.OTokenWithdrawalRequestOrderByInput> | Types.OTokenWithdrawalRequestOrderByInput>;
  from?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OTokenWithdrawalRequestsQuery = { __typename?: 'Query', oTokenWithdrawalRequests: Array<{ __typename?: 'OTokenWithdrawalRequest', id: string, requestId: string, timestamp: string, amount: string, queued: string, claimed: boolean, blockNumber: number, txHash: string }> };


export const DailyStatFragmentDoc = `
    fragment DailyStat on OTokenDailyStat {
  id
  blockNumber
  timestamp
  date
  totalSupply
  apy
  apy7
  apy14
  apy30
  rateETH
  rateUSD
  rebasingSupply
  nonRebasingSupply
  wrappedSupply
  amoSupply
  yield
  fees
  dripperWETH
}
    `;
export const OTokenApyDocument = `
    query OTokenApy($chainId: Int!, $token: String!) {
  oTokenApies(
    limit: 1
    orderBy: timestamp_DESC
    where: {chainId_eq: $chainId, otoken_eq: $token}
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
    query OTokenAddress($address: String!, $chainId: Int!, $token: String!, $limit: Int = 5000) {
  oTokenAddresses(
    limit: $limit
    where: {address_eq: $address, chainId_eq: $chainId, otoken_eq: $token}
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
    where: {address: {address_eq: $address}, type_in: $filters, chainId_eq: $chainId, otoken_eq: $token}
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

export const OTokenStatsDocument = `
    query oTokenStats($token: String!, $chainId: Int!, $limit: Int = 5000, $orderBy: [OTokenDailyStatOrderByInput!] = [timestamp_DESC], $from: DateTime, $offset: Int) {
  oTokenDailyStats(
    limit: $limit
    offset: $offset
    orderBy: $orderBy
    where: {otoken_eq: $token, chainId_eq: $chainId, timestamp_gte: $from}
  ) {
    ...DailyStat
  }
}
    ${DailyStatFragmentDoc}`;

export const useOTokenStatsQuery = <
      TData = OTokenStatsQuery,
      TError = unknown
    >(
      variables: OTokenStatsQueryVariables,
      options?: Omit<UseQueryOptions<OTokenStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenStatsQuery, TError, TData>(
      {
    queryKey: ['oTokenStats', variables],
    queryFn: graphqlClient<OTokenStatsQuery, OTokenStatsQueryVariables>(OTokenStatsDocument, variables),
    ...options
  }
    )};

useOTokenStatsQuery.getKey = (variables: OTokenStatsQueryVariables) => ['oTokenStats', variables];


useOTokenStatsQuery.fetcher = (variables: OTokenStatsQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenStatsQuery, OTokenStatsQueryVariables>(OTokenStatsDocument, variables, options);

export const OTokenWithdrawalRequestsDocument = `
    query oTokenWithdrawalRequests($token: String!, $chainId: Int!, $withdrawer: String, $limit: Int = 5000, $orderBy: [OTokenWithdrawalRequestOrderByInput!] = [timestamp_DESC], $from: DateTime, $offset: Int) {
  oTokenWithdrawalRequests(
    limit: $limit
    offset: $offset
    orderBy: $orderBy
    where: {otoken_eq: $token, chainId_eq: $chainId, timestamp_gte: $from, withdrawer_eq: $withdrawer}
  ) {
    id
    requestId
    timestamp
    amount
    queued
    claimed
    blockNumber
    requestId
    txHash
  }
}
    `;

export const useOTokenWithdrawalRequestsQuery = <
      TData = OTokenWithdrawalRequestsQuery,
      TError = unknown
    >(
      variables: OTokenWithdrawalRequestsQueryVariables,
      options?: Omit<UseQueryOptions<OTokenWithdrawalRequestsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenWithdrawalRequestsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenWithdrawalRequestsQuery, TError, TData>(
      {
    queryKey: ['oTokenWithdrawalRequests', variables],
    queryFn: graphqlClient<OTokenWithdrawalRequestsQuery, OTokenWithdrawalRequestsQueryVariables>(OTokenWithdrawalRequestsDocument, variables),
    ...options
  }
    )};

useOTokenWithdrawalRequestsQuery.getKey = (variables: OTokenWithdrawalRequestsQueryVariables) => ['oTokenWithdrawalRequests', variables];


useOTokenWithdrawalRequestsQuery.fetcher = (variables: OTokenWithdrawalRequestsQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenWithdrawalRequestsQuery, OTokenWithdrawalRequestsQueryVariables>(OTokenWithdrawalRequestsDocument, variables, options);
