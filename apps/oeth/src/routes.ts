import { HistoryView } from '@origin/oeth/history';
import { SwapView } from '@origin/oeth/swap';
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
        Component: SwapView,
        handle: { label: defineMessage({ defaultMessage: 'Swap' }) },
      },
      {
        path: '/history',
        Component: HistoryView,
        handle: { label: defineMessage({ defaultMessage: 'History' }) },
      },
    ],
  },
];
