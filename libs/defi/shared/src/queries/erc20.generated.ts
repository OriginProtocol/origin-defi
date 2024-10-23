import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type HolderCountQueryVariables = Types.Exact<{
  chainId: Types.Scalars['Int']['input'];
  token: Types.Scalars['String']['input'];
}>;


export type HolderCountQuery = { __typename?: 'Query', erc20HoldersConnection: { __typename?: 'ERC20HoldersConnection', totalCount: number } };

export type TransfersQueryVariables = Types.Exact<{
  tokens?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  account: Types.Scalars['String']['input'];
}>;


export type TransfersQuery = { __typename?: 'Query', erc20Transfers: Array<{ __typename?: 'ERC20Transfer', id: string, chainId: number, txHash: string, blockNumber: number, timestamp: string, address: string, from: string, to: string, value: string, fromBalance: string, toBalance: string }> };

export type BalancesQueryVariables = Types.Exact<{
  tokens?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  account: Types.Scalars['String']['input'];
  blocks?: Types.InputMaybe<Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input']>;
}>;


export type BalancesQuery = { __typename?: 'Query', erc20Balances: Array<{ __typename?: 'ERC20Balance', id: string, chainId: number, blockNumber: number, timestamp: string, address: string, account: string, balance: string }> };



export const HolderCountDocument = `
    query HolderCount($chainId: Int!, $token: String!) {
  erc20HoldersConnection(
    orderBy: id_ASC
    where: {address_eq: $token, chainId_eq: $chainId, balance_gt: 0}
  ) {
    totalCount
  }
}
    `;

export const useHolderCountQuery = <
      TData = HolderCountQuery,
      TError = unknown
    >(
      variables: HolderCountQueryVariables,
      options?: Omit<UseQueryOptions<HolderCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<HolderCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<HolderCountQuery, TError, TData>(
      {
    queryKey: ['HolderCount', variables],
    queryFn: graphqlClient<HolderCountQuery, HolderCountQueryVariables>(HolderCountDocument, variables),
    ...options
  }
    )};

useHolderCountQuery.getKey = (variables: HolderCountQueryVariables) => ['HolderCount', variables];


useHolderCountQuery.fetcher = (variables: HolderCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<HolderCountQuery, HolderCountQueryVariables>(HolderCountDocument, variables, options);

export const TransfersDocument = `
    query Transfers($tokens: [String!], $account: String!) {
  erc20Transfers(
    orderBy: timestamp_DESC
    offset: 0
    limit: 2000
    where: {OR: {address_in: $tokens, from_eq: $account}, address_in: $tokens, to_eq: $account}
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
    fromBalance
    toBalance
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
    where: {address_in: $tokens, account_eq: $account, blockNumber_in: $blocks}
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
