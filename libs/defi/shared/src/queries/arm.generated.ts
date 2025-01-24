import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ArmDailyStatsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.ArmDailyStatOrderByInput> | Types.ArmDailyStatOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ArmDailyStatsQuery = { __typename?: 'Query', armDailyStats: Array<{ __typename?: 'ArmDailyStat', id: string, timestamp: string, date: string, outstandingAssets1: string, totalSupply: string, apy: number, totalAssets: string, assetsPerShare: string, assets0: string, assets1: string }> };



export const ArmDailyStatsDocument = `
    query armDailyStats($limit: Int = 5000, $orderBy: [ArmDailyStatOrderByInput!] = [timestamp_DESC], $offset: Int = 1) {
  armDailyStats(
    limit: $limit
    orderBy: $orderBy
    offset: $offset
    where: {address_eq: "0x85b78aca6deae198fbf201c82daf6ca21942acc6", chainId_eq: 1}
  ) {
    id
    timestamp
    date
    outstandingAssets1
    totalSupply
    apy
    totalAssets
    assetsPerShare
    assets0
    assets1
  }
}
    `;

export const useArmDailyStatsQuery = <
      TData = ArmDailyStatsQuery,
      TError = unknown
    >(
      variables?: ArmDailyStatsQueryVariables,
      options?: Omit<UseQueryOptions<ArmDailyStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ArmDailyStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ArmDailyStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['armDailyStats'] : ['armDailyStats', variables],
    queryFn: graphqlClient<ArmDailyStatsQuery, ArmDailyStatsQueryVariables>(ArmDailyStatsDocument, variables),
    ...options
  }
    )};

useArmDailyStatsQuery.getKey = (variables?: ArmDailyStatsQueryVariables) => variables === undefined ? ['armDailyStats'] : ['armDailyStats', variables];


useArmDailyStatsQuery.fetcher = (variables?: ArmDailyStatsQueryVariables, options?: RequestInit['headers']) => graphqlClient<ArmDailyStatsQuery, ArmDailyStatsQueryVariables>(ArmDailyStatsDocument, variables, options);
