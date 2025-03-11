import {
  GOVERNANCE_DISCUSSION_FORUM_URL,
  GOVERNANCE_OGN_SNAPSHOT_VOTES_URL,
  ORIGIN_ANALYTICS_URL,
} from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import {
  FaChartPieRegular,
  FaCommentsRegular,
  Snapshot,
} from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import type { NavItem } from './types';

export const additionalLinks: Record<string, NavItem[]> = {
  super: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      icon: FaChartPieRegular,
      href: `${ORIGIN_ANALYTICS_URL}/super`,
    },
  ],
  oeth: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      icon: FaChartPieRegular,
      href: `${ORIGIN_ANALYTICS_URL}/oeth`,
    },
  ],
  os: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      icon: FaChartPieRegular,
      href: `${ORIGIN_ANALYTICS_URL}/os`,
    },
  ],
  ousd: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      icon: FaChartPieRegular,
      href: `${ORIGIN_ANALYTICS_URL}/ousd`,
    },
  ],
  arm: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      icon: FaChartPieRegular,
      href: `${ORIGIN_ANALYTICS_URL}/arm`,
    },
  ],
  more: [
    {
      title: defineMessage({ defaultMessage: 'Discussion forum' }),
      icon: FaCommentsRegular,
      href: GOVERNANCE_DISCUSSION_FORUM_URL,
    },
    {
      title: defineMessage({ defaultMessage: 'Snapshot vote' }),
      icon: Snapshot,
      href: GOVERNANCE_OGN_SNAPSHOT_VOTES_URL,
    },
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      icon: FaChartPieRegular,
      href: ORIGIN_ANALYTICS_URL,
    },
  ],
};

export const balanceTokens = [
  tokens.mainnet.ETH,
  tokens.mainnet.WETH,
  tokens.mainnet.OETH,
  tokens.mainnet.wOETH,
  tokens.mainnet.OUSD,
  tokens.mainnet.wOUSD,
  tokens.mainnet.OGN,
  tokens.mainnet.xOGN,
  tokens.arbitrum.ETH,
  tokens.arbitrum.WETH,
  tokens.arbitrum.wOETH,
  tokens.base.ETH,
  tokens.base.WETH,
  tokens.base.superOETHb,
  tokens.base.wsuperOETHb,
  tokens.sonic.S,
  tokens.sonic.WETH,
  tokens.sonic.OS,
  tokens.sonic.wOS,
  ...(import.meta.env.DEV ? [tokens.optimism.ETH, tokens.optimism.WETH] : []),
];
