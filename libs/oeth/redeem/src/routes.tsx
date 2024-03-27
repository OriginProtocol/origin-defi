import { defineMessage } from 'react-intl';

import { ClaimView } from './views/ClaimView';
import { RedeemView } from './views/RedeemView';
import { RequestView } from './views/RequestView';

import type { NonIndexRouteObject } from 'react-router-dom';

export const redeemRoute: NonIndexRouteObject = {
  path: '/redeem',
  Component: RedeemView,
  handle: { label: defineMessage({ defaultMessage: 'Redeem' }) },
  children: [
    {
      index: true,
      Component: RequestView,
      handle: { label: defineMessage({ defaultMessage: 'Request' }) },
    },
    {
      path: 'claim',
      Component: ClaimView,
      handle: { label: defineMessage({ defaultMessage: 'Claim' }) },
    },
  ],
};
