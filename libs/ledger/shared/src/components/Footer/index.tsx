import { Stack, Typography } from '@mui/material';

import type { StackProps } from '@mui/material';

export const Footer = (props: StackProps) => {
  const year = new Date().getFullYear();

  return (
    <Stack {...props}>
      <Typography variant="caption1" color="text.secondary">
        © {year} Origin Protocol
      </Typography>
    </Stack>
  );
};
