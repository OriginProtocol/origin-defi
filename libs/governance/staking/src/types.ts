import type { UserLockupsQuery } from './queries.generated';

export type Lockup = UserLockupsQuery['ogvLockups'][0];

export type LockupTransaction = UserLockupsQuery['ogvLockups'][0]['logs']['0'];
