import type { dailyStatMapper } from '../../utils';

export type DailyStatMapped = ReturnType<typeof dailyStatMapper> & {
  avg7: number;
  avg14: number;
  avg30: number;
};
