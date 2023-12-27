import { Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { TokenIcon } from '../Icons';

import type { StackProps, TypographyProps } from '@mui/material';

type ChipProps = {
  label: string;
  symbol?: string;
  labelProps?: TypographyProps;
} & StackProps;

export const Chip = ({ label, symbol, labelProps, ...rest }: ChipProps) => {
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
      {!isNilOrEmpty(symbol) && <TokenIcon symbol={symbol} />}
    </Stack>
  );
};
