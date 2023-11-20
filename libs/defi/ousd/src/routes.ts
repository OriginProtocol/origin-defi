import { defineMessage } from 'react-intl';

import { AnalyticsView } from './views/AnalyticsView';
import { OusdView } from './views/OusdView';
import { RedeemView } from './views/RedeemView';
import { SwapView } from './views/SwapView';

import type { RouteObject } from 'react-router-dom';

export const ousdRoute: Partial<RouteObject> = {
  Component: OusdView,
  children: [
    {
      index: true,
      Component: SwapView,
      handle: { label: defineMessage({ defaultMessage: 'Swap' }) },
    },
    {
      path: 'redeem',
      Component: RedeemView,
      handle: { label: defineMessage({ defaultMessage: 'Redeem' }) },
    },
    {
      path: 'analytics',
      Component: AnalyticsView,
      handle: { label: defineMessage({ defaultMessage: 'Analytics' }) },
    },
  ],
};
