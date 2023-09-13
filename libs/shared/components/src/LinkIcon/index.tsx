import { Box, Link } from '@mui/material';

import type { LinkProps, SxProps } from '@mui/material';

interface Props extends LinkProps {
  url: string;
  size?: string;
}

export function LinkIcon({ url, size = '0.875rem', ...rest }: Props) {
  return (
    <Link href={url} {...rest}>
      <Box
        component="img"
        src="/images/link-icon-purple.svg"
        sx={{ height: size, width: size }}
      ></Box>
    </Link>
  );
}
