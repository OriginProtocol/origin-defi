import type { OethHistoryTransactionQuery } from './queries.generated';

export type History = OethHistoryTransactionQuery['oethHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};
