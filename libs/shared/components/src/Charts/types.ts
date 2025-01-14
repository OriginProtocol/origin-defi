import type { ReactNode } from 'react';

import type { Currency } from '../Controls';
import type { curveTypes } from './constants';

export type Serie<Datum> = {
  xKey: keyof Datum;
  yKey: keyof Datum;
  color?: ChartColor;
  label?: string;
  curveType?: keyof typeof curveTypes;
  strokeWidth?: number;
};

export type ChartData = { x: number; y: number };

export type ChartColor = string | [string, string];

export type ChartTooltipLabel<Datum> = {
  label: ReactNode | ((d: Datum) => ReactNode);
  value?: ReactNode | ((d: Datum) => ReactNode);
  color?: ChartColor | ((d: Datum) => ChartColor);
  currency?: Currency;
};
