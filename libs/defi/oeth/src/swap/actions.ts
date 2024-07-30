import {
  mintVaultOeth,
  SwapCurveOeth,
  swapCurveOethEth,
  swapCurveOethSfrxeth,
  swapZapperOethEth,
  swapZapperOethSfrxeth,
  unwrapOethWoeth,
  wrapOethWoeth,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const oethSwapActions: Record<OethSwapAction, SwapApi> = {
  'swap-curve-oeth': {
    ...SwapCurveOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-oeth-eth': {
    ...swapCurveOethEth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via CurvePool' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-oeth-sfrxeth': {
    ...swapCurveOethSfrxeth,
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
    ...mintVaultOeth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'wrap-oeth-oeth': {
    ...wrapOethWoeth,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-oeth-woeth': {
    ...unwrapOethWoeth,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
