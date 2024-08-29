import { Stack, Typography } from '@mui/material';
import { TokenIcon } from '@origin/shared/components';

import type { StackProps, TypographyProps } from '@mui/material';
import type { TokenIconProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

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
    <Stack
      direction="row"
      spacing={0.5}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {iconPlacement === 'before' && (
        <TokenIcon outlined {...iconProps} token={token} />
      )}
      <Typography
        variant="inherit"
        {...labelProps}
        sx={[
          {
            fontWeight: 'medium',
          },
          ...(labelProps && Array.isArray(labelProps.sx)
            ? labelProps.sx
            : [labelProps?.sx]),
        ]}
      >
        {label ?? token.symbol}
      </Typography>
      {iconPlacement === 'after' && (
        <TokenIcon outlined {...iconProps} token={token} />
      )}
    </Stack>
  );
};
