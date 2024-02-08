import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  ErrorBoundary,
  ErrorCard,
  LoadingLabel,
  TokenButton,
} from '@origin/shared/components';
import {
  ConnectedButton,
  SwapProvider,
  TokenSelectModal,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  useHandleTokenChange,
  useSwapRouteAllowance,
  useSwapState,
  useTokenOptions,
} from '@origin/shared/providers';
import {
  composeContexts,
  formatAmount,
  isNilOrEmpty,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { mainnet, useAccount, useBalance, useNetwork } from 'wagmi';

import { useAssetPrice } from '../hooks';
import { TokenInput } from './TokenInput';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { SwapState, TokenSource } from '@origin/shared/providers';

export type SwapperProps = Pick<
  SwapState,
  'swapActions' | 'swapRoutes' | 'trackEvent'
> & {
  onError?: (error: Error) => void;
} & Omit<StackProps, 'onError'>;

export const Swapper = ({
  swapActions,
  swapRoutes,
  trackEvent,
  ...rest
}: SwapperProps) =>
  composeContexts(
    [
      [
        SwapProvider,
        { swapActions, swapRoutes, trackEvent, debounceTime: 400 },
      ],
    ],
    <SwapperWrapped {...rest} />,
  );

function SwapperWrapped({
  onError,
  ...rest
}: Omit<SwapperProps, 'swapActions' | 'swapRoutes' | 'trackEvent'>) {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [tokenSource, setTokenSource] = useState<TokenSource | null>(null);
  const [
    {
      amountIn,
      amountOut,
      tokenIn,
      tokenOut,
      selectedSwapRoute,
      isSwapLoading,
      isSwapWaitingForSignature,
      isSwapRoutesLoading,
      isApprovalLoading,
      isApprovalWaitingForSignature,
      swapActions,
    },
  ] = useSwapState();
  const { tokensIn, tokensOut } = useTokenOptions();
  const { data: allowance } = useSwapRouteAllowance(selectedSwapRoute);
  const { data: balTokenIn, isLoading: isBalTokenInLoading } = useBalance({
    address,
    token: tokenIn.address,
    watch: true,
    scopeKey: 'swap_balance',
  });
  const { data: balTokenOut, isLoading: isBalTokenOutLoading } = useBalance({
    address,
    token: tokenOut.address,
    watch: true,
    scopeKey: 'swap_balance',
  });
  const { data: assetPrice, isLoading: isAssetPriceLoading } =
    useAssetPrice(tokenIn);
  const handleAmountInChange = useHandleAmountInChange();
  const handleTokenChange = useHandleTokenChange();
  const handleApprove = useHandleApprove();
  const handleSwap = useHandleSwap();

  const handleCloseSelectionModal = () => {
    setTokenSource(null);
  };

  const handleSelectToken = (value: Token) => {
    handleTokenChange(tokenSource, value);
  };

  const needsApproval =
    isConnected &&
    amountIn > 0n &&
    !isBalTokenInLoading &&
    balTokenIn.value >= amountIn &&
    !isNilOrEmpty(selectedSwapRoute) &&
    selectedSwapRoute?.allowanceAmount < amountIn &&
    allowance < amountIn;
  const swapButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > balTokenIn?.value
        ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
        : !isNilOrEmpty(selectedSwapRoute)
          ? intl.formatMessage(
              swapActions[selectedSwapRoute.action].buttonLabel,
            )
          : '';
  const amountInInputDisabled = isSwapLoading || isApprovalLoading;
  const approveButtonDisabled =
    isNilOrEmpty(selectedSwapRoute) ||
    isSwapRoutesLoading ||
    isApprovalLoading ||
    isApprovalWaitingForSignature ||
    amountIn > balTokenIn?.value;
  const swapButtonDisabled =
    needsApproval ||
    isNilOrEmpty(selectedSwapRoute) ||
    isBalTokenInLoading ||
    isSwapRoutesLoading ||
    isSwapLoading ||
    isSwapWaitingForSignature ||
    amountIn > balTokenIn?.value ||
    amountIn === 0n;

  return (
    <Stack spacing={3} {...rest}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
        <Card>
          <CardHeader
            title={intl.formatMessage({ defaultMessage: 'Restake LST' })}
          />
          <Box>
            <CardContent sx={{ backgroundColor: '#fff' }}>
              <TokenInput
                amount={amountIn}
                decimals={tokenIn.decimals}
                onAmountChange={handleAmountInChange}
                balance={balTokenIn?.value}
                isBalanceLoading={isBalTokenInLoading}
                token={tokenIn}
                onTokenClick={() => {
                  setTokenSource('tokenIn');
                }}
                isNativeCurrency={
                  tokenIn.symbol ===
                  (chain?.nativeCurrency.symbol ??
                    mainnet.nativeCurrency.symbol)
                }
                isConnected={isConnected}
                isAmountDisabled={amountInInputDisabled}
                inputProps={{ sx: tokenInputStyles }}
              />
            </CardContent>
            <Divider />
            <CardContent>
              <Stack spacing={2.5}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <TokenButton token={tokenOut} isDisabled />
                  <LoadingLabel isLoading={isBalTokenOutLoading} sWidth={80}>
                    {intl.formatMessage(
                      { defaultMessage: 'Balance: {balance}' },
                      { balance: formatAmount(balTokenOut?.value, 18) },
                    )}
                  </LoadingLabel>
                </Stack>
                <LoadingLabel
                  isLoading={isSwapRoutesLoading}
                  sWidth={100}
                  sx={{
                    fontSize: 24,
                    lineHeight: 1.5,
                    fontWeight: 700,
                    color: amountOut === 0n ? 'text.secondary' : 'text.primary',
                  }}
                >
                  {intl.formatNumber(
                    +formatUnits(amountOut, tokenOut.decimals),
                    { maximumFractionDigits: 4, roundingMode: 'floor' },
                  )}
                </LoadingLabel>
              </Stack>
            </CardContent>
          </Box>
          <Divider />
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography>
                {intl.formatMessage({ defaultMessage: 'Exchange rate:' })}
              </Typography>
              <LoadingLabel isLoading={isAssetPriceLoading} sWidth={60}>
                {intl.formatMessage(
                  {
                    defaultMessage: '{rate} {token} = 1 primeETH',
                  },
                  {
                    rate: intl.formatNumber(assetPrice ?? 0 / 100, {
                      roundingMode: 'floor',
                      maximumFractionDigits: 4,
                      minimumFractionDigits: 4,
                    }),
                    token: tokenIn.symbol,
                  },
                )}
              </LoadingLabel>
            </Stack>
          </CardContent>
          <Divider />
          <Collapse in={needsApproval}>
            <Box sx={{ backgroundColor: '#fff', px: 3, pt: 3, pb: 0 }}>
              <Button
                fullWidth
                disabled={approveButtonDisabled}
                onClick={handleApprove}
                sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
              >
                {isSwapRoutesLoading ? (
                  <CircularProgress size={28} color="inherit" />
                ) : isApprovalWaitingForSignature ? (
                  intl.formatMessage({
                    defaultMessage: 'Waiting for signature',
                  })
                ) : isApprovalLoading ? (
                  intl.formatMessage({ defaultMessage: 'Processing Approval' })
                ) : (
                  intl.formatMessage(
                    { defaultMessage: 'Approve {token}' },
                    { token: tokenIn.symbol },
                  )
                )}
              </Button>
            </Box>
          </Collapse>
          <CardContent sx={{ backgroundColor: '#fff' }}>
            <ConnectedButton
              fullWidth
              disabled={swapButtonDisabled}
              onClick={handleSwap}
              sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
            >
              {amountIn > balTokenIn?.value ? (
                swapButtonLabel
              ) : isSwapRoutesLoading ? (
                <CircularProgress size={28} color="inherit" />
              ) : isSwapWaitingForSignature ? (
                intl.formatMessage({ defaultMessage: 'Waiting for signature' })
              ) : isSwapLoading ? (
                intl.formatMessage({ defaultMessage: 'Processing Transaction' })
              ) : (
                swapButtonLabel
              )}
            </ConnectedButton>
          </CardContent>
        </Card>
        <TokenSelectModal
          open={!isNilOrEmpty(tokenSource)}
          onClose={handleCloseSelectionModal}
          tokens={tokenSource === 'tokenIn' ? tokensIn : tokensOut}
          onSelectToken={handleSelectToken}
        />
      </ErrorBoundary>
    </Stack>
  );
}

const tokenInputStyles = {
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: 0,
  p: 0,
  '& .MuiInputBase-input': {
    p: 0,
    boxSizing: 'border-box',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 1.5,
    fontWeight: 700,
    '&::placeholder': {
      color: 'text.secondary',
      opacity: 1,
    },
  },
};
