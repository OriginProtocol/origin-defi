import type { OusdHistoryTransactionQuery } from './queries.generated';

export type History = OusdHistoryTransactionQuery['oTokenHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};
