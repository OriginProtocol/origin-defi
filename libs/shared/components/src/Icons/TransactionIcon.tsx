import { Box } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { BoxProps } from '@mui/material';

enum HistoryType {
  Received = 'Received',
  Sent = 'Sent',
  Swap = 'Swap',
  Yield = 'Yield',
}

export type TransactionIconProps = {
  type: HistoryType;
  tokenIcon: string;
  swapTokenIcon?: string;
} & BoxProps;

export function TransactionIcon({
  type,
  tokenIcon,
  swapTokenIcon,
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
      <Box
        component="img"
        alt="yield"
        src={type === HistoryType.Yield ? '/images/Yield.svg' : tokenIcon}
        sx={{
          width: '100%',
          height: '100%',
        }}
      ></Box>
      <Box
        sx={{
          width: { xs: '0.75rem', md: '1rem' },
          height: { xs: '0.75rem', md: '1rem' },
          position: 'absolute',
          right: '-0.4rem',
          bottom: 0,
          zIndex: 1,
        }}
        component="img"
        alt="transaction"
        src={
          type === HistoryType.Sent
            ? '/images/Send.svg'
            : type === HistoryType.Received || type === HistoryType.Yield
              ? '/images/Received.svg'
              : '/images/Swap.svg'
        }
      ></Box>
      {type === HistoryType.Swap && !isNilOrEmpty(swapTokenIcon) && (
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            width: '50%',
            overflow: 'hidden',
            top: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              width: { xs: '1.375rem', md: '2rem' },
              height: { xs: '1.375rem', md: '2rem' },
            }}
            component="img"
            alt="token"
            src={swapTokenIcon}
          ></Box>
        </Box>
      )}
    </Box>
  );
}
