import { Box } from '@mui/material';
import {
  BridgeCircle,
  Received,
  Send,
  Swap,
  Yield,
} from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { mainnet } from 'viem/chains';

import { TokenIcon } from './TokenIcon';

import type { BoxProps, SvgIconProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TransactionIconProps = {
  type: 'Received' | 'Sent' | 'Swap' | 'Yield' | 'Bridge';
  token: Token;
  swapToken?: Token;
} & BoxProps;

export function TransactionIcon({
  type,
  token,
  swapToken,
  ...rest
}: TransactionIconProps) {
  const icon =
    type === 'Yield' ? (
      <Yield
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
        }}
      />
    ) : (
      <TokenIcon
        token={token}
        showNetwork={token.chainId !== mainnet.id}
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
        }}
      />
    );

  const subIcon =
    type === 'Bridge' ? (
      <BridgeCircle {...subIconProps} />
    ) : type === 'Sent' ? (
      <Send {...subIconProps} />
    ) : type === 'Received' || type === 'Yield' ? (
      <Received {...subIconProps} />
    ) : (
      <Swap {...subIconProps} />
    );

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
      {icon}
      {subIcon}
      {type === 'Swap' && !isNilOrEmpty(swapToken) && (
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
          <TokenIcon
            token={swapToken}
            showNetwork={swapToken?.chainId !== mainnet.id}
            sx={{
              width: { xs: '1.375rem', md: '2rem' },
              height: { xs: '1.375rem', md: '2rem' },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

const subIconProps: Partial<SvgIconProps> = {
  sx: {
    width: 16,
    height: 16,
    position: 'absolute',
    left: -3,
    bottom: -1,
    zIndex: 1,
    borderRadius: '50%',
    border: '2px solid',
    borderColor: 'background.default',
  },
};
