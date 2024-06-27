import { contracts, tokens } from '@origin/shared/contracts';
import { fromUnixTime } from 'date-fns';
import { zipObj } from 'ramda';
import { formatUnits } from 'viem';

import { spaceIds } from './constants';

import type { ProposalQuery, ProposalsQuery } from './queries.generated';
import type { GovernanceChoice, Proposal, ProposalType } from './types';

export const parseProposalContent = (
  description: string | undefined | null,
) => {
  if (!description) {
    return { title: '', description: '' };
  }

  const split = description?.split(/\n/g);
  const title = split && split[0];
  const rest =
    split &&
    split
      .slice(1)
      .filter((d) => d)
      .join(`\n`);

  return { title, description: rest };
};

export const mapOnchainProposal = (
  input:
    | ProposalQuery['governanceProposalById']
    | ProposalsQuery['governanceProposals'][number],
): Proposal => {
  const type: ProposalType =
    input?.address?.toLowerCase() ===
    contracts.mainnet.xOGNGovernance.address.toLowerCase()
      ? 'onchain'
      : 'onchain_ogv';
  const token = type === 'onchain' ? tokens.mainnet.xOGN : tokens.mainnet.veOGV;
  const { title, description } = parseProposalContent(input?.description);
  const votes = {
    For: 0,
    Against: 0,
    ...zipObj(
      (input?.choices ?? []).map((c) => c ?? 'key'),
      (input?.scores ?? []).map(
        (s) => +formatUnits(BigInt(s ?? 0), token.decimals),
      ),
    ),
  };

  return {
    id: input?.id ?? '',
    proposalId: BigInt(input?.proposalId ?? ''),
    type,
    token,
    title,
    description,
    created: input?.timestamp ?? '',
    start: fromUnixTime(Number(input?.startBlock)).toISOString(),
    end: fromUnixTime(Number(input?.endBlock)).toISOString(),
    startBlock: Number(input?.startBlock),
    endBlock: Number(input?.endBlock),
    updated: input?.lastUpdated,
    status: input?.status ?? '',
    choices: Object.keys(votes) as GovernanceChoice[],
    scores: Object.values(votes),
    quorum: +formatUnits(BigInt(input?.quorum ?? 348e9), token.decimals),
    events: (input as ProposalQuery['governanceProposalById'])?.events,
    proposer: (input as ProposalQuery['governanceProposalById'])?.proposer,
    targets: (input as ProposalQuery['governanceProposalById'])?.targets,
    values: (input as ProposalQuery['governanceProposalById'])?.values,
    signatures: (input as ProposalQuery['governanceProposalById'])?.signatures,
    calldatas: (input as ProposalQuery['governanceProposalById'])?.calldatas,
  };
};

export const mapOffChainProposal = (input: {
  __typename?: 'Proposal';
  id: string;
  title: string;
  choices: Array<string | null>;
  scores?: Array<number | null> | null;
  state?: string | null;
  start: number;
  end: number;
  link?: string | null;
  quorum: number;
  created: number;
  updated?: number | null;
  space?: { __typename?: 'Space'; id: string } | null;
}): Proposal => {
  const type: ProposalType =
    input?.space?.id === spaceIds.snapshot ? 'snapshot' : 'snapshot_ogv';

  return {
    id: input?.id ?? `id-${type}-${input?.title}`,
    type,
    token: type === 'snapshot' ? tokens.mainnet.xOGN : tokens.mainnet.veOGV,
    title: input?.title ?? '',
    created: input?.created ? fromUnixTime(input.created).toISOString() : '',
    start: input?.start ? fromUnixTime(input.start).toISOString() : '',
    end: input?.end ? fromUnixTime(input.end).toISOString() : '',
    startBlock: input?.start,
    endBlock: input?.end,
    updated: input?.updated ? fromUnixTime(input.updated).toISOString() : '',
    status: input?.state ?? '',
    choices: input?.choices as GovernanceChoice[],
    scores: input?.scores as number[],
    quorum: input?.quorum,
    link: input?.link as string,
  };
};
