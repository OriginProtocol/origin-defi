import type { OethRoute } from '@origin/shared/routes';

export type OethSwapAction = Extract<
  OethRoute,
  | 'mint-vault-oeth'
  | 'redeem-arm-oeth'
  | 'swap-balancer-oeth'
  | 'swap-curve-oeth'
  | 'swap-zapper-oeth-eth'
  | 'swap-zapper-oeth-sfrxeth'
  | 'unwrap-oeth-woeth'
  | 'wrap-oeth-oeth'
>;
