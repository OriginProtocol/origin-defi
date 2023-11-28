import * as Types from '@origin/governance/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type UserLockupsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserLockupsQuery = { __typename?: 'Query', ogvLockups: Array<{ __typename?: 'OGVLockup', id: string, lockupId: string, amount: string, end: string, veogv: string, timestamp: string, logs: Array<{ __typename?: 'OGVLockupTxLog', id: string, event: Types.OgvLockupEventType, hash: string, timestamp: string }> }> };


export const UserLockupsDocument = `
    query UserLockups($address: String!) {
  ogvLockups(where: {address: {id_containsInsensitive: $address}}) {
    id
    lockupId
    amount
    end
    veogv
    timestamp
    logs {
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

useUserLockupsQuery.fetcher = (variables: UserLockupsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserLockupsQuery, UserLockupsQueryVariables>(UserLockupsDocument, variables, options);