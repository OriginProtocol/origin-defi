import { SvgIcon } from '@mui/material';

import AAVESvg from './aave.svg?react';
import CompoundSvg from './compound.svg?react';
import ConvexSvg from './convex.svg?react';
import MakerSvg from './maker.svg?react';
import MorphoSvg from './morpho.svg?react';

import type { SvgIconProps } from '@mui/material';

export const AaveStrategy = (props: SvgIconProps) => (
  <SvgIcon {...props} component={AAVESvg} inheritViewBox />
);
export const CompoundStrategy = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CompoundSvg} inheritViewBox />
);
export const ConvexStrategy = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ConvexSvg} inheritViewBox />
);
export const MakerStrategy = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MakerSvg} inheritViewBox />
);
export const MorphoStrategy = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MorphoSvg} inheritViewBox />
);
