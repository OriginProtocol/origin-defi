import * as Types from '@origin/oeth/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/oeth/shared';
export type BridgeTransfersQueryVariables = Types.Exact<{
  account: Types.Scalars['String']['input'];
}>;


export type BridgeTransfersQuery = { __typename?: 'Query', bridgeTransfers: Array<{ __typename?: 'BridgeTransfer', id: string, blockNumber: number, timestamp: string, messageId: string, bridge: string, chainIn: number, chainOut: number, amountIn: string, amountOut: string, receiver: string, sender: string, tokenIn: string, tokenOut: string, txHash: string }> };

export type BridgeTransferStatesQueryVariables = Types.Exact<{
  messageIds?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
}>;


export type BridgeTransferStatesQuery = { __typename?: 'Query', bridgeTransferStates: Array<{ __typename?: 'BridgeTransferState', id: string, state: number }> };



export const BridgeTransfersDocument = `
    query BridgeTransfers($account: String!) {
  bridgeTransfers(
    orderBy: timestamp_DESC
    where: {sender_eq: $account, receiver_eq: $account}
  ) {
    id
    blockNumber
    timestamp
    messageId
    bridge
    chainIn
    chainOut
    amountIn
    amountOut
    receiver
    sender
    tokenIn
    tokenOut
    txHash
  }
}
    `;

export const useBridgeTransfersQuery = <
      TData = BridgeTransfersQuery,
      TError = unknown
    >(
      variables: BridgeTransfersQueryVariables,
      options?: Omit<UseQueryOptions<BridgeTransfersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BridgeTransfersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BridgeTransfersQuery, TError, TData>(
      {
    queryKey: ['BridgeTransfers', variables],
    queryFn: graphqlClient<BridgeTransfersQuery, BridgeTransfersQueryVariables>(BridgeTransfersDocument, variables),
    ...options
  }
    )};

useBridgeTransfersQuery.getKey = (variables: BridgeTransfersQueryVariables) => ['BridgeTransfers', variables];


useBridgeTransfersQuery.fetcher = (variables: BridgeTransfersQueryVariables, options?: RequestInit['headers']) => graphqlClient<BridgeTransfersQuery, BridgeTransfersQueryVariables>(BridgeTransfersDocument, variables, options);

export const BridgeTransferStatesDocument = `
    query BridgeTransferStates($messageIds: [String!]) {
  bridgeTransferStates(where: {id_in: $messageIds}) {
    id
    state
  }
}
    `;

export const useBridgeTransferStatesQuery = <
      TData = BridgeTransferStatesQuery,
      TError = unknown
    >(
      variables?: BridgeTransferStatesQueryVariables,
      options?: Omit<UseQueryOptions<BridgeTransferStatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BridgeTransferStatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BridgeTransferStatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BridgeTransferStates'] : ['BridgeTransferStates', variables],
    queryFn: graphqlClient<BridgeTransferStatesQuery, BridgeTransferStatesQueryVariables>(BridgeTransferStatesDocument, variables),
    ...options
  }
    )};

useBridgeTransferStatesQuery.getKey = (variables?: BridgeTransferStatesQueryVariables) => variables === undefined ? ['BridgeTransferStates'] : ['BridgeTransferStates', variables];


useBridgeTransferStatesQuery.fetcher = (variables?: BridgeTransferStatesQueryVariables, options?: RequestInit['headers']) => graphqlClient<BridgeTransferStatesQuery, BridgeTransferStatesQueryVariables>(BridgeTransferStatesDocument, variables, options);