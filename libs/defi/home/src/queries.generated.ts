import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ProductCardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductCardQuery = { __typename?: 'Query', oethDailyStats: Array<{ __typename?: 'OETHDailyStat', apy30DayAvg: number, totalSupply: string }>, oTokens: Array<{ __typename?: 'OToken', totalSupply: string }>, oTokenApies: Array<{ __typename?: 'OTokenAPY', apy30DayAvg: number }> };



export const ProductCardDocument = `
    query ProductCard {
  oethDailyStats(limit: 1, orderBy: timestamp_DESC) {
    apy30DayAvg
    totalSupply
  }
  oTokens(
    limit: 1
    orderBy: timestamp_DESC
    where: {chainId_eq: 1, otoken_eq: "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86"}
  ) {
    totalSupply
  }
  oTokenApies(
    limit: 1
    orderBy: timestamp_DESC
    where: {chainId_eq: 1, otoken_eq: "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86"}
  ) {
    apy30DayAvg
  }
}
    `;

export const useProductCardQuery = <
      TData = ProductCardQuery,
      TError = unknown
    >(
      variables?: ProductCardQueryVariables,
      options?: Omit<UseQueryOptions<ProductCardQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProductCardQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProductCardQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ProductCard'] : ['ProductCard', variables],
    queryFn: graphqlClient<ProductCardQuery, ProductCardQueryVariables>(ProductCardDocument, variables),
    ...options
  }
    )};

useProductCardQuery.getKey = (variables?: ProductCardQueryVariables) => variables === undefined ? ['ProductCard'] : ['ProductCard', variables];


useProductCardQuery.fetcher = (variables?: ProductCardQueryVariables, options?: RequestInit['headers']) => graphqlClient<ProductCardQuery, ProductCardQueryVariables>(ProductCardDocument, variables, options);
