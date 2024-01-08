import * as Types from '@origin/governance/shared';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
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

export const useInfiniteHoldersCountQuery = <
      TData = InfiniteData<HoldersCountQuery>,
      TError = unknown
    >(
      variables: HoldersCountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<HoldersCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<HoldersCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<HoldersCountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['HoldersCount.infinite'] : ['HoldersCount.infinite', variables],
      queryFn: (metaData) => graphqlClient<HoldersCountQuery, HoldersCountQueryVariables>(HoldersCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteHoldersCountQuery.getKey = (variables?: HoldersCountQueryVariables) => variables === undefined ? ['HoldersCount.infinite'] : ['HoldersCount.infinite', variables];


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

export const useInfiniteUserInfoQuery = <
      TData = InfiniteData<UserInfoQuery>,
      TError = unknown
    >(
      variables: UserInfoQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserInfoQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserInfoQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserInfoQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['UserInfo.infinite', variables],
      queryFn: (metaData) => graphqlClient<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserInfoQuery.getKey = (variables: UserInfoQueryVariables) => ['UserInfo.infinite', variables];


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

export const useInfiniteUserDelegatorsQuery = <
      TData = InfiniteData<UserDelegatorsQuery>,
      TError = unknown
    >(
      variables: UserDelegatorsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserDelegatorsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserDelegatorsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserDelegatorsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['UserDelegators.infinite', variables],
      queryFn: (metaData) => graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserDelegatorsQuery.getKey = (variables: UserDelegatorsQueryVariables) => ['UserDelegators.infinite', variables];


useUserDelegatorsQuery.fetcher = (variables: UserDelegatorsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, variables, options);
