import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OgvLockupsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type OgvLockupsQuery = { __typename?: 'Query', ogvLockups: Array<{ __typename?: 'OGVLockup', id: string, lockupId: string, amount: string, end: string, veogv: string, timestamp: string, logs: Array<{ __typename?: 'OGVLockupTxLog', event: Types.OgvLockupEventType, hash: string }> }> };



export const OgvLockupsDocument = `
    query OgvLockups($address: String!) {
  ogvLockups(
    where: {address: {id_containsInsensitive: $address}, logs_none: {event_eq: Unstaked}}
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
