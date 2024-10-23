import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ArmWithdrawalRequestsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.ArmWithdrawalRequestOrderByInput> | Types.ArmWithdrawalRequestOrderByInput>;
}>;


export type ArmWithdrawalRequestsQuery = { __typename?: 'Query', armWithdrawalRequests: Array<{ __typename?: 'ArmWithdrawalRequest', id: string, requestId: string, timestamp: string, amount: string, queued: string, claimed: boolean, txHash: string, blockNumber: number }> };



export const ArmWithdrawalRequestsDocument = `
    query armWithdrawalRequests($address: String!, $limit: Int, $orderBy: [ArmWithdrawalRequestOrderByInput!] = [timestamp_DESC]) {
  armWithdrawalRequests(
    limit: $limit
    orderBy: $orderBy
    where: {account_eq: $address, address_eq: "0x85b78aca6deae198fbf201c82daf6ca21942acc6", chainId_eq: 1}
  ) {
    id
    requestId
    timestamp
    amount
    queued
    claimed
    txHash
    blockNumber
  }
}
    `;

export const useArmWithdrawalRequestsQuery = <
      TData = ArmWithdrawalRequestsQuery,
      TError = unknown
    >(
      variables: ArmWithdrawalRequestsQueryVariables,
      options?: Omit<UseQueryOptions<ArmWithdrawalRequestsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ArmWithdrawalRequestsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ArmWithdrawalRequestsQuery, TError, TData>(
      {
    queryKey: ['armWithdrawalRequests', variables],
    queryFn: graphqlClient<ArmWithdrawalRequestsQuery, ArmWithdrawalRequestsQueryVariables>(ArmWithdrawalRequestsDocument, variables),
    ...options
  }
    )};

useArmWithdrawalRequestsQuery.getKey = (variables: ArmWithdrawalRequestsQueryVariables) => ['armWithdrawalRequests', variables];


useArmWithdrawalRequestsQuery.fetcher = (variables: ArmWithdrawalRequestsQueryVariables, options?: RequestInit['headers']) => graphqlClient<ArmWithdrawalRequestsQuery, ArmWithdrawalRequestsQueryVariables>(ArmWithdrawalRequestsDocument, variables, options);
