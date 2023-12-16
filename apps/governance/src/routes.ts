import { ProposalsView, ProposalView } from '@origin/governance/proposals';
import { StakingView } from '@origin/governance/staking';
import { NotFoundPage } from '@origin/shared/components';
import { defineMessage } from 'react-intl';

import { App } from './App';

import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: ProposalsView,
        handle: { label: defineMessage({ defaultMessage: 'Governance' }) },
      },
      {
        path: ':proposalId',
        Component: ProposalView,
      },
      {
        path: '/staking',
        Component: StakingView,
        handle: { label: defineMessage({ defaultMessage: 'Staking' }) },
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
