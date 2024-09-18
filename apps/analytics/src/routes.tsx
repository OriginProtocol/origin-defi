import { HomeView } from '@origin/analytics/home';
import * as oeth from '@origin/analytics/oeth';
import * as ousd from '@origin/analytics/ousd';
import { PoYDetail, PoYList } from '@origin/analytics/shared';
import * as superOeth from '@origin/analytics/super';
import { NotFoundPage } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaClockRegular,
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
        },
        children: [
          {
            index: true,
            Component: superOeth.OverviewView,
            handle: {
              title: defineMessage({ defaultMessage: 'Overview' }),
              icon: FaEyeRegular,
            },
          },
          {
            path: 'poy',
            element: <PoYList token={tokens.base.superOETHb} />,
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
            },
          },
          {
            path: 'poy/:id',
            element: <PoYDetail token={tokens.base.superOETHb} />,
          },
        ],
      },
      {
        index: false,
        path: 'oeth',
        handle: {
          title: defineMessage({ defaultMessage: 'OETH' }),
          icon: OETH,
        },
        children: [
          {
            index: true,
            Component: oeth.OverviewView,
            handle: {
              title: defineMessage({ defaultMessage: 'Overview' }),
              icon: FaEyeRegular,
            },
          },
          {
            path: 'poy',
            element: <PoYList token={tokens.mainnet.OETH} />,
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
            },
          },
          {
            path: 'poy/:id',
            element: <PoYDetail token={tokens.mainnet.OETH} />,
          },
        ],
      },
      {
        index: false,
        path: 'ousd',
        handle: {
          title: defineMessage({ defaultMessage: 'OUSD' }),
          icon: OUSD,
        },
        children: [
          {
            index: true,
            Component: ousd.OverviewView,
            handle: {
              title: defineMessage({ defaultMessage: 'Overview' }),
              icon: FaEyeRegular,
            },
          },
          {
            path: 'poy',
            element: <PoYList token={tokens.mainnet.OUSD} />,
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
            },
          },
          {
            path: 'poy/:id',
            element: <PoYDetail token={tokens.mainnet.OUSD} />,
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
