import type { HistoryTransactionQuery } from './queries.generated';

export type History = HistoryTransactionQuery['oTokenHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};
