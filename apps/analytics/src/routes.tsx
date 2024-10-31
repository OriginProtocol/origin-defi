import { HomeView } from '@origin/analytics/home';
import {
  Collaterals,
  Overview,
  PoYDetail,
  PoYList,
} from '@origin/analytics/shared';
import * as superOeth from '@origin/analytics/super';
import { NotFoundPage } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaClockRegular,
  FaCoinsRegular,
  FaEyeRegular,
  OETH,
  OUSD,
  superOETH,
} from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import { App } from './App';

import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomeView,
      },
      {
        index: false,
        path: 'super',
        handle: {
          title: defineMessage({ defaultMessage: 'Super OETH' }),
          icon: superOETH,
          breadcrumb: defineMessage({ defaultMessage: 'Super OETH' }),
        },
        children: [
          {
            index: true,
            element: <Overview token={tokens.base.superOETHb} currency="ETH" />,
            handle: {
              title: defineMessage({ defaultMessage: 'Overview' }),
              icon: FaEyeRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Overview' }),
            },
          },
          {
            path: 'poy',
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
              breadcrumb: defineMessage({
                defaultMessage: 'Proof of Yield',
              }),
            },
            children: [
              {
                index: true,
                element: <PoYList token={tokens.base.superOETHb} />,
              },
              {
                path: ':id',
                element: <PoYDetail token={tokens.base.superOETHb} />,
                handle: {
                  breadcrumb: defineMessage({
                    defaultMessage: 'Details',
                  }),
                },
              },
              {
                path: 'collateral',
                handle: {
                  title: defineMessage({ defaultMessage: 'Collateral' }),
                  icon: FaCoinsRegular,
                  breadcrumb: defineMessage({ defaultMessage: 'Collateral' }),
                },
                Component: superOeth.CollateralsView,
              },
            ],
          },
        ],
      },
      {
        index: false,
        path: 'oeth',
        handle: {
          title: defineMessage({ defaultMessage: 'OETH' }),
          icon: OETH,
          breadcrumb: defineMessage({ defaultMessage: 'OETH' }),
        },
        children: [
          {
            index: true,
            element: <Overview token={tokens.mainnet.OETH} currency="ETH" />,
            handle: {
              title: defineMessage({ defaultMessage: 'Overview' }),
              icon: FaEyeRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Overview' }),
            },
          },
          {
            path: 'poy',
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Proof of Yield' }),
            },
            children: [
              {
                index: true,
                element: <PoYList token={tokens.mainnet.OETH} />,
              },
              {
                path: ':id',
                element: <PoYDetail token={tokens.mainnet.OETH} />,
                handle: {
                  breadcrumb: defineMessage({ defaultMessage: 'Details' }),
                },
              },
            ],
          },
        ],
      },
      {
        index: false,
        path: 'ousd',
        handle: {
          title: defineMessage({ defaultMessage: 'OUSD' }),
          icon: OUSD,
          breadcrumb: defineMessage({ defaultMessage: 'OUSD' }),
        },
        children: [
          {
            index: true,
            element: <Overview token={tokens.mainnet.OUSD} currency="USD" />,
            handle: {
              title: defineMessage({ defaultMessage: 'Overview' }),
              icon: FaEyeRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Overview' }),
            },
          },
          {
            path: 'poy',
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Proof of Yield' }),
            },
            children: [
              {
                index: true,
                element: <PoYList token={tokens.mainnet.OUSD} />,
              },
              {
                path: ':id',
                element: <PoYDetail token={tokens.mainnet.OUSD} />,
                handle: {
                  breadcrumb: defineMessage({ defaultMessage: 'Details' }),
                },
              },
            ],
          },
          {
            path: 'collateral',
            handle: {
              title: defineMessage({ defaultMessage: 'Collateral' }),
              icon: FaCoinsRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Collateral' }),
            },
            element: <Collaterals token={tokens.mainnet.OUSD} currency="USD" />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
