import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OusdDailyYieldQueryVariables = Types.Exact<{
  start: Types.Scalars['DateTime']['input'];
}>;


export type OusdDailyYieldQuery = { __typename?: 'Query', ousdDailyStats: Array<{ __typename?: 'OUSDDailyStat', yieldETH: string, yieldETH7Day: string, yieldETHAllTime: string }> };



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
