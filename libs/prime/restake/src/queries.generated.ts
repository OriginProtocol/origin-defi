import * as Types from '@origin/prime/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/prime/shared';
export type CurrentRequestsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type CurrentRequestsQuery = { __typename?: 'Query', lrtWithdrawals: Array<{ __typename?: 'LRTWithdrawal', id: string, startBlock: number, timestamp: string, shares?: Array<string> | null }> };



export const CurrentRequestsDocument = `
    query CurrentRequests($address: String!) {
  lrtWithdrawals(
    where: {withdrawer_containsInsensitive: $address, status_in: [Requested]}
  ) {
    id
    startBlock
    timestamp
    shares
  }
}
    `;

export const useCurrentRequestsQuery = <
      TData = CurrentRequestsQuery,
      TError = unknown
    >(
      variables: CurrentRequestsQueryVariables,
      options?: Omit<UseQueryOptions<CurrentRequestsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CurrentRequestsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CurrentRequestsQuery, TError, TData>(
      {
    queryKey: ['CurrentRequests', variables],
    queryFn: graphqlClient<CurrentRequestsQuery, CurrentRequestsQueryVariables>(CurrentRequestsDocument, variables),
    ...options
  }
    )};

useCurrentRequestsQuery.getKey = (variables: CurrentRequestsQueryVariables) => ['CurrentRequests', variables];


useCurrentRequestsQuery.fetcher = (variables: CurrentRequestsQueryVariables, options?: RequestInit['headers']) => graphqlClient<CurrentRequestsQuery, CurrentRequestsQueryVariables>(CurrentRequestsDocument, variables, options);
