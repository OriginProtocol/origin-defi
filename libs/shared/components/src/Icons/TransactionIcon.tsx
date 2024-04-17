import { Box } from '@mui/material';
import { Received, Send, Swap, Yield } from '@origin/shared/icons';

import { TokenIcon } from './TokenIcon';

import type { BoxProps, SvgIconProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

enum HistoryType {
  Received = 'Received',
  Sent = 'Sent',
  Swap = 'Swap',
  Yield = 'Yield',
}

export type TransactionIconProps = {
  type: HistoryType;
  token: Token;
  swapToken?: Token;
} & BoxProps;

export function TransactionIcon({
  type,
  token,
  swapToken,
  ...rest
}: TransactionIconProps) {
  return (
    <Box
      {...rest}
      sx={{
        position: 'relative',
        width: { xs: '1.375rem', md: '2rem' },
        height: { xs: '1.375rem', md: '2rem' },
        ...rest?.sx,
      }}
    >
      {type === HistoryType.Yield ? (
        <Yield
          sx={{
            width: 1,
            height: 1,
          }}
        />
      ) : (
        <TokenIcon
          token={token}
          sx={{
            width: 1,
            height: 1,
          }}
        />
      )}
      {type === HistoryType.Sent ? (
        <Send {...subIconProps} />
      ) : type === HistoryType.Received || type === HistoryType.Yield ? (
        <Received {...subIconProps} />
      ) : (
        <Swap {...subIconProps} />
      )}
    </Box>
  );
}

const subIconProps: Partial<SvgIconProps> = {
  sx: {
    width: { xs: 12, md: 16 },
    height: { xs: 12, md: 16 },
    position: 'absolute',
    right: '-0.4rem',
    bottom: 0,
    zIndex: 1,
  },
};
