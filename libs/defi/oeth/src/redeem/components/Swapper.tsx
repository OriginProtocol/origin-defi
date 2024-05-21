import {
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
import { TokenButton, TokenInput } from '@origin/defi/shared';
import {
  ErrorBoundary,
  ErrorCard,
  LoadingLabel,
  SwapTokensIcon,
  TokenIcon,
} from '@origin/shared/components';
import {
  ConnectedButton,
  getTokenPriceKey,
  isNativeCurrency,
  SettingsButton,
  SwapProvider,
  useDeleteActivity,
  useFormat,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  usePushActivity,
  usePushNotification,
  useSlippage,
  useSwapperPrices,
  useSwapRouteAllowance,
  useSwapState,
  useUpdateActivity,
  useWatchBalance,
} from '@origin/shared/providers';
import {
  formatError,
  isNilOrEmpty,
  subtractPercentage,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { RedeemActionCard } from './RedeemActionCard';

import type { StackProps } from '@mui/material';
import type { SwapState } from '@origin/shared/providers';

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
}: SwapperProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();

  return (
    <SwapProvider
      swapActions={swapActions}
      swapRoutes={swapRoutes}
      trackEvent={trackEvent}
      onApproveStart={(state) => {
        const activity = pushActivity({
          ...state,
          type: 'redeem',
          status: 'pending',
        });

        return activity.id;
      }}
      onApproveSuccess={(state) => {
        const { trackId, tokenIn, txReceipt, amountIn } = state;
        updateActivity({ ...state, id: trackId, status: 'success' });
        pushNotification({
          icon: <TokenIcon token={state.tokenIn} />,
          title: intl.formatMessage({ defaultMessage: 'Approval successful' }),
          message: intl.formatMessage(
            {
              defaultMessage: '{amountIn} {symbolIn}',
            },
            {
              amountIn: formatAmount(amountIn),
              symbolIn: tokenIn?.symbol,
            },
          ),
          blockExplorerLinkProps: {
            hash: txReceipt.transactionHash,
          },
          severity: 'success',
        });
      }}
      onApproveReject={({ trackId }) => {
        deleteActivity(trackId);
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Approval cancelled' }),
          message: intl.formatMessage({
            defaultMessage: 'User rejected operation',
          }),
          severity: 'info',
        });
      }}
      onApproveFailure={(state) => {
        const { error, trackId } = state;
        updateActivity({
          ...state,
          id: trackId,
          status: 'success',
          error: formatError(error),
        });
        pushNotification({
          icon: <TokenIcon token={state.tokenIn} />,
          title: intl.formatMessage({
            defaultMessage: 'Error while approving',
          }),
          message: formatError(error),
          severity: 'error',
        });
      }}
      onSwapStart={(state) => {
        const activity = pushActivity({
          ...state,
          type: 'redeem',
          status: 'pending',
        });

        return activity.id;
      }}
      onSwapSuccess={(state) => {
        const { trackId, tokenIn, tokenOut, amountIn, amountOut, txReceipt } =
          state;
        updateActivity({ ...state, id: trackId, status: 'success' });
        pushNotification({
          icon: (
            <SwapTokensIcon tokenIn={tokenIn} tokenOut={tokenOut} size={36} />
          ),
          title: intl.formatMessage({ defaultMessage: 'Swap successful' }),
          message: intl.formatMessage(
            {
              defaultMessage:
                '{amountIn} {symbolIn} for {amountOut} {symbolOut}',
            },
            {
              amountIn: intl.formatNumber(
                +formatUnits(amountIn ?? 0n, tokenIn?.decimals ?? 18),
                { minimumFractionDigits: 0, maximumFractionDigits: 2 },
              ),
              symbolIn: tokenIn?.symbol,
              amountOut: intl.formatNumber(
                +formatUnits(amountOut ?? 0n, tokenOut?.decimals ?? 18),
                { minimumFractionDigits: 0, maximumFractionDigits: 2 },
              ),
              symbolOut: tokenOut?.symbol,
            },
          ),
          blockExplorerLinkProps: {
            hash: txReceipt.transactionHash,
          },
          severity: 'success',
        });
      }}
      onSwapReject={({ trackId }) => {
        deleteActivity(trackId);
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Swap cancelled' }),
          message: intl.formatMessage({
            defaultMessage: 'User rejected operation',
          }),
          severity: 'warning',
        });
      }}
      onSwapFailure={(state) => {
        const { error, trackId, tokenIn, tokenOut } = state;
        updateActivity({
          ...state,
          id: trackId,
          status: 'error',
          error: formatError(error),
        });
        pushNotification({
          icon: (
            <SwapTokensIcon tokenIn={tokenIn} tokenOut={tokenOut} size={36} />
          ),
          title: intl.formatMessage({
            defaultMessage: 'Error while swapping',
          }),
          message: formatError(error),
          severity: 'error',
        });
      }}
    >
      <SwapperWrapped {...rest} />
    </SwapProvider>
  );
};

