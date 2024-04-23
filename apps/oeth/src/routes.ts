import { BridgeView } from '@origin/oeth/ccip';
import { historyRoute } from '@origin/oeth/history';
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
        path: '/bridge',
        Component: BridgeView,
        handle: { label: defineMessage({ defaultMessage: 'Bridge' }) },
      },
      historyRoute,
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
