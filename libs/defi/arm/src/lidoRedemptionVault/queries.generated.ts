import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ArmDailyStatFragment = { __typename?: 'ArmDailyState', id: string, totalSupply: string, apy: number, totalAssets: string };

export type ArmDailyStatsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.ArmDailyStateOrderByInput> | Types.ArmDailyStateOrderByInput>;
}>;


export type ArmDailyStatsQuery = { __typename?: 'Query', armDailyStates: Array<{ __typename?: 'ArmDailyState', id: string, totalSupply: string, apy: number, totalAssets: string }> };


export const ArmDailyStatFragmentDoc = `
    fragment ArmDailyStat on ArmDailyState {
  id
  totalSupply
  apy
  totalAssets
}
    `;
export const ArmDailyStatsDocument = `
    query armDailyStats($limit: Int, $orderBy: [ArmDailyStateOrderByInput!] = [timestamp_DESC]) {
  armDailyStates(
    limit: $limit
    orderBy: $orderBy
    where: {address_containsInsensitive: "0x85B78AcA6Deae198fBF201c82DAF6Ca21942acc6", chainId_eq: 1}
  ) {
    ...ArmDailyStat
  }
}
    ${ArmDailyStatFragmentDoc}`;

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
