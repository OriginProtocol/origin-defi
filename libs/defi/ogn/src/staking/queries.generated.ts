import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OgnUserInfoQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OgnUserInfoQuery = { __typename?: 'Query', esAccounts: Array<{ __typename?: 'ESAccount', id: string, balance: string, assetBalance: string, stakedBalance: string, votingPower: string, delegatesFrom: Array<{ __typename?: 'ESAccount', account: string }> }> };

export type OgnLockupsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OgnLockupsQuery = { __typename?: 'Query', esLockups: Array<{ __typename?: 'ESLockup', id: string, lockupId: string, amount: string, end: string, points: string, timestamp: string, events: Array<{ __typename?: 'ESLockupEvent', event: Types.EsLockupEventType, txHash: string }> }> };



export const OgnUserInfoDocument = `
    query OgnUserInfo($address: String!, $limit: Int = 5000) {
  esAccounts(
    limit: $limit
    where: {chainId_eq: 1, address_eq: "0x63898b3b6ef3d39332082178656e9862bee45c57", account_eq: $address}
  ) {
    id
    balance
    assetBalance
    stakedBalance
    votingPower
    delegatesFrom(limit: 1000) {
      account
    }
  }
}
    `;

export const useOgnUserInfoQuery = <
      TData = OgnUserInfoQuery,
      TError = unknown
    >(
      variables: OgnUserInfoQueryVariables,
      options?: Omit<UseQueryOptions<OgnUserInfoQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgnUserInfoQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgnUserInfoQuery, TError, TData>(
      {
    queryKey: ['OgnUserInfo', variables],
    queryFn: graphqlClient<OgnUserInfoQuery, OgnUserInfoQueryVariables>(OgnUserInfoDocument, variables),
    ...options
  }
    )};

useOgnUserInfoQuery.getKey = (variables: OgnUserInfoQueryVariables) => ['OgnUserInfo', variables];


useOgnUserInfoQuery.fetcher = (variables: OgnUserInfoQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgnUserInfoQuery, OgnUserInfoQueryVariables>(OgnUserInfoDocument, variables, options);

export const OgnLockupsDocument = `
    query OgnLockups($address: String!, $limit: Int = 5000) {
  esLockups(
    limit: $limit
    where: {chainId_eq: 1, address_eq: "0x63898b3b6ef3d39332082178656e9862bee45c57", account_eq: $address, events_none: {event_eq: Unstaked}}
    orderBy: end_ASC
  ) {
    id
    lockupId
    amount
    end
    points
    timestamp
    events(orderBy: timestamp_DESC, limit: 1) {
      event
      txHash
    }
  }
}
    `;

export const useOgnLockupsQuery = <
      TData = OgnLockupsQuery,
      TError = unknown
    >(
      variables: OgnLockupsQueryVariables,
      options?: Omit<UseQueryOptions<OgnLockupsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgnLockupsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgnLockupsQuery, TError, TData>(
      {
    queryKey: ['OgnLockups', variables],
    queryFn: graphqlClient<OgnLockupsQuery, OgnLockupsQueryVariables>(OgnLockupsDocument, variables),
    ...options
  }
    )};

useOgnLockupsQuery.getKey = (variables: OgnLockupsQueryVariables) => ['OgnLockups', variables];


useOgnLockupsQuery.fetcher = (variables: OgnLockupsQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgnLockupsQuery, OgnLockupsQueryVariables>(OgnLockupsDocument, variables, options);
