import { defineMessage } from 'react-intl';

import { HistoryView } from './views/HistoryView';
import { HistoryViewOETH } from './views/HistoryViewOETH';
import { HistoryViewWOETH } from './views/HistoryViewWOETH';

import type { NonIndexRouteObject } from 'react-router-dom';

export const historyRoute: NonIndexRouteObject = {
  path: '/history',
  Component: HistoryView,
  handle: { label: defineMessage({ defaultMessage: 'History' }) },
  children: [
    {
      index: true,
      Component: HistoryViewOETH,
      handle: { label: defineMessage({ defaultMessage: 'OETH' }) },
    },
    {
      path: 'oeth',
      Component: HistoryViewOETH,
      handle: { label: defineMessage({ defaultMessage: 'OETH' }) },
    },
    {
      path: 'woeth',
      Component: HistoryViewWOETH,
      handle: { label: defineMessage({ defaultMessage: 'wOETH' }) },
    },
  ],
};
