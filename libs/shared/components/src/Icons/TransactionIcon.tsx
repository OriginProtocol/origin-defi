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

import { ChainIcon } from './ChainIcon';
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
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
        }}
      />
    );

  const chainIcon = token.chainId !== mainnet.id && (
    <ChainIcon chainId={token.chainId} {...chainIconProps} />
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
      {chainIcon}
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

const chainIconProps: Partial<SvgIconProps> = {
  sx: {
    width: 14 / 32,
    height: 14 / 32,
    position: 'absolute',
    right: `${(-4 / 32) * 100}%`,
    top: `${(-1 / 32) * 100}%`,
    zIndex: 1,
    backgroundColor: '#1E1F25',
    border: 'solid 1px #1E1F25',
    borderRadius: 999,
  },
};

const subIconProps: Partial<SvgIconProps> = {
  sx: {
    width: 16 / 32,
    height: 16 / 32,
    position: 'absolute',
    right: `${(-6 / 32) * 100}%`,
    bottom: `${(-2 / 32) * 100}%`,
    zIndex: 1,
  },
};
