import * as Types from '@origin/analytics/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/analytics/shared';
export type WrappedOethByDayQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WrappedOethByDayQuery = { __typename?: 'Query', arbitrum: Array<{ __typename?: 'ERC20StateByDay', day: string, totalSupply: string }>, base: Array<{ __typename?: 'ERC20StateByDay', day: string, totalSupply: string }>, oTokenDailyStats: Array<{ __typename?: 'OTokenDailyStat', date: string, rateWrapped: string }> };



export const WrappedOethByDayDocument = `
    query WrappedOETHByDay {
  arbitrum: erc20StateByDay(
    address: "0xd8724322f44e5c58d7a815f542036fb17dbbf839"
    from: "2024-02-07"
    chainId: 42161
  ) {
    day
    totalSupply
  }
  base: erc20StateByDay(
    address: "0xd8724322f44e5c58d7a815f542036fb17dbbf839"
    from: "2024-02-07"
    chainId: 8453
  ) {
    day
    totalSupply
  }
  oTokenDailyStats(
    orderBy: timestamp_ASC
    limit: 5000
    where: {otoken_eq: "0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3", timestamp_gte: "2024-02-07T00:00:00Z", chainId_eq: 1}
  ) {
    date
    rateWrapped
  }
}
    `;

export const useWrappedOethByDayQuery = <
      TData = WrappedOethByDayQuery,
      TError = unknown
    >(
      variables?: WrappedOethByDayQueryVariables,
      options?: Omit<UseQueryOptions<WrappedOethByDayQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WrappedOethByDayQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WrappedOethByDayQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['WrappedOETHByDay'] : ['WrappedOETHByDay', variables],
    queryFn: graphqlClient<WrappedOethByDayQuery, WrappedOethByDayQueryVariables>(WrappedOethByDayDocument, variables),
    ...options
  }
    )};

useWrappedOethByDayQuery.getKey = (variables?: WrappedOethByDayQueryVariables) => variables === undefined ? ['WrappedOETHByDay'] : ['WrappedOETHByDay', variables];


useWrappedOethByDayQuery.fetcher = (variables?: WrappedOethByDayQueryVariables, options?: RequestInit['headers']) => graphqlClient<WrappedOethByDayQuery, WrappedOethByDayQueryVariables>(WrappedOethByDayDocument, variables, options);
