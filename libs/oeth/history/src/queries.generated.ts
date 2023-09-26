import { graphqlClient } from '@origin/oeth/shared';
import { useQuery } from '@tanstack/react-query';

import type * as Types from '@origin/oeth/shared';
import type { UseQueryOptions } from '@tanstack/react-query';
export type HistoryTableQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  offset: Types.Scalars['Int']['input'];
}>;

export type HistoryTableQuery = {
  __typename?: 'Query';
  addressById?: {
    __typename?: 'Address';
    balance: number;
    earned: number;
    isContract: boolean;
    rebasingOption: string;
    lastUpdated: any;
    history: Array<{
      __typename?: 'History';
      type: string;
      value: number;
      txHash: string;
      timestamp: any;
      balance: number;
    }>;
  } | null;
};

export type HistoryTableWithFiltersQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  offset: Types.Scalars['Int']['input'];
  filters?: Types.InputMaybe<
    Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']
  >;
}>;

export type HistoryTableWithFiltersQuery = {
  __typename?: 'Query';
  addressById?: {
    __typename?: 'Address';
    balance: number;
    earned: number;
    isContract: boolean;
    rebasingOption: string;
    credits: any;
    lastUpdated: any;
    history: Array<{
      __typename?: 'History';
      type: string;
      value: number;
      txHash: string;
      timestamp: any;
      balance: number;
    }>;
  } | null;
};

export type HistoryApyQueryVariables = Types.Exact<{ [key: string]: never }>;

export type HistoryApyQuery = {
  __typename?: 'Query';
  apies: Array<{ __typename?: 'APY'; apy7DayAvg: number; apy30DayAvg: number }>;
};

export const HistoryTableDocument = `
    query HistoryTable($address: String!, $offset: Int!) {
  addressById(id: $address) {
    balance
    earned
    isContract
    rebasingOption
    lastUpdated
    history(limit: 20, orderBy: timestamp_DESC, offset: $offset) {
      type
      value
      txHash
      timestamp
      balance
    }
  }
}
    `;
export const useHistoryTableQuery = <
  TData = HistoryTableQuery,
  TError = unknown,
>(
  variables: HistoryTableQueryVariables,
  options?: UseQueryOptions<HistoryTableQuery, TError, TData>,
) =>
  useQuery<HistoryTableQuery, TError, TData>(
    ['HistoryTable', variables],
    graphqlClient<HistoryTableQuery, HistoryTableQueryVariables>(
      HistoryTableDocument,
      variables,
    ),
    options,
  );

useHistoryTableQuery.getKey = (variables: HistoryTableQueryVariables) => [
  'HistoryTable',
  variables,
];
useHistoryTableQuery.fetcher = (
  variables: HistoryTableQueryVariables,
  options?: RequestInit['headers'],
) =>
  graphqlClient<HistoryTableQuery, HistoryTableQueryVariables>(
    HistoryTableDocument,
    variables,
    options,
  );
export const HistoryTableWithFiltersDocument = `
    query HistoryTableWithFilters($address: String!, $offset: Int!, $filters: [String!]) {
  addressById(id: $address) {
    balance
    earned
    isContract
    rebasingOption
    credits
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
export const useHistoryTableWithFiltersQuery = <
  TData = HistoryTableWithFiltersQuery,
  TError = unknown,
>(
  variables: HistoryTableWithFiltersQueryVariables,
  options?: UseQueryOptions<HistoryTableWithFiltersQuery, TError, TData>,
) =>
  useQuery<HistoryTableWithFiltersQuery, TError, TData>(
    ['HistoryTableWithFilters', variables],
    graphqlClient<
      HistoryTableWithFiltersQuery,
      HistoryTableWithFiltersQueryVariables
    >(HistoryTableWithFiltersDocument, variables),
    options,
  );

useHistoryTableWithFiltersQuery.getKey = (
  variables: HistoryTableWithFiltersQueryVariables,
) => ['HistoryTableWithFilters', variables];
useHistoryTableWithFiltersQuery.fetcher = (
  variables: HistoryTableWithFiltersQueryVariables,
  options?: RequestInit['headers'],
) =>
  graphqlClient<
    HistoryTableWithFiltersQuery,
    HistoryTableWithFiltersQueryVariables
  >(HistoryTableWithFiltersDocument, variables, options);
export const HistoryApyDocument = `
    query HistoryApy {
  apies(limit: 1, orderBy: timestamp_DESC) {
    apy7DayAvg
    apy30DayAvg
  }
}
    `;
export const useHistoryApyQuery = <TData = HistoryApyQuery, TError = unknown>(
  variables?: HistoryApyQueryVariables,
  options?: UseQueryOptions<HistoryApyQuery, TError, TData>,
) =>
  useQuery<HistoryApyQuery, TError, TData>(
    variables === undefined ? ['HistoryApy'] : ['HistoryApy', variables],
    graphqlClient<HistoryApyQuery, HistoryApyQueryVariables>(
      HistoryApyDocument,
      variables,
    ),
    options,
  );

useHistoryApyQuery.getKey = (variables?: HistoryApyQueryVariables) =>
  variables === undefined ? ['HistoryApy'] : ['HistoryApy', variables];
useHistoryApyQuery.fetcher = (
  variables?: HistoryApyQueryVariables,
  options?: RequestInit['headers'],
) =>
  graphqlClient<HistoryApyQuery, HistoryApyQueryVariables>(
    HistoryApyDocument,
    variables,
    options,
  );
