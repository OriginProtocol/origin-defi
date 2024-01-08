import { SvgIcon } from '@mui/material';

import OriginLabelSvg from './origin-label.svg?react';
import OriginLogoSvg from './origin-logo.svg?react';

import type { SvgIconProps } from '@mui/material';

export const OriginLabel = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OriginLabelSvg} viewBox="0 0 104 24" />
);
export const OriginLogo = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OriginLogoSvg} viewBox="0 0 22 22" />
);
