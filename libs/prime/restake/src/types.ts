import type { SupportedBoost } from '@origin/prime/shared';

export type RestakeAction = 'restake' | 'uniswap' | 'zapper';

export type Meta = { boost?: SupportedBoost };
