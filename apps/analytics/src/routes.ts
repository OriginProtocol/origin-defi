import { HomeView } from '@origin/analytics/home';
import * as oeth from '@origin/analytics/oeth';
import * as ousd from '@origin/analytics/ousd';
import * as superOeth from '@origin/analytics/super';
import { NotFoundPage } from '@origin/shared/components';
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
            Component: superOeth.PoYView,
            handle: {
              title: defineMessage({ defaultMessage: 'Proof of Yield' }),
              icon: FaClockRegular,
            },
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
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
