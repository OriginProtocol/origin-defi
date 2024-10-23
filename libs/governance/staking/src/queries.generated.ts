import * as Types from '@origin/governance/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type UserLockupsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserLockupsQuery = { __typename?: 'Query', ogvLockups: Array<{ __typename?: 'OGVLockup', id: string, lockupId: string, amount: string, end: string, veogv: string, timestamp: string, logs: Array<{ __typename?: 'OGVLockupTxLog', event: Types.OgvLockupEventType, hash: string }> }> };



export const UserLockupsDocument = `
    query UserLockups($address: String!) {
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

export const useUserLockupsQuery = <
      TData = UserLockupsQuery,
      TError = unknown
    >(
      variables: UserLockupsQueryVariables,
      options?: Omit<UseQueryOptions<UserLockupsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserLockupsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserLockupsQuery, TError, TData>(
      {
    queryKey: ['UserLockups', variables],
    queryFn: graphqlClient<UserLockupsQuery, UserLockupsQueryVariables>(UserLockupsDocument, variables),
    ...options
  }
    )};

useUserLockupsQuery.getKey = (variables: UserLockupsQueryVariables) => ['UserLockups', variables];


useUserLockupsQuery.fetcher = (variables: UserLockupsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserLockupsQuery, UserLockupsQueryVariables>(UserLockupsDocument, variables, options);