function SwapperWrapped({
  onError,
  ...rest
}: Omit<SwapperProps, 'swapActions' | 'swapRoutes' | 'trackEvent'>) {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const { isConnected } = useAccount();
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
  const { value: slippage } = useSlippage();
  const { data: prices, isLoading: isPriceLoading } = useSwapperPrices();
  const { data: allowance } = useSwapRouteAllowance(selectedSwapRoute);
  const { data: balTokenIn, isLoading: isBalTokenInLoading } = useWatchBalance({
    token: tokenIn,
  });
  const handleAmountInChange = useHandleAmountInChange();
  const handleApprove = useHandleApprove();
  const handleSwap = useHandleSwap();

  const estimatedAmount = +formatUnits(
    selectedSwapRoute?.estimatedAmount ?? 0n,
    tokenOut.decimals,
  );
  const amountOutUsd =
    (prices?.[getTokenPriceKey(tokenOut)] ?? 1) * estimatedAmount;
  const needsApproval =
    isConnected &&
    amountIn > 0n &&
    !isBalTokenInLoading &&
    (balTokenIn as unknown as bigint) >= amountIn &&
    !isNilOrEmpty(selectedSwapRoute) &&
    (selectedSwapRoute?.allowanceAmount ?? 0n) < amountIn &&
    (allowance ?? 0n) < amountIn;
  const swapButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > (balTokenIn as unknown as bigint)
        ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
        : !isNilOrEmpty(selectedSwapRoute)
          ? intl.formatMessage(
              swapActions[selectedSwapRoute?.action ?? '']?.buttonLabel ?? {
                defaultMessage: 'Swap',
              },
            )
          : intl.formatMessage({ defaultMessage: 'No available route' });
  const amountInInputDisabled = isSwapLoading || isApprovalLoading;
  const approveButtonDisabled =
    isNilOrEmpty(selectedSwapRoute) ||
    isSwapRoutesLoading ||
    isApprovalLoading ||
    isApprovalWaitingForSignature ||
    amountIn > (balTokenIn as unknown as bigint);
  const swapButtonDisabled =
    needsApproval ||
    isNilOrEmpty(selectedSwapRoute) ||
    isBalTokenInLoading ||
    isSwapRoutesLoading ||
    isSwapLoading ||
    isSwapWaitingForSignature ||
    amountIn > (balTokenIn as unknown as bigint) ||
    amountIn === 0n;

  return (
    <Stack spacing={3} {...rest}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
        <Card>
          <CardHeader
            title={intl.formatMessage({ defaultMessage: 'Redeem' })}
            action={
              <SettingsButton
                sx={{ border: '1px solid', borderColor: 'divider' }}
              />
            }
          />
          <Divider />
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pb: 0 }}
          >
            <Typography fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Redeem amount' })}
            </Typography>
            <TokenInput
              amount={amountIn}
              decimals={tokenIn.decimals}
              onAmountChange={handleAmountInChange}
              balance={balTokenIn as unknown as bigint}
              isBalanceLoading={isBalTokenInLoading}
              isNativeCurrency={isNativeCurrency(tokenIn)}
              token={tokenIn}
              tokenPriceUsd={prices?.[getTokenPriceKey(tokenIn)]}
              isTokenClickDisabled
              isPriceLoading={isPriceLoading}
              isAmountDisabled={amountInInputDisabled}
              sx={{
                px: 3,
                py: 2,
                borderRadius: 3,
                backgroundColor: 'background.highlight',
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Typography fontWeight="medium" pt={1.5}>
              {intl.formatMessage({ defaultMessage: 'Route' })}
            </Typography>
            <Stack direction="row" spacing={2}>
              <RedeemActionCard action="redeem-vault" sx={{ width: 1 }} />
              <RedeemActionCard action="swap-curve" sx={{ width: 1 }} />
            </Stack>
            <Typography fontWeight="medium" pt={1.5}>
              {intl.formatMessage({ defaultMessage: 'Receive amount' })}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                backgroundColor: 'background.highlight',
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack spacing={1.5}>
                <LoadingLabel
                  isLoading={isSwapRoutesLoading}
                  sWidth={60}
                  variant="h6"
                  color={amountIn === 0n ? 'text.secondary' : 'text.primary'}
                >
                  {intl.formatNumber(
                    +formatUnits(amountOut, tokenOut.decimals),
                    {
                      roundingMode: 'floor',
                      maximumFractionDigits: 5,
                      minimumFractionDigits: 0,
                    },
                  )}
                </LoadingLabel>
                <LoadingLabel
                  isLoading={isSwapRoutesLoading}
                  sWidth={60}
                  color="text.secondary"
                >
                  {amountIn === 0n ? '$0.00' : formatCurrency(amountOutUsd)}
                </LoadingLabel>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TokenButton token={tokenOut} disabled />
              </Stack>
            </Stack>
            <Collapse in={amountOut > 0n}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                py={3}
                px={1}
              >
                <Typography color="text.secondary" fontWeight="medium">
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
                    isLoading={isSwapRoutesLoading}
                    sWidth={60}
                    fontWeight="medium"
                  >
                    {formatCurrency(subtractPercentage(amountOutUsd, slippage))}
                  </LoadingLabel>
                </Stack>
              </Stack>
            </Collapse>
          </CardContent>
          <CardContent sx={{ pt: 0 }}>
            <Collapse in={needsApproval}>
              <Button
                fullWidth
                variant="action"
                disabled={approveButtonDisabled}
                onClick={handleApprove}
                sx={{ mb: 1.5 }}
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
              variant="action"
              disabled={swapButtonDisabled}
              onClick={handleSwap}
              targetChainId={tokenIn.chainId}
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
      </ErrorBoundary>
    </Stack>
  );
}
