import { SvgIcon } from '@mui/material';

import AirdropSvg from './airdrop.svg?react';
import AirdropStarSvg from './airdrop-star.svg?react';
import CowSvg from './cow.svg?react';
import EigenLogoSvg from './eigen-logo.svg?react';
import EigenPointsSvg from './eigen-points.svg?react';
import FriendsSvg from './friends.svg?react';
import PrimePointsSvg from './prime-points.svg?react';
import PrimeStakeSvg from './prime-stake.svg?react';
import SeedsSvg from './seeds.svg?react';
import WhaleSvg from './whale.svg?react';
import YieldNestHexagonSvg from './yield-nest-hexagon.svg?react';
import YieldNestInvertedSvg from './yield-nest-inverted.svg?react';

import type { SvgIconProps } from '@mui/material';

export const Airdrop = (props: SvgIconProps) => (
  <SvgIcon {...props} component={AirdropSvg} inheritViewBox />
);
export const AirdropStar = (props: SvgIconProps) => (
  <SvgIcon {...props} component={AirdropStarSvg} inheritViewBox />
);
export const Cow = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CowSvg} inheritViewBox />
);
export const EigenLogo = (props: SvgIconProps) => (
  <SvgIcon {...props} component={EigenLogoSvg} inheritViewBox />
);
export const EigenPoints = (props: SvgIconProps) => (
  <SvgIcon {...props} component={EigenPointsSvg} inheritViewBox />
);
export const Friends = (props: SvgIconProps) => (
  <SvgIcon {...props} component={FriendsSvg} inheritViewBox />
);
export const PrimePoints = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PrimePointsSvg} inheritViewBox />
);
export const PrimeStake = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PrimeStakeSvg} inheritViewBox />
);
export const Seeds = (props: SvgIconProps) => (
  <SvgIcon {...props} component={SeedsSvg} inheritViewBox />
);
export const Whale = (props: SvgIconProps) => (
  <SvgIcon {...props} component={WhaleSvg} inheritViewBox />
);
export const YieldNestHexagon = (props: SvgIconProps) => (
  <SvgIcon {...props} component={YieldNestHexagonSvg} inheritViewBox />
);
export const YieldNestInverted = (props: SvgIconProps) => (
  <SvgIcon {...props} component={YieldNestInvertedSvg} inheritViewBox />
);
