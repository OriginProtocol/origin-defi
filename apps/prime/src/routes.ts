import { DashboardView } from '@origin/prime/dashboard';
import { RestakeView } from '@origin/prime/restake';
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
        Component: RestakeView,
        handle: { label: defineMessage({ defaultMessage: 'Restake' }) },
      },
      {
        path: '/dashboard',
        Component: DashboardView,
        handle: { label: defineMessage({ defaultMessage: 'Dashboard' }) },
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
