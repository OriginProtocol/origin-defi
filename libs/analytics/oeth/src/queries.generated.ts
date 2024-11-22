import * as Types from '@origin/analytics/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/analytics/shared';
export type WoethArbitrumByDayQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WoethArbitrumByDayQuery = { __typename?: 'Query', arbitrum: Array<{ __typename?: 'ERC20StateByDay', day: string, totalSupply: string }>, base: Array<{ __typename?: 'ERC20StateByDay', day: string, totalSupply: string }> };



export const WoethArbitrumByDayDocument = `
    query WoethArbitrumByDay {
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
}
    `;

export const useWoethArbitrumByDayQuery = <
      TData = WoethArbitrumByDayQuery,
      TError = unknown
    >(
      variables?: WoethArbitrumByDayQueryVariables,
      options?: Omit<UseQueryOptions<WoethArbitrumByDayQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WoethArbitrumByDayQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WoethArbitrumByDayQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['WoethArbitrumByDay'] : ['WoethArbitrumByDay', variables],
    queryFn: graphqlClient<WoethArbitrumByDayQuery, WoethArbitrumByDayQueryVariables>(WoethArbitrumByDayDocument, variables),
    ...options
  }
    )};

useWoethArbitrumByDayQuery.getKey = (variables?: WoethArbitrumByDayQueryVariables) => variables === undefined ? ['WoethArbitrumByDay'] : ['WoethArbitrumByDay', variables];


useWoethArbitrumByDayQuery.fetcher = (variables?: WoethArbitrumByDayQueryVariables, options?: RequestInit['headers']) => graphqlClient<WoethArbitrumByDayQuery, WoethArbitrumByDayQueryVariables>(WoethArbitrumByDayDocument, variables, options);
