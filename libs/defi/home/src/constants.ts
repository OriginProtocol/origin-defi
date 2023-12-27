import { tokens } from '@origin/shared/contracts';
import { defineMessage } from 'react-intl';

export const products = [
  {
    id: 'oeth',
    token: tokens.mainnet.OETH,
    href: 'oeth',
    description: defineMessage({
      defaultMessage: 'Ethereum liquid staking token',
    }),
    tags: [
      {
        label: defineMessage({ defaultMessage: 'Ethereum network' }),
        icon: tokens.mainnet.ETH.symbol,
      },
      {
        label: defineMessage({ defaultMessage: 'Liquid staking' }),
      },
      {
        label: defineMessage({ defaultMessage: 'Yield bearing' }),
      },
    ],
    collaterals: [
      tokens.mainnet.frxETH,
      tokens.mainnet.WETH,
      tokens.mainnet.rETH,
      tokens.mainnet.stETH,
    ],
  },
  {
    id: 'ousd',
    token: tokens.mainnet.OUSD,
    href: 'oeth',
    description: defineMessage({
      defaultMessage: 'Yield-generating stablecoin',
    }),
    tags: [
      {
        label: defineMessage({ defaultMessage: 'Ethereum network' }),
        icon: tokens.mainnet.ETH.symbol,
      },
      {
        label: defineMessage({ defaultMessage: 'Stablecoin' }),
      },
      {
        label: defineMessage({ defaultMessage: 'Yield bearing' }),
      },
    ],
    collaterals: [tokens.mainnet.DAI, tokens.mainnet.USDT, tokens.mainnet.USDC],
  },
  {
    id: 'ogn',
    token: tokens.mainnet.OGN,
    description: defineMessage({
      defaultMessage: 'Origin Governance Token',
    }),
    tags: [
      {
        label: defineMessage({ defaultMessage: 'Ethereum network' }),
        symbol: tokens.mainnet.ETH.symbol,
      },
      {
        label: defineMessage({ defaultMessage: 'Governance' }),
      },
      {
        label: defineMessage({ defaultMessage: 'Staking' }),
      },
    ],
    collaterals: [],
  },
];
