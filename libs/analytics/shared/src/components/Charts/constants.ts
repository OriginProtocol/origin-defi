import { curveBasis, curveLinear, curveNatural, curveStep } from '@visx/curve';

export const curveTypes = {
  natural: curveNatural,
  step: curveStep,
  base: curveBasis,
  linear: curveLinear,
};
