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
    iconSize: 160,
    bgcolor: 'primary.main',
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
    bgcolor: '#FF4E4E',
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
    iconSize: 450,
    bgcolor: 'text.primary',
    description: defineMessage({
      defaultMessage: 'Yield bearing stablecoin',
    }),
    supportedChainIds: [],
  },
} as const;
