import { defineMessage } from 'react-intl';

import { AnalyticsView } from './views/AnalyticsView';
import { OethView } from './views/OethView';
import { PoyView } from './views/PoyView';
import { RedeemView } from './views/RedeemView';
import { SwapView } from './views/SwapView';

import type { RouteObject } from 'react-router-dom';

export const oethRoute: Partial<RouteObject> = {
  Component: OethView,
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
      path: 'poy',
      Component: PoyView,
      handle: { label: defineMessage({ defaultMessage: 'Proof of yield' }) },
    },
    {
      path: 'analytics',
      Component: AnalyticsView,
      handle: { label: defineMessage({ defaultMessage: 'Analytics' }) },
    },
  ],
};
