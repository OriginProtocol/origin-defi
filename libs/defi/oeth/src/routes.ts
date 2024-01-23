import { defineMessage } from 'react-intl';

import { PortfolioView } from './views/PortfolioView';
import { RedeemView } from './views/RedeemView';
import { SwapView } from './views/SwapView';

import type { RouteObject } from 'react-router-dom';

export const oethRoute: Partial<RouteObject> = {
  children: [
    {
      index: true,
      Component: SwapView,
      handle: { label: defineMessage({ defaultMessage: 'Swap' }) },
    },
    {
      path: 'portfolio',
      Component: PortfolioView,
      handle: { label: defineMessage({ defaultMessage: 'Portfolio' }) },
    },
    {
      path: 'redeem',
      Component: RedeemView,
      handle: { label: defineMessage({ defaultMessage: 'Redeem' }) },
    },
  ],
};
