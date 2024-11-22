import { Box, Stack, Typography } from '@mui/material';

import type { StackProps, TypographyProps } from '@mui/material';

export type ColorLabelProps = {
  color?: string | [string, string];
  label: string;
  labelProps?: TypographyProps;
  colorMarkSize?: number;
} & StackProps;

export const ColorLabel = ({
  color,
  label,
  labelProps,
  colorMarkSize = 15,
  ...rest
}: ColorLabelProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        { alignItems: 'center' },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
      ]}
    >
      {color && (
        <Box
          sx={{
            width: colorMarkSize,
            height: colorMarkSize,
            borderRadius: '50%',
            background:
              Array.isArray(color) && color.length === 2
                ? `linear-gradient(90deg, ${color?.[0]}, ${color[1]});`
                : color,
          }}
        />
      )}
      <Typography {...labelProps}>{label}</Typography>
    </Stack>
  );
};
