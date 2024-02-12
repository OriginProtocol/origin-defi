import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { fromUnixTime } from 'date-fns';
import { descend, prop, sort, zipObj } from 'ramda';
import { useAccount } from 'wagmi';

import { useProposalsQuery, useUserVotesQuery } from './queries.generated';
import {
  useSnapshotProposalsQuery,
  useSnapshotUserVotesQuery,
} from './snapshot.generated';
import { parseProposalContent } from './utils';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { ProposalsQuery, UserVotesQuery } from './queries.generated';
import type {
  SnapshotProposalsQuery,
  SnapshotUserVotesQuery,
} from './snapshot.generated';
import type { GovernanceChoice, Proposal, ProposalType, Vote } from './types';

export const useProposals = (
  options?: Partial<UseQueryOptions<Proposal[], Error>>,
) => {
  return useQuery({
    queryKey: ['useProposals'],
    queryFn: async () => {
      const res = await Promise.allSettled([
        useProposalsQuery.fetcher()(),
        useSnapshotProposalsQuery.fetcher()(),
      ]);

      const onChainProposals =
        res[0].status === 'fulfilled'
          ? (res[0].value as ProposalsQuery)?.ogvProposals?.map((p) => {
              const { title, description } = parseProposalContent(
                p?.description,
              );
              const votes = {
                For: 0,
                Against: 0,
                ...zipObj(p.choices, p.scores),
              };

              return {
                id: p.id,
                type: 'onchain' as ProposalType,
                title,
                description,
                created: p.timestamp,
                start: fromUnixTime(Number(p.startBlock)).toISOString(),
                end: fromUnixTime(Number(p.endBlock)).toISOString(),
                updated: p.lastUpdated,
                status: p.status,
                choices: Object.keys(votes) as GovernanceChoice[],
                scores: Object.values(votes),
                quorum: 348e9,
                link: '',
              };
            }) ?? []
          : [];

      const offChainProposals =
        res[1].status === 'fulfilled'
          ? (res[1].value as SnapshotProposalsQuery)?.proposals?.map((p) => ({
              id: p.id,
              type: 'snapshot' as ProposalType,
              title: p.title,
              created: fromUnixTime(p.created).toISOString(),
              start: fromUnixTime(p.start).toISOString(),
              end: fromUnixTime(p.end).toISOString(),
              updated: isNilOrEmpty(p?.updated)
                ? null
                : fromUnixTime(p.updated).toISOString(),
              status: p.state,
              choices: p.choices as GovernanceChoice[],
              scores: p.scores,
              quorum: p.quorum,
              link: p.link,
            })) ?? []
          : [];

      return sort(descend(prop('created')), [
        ...onChainProposals,
        ...offChainProposals,
      ]);
    },
    ...options,
  });
};

export const useUserVotes = (
  options?: Partial<UseQueryOptions<Vote[], Error>>,
) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['useUserVotes', address],
    queryFn: async () => {
      const res = await Promise.allSettled([
        useUserVotesQuery.fetcher({ address })(),
        useSnapshotUserVotesQuery.fetcher({ address })(),
      ]);

      const onChainVotes =
        res[0].status === 'fulfilled'
          ? (res[0].value as UserVotesQuery)?.ogvProposalVotes?.map((v) => {
              const { title } = parseProposalContent(v.proposal.description);

              return {
                id: v.id,
                choice: v.type,
                created: v.timestamp,
                proposal: {
                  id: v.proposal.id,
                  type: 'onchain' as ProposalType,
                  title,
                  status: v.proposal.status,
                },
              };
            }) ?? []
          : [];

      const offChainVotes =
        res[1].status === 'fulfilled'
          ? (res[1].value as SnapshotUserVotesQuery)?.votes?.map((v) => {
              const idx =
                Number(Array.isArray(v.choice) ? v.choice.at(0) : v.choice) - 1;
              const choice = v.proposal?.choices?.at?.(idx) ?? '';

              return {
                id: v.id,
                created: fromUnixTime(v.created).toISOString(),
                choice,
                proposal: {
                  id: v.proposal.id,
                  type: 'snapshot' as ProposalType,
                  title: v.proposal.title,
                  status: v.proposal.state,
                  link: v.proposal.link,
                },
              };
            }) ?? []
          : [];

      return sort(descend(prop('created')), [
        ...onChainVotes,
        ...offChainVotes,
      ]);
    },
    ...options,
  });
};
