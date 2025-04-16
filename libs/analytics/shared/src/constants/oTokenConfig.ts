import { ORIGIN_DAPP_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import { arbitrum, base, mainnet, plumeMainnet, sonic } from 'viem/chains';

import type { Currency } from '@origin/shared/components';
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
  // display circulating/protocol owned split on TotalSupply chart
  showCirculatingSplit?: boolean;
  // default chart limit for protocol revenue card (default 182 days)
  protocolRevenueCardDefaultLimit?: number;
  // default trailing days for apy display
  defaultApyTrailing?: 'apy7' | 'apy14' | 'apy30';
  // token color for charts
  lineChartColor?: string;
  // default currency for chart display and mapping
  currency: Currency;
  // default currency options for chart display
  currencyOptions?: Currency[];
  // default number of digits for currency display
  currencyDigits?: number;
};

export const oTokenConfig: Record<string, OTokenConfig> = {
  [tokens.mainnet.OETH.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet, arbitrum],
    pageHref: 'oeth',
    dappHref: `${ORIGIN_DAPP_URL}/#/oeth`,
    dripperToken: tokens.mainnet.WETH,
    showCirculatingSplit: true,
    lineChartColor: '#586CF8',
    currency: 'ETH',
    currencyOptions: ['ETH', 'USD'],
    currencyDigits: 4,
  },
  [tokens.arbitrum.wOETH.id]: {
    from: '2024-02-07T00:00:00.000000Z',
    availableNetworks: [arbitrum],
    dripperToken: tokens.arbitrum.WETH,
    currency: 'ETH',
    currencyOptions: ['ETH', 'USD'],
    currencyDigits: 4,
  },
  [tokens.mainnet.OUSD.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet],
    pageHref: 'ousd',
    dappHref: `${ORIGIN_DAPP_URL}/#/ousd`,
    dripperToken: tokens.mainnet.USDT,
    lineChartColor: '#14C4BA',
    currency: 'USD',
    currencyOptions: ['ETH', 'USD'],
    currencyDigits: 2,
  },
  [tokens.base.superOETHb.id]: {
    from: '2024-08-28T00:00:00.000000Z',
    availableNetworks: [base],
    pageHref: 'super',
    dappHref: `${ORIGIN_DAPP_URL}/#/super`,
    dripperToken: tokens.base.WETH,
    showCirculatingSplit: true,
    protocolRevenueCardDefaultLimit: 30,
    defaultApyTrailing: 'apy7',
    lineChartColor: '#7A26F3',
    currency: 'ETH',
    currencyOptions: ['ETH', 'USD'],
    currencyDigits: 4,
  },
  [tokens.plume.superOETHp.id]: {
    from: '2024-08-28T00:00:00.000000Z',
    availableNetworks: [plumeMainnet],
    pageHref: 'superp',
    dappHref: `${ORIGIN_DAPP_URL}/#/super?chainId=${plumeMainnet.id}`,
    dripperToken: tokens.plume.WETH,
    showCirculatingSplit: true,
    protocolRevenueCardDefaultLimit: 30,
    defaultApyTrailing: 'apy7',
    lineChartColor: '#7A26F3',
    currency: 'PLUME',
    currencyOptions: ['PLUME', 'USD'],
    currencyDigits: 4,
  },
  [tokens.mainnet['ARM-WETH-stETH'].id]: {
    from: '2024-08-28T00:00:00.000000Z',
    availableNetworks: [mainnet],
    dappHref: `${ORIGIN_DAPP_URL}/#/arm/steth-redemption-vault`,
    dripperToken: tokens.base.WETH,
    protocolRevenueCardDefaultLimit: 30,
    defaultApyTrailing: 'apy30',
    lineChartColor: '#E85BFF',
    currency: 'ETH',
    currencyOptions: ['ETH', 'USD'],
    currencyDigits: 4,
  },
  [tokens.sonic.OS.id]: {
    from: '2025-01-20T00:00:00.000000Z',
    availableNetworks: [sonic],
    pageHref: 'os',
    dappHref: `${ORIGIN_DAPP_URL}/#/os`,
    dripperToken: tokens.sonic.S,
    protocolRevenueCardDefaultLimit: 30,
    defaultApyTrailing: 'apy7',
    lineChartColor: '#E79156',
    currency: 'S',
    currencyOptions: ['S', 'USD'],
    currencyDigits: 2,
  },
};
