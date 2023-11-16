import type { HistoryTransactionQuery } from './queries.generated';

export type History = HistoryTransactionQuery['ousdAddresses'][0]['history'][0];

export type DailyHistory = History & {
  transactions?: History[];
};
