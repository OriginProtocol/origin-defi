import { Stack, Typography } from '@mui/material';
import { Dropdown } from '@origin/shared/icons';

import { TokenIcon } from '../Icons';

import type { StackProps, SvgIconProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenButtonProps = {
  token: Token;
  isDisabled?: boolean;
  tokenIconProps?: SvgIconProps;
} & StackProps;

export const TokenButton = ({
  token,
  isDisabled,
  tokenIconProps,
  ...rest
}: TokenButtonProps) => {
  return (
    <Stack
      direction="row"
      role="button"
      gap={1}
      {...rest}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 32,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 500,
        pl: 0.25,
        pr: isDisabled ? 2 : 1,
        py: 0.25,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        fontStyle: 'normal',
        cursor: isDisabled ? 'default' : 'pointer',
        ...rest?.sx,
      }}
    >
      <TokenIcon
        {...tokenIconProps}
        token={token}
        sx={{ width: 28, height: 28, ...tokenIconProps?.sx }}
      />
      <Typography variant="inherit">{token.symbol}</Typography>
      {!isDisabled && <Dropdown />}
    </Stack>
  );
};
