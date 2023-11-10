import { Box, Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { StackProps, TypographyProps } from '@mui/material';

type ChipProps = {
  label: string;
  icon?: string;
  labelProps?: TypographyProps;
} & StackProps;

export const Chip = ({ label, icon, labelProps, ...rest }: ChipProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      borderRadius={2}
      border={(theme) => `1px solid ${theme.palette.divider}`}
      px={1.5}
      py={0.5}
      {...rest}
    >
      <Typography fontSize={12} {...labelProps}>
        {label}
      </Typography>
      {!isNilOrEmpty(icon) && (
        <Box component="img" src={icon} width={16} height={16} />
      )}
    </Stack>
  );
};
