import { SvgIcon } from '@mui/material';

import OriginSvg from './origin.svg?react';
import SnapshotWebp from './snapshot.webp';
import UniswapSvg from './uniswap.svg?react';

import type { SvgIconProps } from '@mui/material';

export const Origin = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OriginSvg} viewBox="0 0 22 22" />
);
export const Snapshot = (props: SvgIconProps) => (
  <SvgIcon fontSize="inherit" {...props} viewBox="0 0 100 100">
    <image href={SnapshotWebp} height="100" width="100" />
  </SvgIcon>
);
export const Uniswap = (props: SvgIconProps) => (
  <SvgIcon {...props} component={UniswapSvg} viewBox="40.04 0 470.19 541.43" />
);
