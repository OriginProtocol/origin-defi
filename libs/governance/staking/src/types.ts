import type { UserLockupsQuery } from './queries.generated';

export type Lockup = UserLockupsQuery['ogvLockups'][number];
