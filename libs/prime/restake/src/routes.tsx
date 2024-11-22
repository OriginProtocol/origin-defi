import { defineMessage } from 'react-intl';

import { AboutView } from './views/AboutView';
import { ClaimView } from './views/ClaimView';
import { RestakeView } from './views/RestakeView';
import { WithdrawView } from './views/WithdrawView';

import type { NonIndexRouteObject } from 'react-router';

export const restakeRoute: NonIndexRouteObject = {
  path: '/restake',
  Component: RestakeView,
  handle: { label: defineMessage({ defaultMessage: 'Withdraw/Migrate' }) },
  children: [
    {
      index: true,
      Component: AboutView,
      handle: {
        label: defineMessage({ defaultMessage: 'Overview' }),
      },
    },
    {
      path: 'withdraw',
      Component: WithdrawView,
      handle: { label: defineMessage({ defaultMessage: 'Withdraw' }) },
    },
    {
      path: 'claim',
      Component: ClaimView,
      handle: { label: defineMessage({ defaultMessage: 'Claim/Migrate' }) },
    },
  ],
};
