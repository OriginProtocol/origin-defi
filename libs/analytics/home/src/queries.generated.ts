import * as Types from '@origin/analytics/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/analytics/shared';
export type CumulativeRevenueQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CumulativeRevenueQuery = { __typename?: 'Query', oeth: Array<{ __typename?: 'OTokenDailyStat', timestamp: string, blockNumber: number, fees: string, rateETH: string }>, ousd: Array<{ __typename?: 'OTokenDailyStat', timestamp: string, blockNumber: number, fees: string, rateETH: string }>, super: Array<{ __typename?: 'OTokenDailyStat', timestamp: string, blockNumber: number, fees: string, rateETH: string }> };



export const CumulativeRevenueDocument = `
    query CumulativeRevenue {
  oeth: oTokenDailyStats(
    orderBy: [timestamp_ASC]
    where: {otoken_containsInsensitive: "0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3", chainId_eq: 1, timestamp_gte: "2023-06-01T00:00:00.000000Z"}
  ) {
    timestamp
    blockNumber
    fees
    rateETH
  }
  ousd: oTokenDailyStats(
    orderBy: [timestamp_ASC]
    where: {otoken_containsInsensitive: "0x2A8e1E676Ec238d8A992307B495b45B3fEAa5e86", chainId_eq: 1, timestamp_gte: "2023-06-01T00:00:00.000000Z"}
  ) {
    timestamp
    blockNumber
    fees
    rateETH
  }
  super: oTokenDailyStats(
    orderBy: [timestamp_ASC]
    where: {otoken_containsInsensitive: "0xdbfefd2e8460a6ee4955a68582f85708baea60a3", chainId_eq: 8453, timestamp_gte: "2024-08-28T00:00:00.000000Z"}
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
