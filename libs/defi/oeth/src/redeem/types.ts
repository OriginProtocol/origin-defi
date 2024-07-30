import type { OethRoute } from '@origin/shared/routes';

export type OethRedeemAction = Extract<
  OethRoute,
  'swap-curve-oeth' | 'redeem-vault-oeth'
>;
