import type { OethHistoryTransactionQuery } from './queries.generated';

export type History = OethHistoryTransactionQuery['oTokenHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};
