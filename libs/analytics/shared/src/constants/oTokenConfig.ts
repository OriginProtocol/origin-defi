import { ORIGIN_DAPP_URL } from '@origin/shared/constants';
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
  // link to unified dApp swap page
  dappHref?: string;
  // token used by dripper contract
  dripperToken: Token;
};

export const oTokenConfig: Record<string, OTokenConfig> = {
  [tokens.mainnet.OETH.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet, arbitrum],
    pageHref: 'oeth',
    dappHref: `${ORIGIN_DAPP_URL}/#/oeth`,
    dripperToken: tokens.mainnet.WETH,
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
    dappHref: `${ORIGIN_DAPP_URL}/#/ousd`,
    dripperToken: tokens.mainnet.USDT,
  },
  [tokens.base.superOETHb.id]: {
    from: '2024-08-28T00:00:00.000000Z',
    availableNetworks: [base],
    pageHref: 'super',
    dappHref: `${ORIGIN_DAPP_URL}/#/super`,
    dripperToken: tokens.base.WETH,
  },
};
