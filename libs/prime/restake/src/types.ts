import type { SupportedBoost } from '@origin/prime/shared';
import type { PrimeRoute } from '@origin/shared/routes';

export type RestakeAction = Extract<
  PrimeRoute,
  'restake-prime' | 'swap-uniswap-prime' | 'swap-zapper-prime'
>;

export type Meta = { boost?: SupportedBoost };
