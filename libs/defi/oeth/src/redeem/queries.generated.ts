import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type WithdrawalRequestsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type WithdrawalRequestsQuery = { __typename?: 'Query', oethWithdrawalRequests: Array<{ __typename?: 'OETHWithdrawalRequest', id: string, requestId: string, timestamp: string, amount: string, queued: string, claimed: boolean, blockNumber: number }> };



export const WithdrawalRequestsDocument = `
    query WithdrawalRequests($address: String!) {
  oethWithdrawalRequests(where: {withdrawer_containsInsensitive: $address}) {
    id
    requestId
    timestamp
    amount
    queued
    claimed
    blockNumber
    requestId
  }
}
    `;

export const useWithdrawalRequestsQuery = <
      TData = WithdrawalRequestsQuery,
      TError = unknown
    >(
      variables: WithdrawalRequestsQueryVariables,
      options?: Omit<UseQueryOptions<WithdrawalRequestsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WithdrawalRequestsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WithdrawalRequestsQuery, TError, TData>(
      {
    queryKey: ['WithdrawalRequests', variables],
    queryFn: graphqlClient<WithdrawalRequestsQuery, WithdrawalRequestsQueryVariables>(WithdrawalRequestsDocument, variables),
    ...options
  }
    )};

useWithdrawalRequestsQuery.getKey = (variables: WithdrawalRequestsQueryVariables) => ['WithdrawalRequests', variables];


useWithdrawalRequestsQuery.fetcher = (variables: WithdrawalRequestsQueryVariables, options?: RequestInit['headers']) => graphqlClient<WithdrawalRequestsQuery, WithdrawalRequestsQueryVariables>(WithdrawalRequestsDocument, variables, options);
