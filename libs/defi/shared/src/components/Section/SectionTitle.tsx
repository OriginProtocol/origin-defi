import { Box, Stack, Typography } from '@mui/material';

import type { BoxProps, StackProps, TypographyProps } from '@mui/material';

export type SectionTitleProps = {
  dotColor: BoxProps['bgcolor'];
  label: string;
  labelProps?: TypographyProps;
} & StackProps;

export const SectionTitle = ({
  dotColor,
  label,
  labelProps,
  ...rest
}: SectionTitleProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Box
        sx={{
          borderRadius: '50%',
          backgroundColor: dotColor,
          width: 10,
          height: 10,
        }}
      />
      <Typography variant="mono" {...labelProps}>
        {label}
      </Typography>
    </Stack>
  );
};
