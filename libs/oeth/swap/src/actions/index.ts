import defaultApi from './defaultApi';
import mintVault from './mintVault';
import redeemMix from './redeemMix';

import type { SwapAction, SwapApi } from '../types';

export const swapActions: Record<SwapAction, SwapApi> = {
  'swap-curve': { ...defaultApi, ...mintVault },
  'swap-zapper': { ...defaultApi, ...redeemMix },
  'mint-vault': { ...defaultApi },
  'redeem-mix': { ...defaultApi },
  'wrap-oeth': { ...defaultApi },
  'unwrap-woeth': { ...defaultApi },
};
