import { governanceRoute } from '@origin/defi/governance';
import { HomeView } from '@origin/defi/home';
import { oethRoute } from '@origin/defi/oeth';
import { ousdRoute } from '@origin/defi/ousd';
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
        Component: HomeView,
        handle: { label: defineMessage({ defaultMessage: 'Home' }) },
      },
      {
        index: false,
        path: 'oeth',
        handle: { label: defineMessage({ defaultMessage: 'OETH' }) },
        ...oethRoute,
      },
      {
        index: false,
        path: 'ousd',
        handle: { label: defineMessage({ defaultMessage: 'OUSD' }) },
        ...ousdRoute,
      },
      {
        index: false,
        path: 'governance',
        handle: { label: defineMessage({ defaultMessage: 'Governance' }) },
        ...governanceRoute,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
