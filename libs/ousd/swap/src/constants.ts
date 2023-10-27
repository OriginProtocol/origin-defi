import { tokens } from '@origin/shared/contracts';
import { defineMessage } from 'react-intl';

import type { MessageDescriptor } from 'react-intl';

import type { SwapAction } from './types';

export const GAS_BUFFER = 10n; // 10%

export const routeActionLabel: Record<SwapAction, MessageDescriptor> = {
  flipper: defineMessage({ defaultMessage: 'Swap' }),
  'uniswap-v2': defineMessage({ defaultMessage: 'Swap' }),
  'uniswap-v3': defineMessage({ defaultMessage: 'Swap' }),
  sushiswap: defineMessage({ defaultMessage: 'Swap' }),
  vault: defineMessage({ defaultMessage: 'Swap' }),
  'swap-curve': defineMessage({ defaultMessage: 'Swap' }),
};

export const buttonActionLabel: Record<SwapAction, MessageDescriptor> = {
  flipper: defineMessage({ defaultMessage: 'Swap' }),
  'uniswap-v2': defineMessage({ defaultMessage: 'Swap' }),
  'uniswap-v3': defineMessage({ defaultMessage: 'Swap' }),
  sushiswap: defineMessage({ defaultMessage: 'Swap' }),
  vault: defineMessage({ defaultMessage: 'Swap' }),
  'swap-curve': defineMessage({ defaultMessage: 'Swap' }),
};

export const swapRoutes = [
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'flipper',
  },
] as const;
