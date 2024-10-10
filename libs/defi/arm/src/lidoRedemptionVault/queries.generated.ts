import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ArmDailyStatsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.ArmDailyStatOrderByInput> | Types.ArmDailyStatOrderByInput>;
}>;


export type ArmDailyStatsQuery = { __typename?: 'Query', armDailyStats: Array<{ __typename?: 'ArmDailyStat', id: string, timestamp: string, outstandingAssets1: string, totalSupply: string, apy: number, totalAssets: string }> };

export type ArmWithdrawalRequestsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Array<Types.ArmRedemptionOrderByInput> | Types.ArmRedemptionOrderByInput>;
}>;


export type ArmWithdrawalRequestsQuery = { __typename?: 'Query', armRedemptions: Array<{ __typename?: 'ArmRedemption', id: string, requestId: string, timestamp: string, amount: string, queued: string, claimed: boolean, txHash: string, blockNumber: number }> };



export const ArmDailyStatsDocument = `
    query armDailyStats($limit: Int, $orderBy: [ArmDailyStatOrderByInput!] = [timestamp_DESC]) {
  armDailyStats(
    limit: $limit
    orderBy: $orderBy
    where: {address_containsInsensitive: "0x85B78AcA6Deae198fBF201c82DAF6Ca21942acc6", chainId_eq: 1}
  ) {
    id
    timestamp
    outstandingAssets1
    totalSupply
    apy
    totalAssets
  }
}
    `;

export const useArmDailyStatsQuery = <
      TData = ArmDailyStatsQuery,
      TError = unknown
    >(
      variables?: ArmDailyStatsQueryVariables,
      options?: Omit<UseQueryOptions<ArmDailyStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ArmDailyStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ArmDailyStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['armDailyStats'] : ['armDailyStats', variables],
    queryFn: graphqlClient<ArmDailyStatsQuery, ArmDailyStatsQueryVariables>(ArmDailyStatsDocument, variables),
    ...options
  }
    )};

useArmDailyStatsQuery.getKey = (variables?: ArmDailyStatsQueryVariables) => variables === undefined ? ['armDailyStats'] : ['armDailyStats', variables];


useArmDailyStatsQuery.fetcher = (variables?: ArmDailyStatsQueryVariables, options?: RequestInit['headers']) => graphqlClient<ArmDailyStatsQuery, ArmDailyStatsQueryVariables>(ArmDailyStatsDocument, variables, options);

export const ArmWithdrawalRequestsDocument = `
    query armWithdrawalRequests($address: String!, $limit: Int, $orderBy: [ArmRedemptionOrderByInput!] = [timestamp_DESC]) {
  armRedemptions(
    limit: $limit
    orderBy: $orderBy
    where: {account_containsInsensitive: $address, address_containsInsensitive: "0x85B78AcA6Deae198fBF201c82DAF6Ca21942acc6", chainId_eq: 1}
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
