import { Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { TokenIcon } from '../Icons';

import type { StackProps, SvgIconProps, TypographyProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

type ChipProps = {
  label: string;
  token?: Token;
  labelProps?: TypographyProps;
  iconProps?: SvgIconProps;
  iconPlacement?: 'before' | 'after';
} & StackProps;

export const Chip = ({
  label,
  token,
  labelProps,
  iconProps,
  iconPlacement = 'after',
  ...rest
}: ChipProps) => {
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
      {iconPlacement === 'before' && !isNilOrEmpty(token?.symbol) && (
        <TokenIcon {...iconProps} token={token} />
      )}
      <Typography fontSize={12} {...labelProps}>
        {label}
      </Typography>
      {iconPlacement === 'after' && !isNilOrEmpty(token?.symbol) && (
        <TokenIcon {...iconProps} token={token} />
      )}
    </Stack>
  );
};
