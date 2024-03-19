import { SvgIcon } from '@mui/material';

import AaveFullSvg from './aave-full.svg?react';
import AuraFullWebp from './aura-full.webp';
import BalancerFullSvg from './balancer-full.svg?react';
import CompoundFullSvg from './compound-full.svg?react';
import ConvexFullSvg from './convex-full.svg?react';
import CRVWebp from './curve.webp';
import CurveFullWebp from './curve-full.webp';
import FluxFullSvg from './flux-full.svg?react';
import FraxFullSvg from './frax-full.svg?react';
import LidoFullSvg from './lido-full.svg?react';
import MakerFullSvg from './maker-full.svg?react';
import MorphoFullWebp from './morpho-full.webp';
import OriginSvg from './origin.svg?react';
import RocketpoolFullWebp from './rocketpool-full.webp';
import SnapshotSvg from './snapshot.svg?react';
import UniswapSvg from './uniswap.svg?react';

import type { SvgIconProps } from '@mui/material';

export const AaveFull = (props: SvgIconProps) => (
  <SvgIcon {...props} component={AaveFullSvg} inheritViewBox />
);
export const AuraFull = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 47.3 16">
    <image href={AuraFullWebp} height="16" width="47.3" />
  </SvgIcon>
);
export const BalancerFull = (props: SvgIconProps) => (
  <SvgIcon {...props} component={BalancerFullSvg} inheritViewBox />
);
export const CompoundFull = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CompoundFullSvg} inheritViewBox />
);
export const ConvexFull = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ConvexFullSvg} inheritViewBox />
);
export const Curve = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 100 100">
    <image href={CRVWebp} height="100" width="100" />
  </SvgIcon>
);
export const CurveFull = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 59.2 16">
    <image href={CurveFullWebp} height="16" width="59.2" />
  </SvgIcon>
);
export const FluxFull = (props: SvgIconProps) => (
  <SvgIcon {...props} component={FluxFullSvg} inheritViewBox />
);
export const FraxFull = (props: SvgIconProps) => (
  <SvgIcon {...props} component={FraxFullSvg} inheritViewBox />
);
export const LidoFull = (props: SvgIconProps) => (
  <SvgIcon {...props} component={LidoFullSvg} inheritViewBox />
);
export const MakerFull = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MakerFullSvg} inheritViewBox />
);
export const MorphoFull = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 75.14287 16">
    <image href={MorphoFullWebp} height="16" width="75.14287" />
  </SvgIcon>
);
export const Origin = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OriginSvg} inheritViewBox />
);
export const RocketpoolFull = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 118.16 16">
    <image href={RocketpoolFullWebp} height="16" width="118.16" />
  </SvgIcon>
);
export const Snapshot = (props: SvgIconProps) => (
  <SvgIcon {...props} component={SnapshotSvg} inheritViewBox />
);
export const Uniswap = (props: SvgIconProps) => (
  <SvgIcon {...props} component={UniswapSvg} inheritViewBox />
);
