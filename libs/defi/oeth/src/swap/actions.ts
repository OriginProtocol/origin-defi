import {
  mintOtoken,
  redeemArmOeth,
  swapBalancerOeth,
  swapCurve,
  swapZapperOethEth,
  swapZapperOethSfrxeth,
  wrapOtoken,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const oethSwapActions: Record<OethSwapAction, SwapApi> = {
  'redeem-arm-oeth': {
    ...redeemArmOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via the ARM' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-balancer-oeth': {
    ...swapBalancerOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Balancer' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-oeth': {
    ...swapCurve,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-zapper-oeth-eth': {
    ...swapZapperOethEth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-zapper-oeth-sfrxeth': {
    ...swapZapperOethSfrxeth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'mint-vault-oeth': {
    ...mintOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'wrap-oeth-oeth': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-oeth-woeth': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
