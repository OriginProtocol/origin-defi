import { alpha, Stack, Typography } from '@mui/material';
import { Dropdown } from '@origin/shared/icons';

import { TokenIcon } from '../Icons';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenButtonProps = {
  token: Token;
  isDisabled?: boolean;
} & StackProps;

export const TokenButton = ({
  token,
  isDisabled,
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
        paddingLeft: 0.25,
        paddingRight: isDisabled ? 2 : 1,
        border: '1px solid transparent',
        paddingY: 0.25,
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        fontStyle: 'normal',
        cursor: isDisabled ? 'default' : 'pointer',
        fontWeight: 500,
        boxSizing: 'border-box',
        position: 'relative',
        ...(!isDisabled && {
          ':hover': {
            background: (theme) =>
              `linear-gradient(${theme.palette.grey[600]}, ${
                theme.palette.grey[600]
              }) padding-box, linear-gradient(90deg, ${alpha(
                theme.palette.primary.main,
                0.4,
              )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
          },
        }),
        ...rest?.sx,
      }}
    >
      <TokenIcon token={token} sx={{ width: '1.75rem', height: 'auto' }} />
      <Typography variant="inherit">{token.symbol}</Typography>
      {!isDisabled && <Dropdown />}
    </Stack>
  );
};
