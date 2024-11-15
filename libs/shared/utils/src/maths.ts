import { div, eq, from, lt, mul, sub } from 'dnum';

import type { Dnum } from 'dnum';

export const subtractPercentage = (value = 0, percent = 0) => {
  const factor = Math.floor(percent * 10000);
  const amount = (value * factor) / 10000;

  return value - amount;
};

export const subPercentage = (value = from(0), percent = 0) => {
  if (eq(value, 0) || lt(value, 0)) {
    return from(0, value[1]);
  }

  return sub(value, mul(value, percent, { rounding: 'ROUND_DOWN' }));
};

export const getFormatPrecision = (value: Dnum | undefined) => {
  if (!value) {
    return 2;
  }
  return lt(value, 1) ? 6 : lt(value, 10) ? 4 : 2;
};

export const movingAverages = (
  values: number[],
  days: number[],
): number[][] => {
  const averages: number[][] = Array.from({ length: days.length }, () => []);

  values.forEach((_, index, array) => {
    days.forEach((day, dayIndex) => {
      const start = Math.max(0, index - day + 1);
      const lastXDays = array.slice(start, index + 1);
      const average =
        lastXDays.reduce((sum, record) => sum + record, 0) / lastXDays.length;

      averages[dayIndex][index] = average;
    });
  });

  return averages;
};

export const getPercentageDifference = (left: Dnum, right: Dnum) => {
  if (eq(left, right)) {
    return from(0);
  }

  const diff = sub(left, right);
  return eq(right, 0) ? from(0) : div(diff, right);
};
