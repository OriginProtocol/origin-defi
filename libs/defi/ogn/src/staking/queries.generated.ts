import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OgnUserInfoQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type OgnUserInfoQuery = { __typename?: 'Query', ognAddresses: Array<{ __typename?: 'OGNAddress', id: string, balance: string, staked: string, xognBalance: string, votingPower: string, delegatee?: { __typename?: 'OGNAddress', id: string } | null }> };

export type OgnLockupsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type OgnLockupsQuery = { __typename?: 'Query', ognLockups: Array<{ __typename?: 'OGNLockup', id: string, lockupId: string, amount: string, end: string, xogn: string, timestamp: string, logs: Array<{ __typename?: 'OGNLockupTxLog', event: Types.OgnLockupEventType, hash: string }> }> };



export const OgnUserInfoDocument = `
    query OgnUserInfo($address: String!) {
  ognAddresses(where: {id_containsInsensitive: $address}) {
    id
    balance
    staked
    xognBalance
    votingPower
    delegatee {
      id
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
    query OgnLockups($address: String!) {
  ognLockups(
    where: {address: {id_containsInsensitive: $address}, logs_none: {event_eq: Unstaked}}
    orderBy: end_ASC
  ) {
    id
    lockupId
    amount
    end
    xogn
    timestamp
    logs(orderBy: timestamp_DESC, limit: 1) {
      event
      hash
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
