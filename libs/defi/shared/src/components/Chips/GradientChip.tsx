import { Stack } from '@mui/material';

import type { StackProps } from '@mui/material';

export const GradientChip = (props: StackProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      color="primary.contrastText"
      px={2}
      py={1}
      borderRadius={2}
      {...props}
      sx={{
        background: (theme) => theme.palette.background.gradientBlueDark,
        ...props?.sx,
      }}
    />
  );
};
