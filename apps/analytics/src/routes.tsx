import * as arm from '@origin/analytics/arm';
import { HomeView } from '@origin/analytics/home';
import * as oeth from '@origin/analytics/oeth';
import {
  CollateralsView,
  OverviewView,
  PoYView,
} from '@origin/analytics/shared';
import * as superOeth from '@origin/analytics/super';
import { NotFoundPage } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  ARM,
  FaClockRegular,
  FaCoinsRegular,
  FaEyeRegular,
  OETH,
  OUSD,
  superOETH,
} from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import { App } from './App';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomeView,
        handle: {
          title: defineMessage({ defaultMessage: 'Overview' }),
          icon: FaEyeRegular,
        },
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
            element: (
              <OverviewView token={tokens.base.superOETHb} currency="ETH" />
            ),
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
            element: <PoYView token={tokens.base.superOETHb} />,
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
            element: <PoYView token={tokens.mainnet.OETH} />,
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Proof of Yield' }),
            },
          },
        ],
      },
      // {
      //   index: false,
      //   path: 'os',
      //   handle: {
      //     title: defineMessage({ defaultMessage: 'OS' }),
      //     icon: OS,
      //     breadcrumb: defineMessage({ defaultMessage: 'OS' }),
      //   },
      //   children: [
      //     {
      //       index: true,
      //       element: <OverviewView token={tokens.sonic.OS} currency="ETH" />,
      //       handle: {
      //         title: defineMessage({ defaultMessage: 'Overview' }),
      //         icon: FaEyeRegular,
      //         breadcrumb: defineMessage({ defaultMessage: 'Overview' }),
      //       },
      //     },
      //     {
      //       path: 'poy',
      //       element: <PoYView token={tokens.sonic.OS} />,
      //       handle: {
      //         title: defineMessage({ defaultMessage: 'Proof of Yield' }),
      //         icon: FaClockRegular,
      //         breadcrumb: defineMessage({ defaultMessage: 'Proof of Yield' }),
      //       },
      //     },
      //   ],
      // },
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
            element: (
              <OverviewView token={tokens.mainnet.OUSD} currency="USD" />
            ),
            handle: {
              title: defineMessage({ defaultMessage: 'Overview' }),
              icon: FaEyeRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Overview' }),
            },
          },
          {
            path: 'poy',
            element: <PoYView token={tokens.mainnet.OUSD} />,
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Proof of Yield' }),
            },
          },
          {
            path: 'collateral',
            element: <CollateralsView token={tokens.mainnet.OUSD} />,
            handle: {
              title: defineMessage({ defaultMessage: 'Collateral' }),
              icon: FaCoinsRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Collateral' }),
            },
          },
        ],
      },
      {
        index: false,
        path: 'arm',
        handle: {
          title: defineMessage({ defaultMessage: 'ARM' }),
          icon: ARM,
          breadcrumb: defineMessage({ defaultMessage: 'ARM' }),
        },
        children: [
          {
            index: true,
            Component: arm.OverviewView,
            handle: {
              title: defineMessage({ defaultMessage: 'Overview' }),
              icon: FaEyeRegular,
              breadcrumb: defineMessage({ defaultMessage: 'Overview' }),
            },
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
