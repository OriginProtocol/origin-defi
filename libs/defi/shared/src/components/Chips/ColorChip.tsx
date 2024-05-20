import { Stack } from '@mui/material';

import type { StackProps } from '@mui/material';

export const ColorChip = (props: StackProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      color="primary.light"
      bgcolor="primary.faded"
      px={2}
      py={1}
      borderRadius={2}
      {...props}
    />
  );
};
