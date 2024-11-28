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
