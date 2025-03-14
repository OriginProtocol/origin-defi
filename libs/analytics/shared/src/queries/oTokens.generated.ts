import * as Types from '@origin/analytics/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/analytics/shared';
export type DailyStatFragment = { __typename?: 'OTokenDailyStat', id: string, blockNumber: number, timestamp: string, date: string, totalSupply: string, apy: number, apy7: number, apy14: number, apy30: number, rateETH: string, rateUSD: string, rebasingSupply: string, nonRebasingSupply: string, wrappedSupply: string, amoSupply?: string | null, yield: string, fees: string, dripperWETH: string };

export type StrategyFragment = { __typename?: 'Strategy', name: string, contractName: string, address: string, oTokenAddress: string, kind: string, balances: Array<{ __typename?: 'Balance', asset: string, timestamp: string, blockNumber: number, balance: string }> };

export type OTokenStatsQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.OTokenDailyStatOrderByInput> | Types.OTokenDailyStatOrderByInput>;
  from?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
  to?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OTokenStatsQuery = { __typename?: 'Query', oTokenDailyStats: Array<{ __typename?: 'OTokenDailyStat', id: string, blockNumber: number, timestamp: string, date: string, totalSupply: string, apy: number, apy7: number, apy14: number, apy30: number, rateETH: string, rateUSD: string, rebasingSupply: string, nonRebasingSupply: string, wrappedSupply: string, amoSupply?: string | null, yield: string, fees: string, dripperWETH: string }> };

export type OTokenStatsConnectionQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  orderBy?: Types.InputMaybe<Array<Types.OTokenDailyStatOrderByInput> | Types.OTokenDailyStatOrderByInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  from?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;


export type OTokenStatsConnectionQuery = { __typename?: 'Query', oTokenDailyStatsConnection: { __typename?: 'OTokenDailyStatsConnection', totalCount: number, edges: Array<{ __typename?: 'OTokenDailyStatEdge', node: { __typename?: 'OTokenDailyStat', id: string, blockNumber: number, timestamp: string, date: string, totalSupply: string, apy: number, apy7: number, apy14: number, apy30: number, rateETH: string, rateUSD: string, rebasingSupply: string, nonRebasingSupply: string, wrappedSupply: string, amoSupply?: string | null, yield: string, fees: string, dripperWETH: string } }> } };

export type OTokenDailyStatByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type OTokenDailyStatByIdQuery = { __typename?: 'Query', oTokenDailyStatById?: { __typename?: 'OTokenDailyStat', id: string, blockNumber: number, timestamp: string, date: string, totalSupply: string, apy: number, apy7: number, apy14: number, apy30: number, rateETH: string, rateUSD: string, rebasingSupply: string, nonRebasingSupply: string, wrappedSupply: string, amoSupply?: string | null, yield: string, fees: string, dripperWETH: string } | null };

export type OTokenRebasesQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  orderBy?: Types.InputMaybe<Array<Types.OTokenRebaseOrderByInput> | Types.OTokenRebaseOrderByInput>;
  from?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
  to?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OTokenRebasesQuery = { __typename?: 'Query', oTokenRebases: Array<{ __typename?: 'OTokenRebase', blockNumber: number, txHash: string, timestamp: string, fee: string, feeETH: string, feeUSD: string, yield: string, yieldETH: string, yieldUSD: string, totalSupply: string }> };

