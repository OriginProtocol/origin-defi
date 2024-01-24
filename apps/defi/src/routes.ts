import * as governance from '@origin/defi/governance';
import { HomeView } from '@origin/defi/home';
import * as oeth from '@origin/defi/oeth';
import * as ogv from '@origin/defi/ogv';
import * as ousd from '@origin/defi/ousd';
import { NotFoundPage } from '@origin/shared/components';
import { ArrowDownFromArc, CoinsLight } from '@origin/shared/icons';
import {
  FaArrowRightArrowLeft,
  FaGavel,
  FaRegFileLines,
  FaRegRectangleList,
} from 'react-icons/fa6';
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
        handle: { title: defineMessage({ defaultMessage: 'OETH' }) },
        children: [
          {
            index: true,
            Component: oeth.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              subtitle: defineMessage({
                defaultMessage: 'Swap in and out of OETH',
              }),
              icon: FaArrowRightArrowLeft,
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
              icon: FaRegRectangleList,
            },
          },
          {
            path: 'redeem',
            Component: oeth.RedeemView,
            handle: {
              title: defineMessage({ defaultMessage: 'Redeem' }),
              subtitle: defineMessage({
                defaultMessage: 'Redeem from OETH vault',
              }),
              icon: ArrowDownFromArc,
            },
          },
        ],
      },
      {
        index: false,
        path: 'ousd',
        handle: { title: defineMessage({ defaultMessage: 'OUSD' }) },
        children: [
          {
            index: true,
            Component: ousd.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              subtitle: defineMessage({
                defaultMessage: 'Swap in and out of OUSD',
              }),
              icon: FaArrowRightArrowLeft,
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
              icon: FaRegRectangleList,
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
              icon: ArrowDownFromArc,
            },
          },
        ],
      },
      {
        index: false,
        path: 'ogv',
        handle: { title: defineMessage({ defaultMessage: 'OGV' }) },
        children: [
          {
            index: true,
            Component: ogv.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              subtitle: defineMessage({ defaultMessage: 'Get OGV' }),
              icon: FaArrowRightArrowLeft,
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
              icon: CoinsLight,
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
              icon: FaRegRectangleList,
            },
          },
        ],
      },
      {
        index: false,
        path: 'governance',
        handle: { title: defineMessage({ defaultMessage: 'Governance' }) },
        children: [
          {
            index: true,
            Component: governance.OverviewView,
            handle: {
              title: defineMessage({ defaultMessage: 'Governance Overview' }),
              subtitle: defineMessage({ defaultMessage: 'Origin protocol' }),
              icon: FaGavel,
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
              icon: FaRegFileLines,
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
