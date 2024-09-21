import { curveBasis, curveLinear, curveNatural, curveStep } from '@visx/curve';

export const curveTypes = {
  natural: curveNatural,
  step: curveStep,
  base: curveBasis,
  linear: curveLinear,
};

export const chartMargins = { top: 10, left: 25, bottom: 50, right: 50 };
