import * as Types from '@origin/governance/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type HoldersCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HoldersCountQuery = { __typename?: 'Query', ogvAddressesConnection: { __typename?: 'OGVAddressesConnection', totalCount: number } };

export type UserInfoQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UserInfoQuery = { __typename?: 'Query', ogvAddresses: Array<{ __typename?: 'OGVAddress', id: string, balance: string, staked: string, veogvBalance: string, votingPower: string, delegatee?: { __typename?: 'OGVAddress', id: string } | null }> };

export type UserDelegatorsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UserDelegatorsQuery = { __typename?: 'Query', ogvAddresses: Array<{ __typename?: 'OGVAddress', id: string, votingPower: string }> };



export const HoldersCountDocument = `
    query HoldersCount {
  ogvAddressesConnection(orderBy: id_ASC, where: {staked_gt: 0}) {
    totalCount
  }
}
    `;

export const useHoldersCountQuery = <
      TData = HoldersCountQuery,
      TError = unknown
    >(
      variables?: HoldersCountQueryVariables,
      options?: Omit<UseQueryOptions<HoldersCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<HoldersCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<HoldersCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['HoldersCount'] : ['HoldersCount', variables],
    queryFn: graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, variables),
    ...options
  }
    )};

useHoldersCountQuery.getKey = (variables?: HoldersCountQueryVariables) => variables === undefined ? ['HoldersCount'] : ['HoldersCount', variables];


useHoldersCountQuery.fetcher = (variables?: HoldersCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, variables, options);

export const UserInfoDocument = `
    query UserInfo($address: String!, $limit: Int = 5000) {
  ogvAddresses(limit: $limit, where: {id_eq: $address}) {
    id
    balance
    staked
    veogvBalance
    votingPower
    delegatee {
      id
    }
  }
}
    `;

export const useUserInfoQuery = <
      TData = UserInfoQuery,
      TError = unknown
    >(
      variables: UserInfoQueryVariables,
      options?: Omit<UseQueryOptions<UserInfoQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserInfoQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserInfoQuery, TError, TData>(
      {
    queryKey: ['UserInfo', variables],
    queryFn: graphqlClient<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, variables),
    ...options
  }
    )};

useUserInfoQuery.getKey = (variables: UserInfoQueryVariables) => ['UserInfo', variables];


useUserInfoQuery.fetcher = (variables: UserInfoQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, variables, options);

export const UserDelegatorsDocument = `
    query UserDelegators($address: String!, $limit: Int = 5000) {
  ogvAddresses(limit: $limit, where: {delegatee: {id_eq: $address}}) {
    id
    votingPower
  }
}
    `;

export const useUserDelegatorsQuery = <
      TData = UserDelegatorsQuery,
      TError = unknown
    >(
      variables: UserDelegatorsQueryVariables,
      options?: Omit<UseQueryOptions<UserDelegatorsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserDelegatorsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserDelegatorsQuery, TError, TData>(
      {
    queryKey: ['UserDelegators', variables],
    queryFn: graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, variables),
    ...options
  }
    )};

useUserDelegatorsQuery.getKey = (variables: UserDelegatorsQueryVariables) => ['UserDelegators', variables];


useUserDelegatorsQuery.fetcher = (variables: UserDelegatorsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, variables, options);
