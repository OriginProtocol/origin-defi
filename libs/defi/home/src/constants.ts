import { tokens } from '@origin/shared/contracts';
import { defineMessage } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';

export type SupportedProduct = keyof typeof products;

export type Product = (typeof products)[SupportedProduct];

export const products = {
  oeth: {
    id: 'oeth',
    token: tokens.mainnet.OETH,
    href: 'oeth',
    icon: '/images/circlesPattern.svg',
    iconSize: 120,
    description: defineMessage({
      defaultMessage: 'Liquid staking',
    }),
    supportedChainIds: [mainnet.id, arbitrum.id],
  },
  primeETH: {
    id: 'primeETH',
    token: tokens.mainnet.primeETH,
    href: 'prime',
    icon: '/images/circles2Pattern.svg',
    iconSize: 100,
    description: defineMessage({
      defaultMessage: 'Restaking',
    }),
    supportedChainIds: [],
  },
  ousd: {
    id: 'ousd',
    token: tokens.mainnet.OUSD,
    href: 'ousd',
    icon: '/images/wavePattern.svg',
    iconSize: 350,
    description: defineMessage({
      defaultMessage: 'Yield bearing stablecoin',
    }),
    supportedChainIds: [],
  },
} as const;
