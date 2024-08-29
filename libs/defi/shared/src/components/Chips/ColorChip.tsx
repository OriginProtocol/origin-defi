import { Stack } from '@mui/material';

import type { StackProps } from '@mui/material';

export const ColorChip = (props: StackProps) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      {...props}
      sx={[
        {
          alignItems: 'center',
          color: 'primary.light',
          backgroundColor: 'primary.faded',
          px: 2,
          py: 1,
          borderRadius: 2,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};
