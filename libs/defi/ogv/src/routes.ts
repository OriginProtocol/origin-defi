import { defineMessage } from 'react-intl';

import { PortfolioView } from './views/PortfolioView';
import { StakingView } from './views/StakingView';
import { SwapView } from './views/SwapView';

import type { RouteObject } from 'react-router-dom';

export const ogvRoute: Partial<RouteObject> = {
  children: [
    {
      index: true,
      Component: SwapView,
      handle: { label: defineMessage({ defaultMessage: 'Swap' }) },
    },
    {
      path: 'staking',
      Component: StakingView,
      handle: { label: defineMessage({ defaultMessage: 'Staking' }) },
    },
    {
      path: 'portfolio',
      Component: PortfolioView,
      handle: { label: defineMessage({ defaultMessage: 'Portfolio' }) },
    },
  ],
};
