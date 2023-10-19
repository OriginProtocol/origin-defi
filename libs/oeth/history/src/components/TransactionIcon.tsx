import { Box } from '@mui/material';
import { HistoryType } from '@origin/oeth/shared';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { BoxProps } from '@mui/material';

export type TransactionIconProps = {
  type: HistoryType;
  tokenIcon?: string;
} & BoxProps;

export function TransactionIcon({
  type,
  tokenIcon,
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
        src={
          type === HistoryType.Yield
            ? '/images/Yield.svg'
            : '/images/tokens/OETH.svg'
        }
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
      {type === HistoryType.Swap && !isNilOrEmpty(tokenIcon) && (
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
            src={tokenIcon}
          ></Box>
        </Box>
      )}
    </Box>
  );
}
