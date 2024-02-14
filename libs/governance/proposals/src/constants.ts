import { OgvProposalState } from '@origin/governance/shared';
import { defineMessage } from 'react-intl';

import type { MessageDescriptor } from 'react-intl';

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
