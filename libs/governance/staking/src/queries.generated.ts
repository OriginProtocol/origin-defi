import * as Types from '@origin/governance/shared';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type UserLockupsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserLockupsQuery = { __typename?: 'Query', ogvLockups: Array<{ __typename?: 'OGVLockup', id: string, lockupId: string, amount: string, end: string, veogv: string, timestamp: string, logs: Array<{ __typename?: 'OGVLockupTxLog', id: string, event: Types.OgvLockupEventType, hash: string, timestamp: string }> }> };


export const UserLockupsDocument = `
    query UserLockups($address: String!) {
  ogvLockups(
    where: {address: {id_containsInsensitive: $address}}
    orderBy: end_ASC
  ) {
    id
    lockupId
    amount
    end
    veogv
    timestamp
    logs(orderBy: timestamp_DESC) {
      id
      event
      hash
      timestamp
    }
  }
}
    `;
export const useUserLockupsQuery = <
      TData = UserLockupsQuery,
      TError = unknown
    >(
      variables: UserLockupsQueryVariables,
      options?: UseQueryOptions<UserLockupsQuery, TError, TData>
    ) =>
    useQuery<UserLockupsQuery, TError, TData>(
      ['UserLockups', variables],
      graphqlClient<UserLockupsQuery, UserLockupsQueryVariables>(UserLockupsDocument, variables),
      options
    );

useUserLockupsQuery.getKey = (variables: UserLockupsQueryVariables) => ['UserLockups', variables];
;

export const useInfiniteUserLockupsQuery = <
      TData = UserLockupsQuery,
      TError = unknown
    >(
      variables: UserLockupsQueryVariables,
      options?: UseInfiniteQueryOptions<UserLockupsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<UserLockupsQuery, TError, TData>(
      ['UserLockups.infinite', variables],
      (metaData) => graphqlClient<UserLockupsQuery, UserLockupsQueryVariables>(UserLockupsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteUserLockupsQuery.getKey = (variables: UserLockupsQueryVariables) => ['UserLockups.infinite', variables];
;

useUserLockupsQuery.fetcher = (variables: UserLockupsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserLockupsQuery, UserLockupsQueryVariables>(UserLockupsDocument, variables, options);