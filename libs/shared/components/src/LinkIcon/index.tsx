import { Box, Link } from '@mui/material';

import type { SxProps } from '@mui/material';

interface Props {
  url: string;
  size?: string;
  sx?: SxProps;
}

export function LinkIcon({ url, size = '0.875rem', sx }: Props) {
  return (
    <Link href={url} sx={sx}>
      <Box
        component="img"
        src="/images/link-icon-purple.svg"
        sx={{ height: size, width: size }}
      ></Box>
    </Link>
  );
}
