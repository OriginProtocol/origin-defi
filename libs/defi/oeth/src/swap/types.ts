import type { OethRoute } from '@origin/shared/routes';

export type OethSwapAction = Extract<
  OethRoute,
  | 'mint-vault-oeth'
  | 'swap-balancer-oeth'
  | 'swap-curve-oeth'
  | 'swap-curve-oeth-eth'
  | 'swap-curve-oeth-sfrxeth'
  | 'swap-zapper-oeth-eth'
  | 'swap-zapper-oeth-sfrxeth'
  | 'unwrap-oeth-woeth'
  | 'wrap-oeth-oeth'
>;
