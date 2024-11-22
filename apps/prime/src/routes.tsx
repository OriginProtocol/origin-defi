import { DashboardView } from '@origin/prime/dashboard';
import { restakeRoute } from '@origin/prime/restake';
import { NotFoundPage } from '@origin/shared/components';
import { defineMessage } from 'react-intl';
import { Navigate } from 'react-router';

import { App } from './App';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      restakeRoute,
      {
        path: '/dashboard',
        Component: DashboardView,
        handle: { label: defineMessage({ defaultMessage: 'Dashboard' }) },
      },
      {
        index: true,
        element: <Navigate to={restakeRoute?.path ?? '/restake'} />,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
