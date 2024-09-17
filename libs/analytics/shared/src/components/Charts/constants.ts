import { curveBasis, curveLinear, curveNatural, curveStep } from '@visx/curve';

export const curveTypes = {
  natural: curveNatural,
  step: curveStep,
  base: curveBasis,
  linear: curveLinear,
};

export const margin = { top: 10, left: 0, bottom: 50, right: 50 };
