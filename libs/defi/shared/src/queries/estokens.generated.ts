import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type EsTokenUserLockupsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
}>;


export type EsTokenUserLockupsQuery = { __typename?: 'Query', esLockups: Array<{ __typename?: 'ESLockup', id: string, lockupId: string, amount: string, end: string, penalty: string, withdrawAmount: string, points: string, timestamp: string, state?: Types.EsLockupState | null }> };

export type EsTokenAccountQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  token: Types.Scalars['String']['input'];
  chainId: Types.Scalars['Int']['input'];
}>;


export type EsTokenAccountQuery = { __typename?: 'Query', esAccounts: Array<{ __typename?: 'ESAccount', id: string, delegateTo?: { __typename?: 'ESAccount', address: string } | null, delegatesFrom: Array<{ __typename?: 'ESAccount', address: string }> }> };



export const EsTokenUserLockupsDocument = `
    query ESTokenUserLockups($address: String!, $token: String!, $chainId: Int!) {
  esLockups(
    orderBy: end_ASC
    where: {account_containsInsensitive: $address, address_containsInsensitive: $token, chainId_eq: $chainId, state_eq: Open}
  ) {
    id
    lockupId
    amount
    end
    penalty
    withdrawAmount
    points
    timestamp
    state
  }
}
    `;

export const useEsTokenUserLockupsQuery = <
      TData = EsTokenUserLockupsQuery,
      TError = unknown
    >(
      variables: EsTokenUserLockupsQueryVariables,
      options?: Omit<UseQueryOptions<EsTokenUserLockupsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<EsTokenUserLockupsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<EsTokenUserLockupsQuery, TError, TData>(
      {
    queryKey: ['ESTokenUserLockups', variables],
    queryFn: graphqlClient<EsTokenUserLockupsQuery, EsTokenUserLockupsQueryVariables>(EsTokenUserLockupsDocument, variables),
    ...options
  }
    )};

useEsTokenUserLockupsQuery.getKey = (variables: EsTokenUserLockupsQueryVariables) => ['ESTokenUserLockups', variables];


useEsTokenUserLockupsQuery.fetcher = (variables: EsTokenUserLockupsQueryVariables, options?: RequestInit['headers']) => graphqlClient<EsTokenUserLockupsQuery, EsTokenUserLockupsQueryVariables>(EsTokenUserLockupsDocument, variables, options);

export const EsTokenAccountDocument = `
    query ESTokenAccount($address: String!, $token: String!, $chainId: Int!) {
  esAccounts(
    where: {account_containsInsensitive: $address, address_containsInsensitive: $token, chainId_eq: $chainId}
  ) {
    id
    delegateTo {
      address
    }
    delegatesFrom {
      address
    }
  }
}
    `;

export const useEsTokenAccountQuery = <
      TData = EsTokenAccountQuery,
      TError = unknown
    >(
      variables: EsTokenAccountQueryVariables,
      options?: Omit<UseQueryOptions<EsTokenAccountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<EsTokenAccountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<EsTokenAccountQuery, TError, TData>(
      {
    queryKey: ['ESTokenAccount', variables],
    queryFn: graphqlClient<EsTokenAccountQuery, EsTokenAccountQueryVariables>(EsTokenAccountDocument, variables),
    ...options
  }
    )};

useEsTokenAccountQuery.getKey = (variables: EsTokenAccountQueryVariables) => ['ESTokenAccount', variables];


useEsTokenAccountQuery.fetcher = (variables: EsTokenAccountQueryVariables, options?: RequestInit['headers']) => graphqlClient<EsTokenAccountQuery, EsTokenAccountQueryVariables>(EsTokenAccountDocument, variables, options);
