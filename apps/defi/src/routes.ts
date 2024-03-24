import * as governance from '@origin/defi/governance';
import { HomeView } from '@origin/defi/home';
import * as oeth from '@origin/defi/oeth';
import * as ogv from '@origin/defi/ogv';
import * as ousd from '@origin/defi/ousd';
import { NotFoundPage } from '@origin/shared/components';
import {
  FaArrowDownFromArcRegular,
  FaArrowRightArrowLeftRegular,
  FaCoinsRegular,
  FaFileLinesRegular,
  FaGavelRegular,
  FaSquareListRegular,
  OETH,
  OGV,
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
            path: 'portfolio',
            Component: oeth.PortfolioView,
            handle: {
              title: defineMessage({ defaultMessage: 'Portfolio' }),
              subtitle: defineMessage({
                defaultMessage: 'Balance, earnings and history',
              }),
              icon: FaSquareListRegular,
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
            path: 'portfolio',
            Component: ousd.PortfolioView,
            handle: {
              title: defineMessage({ defaultMessage: 'Portfolio' }),
              subtitle: defineMessage({
                defaultMessage: 'Balance, earnings and history',
              }),
              icon: FaSquareListRegular,
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
        path: 'ogv',
        handle: { title: defineMessage({ defaultMessage: 'OGV' }), icon: OGV },
        children: [
          {
            index: true,
            Component: ogv.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              subtitle: defineMessage({ defaultMessage: 'Get OGV' }),
              icon: FaArrowRightArrowLeftRegular,
            },
          },
          {
            path: 'staking',
            Component: ogv.StakingView,
            handle: {
              title: defineMessage({ defaultMessage: 'Staking' }),
              subtitle: defineMessage({
                defaultMessage: 'Stake to earn rewards',
              }),
              icon: FaCoinsRegular,
            },
          },
          {
            path: 'portfolio',
            Component: ogv.PortfolioView,
            handle: {
              title: defineMessage({ defaultMessage: 'Portfolio' }),
              subtitle: defineMessage({
                defaultMessage: 'Staking and rewards history',
              }),
              icon: FaSquareListRegular,
            },
          },
        ],
      },
      {
        index: false,
        path: 'governance',
        handle: {
          title: defineMessage({ defaultMessage: 'Governance' }),
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
