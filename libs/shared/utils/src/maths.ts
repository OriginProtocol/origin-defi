import { eq, from, lt, mul, sub } from 'dnum';

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

export const getFormatPrecision = (value: Dnum) => {
  return lt(value, 1) ? 6 : lt(value, 10) ? 4 : 2;
};
