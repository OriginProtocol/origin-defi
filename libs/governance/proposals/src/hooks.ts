import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { fromUnixTime } from 'date-fns';
import { descend, prop, sort, zipObj } from 'ramda';

import { useProposalsQuery } from './queries.generated';
import { useSnapshotProposalsQuery } from './snapshot.generated';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { ProposalsQuery } from './queries.generated';
import type { SnapshotProposalsQuery } from './snapshot.generated';
import type { GovernanceChoice, Proposal, ProposalType } from './types';

export const useProposals = <T = unknown>(
  options?: UseQueryOptions<
    Proposal[],
    Error,
    Proposal[] | T,
    ['useProposals']
  >,
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
              const votes = {
                For: 0,
                Against: 0,
                ...zipObj(p.choices, p.scores),
              };

              return {
                id: p.id,
                type: 'onchain' as ProposalType,
                title: p.description,
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
              type: 'offchain' as ProposalType,
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
      ]).map((p, index) => ({ index, ...p }));
    },
    ...options,
  });
};
