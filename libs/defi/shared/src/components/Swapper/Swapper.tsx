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
} from '@origin/shared/components';
import { FaArrowDownRegular } from '@origin/shared/icons';
import {
  ConnectedButton,
  getTokenPriceKey,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  useHandleTokenChange,
  useHandleTokenFlip,
  useSlippage,
  useSwapperPrices,
  useSwapperTargetChainId,
  useSwapRouteAllowance,
  useSwapState,
  useTokenOptions,
  useWatchBalances,
} from '@origin/shared/providers';
import {
  getFormatPrecision,
  isNilOrEmpty,
  subPercentage,
} from '@origin/shared/utils';
import { format } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { SettingsButton } from '../Settings';
import { TokenInput } from '../TokenInput';
import { SwapProvider } from './SwapProvider';
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
  return (
    <SwapProvider
      swapActions={swapActions}
      swapRoutes={swapRoutes}
      trackEvent={trackEvent}
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
  const { isConnected, chainId } = useAccount();
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
  const targetChainId = useSwapperTargetChainId();
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

  const minReceived = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );
  const needsApproval =
    isConnected &&
    tokenIn.chainId === chainId &&
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
    <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
      <Card {...rest}>
        <CardHeader
          title={intl.formatMessage({ defaultMessage: 'Swap' })}
          action={<SettingsButton />}
        />
        <Divider />
        <CardContent sx={{ pb: 0 }}>
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
              balance={balances?.[tokenIn.id] ?? 0n}
              isBalanceLoading={isBalancesLoading}
              token={tokenIn}
              onTokenClick={() => {
                setTokenSource('tokenIn');
              }}
              tokenPriceUsd={prices?.[getTokenPriceKey(tokenIn)]}
              isPriceLoading={isPriceLoading}
              isAmountDisabled={amountInInputDisabled}
              sx={{
                p: 2,
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
              balance={balances?.[tokenOut.id] ?? 0n}
              isAmountLoading={isSwapRoutesLoading}
              isBalanceLoading={isBalancesLoading}
              token={tokenOut}
              onTokenClick={() => {
                setTokenSource('tokenOut');
              }}
              tokenPriceUsd={prices?.[getTokenPriceKey(tokenOut)]}
              isPriceLoading={isSwapRoutesLoading || isPriceLoading}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: 'background.highlight',
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <ArrowButton onClick={handleTokenFlip} />
          </Box>
        </CardContent>
        <SwapRoute sx={{ mx: 3 }} />
        <Collapse
          in={
            amountOut > 0n &&
            (isNilOrEmpty(selectedSwapRoute?.noSlippage) ||
              !selectedSwapRoute?.noSlippage)
          }
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 3,
              px: 3,
            }}
          >
            <Typography
              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage(
                {
                  defaultMessage: 'Minimum received with {slippage} slippage:',
                },
                {
                  slippage: intl.formatNumber(slippage, {
                    style: 'percent',
                    minimumFractionDigits: 0,
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
                isLoading={isSwapRoutesLoading}
                sWidth={60}
                sx={{ fontWeight: 'medium' }}
              >
                {format(minReceived, {
                  digits: getFormatPrecision(minReceived),
                  decimalsRounding: 'ROUND_DOWN',
                })}
              </LoadingLabel>
              <Typography
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {tokenOut.symbol}
              </Typography>
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
            targetChainId={targetChainId}
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
        sx={(theme) => ({
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
            transition: theme.transitions.create('transform'),
          },
          '&:hover': {
            backgroundColor: (theme) =>
              emphasize(theme.palette.background.default, 0.2),
            svg: {
              transform: 'rotate(-180deg)',
            },
          },
        })}
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
