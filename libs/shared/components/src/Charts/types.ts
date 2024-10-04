import type { curveTypes } from './constants';

export type Serie<Datum> = {
  data: Datum[];
  xKey: keyof Datum;
  yKey: keyof Datum;
  color?: ChartColor;
  label?: string;
  curveType?: keyof typeof curveTypes;
};

export type ChartData = { x: number; y: number };

export type ChartColor = string | [string, string];
