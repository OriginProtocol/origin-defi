import { defineMessage } from 'react-intl';

import { AboutView } from './views/AboutView';
import { OverviewView } from './views/OverviewView';
import { ProposalsView } from './views/ProposalsView';

import type { RouteObject } from 'react-router-dom';

export const governanceRoutes: RouteObject[] = [
  {
    index: true,
    Component: OverviewView,
    handle: { label: defineMessage({ defaultMessage: 'Overview' }) },
  },
  {
    path: 'proposals',
    Component: ProposalsView,
    handle: { label: defineMessage({ defaultMessage: 'Proposals' }) },
  },
  {
    path: 'about',
    Component: AboutView,
    handle: { label: defineMessage({ defaultMessage: 'About' }) },
  },
];
