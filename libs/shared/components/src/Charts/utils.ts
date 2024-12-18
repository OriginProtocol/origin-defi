import { isNilOrEmpty } from '@origin/shared/utils';

import type { Serie } from './types';

export const getScaleDomains = <Datum>(
  series: Serie<Datum>[],
  xCoeff = [1, 1],
  yCoeff = [0.9, 1.1],
) => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const serie of series) {
    if (isNilOrEmpty(serie.data)) {
      continue;
    }

    for (let i = 0; i < serie.data.length; i++) {
      const x = serie.data[i]?.[serie.xKey] as number;
      const y = serie.data[i]?.[serie.yKey] as number;

      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }

  return {
    minX: minX * xCoeff[0],
    maxX: maxX * xCoeff[1],
    minY: minY * yCoeff[0],
    maxY: maxY * yCoeff[1],
  };
};

export const getStackedScaleDomains = <Datum>(
  serie: Datum[],
  yKeys: (keyof Datum)[],
  xKey: keyof Datum,
) => {
  const minX = Math.min(...serie.map((item) => item[xKey] as number));
  const maxX = Math.max(...serie.map((item) => item[xKey] as number));
  const minY = 0;

  const totalY = [] as number[];
  for (const item of serie) {
    let totY = 0;
    for (const key of yKeys) {
      totY += item[key] as number;
    }
    totalY.push(totY);
  }
  const maxY = Math.max(...totalY);

  return { minX, maxX, minY, maxY };
};

export const getBarChartBottomTicks = (width: number) =>
  width < 400 ? 4 : width < 600 ? 8 : 10;
