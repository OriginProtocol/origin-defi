import defaultApi from './defaultApi';
import mintVault from './mintVault';
import redeemMix from './redeemMix';

import type { SwapAction, SwapApi } from '../types';

export const swapActions: Record<SwapAction, SwapApi> = {
  'swap-curve': { ...defaultApi },
  'swap-zapper': { ...defaultApi },
  'mint-vault': { ...defaultApi, ...mintVault },
  'redeem-mix': { ...defaultApi, ...redeemMix },
  'wrap-oeth': { ...defaultApi },
  'unwrap-woeth': { ...defaultApi },
};
