import { secondsInDay } from 'date-fns/constants';

export const getMonthDurationToSeconds = (monthDuration: number) => {
  return BigInt(monthDuration * secondsInDay * (365 / 12));
};
