import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Divider,
  emphasize,
  Stack,
  Typography,
} from '@mui/material';
import {
  ErrorBoundary,
  ErrorCard,
  LoadingLabel,
  MultiTokenIcon,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenId } from '@origin/shared/contracts';
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
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { TokenInput } from '../TokenInput';
import { SwapRoute } from './SwapRoute';
import { TokenSelectModal } from './TokenSelectModal';

import type { BoxProps, ButtonProps, CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { SwapState, TokenSource } from '@origin/shared/providers';

export type SwapperProps = Pick<
  SwapState,
  'swapActions' | 'swapRoutes' | 'trackEvent'
> & {
  onError?: (error: Error) => void;
  buttonsProps?: ButtonProps;
} & Omit<CardProps, 'onError'>;

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
          type: 'approval',
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
          status: 'error',
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
          type: 'swap',
          status: 'pending',
        });

        return activity.id;
      }}
      onSwapSuccess={(state) => {
        const { trackId, tokenIn, tokenOut, amountIn, amountOut, txReceipt } =
          state;
        updateActivity({ ...state, id: trackId, status: 'success' });
        pushNotification({
          severity: 'success',
          icon: (
            <MultiTokenIcon
              tokens={[tokenIn, tokenOut]}
              sx={{ transform: 'rotate(45deg)' }}
              zOrder="last"
            />
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
        });
      }}
      onSwapReject={({ trackId }) => {
        deleteActivity(trackId);
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Swap cancelled' }),
          message: intl.formatMessage({
            defaultMessage: 'User rejected operation',
          }),
          severity: 'info',
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
            <MultiTokenIcon
              tokens={[tokenIn, tokenOut]}
              sx={{ transform: 'rotate(45deg)' }}
              zOrder="last"
            />
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
    (balances?.[getTokenId(tokenIn)] ?? 0n) >= amountIn &&
    !isNilOrEmpty(selectedSwapRoute) &&
    (selectedSwapRoute?.allowanceAmount ?? 0n) < amountIn &&
    (allowance ?? 0n) < amountIn;
  const swapButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > (balances?.[getTokenId(tokenIn)] ?? 0n)
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
    amountIn > (balances?.[getTokenId(tokenIn)] ?? 0n);
  const swapButtonDisabled =
    needsApproval ||
    isNilOrEmpty(selectedSwapRoute) ||
    isBalancesLoading ||
    isSwapRoutesLoading ||
    isSwapLoading ||
    isSwapWaitingForSignature ||
    amountIn > (balances?.[getTokenId(tokenIn)] ?? 0n) ||
    amountIn === 0n;

  return (
    <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
      <Card {...rest}>
        <CardHeader
          title={intl.formatMessage({ defaultMessage: 'Swap' })}
          action={
            <SettingsButton
              sx={{ border: '1px solid', borderColor: 'divider' }}
            />
          }
        />
        <Divider />
        <Box
          sx={{
            px: 3,
            pt: 3,
            pb: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              position: 'relative',
            }}
          >
            <TokenInput
              amount={amountIn}
              decimals={tokenIn.decimals}
              onAmountChange={handleAmountInChange}
              balance={balances?.[getTokenId(tokenIn)] ?? 0n}
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
                px: 3,
                py: 2,
                borderRadius: 3,
                backgroundColor: 'background.highlight',
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <TokenInput
              readOnly
              disableMaxButton
              amount={amountOut}
              decimals={tokenOut.decimals}
              balance={balances?.[getTokenId(tokenOut)] ?? 0n}
              isAmountLoading={isSwapRoutesLoading}
              isBalanceLoading={isBalancesLoading}
              isNativeCurrency={isNativeCurrency(tokenOut)}
              token={tokenOut}
              onTokenClick={() => {
                setTokenSource('tokenOut');
              }}
              tokenPriceUsd={prices?.[getTokenPriceKey(tokenOut)]}
              isPriceLoading={isSwapRoutesLoading || isPriceLoading}
              sx={{
                px: 3,
                py: 2,
                borderRadius: 3,
                backgroundColor: 'background.highlight',
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <ArrowButton onClick={handleTokenFlip} />
          </Box>
        </Box>
        <SwapRoute sx={{ mx: 3 }} />
        <Collapse in={amountOut > 0n}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={3}
            px={3}
          >
            <Typography color="text.secondary" fontWeight="medium">
              {intl.formatMessage(
                {
                  defaultMessage: 'Minimum received with {slippage} slippage:',
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
                {formatAmount(
                  subtractSlippage(amountOut, tokenOut.decimals, slippage),
                )}
              </LoadingLabel>
              <Typography fontWeight="medium">{tokenOut.symbol}</Typography>
            </Stack>
          </Stack>
        </Collapse>
        <CardContent sx={{ pt: 0 }}>
          <Accordion
            expanded={needsApproval}
            disableGutters
            sx={{ background: 'transparent', border: 'none' }}
          >
            <AccordionSummary />
            <AccordionDetails sx={{ p: 0 }}>
              <Button
                fullWidth
                {...buttonsProps}
                disabled={approveButtonDisabled}
                onClick={handleApprove}
                sx={{ mb: 1.5, ...buttonsProps?.sx }}
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
            </AccordionDetails>
          </Accordion>
          <ConnectedButton
            fullWidth
            {...buttonsProps}
            disabled={swapButtonDisabled}
            onClick={handleSwap}
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
  );
}

function ArrowButton({ onClick, ...rest }: BoxProps) {
  return (
    <Box
      {...rest}
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { md: 58, xs: 50 },
        height: { md: 58, xs: 50 },
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '::before': {
          position: 'absolute',
          content: '""',
          backgroundColor: 'background.default',
          transform: 'translateY(50%)',
          height: 4,
          bottom: '50%',
          width: '110%',
        },
        ...rest?.sx,
      }}
    >
      <Box
        onClick={onClick}
        role="button"
        sx={{
          borderRadius: '50%',
          backgroundColor: 'background.highlight',
          border: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          width: { md: 50, xs: 42 },
          height: { md: 50, xs: 42 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          svg: {
            transition: (theme) => theme.transitions.create('transform'),
          },
          '&:hover': {
            backgroundColor: (theme) =>
              emphasize(theme.palette.background.default, 0.2),
            svg: {
              transform: 'rotate(-180deg)',
            },
          },
        }}
      >
        <FaArrowDownRegular
          sx={{
            fontSize: { md: 18, xs: 14 },
          }}
        />
      </Box>
    </Box>
  );
}
