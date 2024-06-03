import type { OgnLockupsQuery } from './queries.generated';

export type Lockup = OgnLockupsQuery['esLockups'][number];
