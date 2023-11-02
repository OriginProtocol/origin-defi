import * as Types from '@origin/oeth/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/oeth/shared';
export type HistoryPageQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  offset: Types.Scalars['Int']['input'];
  filters?: Types.InputMaybe<Array<Types.HistoryType> | Types.HistoryType>;
}>;


export type HistoryPageQuery = { __typename?: 'Query', oethAddresses: Array<{ __typename?: 'OETHAddress', balance: string, earned: string, isContract: boolean, rebasingOption: Types.RebasingOption, lastUpdated: string, history: Array<{ __typename?: 'OETHHistory', type: Types.HistoryType, value: string, txHash: string, timestamp: string, balance: string }> }> };

export type HistoryApyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HistoryApyQuery = { __typename?: 'Query', oethapies: Array<{ __typename?: 'OETHAPY', apy7DayAvg: number, apy30DayAvg: number }> };


export const HistoryPageDocument = `
    query HistoryPage($address: String!, $offset: Int!, $filters: [HistoryType!]) {
  oethAddresses(where: {id_containsInsensitive: $address}) {
    balance
    earned
    isContract
    rebasingOption
    lastUpdated
    history(
      limit: 20
      orderBy: timestamp_DESC
      offset: $offset
      where: {type_in: $filters}
    ) {
      type
      value
      txHash
      timestamp
      balance
    }
  }
}
    `;
export const useHistoryPageQuery = <
      TData = HistoryPageQuery,
      TError = unknown
    >(
      variables: HistoryPageQueryVariables,
      options?: UseQueryOptions<HistoryPageQuery, TError, TData>
    ) =>
    useQuery<HistoryPageQuery, TError, TData>(
      ['HistoryPage', variables],
      graphqlClient<HistoryPageQuery, HistoryPageQueryVariables>(HistoryPageDocument, variables),
      options
    );

useHistoryPageQuery.getKey = (variables: HistoryPageQueryVariables) => ['HistoryPage', variables];
;

useHistoryPageQuery.fetcher = (variables: HistoryPageQueryVariables, options?: RequestInit['headers']) => graphqlClient<HistoryPageQuery, HistoryPageQueryVariables>(HistoryPageDocument, variables, options);
export const HistoryApyDocument = `
    query HistoryApy {
  oethapies(limit: 1, orderBy: timestamp_DESC) {
    apy7DayAvg
    apy30DayAvg
  }
}
    `;
export const useHistoryApyQuery = <
      TData = HistoryApyQuery,
      TError = unknown
    >(
      variables?: HistoryApyQueryVariables,
      options?: UseQueryOptions<HistoryApyQuery, TError, TData>
    ) =>
    useQuery<HistoryApyQuery, TError, TData>(
      variables === undefined ? ['HistoryApy'] : ['HistoryApy', variables],
      graphqlClient<HistoryApyQuery, HistoryApyQueryVariables>(HistoryApyDocument, variables),
      options
    );

useHistoryApyQuery.getKey = (variables?: HistoryApyQueryVariables) => variables === undefined ? ['HistoryApy'] : ['HistoryApy', variables];
;

useHistoryApyQuery.fetcher = (variables?: HistoryApyQueryVariables, options?: RequestInit['headers']) => graphqlClient<HistoryApyQuery, HistoryApyQueryVariables>(HistoryApyDocument, variables, options);