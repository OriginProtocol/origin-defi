import { Box, Link } from '@mui/material';

interface Props {
  url: string;
  size?: string;
}

export function LinkIcon({ url, size = '0.875rem' }: Props) {
  return (
    <Link href={url}>
      <Box
        component="img"
        src="https://app.oeth.com/images/link-icon-purple.svg"
        sx={{ height: size, width: size }}
      ></Box>
    </Link>
  );
}
