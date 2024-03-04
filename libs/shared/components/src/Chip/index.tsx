import { Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { TokenIcon } from '../Icons';

import type { StackProps, TypographyProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

type ChipProps = {
  label: string;
  token?: Token;
  labelProps?: TypographyProps;
} & StackProps;

export const Chip = ({ label, token, labelProps, ...rest }: ChipProps) => {
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
      {!isNilOrEmpty(token?.symbol) && <TokenIcon token={token} />}
    </Stack>
  );
};
