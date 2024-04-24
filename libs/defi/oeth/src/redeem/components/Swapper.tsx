import {
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
  NotificationSnack,
  SeverityIcon,
  TokenIcon,
  TokenInput2,
} from '@origin/shared/components';
import {
  ApprovalNotification,
  ConnectedButton,
  getTokenPriceKey,
  isNativeCurrency,
  SettingsButton,
  SwapNotification,
  SwapProvider,
  useDeleteActivity,
  useFormat,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  usePushActivity,
  usePushNotification,
  useSwapperPrices,
  useSwapRouteAllowance,
  useSwapState,
  useUpdateActivity,
  useWatchBalance,
} from '@origin/shared/providers';
import { formatError, isNilOrEmpty } from '@origin/shared/utils';
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
        const { trackId } = state;
        updateActivity({ ...state, id: trackId, status: 'success' });
        pushNotification({
          content: <ApprovalNotification {...state} status="success" />,
        });
      }}
      onApproveReject={({ trackId }) => {
        deleteActivity(trackId);
        pushNotification({
          content: (
            <NotificationSnack
              icon={<SeverityIcon severity="warning" />}
              title={intl.formatMessage({
                defaultMessage: 'Operation Cancelled',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'User rejected operation',
              })}
            />
          ),
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
          content: (
            <ApprovalNotification
              {...state}
              status="error"
              error={formatError(error)}
            />
          ),
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
        const { trackId } = state;
        updateActivity({ ...state, id: trackId, status: 'success' });
        pushNotification({
          content: <SwapNotification {...state} status="success" />,
        });
      }}
      onSwapReject={({ trackId }) => {
        deleteActivity(trackId);
        pushNotification({
          content: (
            <NotificationSnack
              icon={<SeverityIcon severity="warning" />}
              title={intl.formatMessage({
                defaultMessage: 'Operation Cancelled',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'User rejected operation',
              })}
            />
          ),
        });
      }}
      onSwapFailure={(state) => {
        const { error, trackId } = state;
        updateActivity({
          ...state,
          id: trackId,
          status: 'error',
          error: formatError(error),
        });
        pushNotification({
          content: (
            <SwapNotification
              {...state}
              status="error"
              error={formatError(error)}
            />
          ),
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
            action={<SettingsButton />}
          />
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'Unstake amount' })}
            </Typography>
            <TokenInput2
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
                p: 3,
                borderTopLeftRadius: (theme) => theme.shape.borderRadius,
                borderTopRightRadius: (theme) => theme.shape.borderRadius,
                backgroundColor: 'background.default',
              }}
            />
            <Typography pt={1.5}>
              {intl.formatMessage({ defaultMessage: 'Route' })}
            </Typography>
            <Stack direction="row" spacing={2}>
              <RedeemActionCard action="redeem-vault" sx={{ width: 1 }} />
              <RedeemActionCard action="swap-curve" sx={{ width: 1 }} />
            </Stack>
            <Typography pt={1.5}>
              {intl.formatMessage({ defaultMessage: 'Receive amount' })}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ backgroundColor: 'grey.900', p: 2 }}
            >
              <Stack spacing={1}>
                <LoadingLabel
                  isLoading={isSwapRoutesLoading}
                  sWidth={60}
                  sx={{
                    fontSize: 24,
                    lineHeight: 1.5,
                    fontWeight: 700,
                    color: amountIn === 0n ? 'text.secondary' : 'text.primary',
                  }}
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
                <TokenIcon token={tokenOut} sx={{ fontSize: 28 }} />
                <Typography fontWeight="medium" fontSize={16}>
                  {tokenOut.symbol}
                </Typography>
              </Stack>
            </Stack>
            <Collapse in={needsApproval} sx={{ mt: needsApproval ? 1.5 : 0 }}>
              <Button
                fullWidth
                variant="action"
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
