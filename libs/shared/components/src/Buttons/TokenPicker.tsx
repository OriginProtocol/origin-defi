import { alpha, Stack, Typography } from '@mui/material';
import { Dropdown } from '@origin/shared/icons';

import { TokenIcon } from '../Icons';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenPickerProps = {
  token: Token;
  isDisabled?: boolean;
} & StackProps;

export const TokenPicker = ({
  token,
  isDisabled,
  ...rest
}: TokenPickerProps) => {
  return (
    <Stack
      direction="row"
      role="button"
      {...rest}
      sx={[
        {
          gap: 1,
        },
        {
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 32,
          borderRadius: 25,
          fontSize: 16,
          paddingLeft: 0.25,
          border: '1px solid transparent',
          paddingY: 0.25,
          background: (theme) => alpha(theme.palette.common.white, 0.1),
          fontStyle: 'normal',
          fontWeight: 500,
          boxSizing: 'border-box',
          position: 'relative',
          ...rest?.sx,
        },
        isDisabled
          ? {
              paddingRight: 2,
            }
          : {
              paddingRight: 1,
            },
        isDisabled
          ? {
              cursor: 'default',
            }
          : {
              cursor: 'pointer',
            },
        !isDisabled &&
          ((theme) => ({
            ':hover': {
              background: `linear-gradient(${theme.palette.grey[600]}, ${
                theme.palette.grey[600]
              }) padding-box, linear-gradient(90deg, ${alpha(
                theme.palette.primary.main,
                0.4,
              )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
            },
          })),
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <TokenIcon token={token} sx={{ width: '1.75rem', height: 'auto' }} />
      <Typography variant="inherit">{token.symbol}</Typography>
      {!isDisabled && <Dropdown />}
    </Stack>
  );
};
