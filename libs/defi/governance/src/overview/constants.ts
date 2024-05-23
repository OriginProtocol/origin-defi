import { OgvProposalState } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { defineMessage } from 'react-intl';

import type { Token } from '@origin/shared/contracts';
import type { MessageDescriptor } from 'react-intl';

import type { ProposalType } from './types';

export const governanceChoices = ['For', 'Against'] as const;

export const statusLabels: Record<string, MessageDescriptor> = {
  [OgvProposalState.Active]: defineMessage({ defaultMessage: 'Active' }),
  [OgvProposalState.Canceled]: defineMessage({
    defaultMessage: 'Canceled',
  }),
  [OgvProposalState.Defeated]: defineMessage({
    defaultMessage: 'Defeated',
  }),
  [OgvProposalState.Executed]: defineMessage({
    defaultMessage: 'Executed',
  }),
  [OgvProposalState.Expired]: defineMessage({
    defaultMessage: 'Expired',
  }),
  [OgvProposalState.Pending]: defineMessage({
    defaultMessage: 'Pending',
  }),
  [OgvProposalState.Queued]: defineMessage({ defaultMessage: 'Queued' }),
  [OgvProposalState.Succeeded]: defineMessage({
    defaultMessage: 'Succeeded',
  }),
  active: defineMessage({
    defaultMessage: 'Active',
  }),
  closed: defineMessage({
    defaultMessage: 'Closed',
  }),
  pending: defineMessage({
    defaultMessage: 'Pending',
  }),
};

export const governanceSupport: Record<string, number> = {
  Against: 0,
  For: 1,
  Abstain: 2,
};

export const spaceIds: Partial<Record<ProposalType, string>> = {
  snapshot: 'origingov.eth',
  snapshot_ogv: 'ousdgov.eth',
};

export const governanceTokens: Record<ProposalType, Token> = {
  onchain: tokens.mainnet.xOGN,
  onchain_ogv: tokens.mainnet.veOGV,
  snapshot: tokens.mainnet.OGN,
  snapshot_ogv: tokens.mainnet.veOGV,
};
