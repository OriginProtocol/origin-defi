import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type TransfersQueryVariables = Types.Exact<{
  tokens?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  account: Types.Scalars['String']['input'];
}>;


export type TransfersQuery = { __typename?: 'Query', erc20Transfers: Array<{ __typename?: 'ERC20Transfer', id: string, chainId: number, txHash: string, blockNumber: number, timestamp: string, address: string, from: string, to: string, value: string }> };

export type BalancesQueryVariables = Types.Exact<{
  tokens?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  account: Types.Scalars['String']['input'];
  blocks?: Types.InputMaybe<Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input']>;
}>;


export type BalancesQuery = { __typename?: 'Query', erc20Balances: Array<{ __typename?: 'ERC20Balance', id: string, chainId: number, blockNumber: number, timestamp: string, address: string, account: string, balance: string }> };



export const TransfersDocument = `
    query Transfers($tokens: [String!], $account: String!) {
  erc20Transfers(
    orderBy: timestamp_DESC
    offset: 0
    limit: 2000
    where: {OR: {address_in: $tokens, from_containsInsensitive: $account}, address_in: $tokens, to_containsInsensitive: $account}
  ) {
    id
    chainId
    txHash
    blockNumber
    timestamp
    address
    from
    to
    value
  }
}
    `;

export const useTransfersQuery = <
      TData = TransfersQuery,
      TError = unknown
    >(
      variables: TransfersQueryVariables,
      options?: Omit<UseQueryOptions<TransfersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<TransfersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<TransfersQuery, TError, TData>(
      {
    queryKey: ['Transfers', variables],
    queryFn: graphqlClient<TransfersQuery, TransfersQueryVariables>(TransfersDocument, variables),
    ...options
  }
    )};

useTransfersQuery.getKey = (variables: TransfersQueryVariables) => ['Transfers', variables];


useTransfersQuery.fetcher = (variables: TransfersQueryVariables, options?: RequestInit['headers']) => graphqlClient<TransfersQuery, TransfersQueryVariables>(TransfersDocument, variables, options);

export const BalancesDocument = `
    query Balances($tokens: [String!], $account: String!, $blocks: [Int!]) {
  erc20Balances(
    where: {address_in: $tokens, account_containsInsensitive: $account, blockNumber_in: $blocks}
  ) {
    id
    chainId
    blockNumber
    timestamp
    address
    account
    balance
  }
}
    `;

export const useBalancesQuery = <
      TData = BalancesQuery,
      TError = unknown
    >(
      variables: BalancesQueryVariables,
      options?: Omit<UseQueryOptions<BalancesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BalancesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BalancesQuery, TError, TData>(
      {
    queryKey: ['Balances', variables],
    queryFn: graphqlClient<BalancesQuery, BalancesQueryVariables>(BalancesDocument, variables),
    ...options
  }
    )};

useBalancesQuery.getKey = (variables: BalancesQueryVariables) => ['Balances', variables];


useBalancesQuery.fetcher = (variables: BalancesQueryVariables, options?: RequestInit['headers']) => graphqlClient<BalancesQuery, BalancesQueryVariables>(BalancesDocument, variables, options);
