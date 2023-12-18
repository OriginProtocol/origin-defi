import { Box, Link } from '@mui/material';

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
      <Box
        component="img"
        src="images/icons/arrow-up-right-from-square.svg"
        alt="link"
        sx={{ height: iconSize, width: iconSize }}
      />
    </Link>
  );
};
