import type { Serie } from './types';

export const getScaleDomains = <Datum>(series: Serie<Datum>[]) => {
  return series.reduce(
    (acc, s) => {
      s.data.forEach((d) => {
        const x = d?.[s.xKey] as number;
        const y = d?.[s.yKey] as number;
        acc.minX = Math.min(acc.minX, x);
        acc.maxX = Math.max(acc.maxX, x);
        acc.minY = Math.min(acc.minY, y);
        acc.maxY = Math.max(acc.maxY, y);
      });
      return acc;
    },
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
  );
};
