import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OgvHoldersCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OgvHoldersCountQuery = { __typename?: 'Query', ogvAddressesConnection: { __typename?: 'OGVAddressesConnection', totalCount: number } };

export type OgvUserInfoQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type OgvUserInfoQuery = { __typename?: 'Query', ogvAddresses: Array<{ __typename?: 'OGVAddress', id: string, balance: string, staked: string, veogvBalance: string, votingPower: string, delegatee?: { __typename?: 'OGVAddress', id: string } | null }> };

export type OgvLockupsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type OgvLockupsQuery = { __typename?: 'Query', ogvLockups: Array<{ __typename?: 'OGVLockup', id: string, lockupId: string, amount: string, end: string, veogv: string, timestamp: string, logs: Array<{ __typename?: 'OGVLockupTxLog', event: Types.OgvLockupEventType, hash: string }> }> };



export const OgvHoldersCountDocument = `
    query OgvHoldersCount {
  ogvAddressesConnection(orderBy: id_ASC, where: {staked_gt: 0}) {
    totalCount
  }
}
    `;

export const useOgvHoldersCountQuery = <
      TData = OgvHoldersCountQuery,
      TError = unknown
    >(
      variables?: OgvHoldersCountQueryVariables,
      options?: Omit<UseQueryOptions<OgvHoldersCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgvHoldersCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgvHoldersCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OgvHoldersCount'] : ['OgvHoldersCount', variables],
    queryFn: graphqlClient<OgvHoldersCountQuery, OgvHoldersCountQueryVariables>(OgvHoldersCountDocument, variables),
    ...options
  }
    )};

useOgvHoldersCountQuery.getKey = (variables?: OgvHoldersCountQueryVariables) => variables === undefined ? ['OgvHoldersCount'] : ['OgvHoldersCount', variables];


useOgvHoldersCountQuery.fetcher = (variables?: OgvHoldersCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgvHoldersCountQuery, OgvHoldersCountQueryVariables>(OgvHoldersCountDocument, variables, options);

export const OgvUserInfoDocument = `
    query OgvUserInfo($address: String!) {
  ogvAddresses(where: {id_eq: $address}) {
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

export const useOgvUserInfoQuery = <
      TData = OgvUserInfoQuery,
      TError = unknown
    >(
      variables: OgvUserInfoQueryVariables,
      options?: Omit<UseQueryOptions<OgvUserInfoQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgvUserInfoQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgvUserInfoQuery, TError, TData>(
      {
    queryKey: ['OgvUserInfo', variables],
    queryFn: graphqlClient<OgvUserInfoQuery, OgvUserInfoQueryVariables>(OgvUserInfoDocument, variables),
    ...options
  }
    )};

useOgvUserInfoQuery.getKey = (variables: OgvUserInfoQueryVariables) => ['OgvUserInfo', variables];


useOgvUserInfoQuery.fetcher = (variables: OgvUserInfoQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgvUserInfoQuery, OgvUserInfoQueryVariables>(OgvUserInfoDocument, variables, options);

export const OgvLockupsDocument = `
    query OgvLockups($address: String!) {
  ogvLockups(
    where: {address: {id_eq: $address}, logs_none: {event_eq: Unstaked}}
    orderBy: end_ASC
  ) {
    id
    lockupId
    amount
    end
    veogv
    timestamp
    logs(orderBy: timestamp_DESC, limit: 1) {
      event
      hash
    }
  }
}
    `;

export const useOgvLockupsQuery = <
      TData = OgvLockupsQuery,
      TError = unknown
    >(
      variables: OgvLockupsQueryVariables,
      options?: Omit<UseQueryOptions<OgvLockupsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgvLockupsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgvLockupsQuery, TError, TData>(
      {
    queryKey: ['OgvLockups', variables],
    queryFn: graphqlClient<OgvLockupsQuery, OgvLockupsQueryVariables>(OgvLockupsDocument, variables),
    ...options
  }
    )};

useOgvLockupsQuery.getKey = (variables: OgvLockupsQueryVariables) => ['OgvLockups', variables];


useOgvLockupsQuery.fetcher = (variables: OgvLockupsQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgvLockupsQuery, OgvLockupsQueryVariables>(OgvLockupsDocument, variables, options);
