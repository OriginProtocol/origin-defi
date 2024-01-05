import { Link } from '@mui/material';
import { ArrowUpRight } from '@origin/shared/icons';

import type { LinkProps } from '@mui/material';

export type ArrowLinkProps = { iconSize?: number } & LinkProps;

export const ArrowLink = ({ iconSize = 10, ...rest }: ArrowLinkProps) => {
  return (
    <Link target="_blank" rel="noopener noreferrer nofollow" {...rest}>
      <ArrowUpRight sx={{ height: iconSize, width: iconSize }} />
    </Link>
  );
};
