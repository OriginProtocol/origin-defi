import type { HistoryTransactionQuery } from './queries.generated';

export type History = HistoryTransactionQuery['oethHistories'][0];

export type DailyHistory = History & {
  transactions?: History[];
};
