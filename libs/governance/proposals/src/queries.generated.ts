import * as Types from '@origin/governance/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
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
  ogvProposalVotes(where: {proposal: {id_eq: $proposalId}}) {
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
  ogvProposalVotes(where: {voter: {id_eq: $address}}, orderBy: timestamp_DESC) {
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
