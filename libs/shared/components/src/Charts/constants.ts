import {
  curveBasis,
  curveCatmullRom,
  curveLinear,
  curveNatural,
  curveStep,
} from '@visx/curve';

export const curveTypes = {
  natural: curveNatural,
  step: curveStep,
  base: curveBasis,
  linear: curveLinear,
  curveCatmullRom: curveCatmullRom,
};

export const chartMargins = { top: 5, left: 25, bottom: 50, right: 50 };
