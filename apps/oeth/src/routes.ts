import { HistoryView } from '@origin/oeth/history';
import { redeemRoute } from '@origin/oeth/redeem';
import { SwapView } from '@origin/oeth/swap';
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
        Component: SwapView,
        handle: { label: defineMessage({ defaultMessage: 'Swap' }) },
      },
      redeemRoute,
      {
        path: '/history',
        Component: HistoryView,
        handle: { label: defineMessage({ defaultMessage: 'History' }) },
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
