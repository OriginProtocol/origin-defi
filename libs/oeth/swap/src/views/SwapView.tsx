import { useState } from 'react';

import { alpha, Box, IconButton, Stack } from '@mui/material';
import { Card, TokenInput } from '@origin/shared/components';
import { TokenSelectModal, usePrices } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { produce } from 'immer';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { GasPopover } from '../components/GasPopover';
import { SwapRoute } from '../components/SwapRoute';
import { swapTokens } from '../constants';
import { SwapProvider, useSwapState } from '../state';

import type { IconButtonProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export const SwapView = () => (
  <SwapProvider>
    <SwapViewWrapped />
  </SwapProvider>
);

function SwapViewWrapped() {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const [tokenModal, setTokenModal] = useState<'tokenIn' | 'tokenOut' | null>(
    null,
  );
  const [{ amountIn, amountOut, tokenIn, tokenOut }, setSwapState] =
    useSwapState();
  const { data: prices, isLoading: isPriceLoading } = usePrices();
  const { data: balTokenIn, isLoading: isBalTokenInLoading } = useBalance({
    address,
    token: tokenIn.address,
  });
  const { data: balTokenOut, isLoading: isBalTokenOutLoading } = useBalance({
    address,
    token: tokenOut.address,
  });

  const handleCloseSelectionModal = () => {
    setTokenModal(null);
  };

  const handleSelectToken = (value: Token) => {
    setSwapState(
      produce((draft) => {
        draft[tokenModal] = value;
      }),
    );
  };

  const handleExchangeTokens = () => {
    setSwapState(
      produce((draft) => {
        draft.amountIn = 0n;
        draft.amountOut = 0n;
        const oldTokenOut = draft.tokenOut;
        draft.tokenOut = draft.tokenIn;
        draft.tokenIn = oldTokenOut;
      }),
    );
  };

  return (
    <>
      <Card
        sxCardTitle={{ padding: { xs: 2, md: 3 } }}
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {intl.formatMessage({ defaultMessage: 'Swap' })}
            <GasPopover />
          </Stack>
        }
      >
        <Box
          sx={{
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            position: 'relative',
          }}
        >
          <TokenInput
            amount={amountIn}
            onAmountChange={(val) => {
              setSwapState(
                produce((draft) => {
                  draft.amountIn = val;
                }),
              );
            }}
            balance={balTokenIn?.value}
            isBalanceLoading={isBalTokenInLoading}
            token={tokenIn}
            onTokenClick={() => {
              setTokenModal('tokenIn');
            }}
            tokenPriceUsd={prices?.[tokenIn.symbol]}
            isPriceLoading={isPriceLoading}
            isConnected={isConnected}
            sx={{
              backgroundColor: 'grey.900',
              padding: 2.875,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              borderEndStartRadius: 0,
              borderEndEndRadius: 0,
              '&:hover, &:focus-within': {
                borderColor: 'transparent',
                borderStartStartRadius: (theme) => theme.shape.borderRadius,
                borderStartEndRadius: (theme) => theme.shape.borderRadius,
              },
              '&:hover': {
                background: (theme) =>
                  `linear-gradient(${theme.palette.grey[900]}, ${
                    theme.palette.grey[900]
                  }) padding-box,
                    linear-gradient(90deg, ${alpha(
                      theme.palette.primary.main,
                      0.4,
                    )} 0%, ${alpha(
                      theme.palette.primary.dark,
                      0.4,
                    )} 100%) border-box;`,
              },
              '&:focus-within': {
                background: (theme) =>
                  `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box,
                   linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%) border-box;`,
              },
            }}
          />
          <TokenInput
            amount={amountOut}
            balance={balTokenOut?.value}
            isBalanceLoading={isBalTokenOutLoading}
            disableMaxClick
            token={tokenOut}
            onTokenClick={() => {
              setTokenModal('tokenOut');
            }}
            tokenPriceUsd={prices?.[tokenOut.symbol]}
            isPriceLoading={isPriceLoading}
            inputProps={{ readOnly: true }}
            isConnected={isConnected}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderTop: 0,
              borderRadius: 1,
              borderStartStartRadius: 0,
              borderStartEndRadius: 0,
              backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.2),
              padding: 2.875,
            }}
          />
          <SwapButton onClick={handleExchangeTokens} />
        </Box>
        <SwapRoute routes={[]} isLoading={false} />
      </Card>
      <TokenSelectModal
        open={!isNilOrEmpty(tokenModal)}
        onClose={handleCloseSelectionModal}
        tokens={swapTokens}
        onSelectToken={handleSelectToken}
        selectedTokenSymbol={
          tokenModal === 'tokenIn' ? tokenIn.symbol : tokenOut.symbol
        }
      />
    </>
  );
}

function SwapButton(props: IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: { md: '3rem', xs: '2rem' },
        height: { md: '3rem', xs: '2rem' },
        margin: 'auto',
        zIndex: 2,
        fill: (theme) => theme.palette.background.paper,
        strokeWidth: (theme) => theme.typography.pxToRem(2),
        stroke: (theme) => theme.palette.grey[700],
        backgroundColor: (theme) => theme.palette.divider,
        '& img': {
          transition: (theme) => theme.transitions.create('transform'),
        },
        '&:hover': {
          backgroundColor: (theme) => theme.palette.background.default,
          '& img': {
            transform: 'rotate(-180deg)',
          },
        },
        ...props?.sx,
      }}
    >
      <Box
        component="img"
        src="https://app.oeth.com/images/splitarrow.svg"
        sx={{
          height: { md: 'auto', xs: '1.25rem' },
        }}
      />
    </IconButton>
  );
}
