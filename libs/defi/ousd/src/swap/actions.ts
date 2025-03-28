import {
  magpie,
  mintOtoken,
  openOcean,
  swapCurve,
  swapFlipperOusd,
  swapSushiswapOusd,
  swapUniswapV2Ousd,
  swapUniswapV3Ousd,
  wrapOtoken,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OusdSwapAction } from './types';

export const ousdSwapActions: Record<OusdSwapAction, SwapApi> = {
  'swap-flipper-ousd': {
    ...swapFlipperOusd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Flipper' }),
  },
  'mint-vault-ousd': {
    ...mintOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-sushiswap-ousd': {
    ...swapSushiswapOusd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via SushiSwap' }),
  },
  'swap-curve-ousd': {
    ...swapCurve,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
  },
  'swap-magpie-ousd': {
    ...magpie,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Magpie' }),
  },
  'swap-openOcean-ousd': {
    ...openOcean,
    routeLabel: defineMessage({ defaultMessage: 'Swap via OpenOcean' }),
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
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-ousd-wousd': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
