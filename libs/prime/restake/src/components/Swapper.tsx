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
import { BoostChip } from '@origin/prime/shared';
import {
  ErrorBoundary,
  ErrorCard,
  LoadingLabel,
  NotificationSnack,
  SeverityIcon,
  TokenIcon,
} from '@origin/shared/components';
import { FaChevronDownRegular } from '@origin/shared/icons';
import {
  ApprovalNotification,
  ConnectedButton,
  getAvailableRoutes,
  SwapNotification,
  SwapProvider,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  useHandleTokenChange,
  usePushNotification,
  useSwapRouteAllowance,
  useSwapState,
  useTokenOptions,
  useWatchBalance,
} from '@origin/shared/providers';
import { formatAmount, formatError, isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { useAssetPrice } from '../hooks';
import { TokenInput } from './TokenInput';
import { TokenSelectModal } from './TokenSelectModal';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type {
  SwapRoute,
  SwapState,
  TokenSource,
} from '@origin/shared/providers';

import type { Meta, RestakeAction } from '../types';

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

  return (
    <SwapProvider
      swapActions={swapActions}
      swapRoutes={swapRoutes}
      debounceTime={400}
      trackEvent={trackEvent}
      onApproveSuccess={(state) => {
        pushNotification({
          content: <ApprovalNotification {...state} status="success" />,
        });
      }}
      onApproveReject={() => {
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
        const { error } = state;
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
      onSwapSuccess={(state) => {
        pushNotification({
          content: <SwapNotification {...state} status="success" />,
        });
      }}
      onSwapFailure={(state) => {
        const { error } = state;
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
}: Omit<SwapperProps, 'swapActions' | 'swapRoutes'>) {
  const intl = useIntl();
  const { chain, isConnected } = useAccount();
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
      swapRoutes,
    },
  ] = useSwapState();
  const { tokensIn } = useTokenOptions<Meta>();
  const { data: allowance } = useSwapRouteAllowance(selectedSwapRoute);
  const { data: balTokenIn, isLoading: isBalTokenInLoading } = useWatchBalance({
    token: tokenIn.address,
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
    (balTokenIn as unknown as bigint) >= amountIn &&
    !isNilOrEmpty(selectedSwapRoute) &&
    (selectedSwapRoute?.allowanceAmount ?? 0n) < amountIn &&
    (allowance ?? 0n) < amountIn;
  const swapButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > (balTokenIn as unknown as bigint)
        ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
        : selectedSwapRoute?.action
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
  const availableRoute = getAvailableRoutes<RestakeAction, Meta>(
    swapRoutes as SwapRoute<RestakeAction, Meta>[],
    tokenIn,
    tokenOut,
  )[0];
  const route = intl.formatMessage(
    swapActions[availableRoute?.action]?.routeLabel ?? '',
  );
  const boost = availableRoute?.meta?.boost;

  return (
    <Stack spacing={3} {...rest}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
        <Card>
          <CardHeader
            title={intl.formatMessage({ defaultMessage: 'Restake LST' })}
          />
          <CardContent>
            <Typography pb={2} fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Select the asset' })}
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              fullWidth
              onClick={() => {
                setTokenSource('tokenIn');
              }}
              sx={{
                py: 1.5,
                borderRadius: 4,
                borderColor: 'divider',
                backgroundColor: 'common.white',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row" spacing={1}>
                <TokenIcon
                  symbol={tokenIn?.symbol}
                  sx={{ width: 34, height: 34 }}
                />
                <Typography fontSize={20}>{tokenIn?.symbol}</Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
              >
                {boost && <BoostChip boost={boost} />}
                <Box
                  sx={{
                    borderRadius: '50%',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    backgroundColor: 'background.paper',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FaChevronDownRegular sx={{ fontSize: 16 }} />
                </Box>
              </Stack>
            </Button>
            <Typography pt={4} pb={2} fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Enter amount' })}
            </Typography>
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
              isNativeCurrency={
                tokenIn.symbol ===
                (chain?.nativeCurrency.symbol ?? mainnet.nativeCurrency.symbol)
              }
              isConnected={isConnected}
              isAmountDisabled={amountInInputDisabled}
            />
          </CardContent>
          <Divider />
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>
                {intl.formatMessage({ defaultMessage: 'You will receive:' })}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <LoadingLabel
                  isLoading={isSwapRoutesLoading}
                  sWidth={60}
                  fontWeight="medium"
                  fontSize={16}
                >
                  {formatAmount(amountOut)}
                </LoadingLabel>
                <TokenIcon symbol={tokenOut.symbol} sx={{ fontSize: 20 }} />
                <Typography fontWeight="medium" fontSize={16}>
                  {tokenOut.symbol}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
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
            <Collapse in={!isNilOrEmpty(route)}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>
                  {intl.formatMessage({ defaultMessage: 'Route:' })}
                </Typography>
                <Stack>
                  <Typography>{route}</Typography>
                </Stack>
              </Stack>
            </Collapse>
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
              {amountIn > (balTokenIn as unknown as bigint) ? (
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
          tokens={tokensIn}
          onSelectToken={handleSelectToken}
        />
      </ErrorBoundary>
    </Stack>
  );
}
