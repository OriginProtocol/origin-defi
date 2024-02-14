import type { HistoryTransactionQuery } from './queries.generated';

export type History = HistoryTransactionQuery['oethHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};
