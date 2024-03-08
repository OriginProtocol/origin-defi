import { SvgIcon } from '@mui/material';

import ChainlinkCCIPSvg from './chainlink-ccip.svg?react';
import OriginSvg from './origin.svg?react';
import SnapshotSvg from './snapshot.svg?react';
import UniswapSvg from './uniswap.svg?react';

import type { SvgIconProps } from '@mui/material';

export const Origin = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OriginSvg} viewBox="0 0 22 22" />
);
export const Snapshot = (props: SvgIconProps) => (
  <SvgIcon {...props} component={SnapshotSvg} viewBox="0 0 16 16" />
);
export const Uniswap = (props: SvgIconProps) => (
  <SvgIcon {...props} component={UniswapSvg} viewBox="40.04 0 470.19 541.43" />
);
export const ChainlinkCCIP = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    component={ChainlinkCCIPSvg}
    viewBox="0 0 113.44 130.99"
  />
);
