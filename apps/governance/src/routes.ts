import {
  ProposalDetailView,
  ProposalListView,
} from '@origin/governance/proposals';
import { StakingView } from '@origin/governance/staking';
import { NotFoundPage } from '@origin/shared/components';
import { defineMessage } from 'react-intl';

import { App } from './App';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: ProposalListView,
        handle: { label: defineMessage({ defaultMessage: 'Governance' }) },
      },
      {
        path: ':proposalId',
        Component: ProposalDetailView,
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
