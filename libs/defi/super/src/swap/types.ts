import type { OethRoute } from '@origin/shared/routes';

export type OethSwapAction = Extract<
  OethRoute,
  | 'swap-aerodrome-oeth'
  | 'mint-vault-oeth'
  | 'unwrap-oeth-woeth'
  | 'wrap-oeth-oeth'
>;
