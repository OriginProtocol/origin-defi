import * as Types from '@origin/governance/shared';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type HoldersCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HoldersCountQuery = { __typename?: 'Query', ogvAddressesConnection: { __typename?: 'OGVAddressesConnection', totalCount: number } };

export type UserInfoQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserInfoQuery = { __typename?: 'Query', ogvAddresses: Array<{ __typename?: 'OGVAddress', id: string, balance: string, staked: string, veogvBalance: string, votingPower: string, delegatee?: { __typename?: 'OGVAddress', id: string } | null }> };

export type UserDelegatorsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
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
      options?: UseQueryOptions<HoldersCountQuery, TError, TData>
    ) =>
    useQuery<HoldersCountQuery, TError, TData>(
      variables === undefined ? ['HoldersCount'] : ['HoldersCount', variables],
      graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, variables),
      options
    );

useHoldersCountQuery.getKey = (variables?: HoldersCountQueryVariables) => variables === undefined ? ['HoldersCount'] : ['HoldersCount', variables];
;

export const useInfiniteHoldersCountQuery = <
      TData = HoldersCountQuery,
      TError = unknown
    >(
      variables?: HoldersCountQueryVariables,
      options?: UseInfiniteQueryOptions<HoldersCountQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<HoldersCountQuery, TError, TData>(
      variables === undefined ? ['HoldersCount.infinite'] : ['HoldersCount.infinite', variables],
      (metaData) => graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteHoldersCountQuery.getKey = (variables?: HoldersCountQueryVariables) => variables === undefined ? ['HoldersCount.infinite'] : ['HoldersCount.infinite', variables];
;

useHoldersCountQuery.fetcher = (variables?: HoldersCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, variables, options);
export const UserInfoDocument = `
    query UserInfo($address: String!) {
  ogvAddresses(where: {id_containsInsensitive: $address}) {
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
      options?: UseQueryOptions<UserInfoQuery, TError, TData>
    ) =>
    useQuery<UserInfoQuery, TError, TData>(
      ['UserInfo', variables],
      graphqlClient<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, variables),
      options
    );

useUserInfoQuery.getKey = (variables: UserInfoQueryVariables) => ['UserInfo', variables];
;

export const useInfiniteUserInfoQuery = <
      TData = UserInfoQuery,
      TError = unknown
    >(
      variables: UserInfoQueryVariables,
      options?: UseInfiniteQueryOptions<UserInfoQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<UserInfoQuery, TError, TData>(
      ['UserInfo.infinite', variables],
      (metaData) => graphqlClient<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteUserInfoQuery.getKey = (variables: UserInfoQueryVariables) => ['UserInfo.infinite', variables];
;

useUserInfoQuery.fetcher = (variables: UserInfoQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, variables, options);
export const UserDelegatorsDocument = `
    query UserDelegators($address: String!) {
  ogvAddresses(where: {delegatee: {id_containsInsensitive: $address}}) {
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
      options?: UseQueryOptions<UserDelegatorsQuery, TError, TData>
    ) =>
    useQuery<UserDelegatorsQuery, TError, TData>(
      ['UserDelegators', variables],
      graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, variables),
      options
    );

useUserDelegatorsQuery.getKey = (variables: UserDelegatorsQueryVariables) => ['UserDelegators', variables];
;

export const useInfiniteUserDelegatorsQuery = <
      TData = UserDelegatorsQuery,
      TError = unknown
    >(
      variables: UserDelegatorsQueryVariables,
      options?: UseInfiniteQueryOptions<UserDelegatorsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<UserDelegatorsQuery, TError, TData>(
      ['UserDelegators.infinite', variables],
      (metaData) => graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteUserDelegatorsQuery.getKey = (variables: UserDelegatorsQueryVariables) => ['UserDelegators.infinite', variables];
;

useUserDelegatorsQuery.fetcher = (variables: UserDelegatorsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, variables, options);