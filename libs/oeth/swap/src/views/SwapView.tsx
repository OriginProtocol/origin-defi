import { useState } from 'react';

import { Box, IconButton, Stack } from '@mui/material';
import { Card, TokenInput } from '@origin/shared/components';
import { TokenSelectModal, usePrices } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { produce } from 'immer';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { GasPopover } from '../components/GasPopover';
import { swapTokens } from '../constants';
import { SwapProvider, useSwapState } from '../state';

import type { IconButtonProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

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
          />
          <SwapButton onClick={handleExchangeTokens} />
        </Box>
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

export const SwapView = () => (
  <SwapProvider>
    <SwapViewWrapped />
  </SwapProvider>
);

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
        margin: 'auto',
        zIndex: 2,
        width: { md: '3rem', xs: '2rem' },
        height: { md: '3rem', xs: '2rem' },
        fill: (theme) => theme.palette.background.paper,
        strokeWidth: (theme) => theme.typography.pxToRem(2),
        stroke: (theme) => theme.palette.grey[700],
        transform: { xs: 'translateY(-20%)', md: 'translateY(-8%)' },
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
