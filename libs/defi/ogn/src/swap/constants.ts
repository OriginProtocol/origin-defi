import { tokens } from '@origin/shared/contracts';
import { generateSwapRoutes } from '@origin/shared/providers';

import type { SwapRoute } from '@origin/shared/providers';

import type { OgnSwapAction } from './types';

export const ognSwapRoutes: SwapRoute<OgnSwapAction>[] = [
  // Magpie
  ...generateSwapRoutes<OgnSwapAction>({
    tokensIn: [
      tokens.mainnet.ETH,
      tokens.mainnet.WETH,
      tokens.mainnet.OUSD,
      tokens.mainnet.wOUSD,
      tokens.mainnet.OETH,
    ],
    tokensOut: [tokens.mainnet.OGN],
    swapRoute: {
      action: 'swap-magpie-ogn',
      refreshInterval: 10000,
    },
    includeReturn: true,
  }),
];