export type OTokenStrategiesQueryVariables = Types.Exact<{
  chainId: Types.Scalars['Float']['input'];
  token: Types.Scalars['String']['input'];
  timestamp?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type OTokenStrategiesQuery = { __typename?: 'Query', strategies: Array<{ __typename?: 'Strategy', name: string, contractName: string, address: string, oTokenAddress: string, kind: string, balances: Array<{ __typename?: 'Balance', asset: string, timestamp: string, blockNumber: number, balance: string }> }> };


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
export const StrategyFragmentDoc = `
    fragment Strategy on Strategy {
  name
  contractName
  address
  oTokenAddress
  kind
  balances {
    asset
    timestamp
    blockNumber
    balance
  }
}
    `;
export const OTokenStatsDocument = `
    query oTokenStats($token: String!, $chainId: Int!, $limit: Int = 5000, $orderBy: [OTokenDailyStatOrderByInput!] = [timestamp_DESC], $from: DateTime, $to: DateTime, $offset: Int) {
  oTokenDailyStats(
    limit: $limit
    offset: $offset
    orderBy: $orderBy
    where: {otoken_eq: $token, chainId_eq: $chainId, timestamp_gte: $from, timestamp_lte: $to}
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

export const OTokenStatsConnectionDocument = `
    query oTokenStatsConnection($token: String!, $chainId: Int!, $orderBy: [OTokenDailyStatOrderByInput!] = [timestamp_DESC], $first: Int, $after: String, $from: DateTime) {
  oTokenDailyStatsConnection(
    orderBy: $orderBy
    where: {otoken_eq: $token, chainId_eq: $chainId, timestamp_gte: $from}
    first: $first
    after: $after
  ) {
    edges {
      node {
        ...DailyStat
      }
    }
    totalCount
  }
}
    ${DailyStatFragmentDoc}`;

export const useOTokenStatsConnectionQuery = <
      TData = OTokenStatsConnectionQuery,
      TError = unknown
    >(
      variables: OTokenStatsConnectionQueryVariables,
      options?: Omit<UseQueryOptions<OTokenStatsConnectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenStatsConnectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenStatsConnectionQuery, TError, TData>(
      {
    queryKey: ['oTokenStatsConnection', variables],
    queryFn: graphqlClient<OTokenStatsConnectionQuery, OTokenStatsConnectionQueryVariables>(OTokenStatsConnectionDocument, variables),
    ...options
  }
    )};

useOTokenStatsConnectionQuery.getKey = (variables: OTokenStatsConnectionQueryVariables) => ['oTokenStatsConnection', variables];


useOTokenStatsConnectionQuery.fetcher = (variables: OTokenStatsConnectionQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenStatsConnectionQuery, OTokenStatsConnectionQueryVariables>(OTokenStatsConnectionDocument, variables, options);

export const OTokenDailyStatByIdDocument = `
    query oTokenDailyStatById($id: String!) {
  oTokenDailyStatById(id: $id) {
    ...DailyStat
  }
}
    ${DailyStatFragmentDoc}`;

export const useOTokenDailyStatByIdQuery = <
      TData = OTokenDailyStatByIdQuery,
      TError = unknown
    >(
      variables: OTokenDailyStatByIdQueryVariables,
      options?: Omit<UseQueryOptions<OTokenDailyStatByIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenDailyStatByIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenDailyStatByIdQuery, TError, TData>(
      {
    queryKey: ['oTokenDailyStatById', variables],
    queryFn: graphqlClient<OTokenDailyStatByIdQuery, OTokenDailyStatByIdQueryVariables>(OTokenDailyStatByIdDocument, variables),
    ...options
  }
    )};

useOTokenDailyStatByIdQuery.getKey = (variables: OTokenDailyStatByIdQueryVariables) => ['oTokenDailyStatById', variables];


useOTokenDailyStatByIdQuery.fetcher = (variables: OTokenDailyStatByIdQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenDailyStatByIdQuery, OTokenDailyStatByIdQueryVariables>(OTokenDailyStatByIdDocument, variables, options);

export const OTokenRebasesDocument = `
    query oTokenRebases($token: String!, $chainId: Int!, $orderBy: [OTokenRebaseOrderByInput!] = [timestamp_DESC], $from: DateTime, $to: DateTime, $limit: Int = 5000) {
  oTokenRebases(
    limit: $limit
    orderBy: $orderBy
    where: {timestamp_gte: $from, timestamp_lte: $to, otoken_eq: $token, chainId_eq: $chainId}
  ) {
    blockNumber
    txHash
    timestamp
    fee
    feeETH
    feeUSD
    yield
    yieldETH
    yieldUSD
    totalSupply
  }
}
    `;

export const useOTokenRebasesQuery = <
      TData = OTokenRebasesQuery,
      TError = unknown
    >(
      variables: OTokenRebasesQueryVariables,
      options?: Omit<UseQueryOptions<OTokenRebasesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenRebasesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenRebasesQuery, TError, TData>(
      {
    queryKey: ['oTokenRebases', variables],
    queryFn: graphqlClient<OTokenRebasesQuery, OTokenRebasesQueryVariables>(OTokenRebasesDocument, variables),
    ...options
  }
    )};

useOTokenRebasesQuery.getKey = (variables: OTokenRebasesQueryVariables) => ['oTokenRebases', variables];


useOTokenRebasesQuery.fetcher = (variables: OTokenRebasesQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenRebasesQuery, OTokenRebasesQueryVariables>(OTokenRebasesDocument, variables, options);

export const OTokenStrategiesDocument = `
    query oTokenStrategies($chainId: Float!, $token: String!, $timestamp: String) {
  strategies(otoken: $token, chainId: $chainId, timestamp: $timestamp) {
    ...Strategy
  }
}
    ${StrategyFragmentDoc}`;

export const useOTokenStrategiesQuery = <
      TData = OTokenStrategiesQuery,
      TError = unknown
    >(
      variables: OTokenStrategiesQueryVariables,
      options?: Omit<UseQueryOptions<OTokenStrategiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenStrategiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenStrategiesQuery, TError, TData>(
      {
    queryKey: ['oTokenStrategies', variables],
    queryFn: graphqlClient<OTokenStrategiesQuery, OTokenStrategiesQueryVariables>(OTokenStrategiesDocument, variables),
    ...options
  }
    )};

useOTokenStrategiesQuery.getKey = (variables: OTokenStrategiesQueryVariables) => ['oTokenStrategies', variables];


useOTokenStrategiesQuery.fetcher = (variables: OTokenStrategiesQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenStrategiesQuery, OTokenStrategiesQueryVariables>(OTokenStrategiesDocument, variables, options);
