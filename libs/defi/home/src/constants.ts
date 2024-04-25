import { tokens } from '@origin/shared/contracts';
import { defineMessage } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';

import circles2Pattern from './bkg/circles2Pattern.svg';
import circlesPattern from './bkg/circlesPattern.svg';
import wavePattern from './bkg/wavePattern.svg';

export const products = [
  {
    id: 'oeth',
    token: tokens.mainnet.OETH,
    href: 'oeth',
    icon: circlesPattern,
    iconSize: 120,
    description: defineMessage({
      defaultMessage: 'Liquid staking',
    }),
    supportedChains: [mainnet, arbitrum],
  },
  {
    id: 'primeETH',
    token: tokens.mainnet.primeETH,
    href: 'prime',
    icon: circles2Pattern,
    iconSize: 100,
    description: defineMessage({
      defaultMessage: 'Restaking',
    }),
    supportedChains: [],
  },
  {
    id: 'ousd',
    token: tokens.mainnet.OUSD,
    href: 'ousd',
    icon: wavePattern,
    iconSize: 350,
    description: defineMessage({
      defaultMessage: 'Yield bearing stablecoin',
    }),
    supportedChains: [],
  },
];
