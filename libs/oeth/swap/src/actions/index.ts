import defaultApi from './defaultApi';
import mintVault from './mintVault';
import redeemVault from './redeemVault';
import swapCurve from './swapCurve';
import swapCurveEth from './swapCurveEth';
import swapZapperEth from './swapZapperEth';
import swapZapperSfrxeth from './swapZapperSfrxeth';
import unwrapWOETH from './unwrapWOETH';
import wrapOETH from './wrapOETH';

import type { SwapAction, SwapApi } from '../types';

export const swapActions: Record<SwapAction, SwapApi> = {
  'swap-curve': { ...defaultApi, ...swapCurve },
  'swap-curve-eth': { ...defaultApi, ...swapCurveEth },
  'swap-zapper-eth': { ...defaultApi, ...swapZapperEth },
  'swap-zapper-sfrxeth': { ...defaultApi, ...swapZapperSfrxeth },
  'mint-vault': { ...defaultApi, ...mintVault },
  'redeem-vault': { ...defaultApi, ...redeemVault },
  'wrap-oeth': { ...defaultApi, ...wrapOETH },
  'unwrap-woeth': { ...defaultApi, ...unwrapWOETH },
};
