import type { HistoryPageQuery } from './queries.generated';

export type History = HistoryPageQuery['oethAddresses'][0]['history'][0];

export type DailyHistory = History & {
  transactions?: History[];
};
