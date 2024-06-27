/* eslint-disable @typescript-eslint/no-explicit-any */
import { snapshot } from '@origin/defi/shared';
import { contracts } from '@origin/shared/contracts';
import { isFulfilled, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fromUnixTime, isAfter } from 'date-fns';
import { descend, prop, sort } from 'ramda';
import { useAccount } from 'wagmi';

import { spaceIds } from './constants';
import {
  useProposalQuery,
  useProposalsQuery,
  useUserVotesQuery,
} from './queries.generated';
import {
  mapOffChainProposal,
  mapOnchainProposal,
  parseProposalContent,
} from './utils';

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
          ? res[0]?.value?.governanceProposals?.map(mapOnchainProposal) ?? []
          : [];

      const offChainProposals = [];
      if (isFulfilled(res[1]) && res?.[1]?.value?.proposals) {
        for (const p of res[1].value.proposals) {
          const type =
            p?.space?.id === spaceIds.snapshot
              ? ('snapshot' as ProposalType)
              : ('snapshot_ogv' as ProposalType);
          if (
            !p ||
            (type === 'snapshot_ogv' &&
              p?.created &&
              isAfter(new Date('2024-05-01'), fromUnixTime(p?.created)))
          ) {
            continue;
          }

          offChainProposals.push(mapOffChainProposal(p));
        }
      }

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
          ? (res[0].value as UserVotesQuery)?.governanceProposalVotes?.map(
              (v) => {
                const type: ProposalType =
                  v?.proposal?.address?.toLowerCase() ===
                  contracts.mainnet.xOGNGovernance.address.toLowerCase()
                    ? 'onchain'
                    : 'onchain_ogv';
                const { title } = parseProposalContent(
                  v?.proposal?.description,
                );

                return {
                  id: v.id,
                  choice: v.type as GovernanceChoice,
                  created: v.timestamp,
                  proposal: {
                    id: v.proposal.id,
                    proposalId: v.proposal.proposalId,
                    type,
                    title,
                    status: v.proposal.status as string,
                  },
                };
              },
            ) ?? []
          : [];

      const offChainVotes = [];
      if (isFulfilled(res[1]) && res?.[1]?.value?.votes) {
        for (const v of res[1].value.votes) {
          const type: ProposalType =
            v?.proposal?.space?.id === spaceIds.snapshot
              ? 'snapshot'
              : 'snapshot_ogv';
          if (
            type === 'snapshot_ogv' &&
            v?.proposal?.created &&
            isAfter(new Date('2024-05-01'), fromUnixTime(v?.proposal?.created))
          ) {
            continue;
          }
          const idx =
            Number(Array.isArray(v?.choice) ? v.choice.at(0) : v?.choice) - 1;
          const choice = v?.proposal?.choices?.at?.(idx) ?? '';

          offChainVotes.push({
            id: v?.id,
            created: v?.created ? fromUnixTime(v.created).toISOString() : '',
            choice,
            proposal: {
              id: v?.proposal?.id,
              type,
              title: v?.proposal?.title,
              status: v?.proposal?.state,
              link: v?.proposal?.link,
            },
          });
        }
      }

      return sort(descend(prop('created')), [
        ...onChainVotes,
        ...offChainVotes,
      ]);
    },
  });
};

export const useProposal = (
  proposalId?: string,
  options?: Omit<
    UseQueryOptions<
      Proposal | null,
      Error,
      Proposal,
      ['useProposal', string | undefined]
    >,
    'queryKey'
  >,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: ['useProposal', proposalId],
    queryFn: async () => {
      if (!proposalId) {
        return null;
      }

      const proposal = await queryClient.fetchQuery({
        queryKey: useProposalQuery.getKey({ proposalId }),
        queryFn: useProposalQuery.fetcher({ proposalId }),
      });

      return mapOnchainProposal(proposal?.governanceProposalById);
    },
  });
};
