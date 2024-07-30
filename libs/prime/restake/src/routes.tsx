import { defineMessage } from 'react-intl';

import { ClaimView } from './views/ClaimView';
import { RestakeView } from './views/RestakeView';
import { WithdrawView } from './views/WithdrawView';

import type { NonIndexRouteObject } from 'react-router-dom';

export const restakeRoute: NonIndexRouteObject = {
  path: '/restake',
  Component: RestakeView,
  handle: { label: defineMessage({ defaultMessage: 'Withdraw' }) },
  children: [
    {
      index: true,
      Component: WithdrawView,
      handle: {
        label: defineMessage({ defaultMessage: 'Withdraw' }),
      },
    },
    // {
    //   path: 'migrate',
    //   Component: MigrateView,
    //   handle: { label: defineMessage({ defaultMessage: 'Migrate' }) },
    // },
    // {
    //   path: 'withdraw',
    //   Component: WithdrawView,
    //   handle: { label: defineMessage({ defaultMessage: 'Withdraw' }) },
    // },
    {
      path: 'claim',
      Component: ClaimView,
      handle: { label: defineMessage({ defaultMessage: 'Claim or Migrate' }) },
    },
  ],
};
