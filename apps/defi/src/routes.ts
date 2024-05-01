import * as governance from '@origin/defi/governance';
import { HomeView } from '@origin/defi/home';
import * as oeth from '@origin/defi/oeth';
import * as ogn from '@origin/defi/ogn';
import * as ogv from '@origin/defi/ogv';
import * as ousd from '@origin/defi/ousd';
import { NotFoundPage } from '@origin/shared/components';
import {
  FaArrowDownFromArcRegular,
  FaArrowRightArrowLeftRegular,
  FaArrowRightRegular,
  FaCoinsRegular,
  FaFileLinesRegular,
  FaGavelRegular,
  OETH,
  OGN,
  OUSD,
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
        handle: { title: defineMessage({ defaultMessage: 'Overview' }) },
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
            Component: oeth.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              subtitle: defineMessage({
                defaultMessage: 'Swap in and out of OETH',
              }),
              icon: FaArrowRightArrowLeftRegular,
            },
          },
          {
            ...oeth.oethRedeemRoute,
            handle: {
              title: defineMessage({ defaultMessage: 'Redeem' }),
              subtitle: defineMessage({
                defaultMessage: 'Redeem from OETH vault',
              }),
              icon: FaArrowDownFromArcRegular,
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
            Component: ousd.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              subtitle: defineMessage({
                defaultMessage: 'Swap in and out of OUSD',
              }),
              icon: FaArrowRightArrowLeftRegular,
            },
          },
          {
            path: 'redeem',
            Component: ousd.RedeemView,
            handle: {
              title: defineMessage({ defaultMessage: 'Redeem' }),
              subtitle: defineMessage({
                defaultMessage: 'Redeem from OUSD vault',
              }),
              icon: FaArrowDownFromArcRegular,
            },
          },
        ],
      },
      {
        index: false,
        path: 'ogn',
        handle: { title: defineMessage({ defaultMessage: 'OGN' }), icon: OGN },
        children: [
          {
            path: 'staking',
            Component: ogn.StakingView,
            handle: {
              title: defineMessage({ defaultMessage: 'Staking' }),
              subtitle: defineMessage({
                defaultMessage: 'Stake to earn rewards',
              }),
              icon: FaCoinsRegular,
            },
          },
        ],
      },
      {
        index: false,
        path: 'more',
        handle: {
          title: defineMessage({ defaultMessage: 'More' }),
          icon: FaGavelRegular,
        },
        children: [
          {
            index: true,
            Component: governance.OverviewView,
            handle: {
              title: defineMessage({ defaultMessage: 'Governance Overview' }),
              subtitle: defineMessage({ defaultMessage: 'Origin protocol' }),
              icon: FaGavelRegular,
            },
          },
          {
            path: 'migration',
            Component: ogv.MigrationView,
            handle: {
              title: defineMessage({ defaultMessage: 'Migration' }),
              subtitle: defineMessage({
                defaultMessage: 'Convert OGV to OGN',
              }),
              icon: FaArrowRightRegular,
            },
          },
          {
            path: 'proposals',
            Component: governance.ProposalsView,
            handle: {
              title: defineMessage({ defaultMessage: 'Proposals' }),
              subtitle: defineMessage({
                defaultMessage: 'Voting history',
              }),
              icon: FaFileLinesRegular,
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
