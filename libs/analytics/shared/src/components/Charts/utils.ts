import { isNilOrEmpty } from '@origin/shared/utils';

import type { Serie } from './types';

export const getScaleDomains = <Datum>(series: Serie<Datum>[]) => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = 0;
  let maxY = -Infinity;

  for (const serie of series) {
    if (isNilOrEmpty(serie.data)) {
      continue;
    }

    for (const d of serie.data) {
      const x = d?.[serie.xKey] as number;
      const y = d?.[serie.yKey] as number;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }

  return { minX, maxX, minY, maxY };
};
