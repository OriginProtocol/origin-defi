import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OethDailyYieldQueryVariables = Types.Exact<{
  start: Types.Scalars['DateTime']['input'];
}>;


export type OethDailyYieldQuery = { __typename?: 'Query', oethDailyStats: Array<{ __typename?: 'OETHDailyStat', yieldETH: string, yieldETH7Day: string, yieldETHAllTime: string }> };



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
