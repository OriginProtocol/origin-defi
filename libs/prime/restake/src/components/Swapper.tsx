import { useEffect, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  CardContent,
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
  TokenIcon,
} from '@origin/shared/components';
import { FaChevronDownRegular } from '@origin/shared/icons';
import {
  ConnectedButton,
  isNativeCurrency,
  SwapProvider,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  useHandleTokenChange,
  useRoutingSwapState,
  useSwapRouteAllowance,
  useSwapState,
  useTokenOptions,
  useWatchBalance,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { isBefore } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useExchangeRate } from '../hooks';
import { TokenInput } from './TokenInput';
import { TokenSelectModal } from './TokenSelectModal';
import { TransactionProgressModal } from './TransactionProgressModal';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { SwapState, TokenSource } from '@origin/shared/providers';

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
  return (
    <SwapProvider
      swapActions={swapActions}
      swapRoutes={swapRoutes}
      debounceTime={400}
      trackEvent={trackEvent}
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
  const { isConnected } = useAccount();
  const [tokenSource, setTokenSource] = useState<TokenSource | null>(null);
  const [txProgressOpen, setTxProgressOpen] = useState(false);
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
      status,
    },
  ] = useSwapState();
  const { action, route } = useRoutingSwapState<RestakeAction, Meta>();
  const { tokensIn } = useTokenOptions<Meta>();
  const { data: allowance } = useSwapRouteAllowance(selectedSwapRoute);
  const { data: balTokenIn, isLoading: isBalTokenInLoading } = useWatchBalance({
    token: tokenIn,
  });
  const { data: defaultExchangeRate, isLoading: isDefaultExchangeRateLoading } =
    useExchangeRate();
  const handleAmountInChange = useHandleAmountInChange();
  const handleTokenChange = useHandleTokenChange();
  const handleApprove = useHandleApprove();
  const handleSwap = useHandleSwap();

  useEffect(() => {
    if (
      ['approvalWaitingForSignature', 'swapWaitingForSignature'].includes(
        status,
      )
    ) {
      setTxProgressOpen(true);
    }
  }, [status]);

  useEffect(() => {
    if (
      ['approvalTransactionSuccess', 'approvalTransactionRejected'].includes(
        status,
      )
    ) {
      setTimeout(() => {
        setTxProgressOpen(false);
      }, 1000);
    }
  }, [status]);

  const handleCloseSelectionModal = () => {
    setTokenSource(null);
  };

  const handleSelectToken = (value: Token) => {
    handleTokenChange(tokenSource, value);
  };

  const routeLabel = action?.routeLabel
    ? intl.formatMessage(action.routeLabel)
    : null;
  const boost = route?.meta?.boost;
  const exchangeRate =
    amountIn === 0n ? defaultExchangeRate : 1 / (selectedSwapRoute?.rate ?? 1);
  const isInfoPanelVisible = status !== 'noAvailableRoute';
  const isWarningLabelVisible =
    selectedSwapRoute?.action === 'uniswap' &&
    isBefore(new Date(), new Date('25 March 2024 12:00 PDT'));
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
    <Stack {...rest}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
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
            disabled={tokensIn.length === 1}
            sx={{
              py: 1.5,
              borderRadius: 4,
              borderColor: 'divider',
              backgroundColor: 'common.white',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TokenIcon token={tokenIn} sx={{ width: 34, height: 34 }} />
              <Typography fontSize={20} sx={{ color: 'text.primary' }}>
                {tokenIn?.symbol}
              </Typography>
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
            disableMaxButton={amountInInputDisabled}
            token={tokenIn}
            onTokenClick={() => {
              setTokenSource('tokenIn');
            }}
            isNativeCurrency={isNativeCurrency(tokenIn)}
            isConnected={isConnected}
            isAmountDisabled={amountInInputDisabled}
          />
        </CardContent>
        <Divider />
        <Collapse in={isInfoPanelVisible}>
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
              <Stack direction="row" alignItems="center" spacing={1}>
                <LoadingLabel
                  isLoading={isSwapRoutesLoading}
                  sWidth={60}
                  fontWeight="medium"
                  fontSize={16}
                >
                  {intl.formatNumber(
                    +formatUnits(amountOut, tokenOut.decimals),
                    {
                      roundingMode: 'floor',
                      maximumFractionDigits: 5,
                      minimumFractionDigits: 2,
                    },
                  )}
                </LoadingLabel>
                <TokenIcon token={tokenOut} sx={{ fontSize: 22 }} />
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
              <LoadingLabel
                isLoading={isSwapRoutesLoading || isDefaultExchangeRateLoading}
                sWidth={140}
                fontWeight="medium"
              >
                {intl.formatMessage(
                  {
                    defaultMessage: '{rate} {token} = 1 primeETH',
                  },
                  {
                    rate: intl.formatNumber(exchangeRate ?? 0, {
                      roundingMode: 'floor',
                      maximumFractionDigits: 5,
                      minimumFractionDigits: 2,
                    }),
                    token: tokenIn.symbol,
                  },
                )}
              </LoadingLabel>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>
                {intl.formatMessage({ defaultMessage: 'Route:' })}
              </Typography>
              <Stack>
                <Typography fontWeight="medium">{routeLabel}</Typography>
              </Stack>
            </Stack>
          </CardContent>
          <Divider />
        </Collapse>
        <Collapse in={isWarningLabelVisible}>
          <Stack px={3} pt={3}>
            <Stack
              sx={{
                border: '1px solid',
                borderColor: (theme) =>
                  alpha(theme.palette.secondary.main, 0.7),
                borderRadius: 2,
                backgroundColor: (theme) =>
                  alpha(theme.palette.secondary.main, 0.1),
                p: 1,
                width: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>
                {intl.formatMessage({
                  defaultMessage:
                    'Swaps are eligible for bonus XP & EigenLayer points',
                })}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
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
        <TokenSelectModal
          open={!isNilOrEmpty(tokenSource)}
          onClose={handleCloseSelectionModal}
          tokens={tokensIn}
          onSelectToken={handleSelectToken}
        />
        <TransactionProgressModal
          key={txProgressOpen ? '' : 'reset'}
          open={txProgressOpen}
          onClose={() => {
            setTxProgressOpen(false);
          }}
        />
      </ErrorBoundary>
    </Stack>
  );
}
