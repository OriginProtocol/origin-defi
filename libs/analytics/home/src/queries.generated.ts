import * as Types from '@origin/analytics/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/analytics/shared';
export type OgnStatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OgnStatsQuery = { __typename?: 'Query', ognDailyStats: Array<{ __typename?: 'OGNDailyStat', timestamp: string, totalSupply: string, totalSupplyUSD: number, totalStaked: string, tradingVolumeUSD: number, marketCapUSD: number, priceUSD: number, holdersOverThreshold: number }>, ognStats: { __typename?: 'OGNStatsResult', circulatingSupply: number, totalSupply: number } };

export type OgnDailyStatsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.OgnDailyStatOrderByInput> | Types.OgnDailyStatOrderByInput>;
}>;


export type OgnDailyStatsQuery = { __typename?: 'Query', ognDailyStats: Array<{ __typename?: 'OGNDailyStat', id: string, timestamp: string, priceUSD: number, marketCapUSD: number }> };

export type CumulativeRevenueQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type CumulativeRevenueQuery = { __typename?: 'Query', oeth: Array<{ __typename?: 'OTokenDailyStat', timestamp: string, blockNumber: number, fees: string, rateETH: string }>, ousd: Array<{ __typename?: 'OTokenDailyStat', timestamp: string, blockNumber: number, fees: string, rateETH: string }>, super: Array<{ __typename?: 'OTokenDailyStat', timestamp: string, blockNumber: number, fees: string, rateETH: string }> };



export const OgnStatsDocument = `
    query OgnStats {
  ognDailyStats(limit: 1, orderBy: [timestamp_DESC]) {
    timestamp
    totalSupply
    totalSupplyUSD
    totalStaked
    tradingVolumeUSD
    marketCapUSD
    priceUSD
    holdersOverThreshold
  }
  ognStats {
    circulatingSupply
    totalSupply
  }
}
    `;

export const useOgnStatsQuery = <
      TData = OgnStatsQuery,
      TError = unknown
    >(
      variables?: OgnStatsQueryVariables,
      options?: Omit<UseQueryOptions<OgnStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgnStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgnStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OgnStats'] : ['OgnStats', variables],
    queryFn: graphqlClient<OgnStatsQuery, OgnStatsQueryVariables>(OgnStatsDocument, variables),
    ...options
  }
    )};

useOgnStatsQuery.getKey = (variables?: OgnStatsQueryVariables) => variables === undefined ? ['OgnStats'] : ['OgnStats', variables];


useOgnStatsQuery.fetcher = (variables?: OgnStatsQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgnStatsQuery, OgnStatsQueryVariables>(OgnStatsDocument, variables, options);

export const OgnDailyStatsDocument = `
    query OgnDailyStats($limit: Int = 1000, $offset: Int, $orderBy: [OGNDailyStatOrderByInput!] = [timestamp_DESC]) {
  ognDailyStats(limit: $limit, offset: $offset, orderBy: $orderBy) {
    id
    timestamp
    priceUSD
    marketCapUSD
  }
}
    `;

export const useOgnDailyStatsQuery = <
      TData = OgnDailyStatsQuery,
      TError = unknown
    >(
      variables?: OgnDailyStatsQueryVariables,
      options?: Omit<UseQueryOptions<OgnDailyStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgnDailyStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgnDailyStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OgnDailyStats'] : ['OgnDailyStats', variables],
    queryFn: graphqlClient<OgnDailyStatsQuery, OgnDailyStatsQueryVariables>(OgnDailyStatsDocument, variables),
    ...options
  }
    )};

useOgnDailyStatsQuery.getKey = (variables?: OgnDailyStatsQueryVariables) => variables === undefined ? ['OgnDailyStats'] : ['OgnDailyStats', variables];


useOgnDailyStatsQuery.fetcher = (variables?: OgnDailyStatsQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgnDailyStatsQuery, OgnDailyStatsQueryVariables>(OgnDailyStatsDocument, variables, options);

export const CumulativeRevenueDocument = `
    query CumulativeRevenue($limit: Int = 5000) {
  oeth: oTokenDailyStats(
    limit: $limit
    orderBy: [timestamp_ASC]
    where: {otoken_eq: "0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3", chainId_eq: 1, timestamp_gte: "2023-06-01T00:00:00.000000Z"}
  ) {
    timestamp
    blockNumber
    fees
    rateETH
  }
  ousd: oTokenDailyStats(
    limit: $limit
    orderBy: [timestamp_ASC]
    where: {otoken_eq: "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86", chainId_eq: 1, timestamp_gte: "2023-06-01T00:00:00.000000Z"}
  ) {
    timestamp
    blockNumber
    fees
    rateETH
  }
  super: oTokenDailyStats(
    limit: $limit
    orderBy: [timestamp_ASC]
    where: {otoken_eq: "0xdbfefd2e8460a6ee4955a68582f85708baea60a3", chainId_eq: 8453, timestamp_gte: "2024-08-28T00:00:00.000000Z"}
  ) {
    timestamp
    blockNumber
    fees
    rateETH
  }
}
    `;

export const useCumulativeRevenueQuery = <
      TData = CumulativeRevenueQuery,
      TError = unknown
    >(
      variables?: CumulativeRevenueQueryVariables,
      options?: Omit<UseQueryOptions<CumulativeRevenueQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CumulativeRevenueQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CumulativeRevenueQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['CumulativeRevenue'] : ['CumulativeRevenue', variables],
    queryFn: graphqlClient<CumulativeRevenueQuery, CumulativeRevenueQueryVariables>(CumulativeRevenueDocument, variables),
    ...options
  }
    )};

useCumulativeRevenueQuery.getKey = (variables?: CumulativeRevenueQueryVariables) => variables === undefined ? ['CumulativeRevenue'] : ['CumulativeRevenue', variables];


useCumulativeRevenueQuery.fetcher = (variables?: CumulativeRevenueQueryVariables, options?: RequestInit['headers']) => graphqlClient<CumulativeRevenueQuery, CumulativeRevenueQueryVariables>(CumulativeRevenueDocument, variables, options);
