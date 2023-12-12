import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { fromUnixTime } from 'date-fns';
import { descend, prop, sort } from 'ramda';

import { useAllProposalsQuery } from './queries.generated';
import { useSnapshotProposalsQuery } from './snapshot.generated';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { AllProposalsQuery } from './queries.generated';
import type { SnapshotProposalsQuery } from './snapshot.generated';
import type { Proposal, ProposalType } from './types';

export const useProposals = (
  options?: UseQueryOptions<Proposal[], Error, Proposal[], ['useProposals']>,
) => {
  return useQuery({
    queryKey: ['useProposals'],
    queryFn: async () => {
      const res = await Promise.allSettled([
        useAllProposalsQuery.fetcher()(),
        useSnapshotProposalsQuery.fetcher()(),
      ]);

      const onChainProposals =
        res[0].status === 'fulfilled'
          ? (res[0].value as AllProposalsQuery)?.ogvProposals?.map((p) => ({
              id: p.id,
              type: 'onchain' as ProposalType,
              title: p.description,
              created: p.timestamp,
              start: fromUnixTime(Number(p.startBlock)).toISOString(),
              end: fromUnixTime(Number(p.endBlock)).toISOString(),
              updated: p.lastUpdated,
              status: p.status,
              choices: ['For', 'Against'],
              scores: [0, 0],
              quorum: 348e9,
              link: '',
            })) ?? []
          : [];

      const offChainProposals =
        res[1].status === 'fulfilled'
          ? (res[1].value as SnapshotProposalsQuery)?.proposals?.map((p) => ({
              id: p.id,
              type: 'offchain' as ProposalType,
              title: p.title,
              created: fromUnixTime(p.created).toISOString(),
              start: fromUnixTime(p.start).toISOString(),
              end: fromUnixTime(p.end).toISOString(),
              updated: isNilOrEmpty(p?.updated)
                ? null
                : fromUnixTime(p.updated).toISOString(),
              status: p.state,
              choices: p.choices,
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
