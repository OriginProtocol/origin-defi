import type { Serie } from './types';

export const getScaleDomains = <Datum>(
  data: Datum[],
  series: Serie<Datum>[],
  xCoeff = [1, 1],
  yCoeff = [0.9, 1.1],
) => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  if (!data.length || !series.length) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  }

  for (let i = 0; i < data.length; i++) {
    for (const serie of series) {
      const x = data[i]?.[serie.xKey] as number;
      const y = data[i]?.[serie.yKey] as number;

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

export type DataKey<Datum> = keyof Datum | ((d: Datum) => number);

export const getDataEdges = <Datum = object>(
  data: Datum[],
  keys: DataKey<Datum>[],
) => {
  return data.reduce(
    (acc, curr) => {
      keys.forEach((k, i) => {
        const prev = acc[i] ?? [];
        const cu = typeof k === 'function' ? k(curr) : (curr[k] as number);
        acc[i] = [Math.min(...prev, cu), Math.max(...prev, cu)];
      });
      return acc;
    },
    [] as [number, number][],
  );
};
