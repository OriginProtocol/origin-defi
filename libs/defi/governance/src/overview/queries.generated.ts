import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ProposalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProposalsQuery = { __typename?: 'Query', ogvProposals: Array<{ __typename?: 'OGVProposal', id: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.OgvProposalState, choices: Array<string | null>, scores: Array<string | null> }> };

export type ProposalQueryVariables = Types.Exact<{
  proposalId: Types.Scalars['String']['input'];
}>;


export type ProposalQuery = { __typename?: 'Query', ogvProposalById?: { __typename?: 'OGVProposal', id: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.OgvProposalState, choices: Array<string | null>, scores: Array<string | null>, quorum: string, logs: Array<{ __typename?: 'OGVProposalTxLog', id: string, hash: string, event: Types.OgvProposalEvent, timestamp: string }>, proposer: { __typename?: 'OGVAddress', id: string } } | null, ogvProposalVotes: Array<{ __typename?: 'OGVProposalVote', id: string, weight: string, type: Types.OgvVoteType, txHash: string, timestamp: string, voter: { __typename?: 'OGVAddress', id: string } }> };

export type UserVotesQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserVotesQuery = { __typename?: 'Query', ogvProposalVotes: Array<{ __typename?: 'OGVProposalVote', id: string, type: Types.OgvVoteType, timestamp: string, proposal: { __typename?: 'OGVProposal', id: string, description?: string | null, status: Types.OgvProposalState } }> };

export type UserInfoQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserInfoQuery = { __typename?: 'Query', ogvAddresses: Array<{ __typename?: 'OGVAddress', id: string, balance: string, staked: string, veogvBalance: string, votingPower: string, delegatee?: { __typename?: 'OGVAddress', id: string } | null }> };

export type UserDelegatorsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserDelegatorsQuery = { __typename?: 'Query', ogvAddresses: Array<{ __typename?: 'OGVAddress', id: string, votingPower: string }> };



export const ProposalsDocument = `
    query Proposals {
  ogvProposals(
    orderBy: timestamp_DESC
    limit: 1000
    where: {status_not_in: Canceled}
  ) {
    id
    description
    timestamp
    startBlock
    endBlock
    lastUpdated
    status
    choices
    scores
  }
}
    `;

export const useProposalsQuery = <
      TData = ProposalsQuery,
      TError = unknown
    >(
      variables?: ProposalsQueryVariables,
      options?: Omit<UseQueryOptions<ProposalsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProposalsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProposalsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Proposals'] : ['Proposals', variables],
    queryFn: graphqlClient<ProposalsQuery, ProposalsQueryVariables>(ProposalsDocument, variables),
    ...options
  }
    )};

useProposalsQuery.getKey = (variables?: ProposalsQueryVariables) => variables === undefined ? ['Proposals'] : ['Proposals', variables];


useProposalsQuery.fetcher = (variables?: ProposalsQueryVariables, options?: RequestInit['headers']) => graphqlClient<ProposalsQuery, ProposalsQueryVariables>(ProposalsDocument, variables, options);

export const ProposalDocument = `
    query Proposal($proposalId: String!) {
  ogvProposalById(id: $proposalId) {
    id
    description
    timestamp
    startBlock
    endBlock
    lastUpdated
    status
    choices
    scores
    quorum
    logs {
      id
      hash
      event
      timestamp
    }
    proposer {
      id
    }
  }
  ogvProposalVotes(where: {proposal: {id_containsInsensitive: $proposalId}}) {
    id
    voter {
      id
    }
    weight
    type
    txHash
    timestamp
  }
}
    `;

export const useProposalQuery = <
      TData = ProposalQuery,
      TError = unknown
    >(
      variables: ProposalQueryVariables,
      options?: Omit<UseQueryOptions<ProposalQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProposalQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProposalQuery, TError, TData>(
      {
    queryKey: ['Proposal', variables],
    queryFn: graphqlClient<ProposalQuery, ProposalQueryVariables>(ProposalDocument, variables),
    ...options
  }
    )};

useProposalQuery.getKey = (variables: ProposalQueryVariables) => ['Proposal', variables];


useProposalQuery.fetcher = (variables: ProposalQueryVariables, options?: RequestInit['headers']) => graphqlClient<ProposalQuery, ProposalQueryVariables>(ProposalDocument, variables, options);

export const UserVotesDocument = `
    query UserVotes($address: String!) {
  ogvProposalVotes(
    where: {voter: {id_containsInsensitive: $address}}
    orderBy: timestamp_DESC
  ) {
    id
    type
    timestamp
    proposal {
      id
      description
      status
    }
  }
}
    `;

export const useUserVotesQuery = <
      TData = UserVotesQuery,
      TError = unknown
    >(
      variables: UserVotesQueryVariables,
      options?: Omit<UseQueryOptions<UserVotesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserVotesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserVotesQuery, TError, TData>(
      {
    queryKey: ['UserVotes', variables],
    queryFn: graphqlClient<UserVotesQuery, UserVotesQueryVariables>(UserVotesDocument, variables),
    ...options
  }
    )};

useUserVotesQuery.getKey = (variables: UserVotesQueryVariables) => ['UserVotes', variables];


useUserVotesQuery.fetcher = (variables: UserVotesQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserVotesQuery, UserVotesQueryVariables>(UserVotesDocument, variables, options);

export const UserInfoDocument = `
    query UserInfo($address: String!) {
  ogvAddresses(where: {id_containsInsensitive: $address}) {
    id
    balance
    staked
    veogvBalance
    votingPower
    delegatee {
      id
    }
  }
}
    `;

export const useUserInfoQuery = <
      TData = UserInfoQuery,
      TError = unknown
    >(
      variables: UserInfoQueryVariables,
      options?: Omit<UseQueryOptions<UserInfoQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserInfoQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserInfoQuery, TError, TData>(
      {
    queryKey: ['UserInfo', variables],
    queryFn: graphqlClient<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, variables),
    ...options
  }
    )};

useUserInfoQuery.getKey = (variables: UserInfoQueryVariables) => ['UserInfo', variables];


useUserInfoQuery.fetcher = (variables: UserInfoQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, variables, options);

export const UserDelegatorsDocument = `
    query UserDelegators($address: String!) {
  ogvAddresses(where: {delegatee: {id_containsInsensitive: $address}}) {
    id
    votingPower
  }
}
    `;

export const useUserDelegatorsQuery = <
      TData = UserDelegatorsQuery,
      TError = unknown
    >(
      variables: UserDelegatorsQueryVariables,
      options?: Omit<UseQueryOptions<UserDelegatorsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserDelegatorsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserDelegatorsQuery, TError, TData>(
      {
    queryKey: ['UserDelegators', variables],
    queryFn: graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, variables),
    ...options
  }
    )};

useUserDelegatorsQuery.getKey = (variables: UserDelegatorsQueryVariables) => ['UserDelegators', variables];


useUserDelegatorsQuery.fetcher = (variables: UserDelegatorsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserDelegatorsQuery, UserDelegatorsQueryVariables>(UserDelegatorsDocument, variables, options);
