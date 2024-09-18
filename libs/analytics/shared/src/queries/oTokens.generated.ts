import * as Types from '@origin/analytics/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/analytics/shared';
export type OTokenStatsQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.OTokenDailyStatOrderByInput> | Types.OTokenDailyStatOrderByInput>;
  from?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;


export type OTokenStatsQuery = { __typename?: 'Query', oTokenDailyStats: Array<{ __typename?: 'OTokenDailyStat', id: string, timestamp: string, totalSupply: string, apy: number, apy7: number, apy14: number, apy30: number, rateETH: string, rateUSD: string, rebasingSupply: string, nonRebasingSupply: string, wrappedSupply: string, amoSupply?: string | null, yield: string, fees: string }> };

export type OTokenStatsConnectionQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
  orderBy?: Types.InputMaybe<Array<Types.OTokenDailyStatOrderByInput> | Types.OTokenDailyStatOrderByInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type OTokenStatsConnectionQuery = { __typename?: 'Query', oTokenDailyStatsConnection: { __typename?: 'OTokenDailyStatsConnection', totalCount: number, edges: Array<{ __typename?: 'OTokenDailyStatEdge', node: { __typename?: 'OTokenDailyStat', id: string, timestamp: string, rebasingSupply: string, yield: string, fees: string, apy: number } }> } };



export const OTokenStatsDocument = `
    query oTokenStats($token: String!, $chainId: Int!, $limit: Int, $orderBy: [OTokenDailyStatOrderByInput!] = [timestamp_DESC], $from: DateTime) {
  oTokenDailyStats(
    limit: $limit
    orderBy: $orderBy
    where: {otoken_containsInsensitive: $token, chainId_eq: $chainId, timestamp_gte: $from}
  ) {
    id
    timestamp
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
  }
}
    `;

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
    query oTokenStatsConnection($token: String!, $chainId: Int!, $orderBy: [OTokenDailyStatOrderByInput!] = [timestamp_DESC], $first: Int, $after: String) {
  oTokenDailyStatsConnection(
    orderBy: $orderBy
    where: {otoken_containsInsensitive: $token, chainId_eq: $chainId}
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        timestamp
        rebasingSupply
        yield
        fees
        apy
      }
    }
    totalCount
  }
}
    `;

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
