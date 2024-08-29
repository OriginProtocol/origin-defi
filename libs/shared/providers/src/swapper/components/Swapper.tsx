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
  ArrowButton,
  ErrorBoundary,
  ErrorCard,
  LoadingLabel,
  NotificationSnack,
  SeverityIcon,
  TokenInput,
} from '@origin/shared/components';
import {
  formatError,
  getFormatPrecision,
  isNilOrEmpty,
  subPercentage,
} from '@origin/shared/utils';
import { format } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import {
  ApprovalNotification,
  SwapNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../../activities';
import { usePushNotification } from '../../notifications';
import { getTokenPriceKey } from '../../prices';
import { SettingsButton } from '../../settings';
import { useSlippage } from '../../slippage';
import {
  ConnectedButton,
  isNativeCurrency,
  useWatchBalances,
} from '../../wagmi';
import {
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  useHandleTokenChange,
  useHandleTokenFlip,
  useSwapperPrices,
  useSwapRouteAllowance,
  useTokenOptions,
} from '../hooks';
import { SwapProvider, useSwapState } from '../state';
import { SwapRoute } from './SwapRoute';
import { TokenSelectModal } from './TokenSelectModal';

import type { ButtonProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { MouseEvent } from 'react';

import type { SwapState } from '../types';
import type { TokenSource } from '../types';

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
          type: 'approval',
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
          type: 'swap',
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
  buttonsProps,
  ...rest
}: Omit<SwapperProps, 'swapActions' | 'swapRoutes' | 'trackEvent'>) {
  const intl = useIntl();
  const { value: slippage } = useSlippage();
  const { isConnected, chain: currentChain } = useAccount();
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
      trackEvent,
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

  const handleSettingClick = (evt: MouseEvent<HTMLButtonElement>) => {
    trackEvent?.({ name: 'open_settings' });
  };

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );
  const needsApproval =
    isConnected &&
    currentChain?.id === tokenIn.chainId &&
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
            action={
              <SettingsButton
                onClick={handleSettingClick}
                popoverProps={{
                  formButtonProps: {
                    variant: 'outlined',
                    color: 'secondary',
                  },
                }}
              />
            }
          />
          <CardContent>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <TokenInput
                amount={amountIn}
                decimals={tokenIn.decimals}
                onAmountChange={handleAmountInChange}
                balance={balances?.[tokenIn.id] ?? 0n}
                isBalanceLoading={isBalancesLoading}
                token={tokenIn}
                onTokenClick={() => {
                  setTokenSource('tokenIn');
                }}
                isNativeCurrency={isNativeCurrency(tokenIn)}
                tokenPriceUsd={prices?.[getTokenPriceKey(tokenIn)]}
                isPriceLoading={isPriceLoading}
                isConnected={isConnected}
                isAmountDisabled={amountInInputDisabled}
                inputProps={{ sx: tokenInputStyles }}
                sx={(theme) => ({
                  paddingBlock: 2.5,
                  paddingBlockStart: 2.625,
                  paddingInline: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderTopLeftRadius: theme.shape.borderRadius,
                  borderTopRightRadius: theme.shape.borderRadius,
                  backgroundColor: 'grey.900',
                  borderBottomColor: 'transparent',
                  '&:hover, &:focus-within': {
                    borderColor: 'transparent',
                  },
                  '&:hover': {
                    background: `linear-gradient(${theme.palette.grey[900]}, ${
                      theme.palette.grey[900]
                    }) padding-box, linear-gradient(90deg, ${alpha(
                      theme.palette.primary.main,
                      0.4,
                    )} 0%, ${alpha(
                      theme.palette.primary.dark,
                      0.4,
                    )} 100%) border-box;`,
                  },
                  '&:focus-within': {
                    background: `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
                  },
                })}
              />
              <TokenInput
                amount={amountOut}
                decimals={tokenOut.decimals}
                balance={balances?.[tokenOut.id] ?? 0n}
                isAmountLoading={isSwapRoutesLoading}
                isBalanceLoading={isBalancesLoading}
                token={tokenOut}
                onTokenClick={() => {
                  setTokenSource('tokenOut');
                }}
                isNativeCurrency={isNativeCurrency(tokenOut)}
                tokenPriceUsd={prices?.[getTokenPriceKey(tokenOut)]}
                isPriceLoading={isSwapRoutesLoading || isPriceLoading}
                isConnected={isConnected}
                hideMaxButton
                inputProps={{ readOnly: true, sx: tokenInputStyles }}
                sx={(theme) => ({
                  paddingBlock: 2.5,
                  paddingBlockStart: 2.625,
                  paddingInline: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderBottomLeftRadius: theme.shape.borderRadius,
                  borderBottomRightRadius: theme.shape.borderRadius,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.grey[400], 0.2),
                })}
              />
              <ArrowButton onClick={handleTokenFlip} />
            </Box>
            <SwapRoute
              sx={(theme) => ({
                mt: 1.5,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
              })}
            />
            <Collapse in={amountOut > 0n}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pt: 2,
                  pb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
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
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  <LoadingLabel
                    variant="body2"
                    isLoading={isSwapRoutesLoading}
                    sWidth={60}
                  >
                    {format(minAmountOut, getFormatPrecision(minAmountOut))}
                  </LoadingLabel>
                  <Typography variant="body2">{tokenOut.symbol}</Typography>
                </Stack>
              </Stack>
            </Collapse>
            <Collapse
              in={needsApproval}
              sx={[
                needsApproval
                  ? {
                      mt: 1.5,
                    }
                  : {
                      mt: 0,
                    },
              ]}
            >
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
                  intl.formatMessage({
                    defaultMessage: 'Processing Approval',
                  })
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
  paddingBlock: 0,
  paddingInline: 0,
  borderImageWidth: 0,
  boxSizing: 'border-box',
  '& .MuiInputBase-input': {
    padding: 0,
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
