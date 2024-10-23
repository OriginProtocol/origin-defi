import * as Types from '@origin/prime/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/prime/shared';
export type UserActiveRequestsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserActiveRequestsQuery = { __typename?: 'Query', lrtWithdrawalRequests: Array<{ __typename?: 'LRTWithdrawalRequest', id: string }> };

export type UserWithdrawalsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserWithdrawalsQuery = { __typename?: 'Query', lrtWithdrawalRequests: Array<{ __typename?: 'LRTWithdrawalRequest', id: string, blockNumber: number, timestamp: string, status: Types.LrtWithdrawalStatus, assetAmount: string, primeETHAmount: string, asset: string, withdrawal: { __typename?: 'LRTWithdrawal', id: string, shares?: Array<string> | null, staker: string, delegatedTo: string, withdrawer: string, nonce: string, strategies?: Array<string> | null, startBlock: number } }> };



export const UserActiveRequestsDocument = `
    query UserActiveRequests($address: String!) {
  lrtWithdrawalRequests(where: {withdrawer_eq: $address, status_in: [Requested]}) {
    id
  }
}
    `;

export const useUserActiveRequestsQuery = <
      TData = UserActiveRequestsQuery,
      TError = unknown
    >(
      variables: UserActiveRequestsQueryVariables,
      options?: Omit<UseQueryOptions<UserActiveRequestsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserActiveRequestsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserActiveRequestsQuery, TError, TData>(
      {
    queryKey: ['UserActiveRequests', variables],
    queryFn: graphqlClient<UserActiveRequestsQuery, UserActiveRequestsQueryVariables>(UserActiveRequestsDocument, variables),
    ...options
  }
    )};

useUserActiveRequestsQuery.getKey = (variables: UserActiveRequestsQueryVariables) => ['UserActiveRequests', variables];


useUserActiveRequestsQuery.fetcher = (variables: UserActiveRequestsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserActiveRequestsQuery, UserActiveRequestsQueryVariables>(UserActiveRequestsDocument, variables, options);

export const UserWithdrawalsDocument = `
    query UserWithdrawals($address: String!) {
  lrtWithdrawalRequests(
    where: {withdrawer_eq: $address}
    orderBy: [timestamp_DESC]
  ) {
    id
    blockNumber
    timestamp
    status
    assetAmount
    primeETHAmount
    asset
    withdrawal {
      id
      shares
      staker
      delegatedTo
      withdrawer
      nonce
      strategies
      startBlock
    }
  }
}
    `;

export const useUserWithdrawalsQuery = <
      TData = UserWithdrawalsQuery,
      TError = unknown
    >(
      variables: UserWithdrawalsQueryVariables,
      options?: Omit<UseQueryOptions<UserWithdrawalsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserWithdrawalsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserWithdrawalsQuery, TError, TData>(
      {
    queryKey: ['UserWithdrawals', variables],
    queryFn: graphqlClient<UserWithdrawalsQuery, UserWithdrawalsQueryVariables>(UserWithdrawalsDocument, variables),
    ...options
  }
    )};

useUserWithdrawalsQuery.getKey = (variables: UserWithdrawalsQueryVariables) => ['UserWithdrawals', variables];


useUserWithdrawalsQuery.fetcher = (variables: UserWithdrawalsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserWithdrawalsQuery, UserWithdrawalsQueryVariables>(UserWithdrawalsDocument, variables, options);
