import { Stack, Typography } from '@mui/material';

import { TokenIcon } from '../Icons';

import type { StackProps, TypographyProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { TokenIconProps } from '../Icons';

type TokenChipProps = {
  token: Token;
  label?: string;
  labelProps?: TypographyProps;
  iconProps?: TokenIconProps;
  iconPlacement?: 'before' | 'after';
} & StackProps;

export const TokenChip = ({
  label,
  token,
  labelProps,
  iconProps,
  iconPlacement = 'before',
  ...rest
}: TokenChipProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} {...rest}>
      {iconPlacement === 'before' && <TokenIcon {...iconProps} token={token} />}
      <Typography variant="inherit" {...labelProps}>
        {label ?? token.symbol}
      </Typography>
      {iconPlacement === 'after' && <TokenIcon {...iconProps} token={token} />}
    </Stack>
  );
};
