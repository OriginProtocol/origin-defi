import { tokens } from '@origin/shared/contracts';
import { arbitrum, base, mainnet } from 'viem/chains';

import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

export type OTokenConfig = {
  // minimum date for otoken queries
  from: string;
  // display networks for ui chips
  availableNetworks: Chain[];
  // link to product page
  pageHref?: string;
  // token used by dripper contract
  dripperToken: Token;
  // display circulating/protocol owned split on TotalSupply chart
  showCirculatingSplit?: boolean;
};

export const oTokenConfig: Record<string, OTokenConfig> = {
  [tokens.mainnet.OETH.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet, arbitrum],
    pageHref: 'oeth',
    dripperToken: tokens.mainnet.WETH,
    showCirculatingSplit: true,
  },
  [tokens.arbitrum.wOETH.id]: {
    from: '2024-02-07T00:00:00.000000Z',
    availableNetworks: [arbitrum],
    dripperToken: tokens.arbitrum.WETH,
  },
  [tokens.mainnet.OUSD.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet],
    pageHref: 'ousd',
    dripperToken: tokens.mainnet.USDT,
  },
  [tokens.base.superOETHb.id]: {
    from: '2024-08-28T00:00:00.000000Z',
    availableNetworks: [base],
    pageHref: 'super',
    dripperToken: tokens.base.WETH,
    showCirculatingSplit: true,
  },
};
