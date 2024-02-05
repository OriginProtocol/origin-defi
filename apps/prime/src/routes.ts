import { DashboardView, RestakeView } from '@origin/prime/restake';
import { NotFoundPage } from '@origin/shared/components';

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
      },
      {
        path: '/restake',
        Component: RestakeView,
      },
      {
        path: '/dashboard',
        Component: DashboardView,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
