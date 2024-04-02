import type { OusdHistoryTransactionQuery } from './queries.generated';

export type History = OusdHistoryTransactionQuery['ousdHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};
