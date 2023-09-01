import defaultApi from './defaultApi';
import mintVault from './mintVault';
import redeemVault from './redeemVault';
import swapCurve from './swapCurve';

import type { SwapAction, SwapApi } from '../types';

export const swapActions: Record<SwapAction, SwapApi> = {
  'swap-curve': { ...defaultApi, ...swapCurve },
  'swap-zapper': { ...defaultApi },
  'mint-vault': { ...defaultApi, ...mintVault },
  'redeem-vault': { ...defaultApi, ...redeemVault },
  'wrap-oeth': { ...defaultApi },
  'unwrap-woeth': { ...defaultApi },
};
