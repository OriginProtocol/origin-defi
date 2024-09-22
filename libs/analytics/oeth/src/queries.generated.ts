import * as Types from '@origin/analytics/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/analytics/shared';
export type OethStrategiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OethStrategiesQuery = { __typename?: 'Query', today: Array<{ __typename?: 'OETHDailyStat', id: string, blockNumber: number, timestamp: string, totalSupply: string, dripperWETH: string, strategies: Array<{ __typename?: 'OETHStrategyDailyStat', name: string, holdings: Array<{ __typename?: 'OETHStrategyHoldingDailyStat', symbol: string, value: string }> }> }>, lastWeek: Array<{ __typename?: 'OETHDailyStat', id: string, blockNumber: number, timestamp: string, totalSupply: string, dripperWETH: string, strategies: Array<{ __typename?: 'OETHStrategyDailyStat', name: string, holdings: Array<{ __typename?: 'OETHStrategyHoldingDailyStat', symbol: string, value: string }> }> }> };

export type AnalyticsOethStrategiesQueryVariables = Types.Exact<{
  today: Types.Scalars['String']['input'];
  lastWeek: Types.Scalars['String']['input'];
}>;


export type AnalyticsOethStrategiesQuery = { __typename?: 'Query', todayStrategies: Array<{ __typename?: 'Strategy', name: string, kind: string, balances: Array<{ __typename?: 'Balance', balance: string }> }>, lastWeekStrategies: Array<{ __typename?: 'Strategy', name: string, kind: string, balances: Array<{ __typename?: 'Balance', balance: string }> }> };



export const OethStrategiesDocument = `
    query oethStrategies {
  today: oethDailyStats(orderBy: timestamp_DESC, limit: 1) {
    id
    blockNumber
    timestamp
    totalSupply
    dripperWETH
    strategies {
      name
      holdings {
        symbol
        value
      }
    }
  }
  lastWeek: oethDailyStats(orderBy: timestamp_DESC, limit: 1, offset: 7) {
    id
    blockNumber
    timestamp
    totalSupply
    dripperWETH
    strategies {
      name
      holdings {
        symbol
        value
      }
    }
  }
}
    `;

export const useOethStrategiesQuery = <
      TData = OethStrategiesQuery,
      TError = unknown
    >(
      variables?: OethStrategiesQueryVariables,
      options?: Omit<UseQueryOptions<OethStrategiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OethStrategiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OethStrategiesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['oethStrategies'] : ['oethStrategies', variables],
    queryFn: graphqlClient<OethStrategiesQuery, OethStrategiesQueryVariables>(OethStrategiesDocument, variables),
    ...options
  }
    )};

useOethStrategiesQuery.getKey = (variables?: OethStrategiesQueryVariables) => variables === undefined ? ['oethStrategies'] : ['oethStrategies', variables];


useOethStrategiesQuery.fetcher = (variables?: OethStrategiesQueryVariables, options?: RequestInit['headers']) => graphqlClient<OethStrategiesQuery, OethStrategiesQueryVariables>(OethStrategiesDocument, variables, options);

export const AnalyticsOethStrategiesDocument = `
    query analyticsOethStrategies($today: String!, $lastWeek: String!) {
  todayStrategies: strategies(timestamp: $today) {
    name
    kind
    balances {
      balance
    }
  }
  lastWeekStrategies: strategies(timestamp: $lastWeek) {
    name
    kind
    balances {
      balance
    }
  }
}
    `;

export const useAnalyticsOethStrategiesQuery = <
      TData = AnalyticsOethStrategiesQuery,
      TError = unknown
    >(
      variables: AnalyticsOethStrategiesQueryVariables,
      options?: Omit<UseQueryOptions<AnalyticsOethStrategiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AnalyticsOethStrategiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AnalyticsOethStrategiesQuery, TError, TData>(
      {
    queryKey: ['analyticsOethStrategies', variables],
    queryFn: graphqlClient<AnalyticsOethStrategiesQuery, AnalyticsOethStrategiesQueryVariables>(AnalyticsOethStrategiesDocument, variables),
    ...options
  }
    )};

useAnalyticsOethStrategiesQuery.getKey = (variables: AnalyticsOethStrategiesQueryVariables) => ['analyticsOethStrategies', variables];


useAnalyticsOethStrategiesQuery.fetcher = (variables: AnalyticsOethStrategiesQueryVariables, options?: RequestInit['headers']) => graphqlClient<AnalyticsOethStrategiesQuery, AnalyticsOethStrategiesQueryVariables>(AnalyticsOethStrategiesDocument, variables, options);
