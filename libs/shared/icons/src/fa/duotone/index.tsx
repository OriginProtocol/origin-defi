import { SvgIcon } from '@mui/material';

import LoaderDuotoneSvg from './loader-duotone.svg?react';

import type { SvgIconProps } from '@mui/material';

export const FaLoaderDuotone = (props: SvgIconProps) => (
  <SvgIcon
    fontSize="inherit"
    {...props}
    component={LoaderDuotoneSvg}
    inheritViewBox
  />
);
