import * as Types from '@origin/oeth/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/oeth/shared';
export type HistoryTableQueryVariables = Types.Exact<{
  addressId: Types.Scalars['String']['input'];
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
  addressId: Types.Scalars['String']['input'];
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

export const HistoryTableDocument = `
    query HistoryTable($addressId: String!, $offset: Int!) {
  addressById(id: $addressId) {
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
export const HistoryTableWithFiltersDocument = `
    query HistoryTableWithFilters($addressId: String!, $offset: Int!, $filters: [String!]) {
  addressById(id: $addressId) {
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
