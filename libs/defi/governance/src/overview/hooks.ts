/* eslint-disable @typescript-eslint/no-explicit-any */
import { snapshot } from '@origin/defi/shared';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fromUnixTime } from 'date-fns';
import { descend, prop, sort, zipObj } from 'ramda';
import { useAccount } from 'wagmi';

import { useProposalsQuery, useUserVotesQuery } from './queries.generated';
import { parseProposalContent } from './utils';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { UserVotesQuery } from './queries.generated';
import type { GovernanceChoice, Proposal, ProposalType } from './types';

export const useProposals = (
  options?: Omit<
    UseQueryOptions<Proposal[], Error, Proposal[], ['useProposals']>,
    'queryKey'
  >,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['useProposals'],
    queryFn: async () => {
      const res = await Promise.allSettled([
        queryClient.fetchQuery({
          queryKey: useProposalsQuery.getKey(),
          queryFn: useProposalsQuery.fetcher(),
        }),
        queryClient.fetchQuery({
          queryKey: snapshot.useSnapshotProposalsQuery.getKey(),
          queryFn: snapshot.useSnapshotProposalsQuery.fetcher(),
        }),
      ]);

      const onChainProposals: Proposal[] =
        res[0].status === 'fulfilled'
          ? res[0]?.value?.ogvProposals?.map((p) => {
              const { title, description } = parseProposalContent(
                p?.description,
              );
              const votes = {
                For: 0,
                Against: 0,
                ...zipObj(
                  p?.choices?.map((c) => c ?? 'key'),
                  p.scores,
                ),
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

      const offChainProposals: Proposal[] =
        res[1].status === 'fulfilled'
          ? (res[1].value as snapshot.SnapshotProposalsQuery)?.proposals?.map(
              (p) => ({
                id: p?.id ?? 'id',
                type: 'snapshot' as ProposalType,
                title: p?.title ?? '',
                created: p?.created
                  ? fromUnixTime(p.created).toISOString()
                  : '',
                start: p?.start ? fromUnixTime(p.start).toISOString() : '',
                end: p?.end ? fromUnixTime(p.end).toISOString() : '',
                updated: p?.updated
                  ? fromUnixTime(p.updated).toISOString()
                  : '',
                status: p?.state ?? '',
                choices: p?.choices as any,
                scores: p?.scores as any,
                quorum: p?.quorum,
                link: p?.link as any,
              }),
            ) ?? []
          : [];

      return sort(descend(prop('created')), [
        ...onChainProposals,
        ...offChainProposals,
      ]);
    },
    ...options,
  });
};

export const useUserVotes = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['useUserVotes', address],
    enabled: !!address,
    queryFn: async () => {
      const res = await Promise.allSettled([
        queryClient.fetchQuery({
          queryKey: useUserVotesQuery.getKey({
            address: address ?? ZERO_ADDRESS,
          }),
          queryFn: useUserVotesQuery.fetcher({
            address: address ?? ZERO_ADDRESS,
          }),
        }),
        queryClient.fetchQuery({
          queryKey: snapshot.useSnapshotUserVotesQuery.getKey({
            address: address ?? ZERO_ADDRESS,
          }),
          queryFn: snapshot.useSnapshotUserVotesQuery.fetcher({
            address: address ?? ZERO_ADDRESS,
          }),
        }),
      ]);

      const onChainVotes =
        res[0].status === 'fulfilled'
          ? (res[0].value as UserVotesQuery)?.ogvProposalVotes?.map((v) => {
              const { title } = parseProposalContent(v?.proposal?.description);

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
          ? (res[1].value as snapshot.SnapshotUserVotesQuery)?.votes?.map(
              (v) => {
                const idx =
                  Number(
                    Array.isArray(v?.choice) ? v.choice.at(0) : v?.choice,
                  ) - 1;
                const choice = v?.proposal?.choices?.at?.(idx) ?? '';

                return {
                  id: v?.id,
                  created: v?.created
                    ? fromUnixTime(v.created).toISOString()
                    : '',
                  choice,
                  proposal: {
                    id: v?.proposal?.id,
                    type: 'snapshot' as ProposalType,
                    title: v?.proposal?.title,
                    status: v?.proposal?.state,
                    link: v?.proposal?.link,
                  },
                };
              },
            ) ?? []
          : [];

      return sort(descend(prop('created')), [
        ...onChainVotes,
        ...offChainVotes,
      ]);
    },
  });
};
