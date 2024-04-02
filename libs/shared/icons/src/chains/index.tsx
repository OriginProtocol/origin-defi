import { SvgIcon } from '@mui/material';

import ArbitrumSvg from './Arbitrum.svg?react';
import EthIconSvg from './Ethereum.svg?react';
import GoerliSvg from './Goerli.svg?react';
import NightfallSvg from './Nightfall.svg?react';
import OptimismSvg from './Optimism.svg?react';
import PolygonSvg from './Polygon.svg?react';
import ZkSvg from './Zk.svg?react';

import type { SvgIconProps } from '@mui/material';

export const Arbitrum = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ArbitrumSvg} viewBox="0 0 1080 1218.5" />
);
export const Ethereum = (props: SvgIconProps) => (
  <SvgIcon {...props} component={EthIconSvg} viewBox="0 0 32 32" />
);
export const Goerli = (props: SvgIconProps) => (
  <SvgIcon {...props} component={GoerliSvg} viewBox="0 0 24 24" />
);
export const Nightfall = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    component={NightfallSvg}
    viewBox="155.3 65.3 289.8 320.2"
  />
);
export const Optimism = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OptimismSvg} viewBox="0 0 500 500" />
);
export const Polygon = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PolygonSvg} viewBox="0 0 100 100" />
);
export const Zk = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ZkSvg} viewBox="0 0 500 500" />
);
