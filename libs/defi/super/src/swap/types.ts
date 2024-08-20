import type { OethRoute } from '@origin/shared/routes';

export type OethSwapAction = Extract<
  OethRoute,
  'mint-vault-oeth' | 'unwrap-oeth-woeth' | 'wrap-oeth-oeth'
>;
