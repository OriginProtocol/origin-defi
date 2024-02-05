import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
} from '@mui/material';
import {
  ErrorBoundary,
  ErrorCard,
  LoadingLabel,
} from '@origin/shared/components';
import { ArrowDown } from '@origin/shared/icons';
import {
  ConnectedButton,
  SwapProvider,
  TokenSelectModal,
  useFormat,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  useHandleTokenChange,
  usePrices,
  useSlippage,
  useSwapRouteAllowance,
  useSwapState,
  useTokenOptions,
} from '@origin/shared/providers';
import {
  composeContexts,
  isNilOrEmpty,
  subtractSlippage,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { mainnet, useAccount, useBalance, useNetwork } from 'wagmi';

import { TokenInput } from './TokenInput';

import type { BoxProps, StackProps } from '@mui/material';
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
    [[SwapProvider, { swapActions, swapRoutes, trackEvent }]],
    <SwapperWrapped {...rest} />,
  );

function SwapperWrapped({
  onError,
  ...rest
}: Omit<SwapperProps, 'swapActions' | 'swapRoutes' | 'trackEvent'>) {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { value: slippage } = useSlippage();
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
  const { data: prices, isLoading: isPriceLoading } = usePrices();
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
            title={
              <Stack direction="row" alignItems="center">
                <Typography>
                  {intl.formatMessage({ defaultMessage: 'Restake LST' })}
                </Typography>
              </Stack>
            }
          />
          <CardContent>
            <Box position="relative">
              <ArrowButton />
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
                tokenPriceUsd={prices?.[tokenIn.symbol]}
                isPriceLoading={isPriceLoading}
                isConnected={isConnected}
                isAmountDisabled={amountInInputDisabled}
                inputProps={{ sx: tokenInputStyles }}
                sx={{
                  paddingBlock: 2.5,
                  paddingBlockStart: 2.625,
                  paddingInline: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderTopLeftRadius: (theme) => theme.shape.borderRadius,
                  borderTopRightRadius: (theme) => theme.shape.borderRadius,
                  borderBottomColor: 'transparent',
                }}
              />
              <TokenInput
                amount={amountOut}
                decimals={tokenOut.decimals}
                balance={balTokenOut?.value}
                isAmountLoading={isSwapRoutesLoading}
                isBalanceLoading={isBalTokenOutLoading}
                token={tokenOut}
                onTokenClick={() => {
                  setTokenSource('tokenOut');
                }}
                isNativeCurrency={
                  tokenOut.symbol ===
                  (chain?.nativeCurrency.symbol ??
                    mainnet.nativeCurrency.symbol)
                }
                tokenPriceUsd={prices?.[tokenOut.symbol]}
                isPriceLoading={isSwapRoutesLoading || isPriceLoading}
                isConnected={isConnected}
                hideMaxButton
                inputProps={{ readOnly: true, sx: tokenInputStyles }}
                sx={{
                  paddingBlock: 2.5,
                  paddingBlockStart: 2.625,
                  paddingInline: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
                  borderBottomRightRadius: (theme) => theme.shape.borderRadius,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[400], 0.2),
                }}
              />
            </Box>
            <Collapse in={amountOut > 0n}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                pb={1}
              >
                <Typography variant="body2" color="text.secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage:
                        'Minimum received with {slippage} slippage:',
                    },
                    {
                      slippage: intl.formatNumber(slippage, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                    },
                  )}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <LoadingLabel
                    variant="body2"
                    isLoading={isSwapRoutesLoading}
                    sWidth={60}
                  >
                    {formatAmount(
                      subtractSlippage(amountOut, tokenOut.decimals, slippage),
                    )}
                  </LoadingLabel>
                  <Typography variant="body2">{tokenOut.symbol}</Typography>
                </Stack>
              </Stack>
            </Collapse>
            <Collapse in={needsApproval} sx={{ mt: needsApproval ? 1.5 : 0 }}>
              <Button
                fullWidth
                disabled={approveButtonDisabled}
                onClick={handleApprove}
              >
                {isSwapRoutesLoading ? (
                  <CircularProgress size={32} color="inherit" />
                ) : isApprovalWaitingForSignature ? (
                  intl.formatMessage({
                    defaultMessage: 'Waiting for signature',
                  })
                ) : isApprovalLoading ? (
                  intl.formatMessage({ defaultMessage: 'Processing Approval' })
                ) : (
                  intl.formatMessage({ defaultMessage: 'Approve' })
                )}
              </Button>
            </Collapse>
            <ConnectedButton
              fullWidth
              disabled={swapButtonDisabled}
              onClick={handleSwap}
              sx={{ mt: 1.5 }}
            >
              {isSwapRoutesLoading ? (
                <CircularProgress size={32} color="inherit" />
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

function ArrowButton(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        width: { md: 40, xs: 36 },
        height: { md: 40, xs: 36 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        borderRadius: '50%',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <ArrowDown
        sx={{
          width: { md: 20, xs: 18 },
          height: { md: 20, xs: 18 },
        }}
      />
    </Box>
  );
}

const tokenInputStyles = {
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: 0,
  paddingBlock: 0,
  paddingInline: 0,
  borderImageWidth: 0,
  boxSizing: 'border-box',
  '& .MuiInputBase-input': {
    padding: 0,
    boxSizing: 'border-box',
    fontStyle: 'normal',
    fontFamily: 'Sailec, sans-serif',
    fontSize: 24,
    lineHeight: 1.5,
    fontWeight: 700,
    '&::placeholder': {
      color: 'text.secondary',
      opacity: 1,
    },
  },
};
