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
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import {
  ConnectedButton,
  SwapProvider,
  TokenSelectModal,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  useHandleTokenChange,
  useSwapRouteAllowance,
  useSwapState,
  useTokenOptions,
} from '@origin/shared/providers';
import { composeContexts, isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { mainnet, useAccount, useBalance, useNetwork } from 'wagmi';

import { TokenInput } from './TokenInput';

import type { StackProps } from '@mui/material';
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
            title={intl.formatMessage({ defaultMessage: 'Restake LST' })}
          />
          <Box>
            <CardContent sx={{ backgroundColor: '#fff' }}>
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
                isConnected={isConnected}
                isAmountDisabled={amountInInputDisabled}
                inputProps={{ sx: tokenInputStyles }}
              />
            </CardContent>
            <Divider />
            <CardContent>
              <TokenInput
                amount={amountOut}
                decimals={tokenOut.decimals}
                balance={balTokenOut?.value}
                isAmountLoading={isSwapRoutesLoading}
                isBalanceLoading={isBalTokenOutLoading}
                token={tokenOut}
                isNativeCurrency={
                  tokenOut.symbol ===
                  (chain?.nativeCurrency.symbol ??
                    mainnet.nativeCurrency.symbol)
                }
                isConnected={isConnected}
                hideMaxButton
                disableTokenClick
                inputProps={{ readOnly: true, sx: tokenInputStyles }}
              />
            </CardContent>
          </Box>
          <Divider />
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography>
                {intl.formatMessage({ defaultMessage: 'Exchange rate:' })}
              </Typography>
              <Typography>
                {intl.formatMessage(
                  {
                    defaultMessage: '1 primeETH = {rate} {token}',
                  },
                  { rate: 1.0001, token: 'OETH' },
                )}
              </Typography>
            </Stack>
          </CardContent>
          <Divider />
          <CardContent>
            <Collapse in={needsApproval} sx={{ mt: needsApproval ? 1.5 : 0 }}>
              <Button
                fullWidth
                disabled={approveButtonDisabled}
                onClick={handleApprove}
                sx={{ fontSize: 20, py: 2, borderRadius: 8 }}
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
                  intl.formatMessage(
                    { defaultMessage: 'Approve {token}' },
                    { token: tokenIn.symbol },
                  )
                )}
              </Button>
            </Collapse>
            <ConnectedButton
              fullWidth
              disabled={swapButtonDisabled}
              onClick={handleSwap}
              sx={{ mt: 1.5, fontSize: 20, py: 2, borderRadius: 8 }}
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
