import { differenceInDays, formatDistanceToNowStrict, isPast } from 'date-fns';

export const formatTimeRemaining = (endDate?: string | Date) => {
  if (!endDate) {
    return '-';
  }

  const input = typeof endDate === 'string' ? new Date(endDate) : endDate;

  return isPast(input)
    ? '-'
    : differenceInDays(input, new Date()) > 30
      ? formatDistanceToNowStrict(input, {
          unit: 'month',
          roundingMethod: 'floor',
        })
      : formatDistanceToNowStrict(input, {
          unit: 'day',
          roundingMethod: 'ceil',
        });
};
