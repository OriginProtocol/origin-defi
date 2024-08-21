import type { OTokenHistoriesQuery } from '@origin/defi/shared';

export type History = OTokenHistoriesQuery['oTokenHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};
