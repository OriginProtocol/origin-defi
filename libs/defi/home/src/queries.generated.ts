import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ProductCardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductCardQuery = { __typename?: 'Query', oethDailyStats: Array<{ __typename?: 'OETHDailyStat', apy30DayAvg: number, totalSupply: string }>, ousds: Array<{ __typename?: 'OUSD', totalSupply: string }>, ousdapies: Array<{ __typename?: 'OUSDAPY', apy30DayAvg: number }> };



export const ProductCardDocument = `
    query ProductCard {
  oethDailyStats(limit: 1, orderBy: timestamp_DESC) {
    apy30DayAvg
    totalSupply
  }
  ousds(limit: 1, orderBy: timestamp_DESC) {
    totalSupply
  }
  ousdapies(limit: 1, orderBy: timestamp_DESC) {
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
