import { defineMessage } from 'react-intl';

import { RestakeView } from './views/RestakeView';
import { StakeView } from './views/StakeView';
import { UnstakeView } from './views/UnstakeView';
import { WithdrawView } from './views/WithdrawView';

import type { NonIndexRouteObject } from 'react-router-dom';

export const restakeRoute: NonIndexRouteObject = {
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
