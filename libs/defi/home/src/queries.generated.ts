import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ProductCardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductCardQuery = { __typename?: 'Query', oethDailyStats: Array<{ __typename?: 'OETHDailyStat', apy30DayAvg: number, strategies: Array<{ __typename?: 'OETHStrategyDailyStat', tvl: string }> }> };


export const ProductCardDocument = `
    query ProductCard {
  oethDailyStats(limit: 1, orderBy: timestamp_DESC) {
    apy30DayAvg
    strategies {
      tvl
    }
  }
}
    `;
export const useProductCardQuery = <
      TData = ProductCardQuery,
      TError = unknown
    >(
      variables?: ProductCardQueryVariables,
      options?: UseQueryOptions<ProductCardQuery, TError, TData>
    ) =>
    useQuery<ProductCardQuery, TError, TData>(
      variables === undefined ? ['ProductCard'] : ['ProductCard', variables],
      graphqlClient<ProductCardQuery, ProductCardQueryVariables>(ProductCardDocument, variables),
      options
    );

useProductCardQuery.getKey = (variables?: ProductCardQueryVariables) => variables === undefined ? ['ProductCard'] : ['ProductCard', variables];
;

useProductCardQuery.fetcher = (variables?: ProductCardQueryVariables, options?: RequestInit['headers']) => graphqlClient<ProductCardQuery, ProductCardQueryVariables>(ProductCardDocument, variables, options);