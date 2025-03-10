import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type BridgeTransfersQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  limit?: Types.Scalars['Int']['input'];
}>;


export type BridgeTransfersQuery = { __typename?: 'Query', bridgeTransfers: Array<{ __typename?: 'BridgeTransfer', id: string, blockNumber: number, timestamp: string, messageId: string, bridge: string, chainIn: number, chainOut: number, amountIn: string, amountOut: string, transactor: string, receiver: string, sender: string, tokenIn: string, tokenOut: string, txHashIn: string, txHashOut?: string | null, state: number }> };

export type BridgeTransferStatesQueryVariables = Types.Exact<{
  messageIds?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type BridgeTransferStatesQuery = { __typename?: 'Query', bridgeTransferStates: Array<{ __typename?: 'BridgeTransferState', id: string, state: number }> };



export const BridgeTransfersDocument = `
    query BridgeTransfers($address: String!, $limit: Int! = 5000) {
  bridgeTransfers(
    limit: $limit
    orderBy: timestamp_DESC
    where: {sender_eq: $address, OR: {transactor_eq: $address, OR: {receiver_eq: $address}}}
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
    transactor
    receiver
    sender
    tokenIn
    tokenOut
    txHashIn
    txHashOut
    state
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
    query BridgeTransferStates($messageIds: [String!], $limit: Int = 5000) {
  bridgeTransferStates(limit: $limit, where: {id_in: $messageIds}) {
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
