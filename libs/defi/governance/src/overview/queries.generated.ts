import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type ProposalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProposalsQuery = { __typename?: 'Query', governanceProposals: Array<{ __typename?: 'GovernanceProposal', id: string, proposalId: string, address: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.GovernanceProposalState, choices: Array<string | null>, scores: Array<string | null>, quorum: string }> };

export type ProposalQueryVariables = Types.Exact<{
  proposalId: Types.Scalars['String']['input'];
}>;


export type ProposalQuery = { __typename?: 'Query', governanceProposalById?: { __typename?: 'GovernanceProposal', id: string, proposalId: string, address: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.GovernanceProposalState, choices: Array<string | null>, scores: Array<string | null>, quorum: string, proposer: string, events: Array<{ __typename?: 'GovernanceProposalEvent', id: string, txHash: string, event: Types.GovernanceProposalEventType, timestamp: string }> } | null };

export type ProposalVotesQueryVariables = Types.Exact<{
  proposalId: Types.Scalars['String']['input'];
}>;


export type ProposalVotesQuery = { __typename?: 'Query', governanceProposalVotes: Array<{ __typename?: 'GovernanceProposalVote', id: string, address: string, voter: string, weight: string, type: Types.GovernanceVoteType, txHash: string, timestamp: string, proposal: { __typename?: 'GovernanceProposal', id: string, address: string, proposalId: string, description?: string | null, status: Types.GovernanceProposalState } }> };

export type UserVotesQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserVotesQuery = { __typename?: 'Query', governanceProposalVotes: Array<{ __typename?: 'GovernanceProposalVote', id: string, type: Types.GovernanceVoteType, timestamp: string, proposal: { __typename?: 'GovernanceProposal', id: string, address: string, proposalId: string, description?: string | null, status: Types.GovernanceProposalState } }> };

export type UserVotingPowerQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserVotingPowerQuery = { __typename?: 'Query', esAccounts: Array<{ __typename?: 'ESAccount', id: string, address: string, balance: string, stakedBalance: string, votingPower: string, delegateTo?: { __typename?: 'ESAccount', address: string } | null, delegatesFrom: Array<{ __typename?: 'ESAccount', address: string }> }> };

export type UserDelegatorsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type UserDelegatorsQuery = { __typename?: 'Query', esAccounts: Array<{ __typename?: 'ESAccount', id: string, address: string, votingPower: string }> };



export const ProposalsDocument = `
    query Proposals {
  governanceProposals(
    orderBy: [timestamp_DESC]
    limit: 1000
    where: {status_not_in: [Canceled]}
  ) {
    id
    proposalId
    address
    description
    timestamp
    startBlock
    endBlock
    lastUpdated
    status
    choices
    scores
    quorum
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
  governanceProposalById(id: $proposalId) {
    id
    proposalId
    address
    description
    timestamp
    startBlock
    endBlock
    lastUpdated
    status
    choices
    scores
    quorum
    events {
      id
      txHash
      event
      timestamp
    }
    proposer
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

export const ProposalVotesDocument = `
    query ProposalVotes($proposalId: String!) {
  governanceProposalVotes(where: {proposal: {id_eq: $proposalId}}) {
    id
    address
    voter
    weight
    type
    txHash
    timestamp
    proposal {
      id
      address
      proposalId
      description
      status
    }
  }
}
    `;

export const useProposalVotesQuery = <
      TData = ProposalVotesQuery,
      TError = unknown
    >(
      variables: ProposalVotesQueryVariables,
      options?: Omit<UseQueryOptions<ProposalVotesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProposalVotesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProposalVotesQuery, TError, TData>(
      {
    queryKey: ['ProposalVotes', variables],
    queryFn: graphqlClient<ProposalVotesQuery, ProposalVotesQueryVariables>(ProposalVotesDocument, variables),
    ...options
  }
    )};

useProposalVotesQuery.getKey = (variables: ProposalVotesQueryVariables) => ['ProposalVotes', variables];


useProposalVotesQuery.fetcher = (variables: ProposalVotesQueryVariables, options?: RequestInit['headers']) => graphqlClient<ProposalVotesQuery, ProposalVotesQueryVariables>(ProposalVotesDocument, variables, options);

export const UserVotesDocument = `
    query UserVotes($address: String!) {
  governanceProposalVotes(where: {voter_eq: $address}, orderBy: [timestamp_DESC]) {
    id
    type
    timestamp
    proposal {
      id
      address
      proposalId
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

export const UserVotingPowerDocument = `
    query UserVotingPower($address: String!) {
  esAccounts(where: {account_eq: $address}) {
    id
    address
    balance
    stakedBalance
    votingPower
    delegateTo {
      address
    }
    delegatesFrom {
      address
    }
  }
}
    `;

export const useUserVotingPowerQuery = <
      TData = UserVotingPowerQuery,
      TError = unknown
    >(
      variables: UserVotingPowerQueryVariables,
      options?: Omit<UseQueryOptions<UserVotingPowerQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserVotingPowerQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserVotingPowerQuery, TError, TData>(
      {
    queryKey: ['UserVotingPower', variables],
    queryFn: graphqlClient<UserVotingPowerQuery, UserVotingPowerQueryVariables>(UserVotingPowerDocument, variables),
    ...options
  }
    )};

useUserVotingPowerQuery.getKey = (variables: UserVotingPowerQueryVariables) => ['UserVotingPower', variables];


useUserVotingPowerQuery.fetcher = (variables: UserVotingPowerQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserVotingPowerQuery, UserVotingPowerQueryVariables>(UserVotingPowerDocument, variables, options);

export const UserDelegatorsDocument = `
    query UserDelegators($address: String!) {
  esAccounts(where: {delegatesFrom_some: {account_eq: $address}}) {
    id
    address
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
