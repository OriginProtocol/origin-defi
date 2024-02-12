import { defineMessage } from 'react-intl';

import { RestakeView, StakeView, UnstakeView, WithdrawView } from './views';

import type { RouteObject } from 'react-router-dom';

export const restakeRoute: RouteObject = {
  path: '/restake',
  Component: RestakeView,
  handle: { label: defineMessage({ defaultMessage: 'Restake' }) },
  children: [
    {
      index: true,
      Component: StakeView,
      handle: { label: defineMessage({ defaultMessage: 'Stake' }) },
    },
    {
      path: 'unstake',
      Component: UnstakeView,
      handle: { label: defineMessage({ defaultMessage: 'Unstake' }) },
    },
    {
      path: 'withdraw',
      Component: WithdrawView,
      handle: { label: defineMessage({ defaultMessage: 'Withdraw' }) },
    },
  ],
};
