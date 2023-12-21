import type { UserLockupsQuery } from './queries.generated';

export type Lockup = UserLockupsQuery['ogvLockups'][number];

export type LockupTransaction =
  UserLockupsQuery['ogvLockups'][number]['logs'][number];
