import { Stack } from '@mui/material';

import type { StackProps } from '@mui/material';

export const GradientChip = (props: StackProps) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      {...props}
      sx={[
        {
          alignItems: 'center',
          color: 'primary.contrastText',
          px: 2,
          py: 1,
          borderRadius: 2,
        },
        (theme) => ({
          background: theme.palette.background.gradientBlueDark,
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};
