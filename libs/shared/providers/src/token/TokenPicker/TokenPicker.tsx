import { useState } from 'react';

import { alpha, Stack, Typography } from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { Dropdown } from '@origin/shared/icons';

import { TokenSelectModal } from './TokenSelectModal';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenPickerProps = {
  token: Token;
  isDisabled?: boolean;
  modal?: {
    tokens: Token[];
    onSelectToken: (token: Token) => void;
  };
} & StackProps;

export const TokenPicker = ({
  token,
  isDisabled,
  modal,
  ...rest
}: TokenPickerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Stack
        direction="row"
        role="button"
        gap={1}
        {...rest}
        onClick={(e) => {
          if (modal && !isDisabled) {
            setOpen(true);
          }
          rest.onClick?.(e);
        }}
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
      {modal && (
        <TokenSelectModal
          open={open}
          onClose={() => setOpen(false)}
          selectedToken={token}
          tokens={modal.tokens}
          onSelectToken={modal.onSelectToken}
        />
      )}
    </>
  );
};
