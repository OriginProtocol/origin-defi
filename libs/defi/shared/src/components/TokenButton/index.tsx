import { Box, Button, emphasize, Typography } from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { FaChevronDownRegular } from '@origin/shared/icons';

import type { ButtonProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenButtonProps = {
  token?: Token;
} & ButtonProps;

export const TokenButton = ({ token, ...rest }: TokenButtonProps) => {
  if (!token) {
    return null;
  }

  return (
    <Button
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 40,
        gap: 1,
        borderRadius: 120,
        color: 'text.primary',
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        pl: 1,
        pr: rest?.disabled ? 1 : 1.5,
        py: 0.75,
        flexShrink: 0,
        '&:hover': {
          borderColor: (theme) => emphasize(theme.palette.divider, 0.2),
          background: (theme) =>
            emphasize(theme.palette.background.default, 0.2),
        },
        '&.Mui-disabled': {
          color: 'text.primary',
          backgroundColor: 'background.default',
          pr: 2,
        },
        ...rest?.sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <TokenIcon token={token} sx={{ fontSize: 28 }} />
      </Box>
      <Typography variant="body2" fontWeight="bold" flexGrow={1}>
        {token.symbol}
      </Typography>
      {!rest?.disabled && (
        <FaChevronDownRegular sx={{ fontSize: 14, ml: 0.5 }} />
      )}
    </Button>
  );
};
