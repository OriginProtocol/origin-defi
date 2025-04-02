import * as arm from '@origin/defi/arm';
import { HomeView } from '@origin/defi/home';
import * as oeth from '@origin/defi/oeth';
import * as ogn from '@origin/defi/ogn';
import * as ogv from '@origin/defi/ogv';
import * as os from '@origin/defi/os';
import * as ousd from '@origin/defi/ousd';
import * as superOeth from '@origin/defi/super';
import { NotFoundPage } from '@origin/shared/components';
import {
  ARM,
  Bridge,
  FaArrowDownFromArcRegular,
  FaArrowRightArrowLeftRegular,
  FaArrowRightRegular,
  FaClockRegular,
  FaCoinsRegular,
  FaGavelRegular,
  OETH,
  OGN,
  OS,
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
            Component: superOeth.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              icon: FaArrowRightArrowLeftRegular,
            },
          },
          {
            path: 'redeem',
            Component: superOeth.RedeemView,
            handle: {
              title: defineMessage({ defaultMessage: 'Redeem' }),
              icon: FaArrowDownFromArcRegular,
            },
          },
          {
            path: 'history',
            Component: superOeth.PortfolioView,
            handle: {
              title: defineMessage({ defaultMessage: 'History' }),
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
            Component: oeth.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              icon: FaArrowRightArrowLeftRegular,
            },
          },
          {
            path: 'redeem',
            Component: oeth.RedeemView,
            handle: {
              title: defineMessage({ defaultMessage: 'Redeem' }),
              icon: FaArrowDownFromArcRegular,
            },
          },
          {
            path: 'bridge',
            Component: oeth.BridgeView,
            handle: {
              title: defineMessage({ defaultMessage: 'Bridge' }),
              subtitle: defineMessage({
                defaultMessage: 'Send wOETH across chains',
              }),
              icon: Bridge,
            },
          },
          {
            path: 'history',
            Component: oeth.PortfolioView,
            handle: {
              title: defineMessage({ defaultMessage: 'History' }),
              icon: FaClockRegular,
            },
          },
        ],
      },
      {
        index: false,
        path: 'os',
        handle: {
          title: defineMessage({ defaultMessage: 'OS' }),
          icon: OS,
        },
        children: [
          {
            index: true,
            Component: os.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              icon: FaArrowRightArrowLeftRegular,
            },
          },
          {
            path: 'redeem',
            Component: os.RedeemView,
            handle: {
              title: defineMessage({ defaultMessage: 'Redeem' }),
              icon: FaArrowDownFromArcRegular,
            },
          },
          {
            path: 'history',
            Component: os.PortfolioView,
            handle: {
              title: defineMessage({ defaultMessage: 'History' }),
              icon: FaClockRegular,
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
              icon: FaArrowRightArrowLeftRegular,
            },
          },
          {
            path: 'redeem',
            Component: ousd.RedeemView,
            handle: {
              title: defineMessage({ defaultMessage: 'Redeem' }),
              icon: FaArrowDownFromArcRegular,
            },
          },
          {
            path: 'history',
            Component: ousd.PortfolioView,
            handle: {
              title: defineMessage({ defaultMessage: 'History' }),
              icon: FaClockRegular,
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
            index: true,
            Component: ogn.SwapView,
            handle: {
              title: defineMessage({ defaultMessage: 'Swap' }),
              icon: FaArrowRightArrowLeftRegular,
            },
          },
          {
            path: 'governance',
            Component: ogn.OverviewView,
            handle: {
              title: defineMessage({ defaultMessage: 'Governance' }),
              icon: FaGavelRegular,
            },
          },
          {
            path: 'governance/:proposalId',
            Component: ogn.ProposalDetailView,
          },
          {
            path: 'staking',
            Component: ogn.StakingView,
            handle: {
              title: defineMessage({ defaultMessage: 'Staking' }),
              icon: FaCoinsRegular,
            },
          },
        ],
      },
      {
        index: false,
        path: 'arm',
        handle: { title: defineMessage({ defaultMessage: 'ARM' }), icon: ARM },
        children: [
          {
            path: 'steth-redemption-vault',
            Component: arm.OverviewView,
            handle: {
              title: defineMessage({ defaultMessage: 'ETH Vault' }),
              icon: FaArrowDownFromArcRegular,
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
            Component: ogv.MigrationView,
            handle: {
              title: defineMessage({ defaultMessage: 'Migration' }),
              icon: FaArrowRightRegular,
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
