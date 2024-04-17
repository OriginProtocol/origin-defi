import { SvgIcon } from '@mui/material';

import ActivitySvg from './activity.svg?react';
import ArrowDownSvg from './arrowDown.svg?react';
import ArrowDownFromArcSvg from './arrowDownFromArc.svg?react';
import ArrowUpRightSvg from './arrowUpRight.svg?react';
import CheckboxSvg from './checkbox.svg?react';
import CheckboxEmptySvg from './checkboxEmpty.svg?react';
import CheckCircleSvg from './checkCircle.svg?react';
import CoinsLightSvg from './coinsLight.svg?react';
import DropdownSvg from './dropdown.svg?react';
import PendingSvg from './pending.svg?react';
import PoweredBySafeSvg from './poweredBySafe.svg?react';
import ReceivedSvg from './received.svg?react';
import SendSvg from './send.svg?react';
import SwapSvg from './swap.svg?react';
import YieldSvg from './yield.svg?react';

import type { SvgIconProps } from '@mui/material';

export const Activity = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ActivitySvg} viewBox="0 0 28 28" />
);
export const ArrowDown = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ArrowDownSvg} viewBox="0 0 14 25" />
);
export const ArrowDownFromArc = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ArrowDownFromArcSvg} viewBox="0 0 16 16" />
);
export const ArrowUpRight = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    component={ArrowUpRightSvg}
    viewBox="10.67 10.66 10.67 10.67"
  />
);
export const Checkbox = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CheckboxSvg} inheritViewBox />
);
export const CheckboxEmpty = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CheckboxEmptySvg} inheritViewBox />
);
export const CheckCircle = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CheckCircleSvg} inheritViewBox />
);
export const CoinsLight = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CoinsLightSvg} viewBox="0 0 16 16" />
);
export const Dropdown = (props: SvgIconProps) => (
  <SvgIcon {...props} component={DropdownSvg} viewBox="0 0 17 16" />
);
export const Pending = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PendingSvg} viewBox="0 0 16 16" />
);
export const PoweredBySafe = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PoweredBySafeSvg} viewBox="0 0 215 24" />
);
export const Received = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ReceivedSvg} viewBox="0 0 16 16" />
);
export const Send = (props: SvgIconProps) => (
  <SvgIcon {...props} component={SendSvg} viewBox="0 0 16 16" />
);
export const Swap = (props: SvgIconProps) => (
  <SvgIcon {...props} component={SwapSvg} viewBox="0 0 16 17" />
);
export const Yield = (props: SvgIconProps) => (
  <SvgIcon {...props} component={YieldSvg} viewBox="0 0 32 32" />
);
