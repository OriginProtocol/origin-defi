import { SvgIcon } from '@mui/material';

import CowSvg from './cow.svg?react';
import EigenPointsSvg from './eigen-points.svg?react';
import PrimePointsSvg from './prime-points.svg?react';
import PrimeStakeSvg from './prime-stake.svg?react';
import WhaleSvg from './whale.svg?react';

import type { SvgIconProps } from '@mui/material';

export const Cow = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CowSvg} inheritViewBox />
);
export const EigenPoints = (props: SvgIconProps) => (
  <SvgIcon {...props} component={EigenPointsSvg} inheritViewBox />
);
export const PrimePoints = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PrimePointsSvg} inheritViewBox />
);
export const PrimeStake = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PrimeStakeSvg} inheritViewBox />
);
export const Whale = (props: SvgIconProps) => (
  <SvgIcon {...props} component={WhaleSvg} inheritViewBox />
);
