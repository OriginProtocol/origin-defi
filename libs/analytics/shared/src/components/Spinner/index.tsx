import { CircularProgress, Stack } from '@mui/material';

import type { StackProps } from '@mui/material';

export const Spinner = (props: StackProps) => {
  return (
    <Stack
      sx={[
        { justifyContent: 'center', alignItems: 'center' },
        ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
      ]}
    >
      <CircularProgress size={36} />
    </Stack>
  );
};
