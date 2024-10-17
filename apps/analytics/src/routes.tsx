import { HomeView } from '@origin/analytics/home';
import * as oeth from '@origin/analytics/oeth';
import * as ousd from '@origin/analytics/ousd';
import {
  Overview,
  PoYDetail,
  PoYList,
  Strategies,
} from '@origin/analytics/shared';
import { NotFoundPage } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaChartPieRegular,
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
            ],
          },
          // {
          //   path: 'strategies',
          //   element: <Strategies token={tokens.base.superOETHb} />,
          //   handle: {
          //     title: defineMessage({ defaultMessage: 'Strategies' }),
          //     icon: FaChartPieRegular,
          //     breadcrumb: defineMessage({ defaultMessage: 'Strategies' }),
          //   },
          // },
          // {
          //   path: 'balance-sheet',
          //   element: <BalanceSheet token={tokens.base.superOETHb} />,
          //   handle: {
          //     title: defineMessage({ defaultMessage: 'Balance Sheet' }),
          //     icon: FaFileLinesRegular,
          //     breadcrumb: defineMessage({ defaultMessage: 'Balance Sheet' }),
          //   },
          // },
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
            Component: oeth.OverviewView,
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
          // {
          //   path: 'strategies',
          //   element: <Strategies token={tokens.mainnet.OETH} />,
          //   handle: {
          //     title: defineMessage({ defaultMessage: 'Strategies' }),
          //     icon: FaChartPieRegular,
          //     breadcrumb: defineMessage({ defaultMessage: 'Strategies' }),
          //   },
          // },
          // {
          //   path: 'balance-sheet',
          //   element: <BalanceSheet token={tokens.mainnet.OETH} />,
          //   handle: {
          //     title: defineMessage({ defaultMessage: 'Balance Sheet' }),
          //     icon: FaFileLinesRegular,
          //     breadcrumb: defineMessage({ defaultMessage: 'Balance Sheet' }),
          //   },
          // },
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
            path: 'strategies',
            element: <Strategies token={tokens.mainnet.OUSD} />,
            handle: {
              title: defineMessage({ defaultMessage: 'Strategies' }),
              icon: FaChartPieRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Strategies' }),
            },
          },
          // {
          //   path: 'balance-sheet',
          //   element: <BalanceSheet token={tokens.mainnet.OUSD} />,
          //   handle: {
          //     title: defineMessage({ defaultMessage: 'Balance Sheet' }),
          //     icon: FaFileLinesRegular,
          //     breadcrumb: defineMessage({ defaultMessage: 'Balance Sheet' }),
          //   },
          // },
          {
            path: 'collateral',
            handle: {
              title: defineMessage({ defaultMessage: 'Collaterals' }),
              icon: FaCoinsRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Collaterals' }),
            },
            Component: ousd.OusdCollateralsView,
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
