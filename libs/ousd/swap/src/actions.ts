import {
  mintVaultOusd,
  swapCurveOusd,
  swapFlipperOusd,
  swapSushiswapOusd,
  swapUniswapV2Ousd,
  swapUniswapV3Ousd,
  unwrapOusdWousd,
  wrapOusdWousd,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { SwapAction } from './types';

export const swapActions: Record<SwapAction, SwapApi> = {
  'swap-flipper-ousd': {
    ...swapFlipperOusd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Flipper' }),
  },
  'mint-vault-ousd': {
    ...mintVaultOusd,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-sushiswap-ousd': {
    ...swapSushiswapOusd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via SushiSwap' }),
  },
  'swap-curve-ousd': {
    ...swapCurveOusd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
  },
  'swap-uniswap-v2-ousd': {
    ...swapUniswapV2Ousd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Uniswap V2' }),
  },
  'swap-uniswap-v3-ousd': {
    ...swapUniswapV3Ousd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Uniswap V3' }),
  },
  'wrap-ousd-wousd': {
    ...wrapOusdWousd,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-ousd-wousd': {
    ...unwrapOusdWousd,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
