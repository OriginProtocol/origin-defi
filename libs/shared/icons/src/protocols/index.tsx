import { SvgIcon } from '@mui/material';

import CRVWebp from './curve.webp';
import OriginSvg from './origin.svg?react';
import SnapshotSvg from './snapshot.svg?react';
import UniswapSvg from './uniswap.svg?react';

import type { SvgIconProps } from '@mui/material';

export const Curve = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 100 100">
    <image href={CRVWebp} height="100" width="100" />
  </SvgIcon>
);
export const Origin = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OriginSvg} viewBox="0 0 22 22" />
);
export const Snapshot = (props: SvgIconProps) => (
  <SvgIcon {...props} component={SnapshotSvg} viewBox="0 0 16 16" />
);
export const Uniswap = (props: SvgIconProps) => (
  <SvgIcon {...props} component={UniswapSvg} viewBox="40.04 0 470.19 541.43" />
);
