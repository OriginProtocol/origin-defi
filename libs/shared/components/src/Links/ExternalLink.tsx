import { Link } from '@mui/material';
import { FaArrowUpRightFromSquareRegular } from '@origin/shared/icons';

import type { LinkProps } from '@mui/material';

export type ExternalLinkProps = { iconSize?: number } & LinkProps;

export const ExternalLink = ({
  children,
  iconSize = 10,
  ...rest
}: ExternalLinkProps) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0.75,
        ...rest?.sx,
      }}
    >
      {children}
      <FaArrowUpRightFromSquareRegular
        sx={{ height: iconSize, width: iconSize }}
      />
    </Link>
  );
};
