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
  TokenInput,
} from '@origin/shared/components';
import { ArrowDown, FaGearComplexRegular } from '@origin/shared/icons';
import {
  formatError,
  isNilOrEmpty,
  subtractSlippage,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import {
  ApprovalNotification,
  SwapNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../../activities';
import { useFormat } from '../../intl';
import { usePushNotification } from '../../notifications';
import { getTokenPriceKey } from '../../prices';
import { useSlippage } from '../../slippage';
import {
  ConnectedButton,
  useIsNativeCurrency,
  useWatchBalance,
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
import { SettingsPopover } from './SettingsPopover';
import { SwapRoute } from './SwapRoute';
import { TokenSelectModal } from './TokenSelectModal';

import type { ButtonProps, IconButtonProps, StackProps } from '@mui/material';
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
  const { formatAmount } = useFormat();
  const { value: slippage } = useSlippage();
  const { isConnected } = useAccount();
  const [tokenSource, setTokenSource] = useState<TokenSource | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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
  const { data: balTokenIn, isLoading: isBalTokenInLoading } = useWatchBalance({
    token: tokenIn.address,
  });
  const { data: balTokenOut, isLoading: isBalTokenOutLoading } =
    useWatchBalance({
      token: tokenOut.address,
    });
  const isNativeCurrency = useIsNativeCurrency();
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
    setAnchorEl(evt.currentTarget);
    trackEvent?.({ name: 'open_settings' });
  };

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
          : '';
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
            title={
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {intl.formatMessage({ defaultMessage: 'Swap' })}
                </Typography>
                <IconButton
                  onClick={handleSettingClick}
                  sx={{
                    position: 'relative',
                    right: (theme) => theme.spacing(-0.75),
                    svg: { width: 16, height: 16 },
                  }}
                >
                  <FaGearComplexRegular />
                </IconButton>
                <SettingsPopover
                  open={!!anchorEl}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                />
              </Stack>
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
                balance={balTokenIn as unknown as bigint}
                isBalanceLoading={isBalTokenInLoading}
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
                sx={{
                  paddingBlock: 2.5,
                  paddingBlockStart: 2.625,
                  paddingInline: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderTopLeftRadius: (theme) => theme.shape.borderRadius,
                  borderTopRightRadius: (theme) => theme.shape.borderRadius,
                  backgroundColor: 'grey.900',
                  borderBottomColor: 'transparent',
                  '&:hover, &:focus-within': {
                    borderColor: 'transparent',
                  },
                  '&:hover': {
                    background: (theme) =>
                      `linear-gradient(${theme.palette.grey[900]}, ${
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
                    background: (theme) =>
                      `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
                  },
                }}
              />
              <TokenInput
                amount={amountOut}
                decimals={tokenOut.decimals}
                balance={balTokenOut as unknown as bigint}
                isAmountLoading={isSwapRoutesLoading}
                isBalanceLoading={isBalTokenOutLoading}
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
              <ArrowButton onClick={handleTokenFlip} />
            </Box>
            <SwapRoute
              sx={{
                mt: 1.5,
                borderRadius: 1,
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
        width: { md: 40, xs: 36 },
        height: { md: 40, xs: 36 },
        margin: 'auto',
        zIndex: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
        border: '1px solid',
        borderColor: 'divider',
        svg: {
          transition: (theme) => theme.transitions.create('transform'),
        },
        '&:hover': {
          backgroundColor: (theme) => theme.palette.grey[900],
          svg: {
            transform: 'rotate(-180deg)',
          },
        },
        ...props?.sx,
      }}
    >
      <ArrowDown
        sx={{
          width: { md: 20, xs: 18 },
          height: { md: 20, xs: 18 },
        }}
      />
    </IconButton>
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
