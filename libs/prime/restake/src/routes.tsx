import { defineMessage } from 'react-intl';

import { ClaimView } from './views/ClaimView';
import { RestakeView } from './views/RestakeView';
import { StakeView } from './views/StakeView';
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
    // {
    //   path: 'migrate',
    //   Component: MigrateView,
    //   handle: { label: defineMessage({ defaultMessage: 'Migrate' }) },
    // },
    {
      path: 'withdraw',
      Component: WithdrawView,
      handle: { label: defineMessage({ defaultMessage: 'Withdraw' }) },
    },
    {
      path: 'claim',
      Component: ClaimView,
      handle: { label: defineMessage({ defaultMessage: 'Claim' }) },
    },
  ],
};
