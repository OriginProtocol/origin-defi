import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  ErrorBoundary,
  ErrorCard,
  LoadingLabel,
  NotificationSnack,
  SeverityIcon,
  TokenInput2,
} from '@origin/shared/components';
import { FaArrowDownRegular } from '@origin/shared/icons';
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
  useHandleTokenChange,
  useHandleTokenFlip,
  usePushActivity,
  usePushNotification,
  usePushNotificationForActivity,
  useSlippage,
  useSwapperPrices,
  useSwapRouteAllowance,
  useSwapState,
  useTokenOptions,
  useUpdateActivity,
  useWatchBalances,
} from '@origin/shared/providers';
import {
  formatError,
  isNilOrEmpty,
  subtractSlippage,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { SwapRoute } from './SwapRoute';
import { TokenSelectModal } from './TokenSelectModal';

import type { ButtonProps, IconButtonProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { SwapState, TokenSource } from '@origin/shared/providers';

export type SwapperProps = Pick<
  SwapState,
  'swapActions' | 'swapRoutes' | 'trackEvent'
> & {
  onError?: (error: Error) => void;
  buttonsProps?: ButtonProps;
} & Omit<StackProps, 'onError'>;

export const Swapper = ({
  swapActions,
  swapRoutes,
  trackEvent,
  ...rest
}: SwapperProps) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const pushNotificationForActivity = usePushNotificationForActivity();
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
          type: 'approval',
          status: 'pending',
          tokenIdIn: state.tokenIn.id,
          amountIn: state.amountIn,
        });

        return activity.id;
      }}
      onApproveSuccess={(state) => {
        const { trackId } = state;
        const activity = updateActivity({
          id: trackId,
          status: 'success',
        });
        pushNotificationForActivity(activity);
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
        const activity = updateActivity({
          id: trackId,
          status: 'error',
          error: formatError(error),
        });
        pushNotificationForActivity(activity);
      }}
      onSwapStart={(state) => {
        const activity = pushActivity({
          type: 'swap',
          status: 'pending',
          tokenIdIn: state.tokenIn.id,
          tokenIdOut: state.tokenOut.id,
          amountIn: state.amountIn,
          amountOut: state.amountOut,
        });

        return activity.id;
      }}
      onSwapSuccess={(state) => {
        const { trackId } = state;
        const activity = updateActivity({ id: trackId, status: 'success' });
        pushNotificationForActivity(activity);
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
        const activity = updateActivity({
          id: trackId,
          status: 'error',
          error: formatError(error),
        });
        pushNotificationForActivity(activity);
      }}
    >
      <SwapperWrapped {...rest} />
    </SwapProvider>
  );
};

function SwapperWrapped({
  onError,
  buttonsProps,
  ...rest
}: Omit<SwapperProps, 'swapActions' | 'swapRoutes' | 'trackEvent'>) {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { value: slippage } = useSlippage();
  const { isConnected } = useAccount();
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
  const { data: prices, isLoading: isPriceLoading } = useSwapperPrices();
  const { data: allowance } = useSwapRouteAllowance(selectedSwapRoute);
  const { data: balances, isLoading: isBalancesLoading } = useWatchBalances({
    tokens: [tokenIn, tokenOut],
  });
  const handleAmountInChange = useHandleAmountInChange();
  const handleTokenChange = useHandleTokenChange();
  const handleTokenFlip = useHandleTokenFlip();
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
    !isBalancesLoading &&
    (balances?.[tokenIn.id] ?? 0n) >= amountIn &&
    !isNilOrEmpty(selectedSwapRoute) &&
    (selectedSwapRoute?.allowanceAmount ?? 0n) < amountIn &&
    (allowance ?? 0n) < amountIn;
  const swapButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > (balances?.[tokenIn.id] ?? 0n)
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
    amountIn > (balances?.[tokenIn.id] ?? 0n);
  const swapButtonDisabled =
    needsApproval ||
    isNilOrEmpty(selectedSwapRoute) ||
    isBalancesLoading ||
    isSwapRoutesLoading ||
    isSwapLoading ||
    isSwapWaitingForSignature ||
    amountIn > (balances?.[tokenIn.id] ?? 0n) ||
    amountIn === 0n;

  return (
    <Stack spacing={3} {...rest}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
        <Card>
          <CardHeader
            title={intl.formatMessage({ defaultMessage: 'Swap' })}
            action={<SettingsButton />}
          />
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <TokenInput2
              amount={amountIn}
              decimals={tokenIn.decimals}
              onAmountChange={handleAmountInChange}
              balance={balances?.[tokenIn.id] ?? 0n}
              isBalanceLoading={isBalancesLoading}
              isNativeCurrency={isNativeCurrency(tokenIn)}
              token={tokenIn}
              onTokenClick={() => {
                setTokenSource('tokenIn');
              }}
              tokenPriceUsd={prices?.[getTokenPriceKey(tokenIn)]}
              isPriceLoading={isPriceLoading}
              isAmountDisabled={amountInInputDisabled}
              sx={{
                p: 3,
                borderTopLeftRadius: (theme) => theme.shape.borderRadius,
                borderTopRightRadius: (theme) => theme.shape.borderRadius,
                backgroundColor: 'background.default',
              }}
            />
            <TokenInput2
              readOnly
              amount={amountOut}
              decimals={tokenOut.decimals}
              balance={balances?.[tokenOut.id] ?? 0n}
              isAmountLoading={isSwapRoutesLoading}
              isBalanceLoading={isBalancesLoading}
              isNativeCurrency={isNativeCurrency(tokenOut)}
              token={tokenOut}
              onTokenClick={() => {
                setTokenSource('tokenOut');
              }}
              tokenPriceUsd={prices?.[getTokenPriceKey(tokenOut)]}
              isPriceLoading={isSwapRoutesLoading || isPriceLoading}
              hideMaxButton
              sx={{
                p: 3,
                borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
                borderBottomRightRadius: (theme) => theme.shape.borderRadius,
                backgroundColor: 'background.highlight',
              }}
            />
            <ArrowButton onClick={handleTokenFlip} />
          </Box>
          <CardContent>
            <SwapRoute
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            />
            <Collapse in={amountOut > 0n}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                pb={1}
              >
                <Typography color="text.secondary">
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
                  <LoadingLabel isLoading={isSwapRoutesLoading} sWidth={60}>
                    {formatAmount(
                      subtractSlippage(amountOut, tokenOut.decimals, slippage),
                    )}
                  </LoadingLabel>
                  <Typography>{tokenOut.symbol}</Typography>
                </Stack>
              </Stack>
            </Collapse>
            <Collapse in={needsApproval} sx={{ mt: needsApproval ? 1.5 : 0 }}>
              <Button
                fullWidth
                {...buttonsProps}
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
              {...buttonsProps}
              disabled={swapButtonDisabled}
              onClick={handleSwap}
              sx={{ mt: 1.5, ...buttonsProps?.sx }}
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

function ArrowButton(props: IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: { md: 48, xs: 36 },
        height: { md: 48, xs: 36 },
        margin: 'auto',
        zIndex: 2,
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        svg: {
          transition: (theme) => theme.transitions.create('transform'),
        },
        '&:hover': {
          svg: {
            transform: 'rotate(-180deg)',
          },
        },
        ...props?.sx,
      }}
    >
      <FaArrowDownRegular
        sx={{
          width: { md: 18, xs: 16 },
          height: { md: 18, xs: 16 },
        }}
      />
    </IconButton>
  );
}
