import type { HistoryTransactionQuery } from './queries.generated';

export type History = HistoryTransactionQuery['oTokenHistories'][0];

export type DailyHistory = History & {
  transactions?: History[];
};
