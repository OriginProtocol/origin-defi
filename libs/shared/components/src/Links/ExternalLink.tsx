import { Link } from '@mui/material';
import {
  FaArrowUpRightFromSquareRegular,
  FaArrowUpRightRegular,
} from '@origin/shared/icons';

import type { LinkProps, SvgIconProps } from '@mui/material';

export type ExternalLinkProps = {
  iconSize?: number;
  iconType?: 'square' | 'arrow';
} & LinkProps;

export const ExternalLink = ({
  children,
  iconSize = 10,
  iconType = 'square',
  ...rest
}: ExternalLinkProps) => {
  const iconProps: SvgIconProps = { sx: { height: iconSize, width: iconSize } };

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
      {iconType === 'square' ? (
        <FaArrowUpRightFromSquareRegular {...iconProps} />
      ) : (
        <FaArrowUpRightRegular {...iconProps} />
      )}
    </Link>
  );
};
