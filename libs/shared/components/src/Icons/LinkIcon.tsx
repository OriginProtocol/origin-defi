import { Box, Link } from '@mui/material';

import type { LinkProps } from '@mui/material';

interface Props extends LinkProps {
  url: string;
  size?: number | string;
}

export function LinkIcon({
  url,
  size = '0.875rem',
  target = '_blank',
  rel = 'noopener noreferrer nofollow',
  ...rest
}: Props) {
  return (
    <Link href={url} target={target} rel={rel} {...rest}>
      <Box
        component="img"
        src="/images/icons/arrow-up-right-light.svg"
        alt="link"
        sx={{ height: size, width: size }}
      />
    </Link>
  );
}
