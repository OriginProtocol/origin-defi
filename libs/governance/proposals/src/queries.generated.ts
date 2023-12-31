import * as Types from '@origin/governance/shared';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type ProposalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProposalsQuery = { __typename?: 'Query', ogvProposals: Array<{ __typename?: 'OGVProposal', id: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.OgvProposalState, choices: Array<string | null>, scores: Array<number | null> }> };

export type ProposalQueryVariables = Types.Exact<{
  proposalId: Types.Scalars['String']['input'];
}>;


export type ProposalQuery = { __typename?: 'Query', ogvProposalById?: { __typename?: 'OGVProposal', id: string, description?: string | null, timestamp: string, startBlock: string, endBlock: string, lastUpdated: string, status: Types.OgvProposalState, choices: Array<string | null>, scores: Array<number | null>, quorum: string, logs: Array<{ __typename?: 'OGVProposalTxLog', id: string, hash: string, event: Types.OgvProposalEvent, timestamp: string }>, proposer: { __typename?: 'OGVAddress', id: string } } | null, ogvProposalVotes: Array<{ __typename?: 'OGVProposalVote', id: string, weight: string, type: Types.OgvVoteType, txHash: string, timestamp: string, voter: { __typename?: 'OGVAddress', id: string } }> };

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
      options?: UseQueryOptions<ProposalsQuery, TError, TData>
    ) =>
    useQuery<ProposalsQuery, TError, TData>(
      variables === undefined ? ['Proposals'] : ['Proposals', variables],
      graphqlClient<ProposalsQuery, ProposalsQueryVariables>(ProposalsDocument, variables),
      options
    );

useProposalsQuery.getKey = (variables?: ProposalsQueryVariables) => variables === undefined ? ['Proposals'] : ['Proposals', variables];
;

export const useInfiniteProposalsQuery = <
      TData = ProposalsQuery,
      TError = unknown
    >(
      variables?: ProposalsQueryVariables,
      options?: UseInfiniteQueryOptions<ProposalsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ProposalsQuery, TError, TData>(
      variables === undefined ? ['Proposals.infinite'] : ['Proposals.infinite', variables],
      (metaData) => graphqlClient<ProposalsQuery, ProposalsQueryVariables>(ProposalsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteProposalsQuery.getKey = (variables?: ProposalsQueryVariables) => variables === undefined ? ['Proposals.infinite'] : ['Proposals.infinite', variables];
;

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
      options?: UseQueryOptions<ProposalQuery, TError, TData>
    ) =>
    useQuery<ProposalQuery, TError, TData>(
      ['Proposal', variables],
      graphqlClient<ProposalQuery, ProposalQueryVariables>(ProposalDocument, variables),
      options
    );

useProposalQuery.getKey = (variables: ProposalQueryVariables) => ['Proposal', variables];
;

export const useInfiniteProposalQuery = <
      TData = ProposalQuery,
      TError = unknown
    >(
      variables: ProposalQueryVariables,
      options?: UseInfiniteQueryOptions<ProposalQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ProposalQuery, TError, TData>(
      ['Proposal.infinite', variables],
      (metaData) => graphqlClient<ProposalQuery, ProposalQueryVariables>(ProposalDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteProposalQuery.getKey = (variables: ProposalQueryVariables) => ['Proposal.infinite', variables];
;

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
      options?: UseQueryOptions<UserVotesQuery, TError, TData>
    ) =>
    useQuery<UserVotesQuery, TError, TData>(
      ['UserVotes', variables],
      graphqlClient<UserVotesQuery, UserVotesQueryVariables>(UserVotesDocument, variables),
      options
    );

useUserVotesQuery.getKey = (variables: UserVotesQueryVariables) => ['UserVotes', variables];
;

export const useInfiniteUserVotesQuery = <
      TData = UserVotesQuery,
      TError = unknown
    >(
      variables: UserVotesQueryVariables,
      options?: UseInfiniteQueryOptions<UserVotesQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<UserVotesQuery, TError, TData>(
      ['UserVotes.infinite', variables],
      (metaData) => graphqlClient<UserVotesQuery, UserVotesQueryVariables>(UserVotesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteUserVotesQuery.getKey = (variables: UserVotesQueryVariables) => ['UserVotes.infinite', variables];
;

useUserVotesQuery.fetcher = (variables: UserVotesQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserVotesQuery, UserVotesQueryVariables>(UserVotesDocument, variables, options);