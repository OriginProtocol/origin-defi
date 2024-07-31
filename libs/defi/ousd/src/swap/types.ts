import type { OusdRoute } from '@origin/shared/routes';

export type OusdSwapAction = Extract<
  OusdRoute,
  | 'mint-vault-ousd'
  | 'swap-flipper-ousd'
  | 'swap-curve-ousd'
  | 'swap-sushiswap-ousd'
  | 'swap-uniswap-v2-ousd'
  | 'swap-uniswap-v3-ousd'
  | 'unwrap-ousd-wousd'
  | 'wrap-ousd-wousd'
>;
