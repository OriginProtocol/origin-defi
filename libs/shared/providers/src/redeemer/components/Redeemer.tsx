import { useState } from 'react';

import {
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  ErrorBoundary,
  ErrorCard,
  TokenInput,
} from '@origin/shared/components';
import { composeContexts } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { usePrices } from '../../prices';
import { PriceTolerancePopover, useSlippage } from '../../slippage';
import { ConnectedButton } from '../../wagmi';
import { useHandleAmountInChange, useHandleRedeem } from '../hooks';
import { RedeemProvider, useRedeemState } from '../state';
import { RedeemRoute } from './RedeemRoute';

import type { BoxProps, StackProps } from '@mui/material';
import type { MouseEvent } from 'react';

import type { RedeemState } from '../types';

export type RedeemerProps = Pick<
  RedeemState,
  'trackEvent' | 'tokenIn' | 'vaultContract'
> & {
  gasBuffer?: bigint;
  onError?: (error: Error) => void;
} & Omit<StackProps, 'onError'>;

export const Redeemer = ({
  tokenIn,
  trackEvent,
  gasBuffer = 25n,
  vaultContract,
  ...rest
}: RedeemerProps) =>
  composeContexts(
    [[RedeemProvider, { tokenIn, trackEvent, gasBuffer, vaultContract }]],
    <RedeemerWrapped {...rest} />,
  );

function RedeemerWrapped({
  onError,
  ...rest
}: Omit<RedeemerProps, 'trackEvent' | 'tokenIn' | 'vaultContract'>) {
  const intl = useIntl();
  const { value: slippage, set: setSlippage } = useSlippage();
  const { address, isConnected } = useAccount();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [
    {
      amountIn,
      tokenIn,
      isRedeemLoading,
      isEstimateLoading,
      isRedeemWaitingForSignature,
      trackEvent,
    },
  ] = useRedeemState();
  const { data: prices, isLoading: isPricesLoading } = usePrices();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    token: tokenIn.address,
    watch: true,
    scopeKey: 'redeem_balance',
  });
  const handleAmountInChange = useHandleAmountInChange();
  const handleRedeem = useHandleRedeem();

  const handleSettingClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget);
    trackEvent({ name: 'open_settings' });
  };

  const handleSlippageChange = (val: number) => {
    setSlippage(val);
    trackEvent({
      name: 'change_price_tolerance',
      price_tolerance: val,
    });
  };

  const redeemButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > balance?.value
      ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
      : intl.formatMessage({ defaultMessage: 'Redeem' });
  const redeemButtonDisabled =
    isBalanceLoading ||
    isEstimateLoading ||
    isRedeemWaitingForSignature ||
    isRedeemLoading ||
    amountIn > balance?.value ||
    amountIn === 0n;

  return (
    <Stack spacing={3} {...rest}>
      {/* <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ApyHeader />
      </ErrorBoundary> */}
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
                  {intl.formatMessage({ defaultMessage: 'Redeem' })}
                </Typography>
                <IconButton
                  onClick={handleSettingClick}
                  sx={{
                    position: 'relative',
                    right: (theme) => theme.spacing(-0.75),
                    svg: { width: 16, height: 16 },
                  }}
                >
                  <img src="/images/settings-icon.svg" alt="settings" />
                </IconButton>
                <PriceTolerancePopover
                  open={!!anchorEl}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  slippage={slippage}
                  onSlippageChange={handleSlippageChange}
                />
              </Stack>
            }
          />
          <CardContent>
            <TokenInput
              amount={amountIn}
              onAmountChange={handleAmountInChange}
              balance={balance?.value}
              isBalanceLoading={isBalanceLoading}
              token={tokenIn}
              isTokenClickDisabled
              tokenPriceUsd={prices?.[tokenIn.symbol]}
              isPriceLoading={isPricesLoading}
              isConnected={isConnected}
              isAmountDisabled={isRedeemLoading}
              inputProps={{ sx: tokenInputStyles }}
              tokenButtonProps={{ sx: { minWidth: 100, maxWidth: 100 } }}
              sx={{
                paddingBlock: 2.5,
                paddingBlockStart: 2.625,
                paddingInline: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: 'grey.900',
                '&:hover, &:focus-within': {
                  borderColor: 'transparent',
                },
                '&:hover': {
                  background: (theme) =>
                    `linear-gradient(${theme.palette.grey[900]}, ${
                      theme.palette.grey[900]
                    }) padding-box,
              linear-gradient(90deg, ${alpha(
                theme.palette.primary.main,
                0.4,
              )} 0%, ${alpha(
                theme.palette.primary.dark,
                0.4,
              )} 100%) border-box;`,
                },
                '&:focus-within': {
                  background: (theme) =>
                    `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box,
             linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%) border-box;`,
                },
              }}
            />
            <Stack sx={{ position: 'relative', width: 1, height: 12 }}>
              <ArrowButton />
            </Stack>
            <RedeemRoute
              sx={{
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <ConnectedButton
              variant="action"
              fullWidth
              disabled={redeemButtonDisabled}
              onClick={handleRedeem}
              sx={{ mt: 1.5 }}
            >
              {isEstimateLoading ? (
                <CircularProgress size={32} color="inherit" />
              ) : isRedeemWaitingForSignature ? (
                intl.formatMessage({ defaultMessage: 'Waiting for signature' })
              ) : isRedeemLoading ? (
                intl.formatMessage({ defaultMessage: 'Processing Transaction' })
              ) : (
                redeemButtonLabel
              )}
            </ConnectedButton>
          </CardContent>
        </Card>
      </ErrorBoundary>
    </Stack>
  );
}

function ArrowButton(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: { md: `calc(50% - ${40 / 2}px)`, xs: `calc(50% - ${36 / 2}px)` },
        left: { md: `calc(50% - ${40 / 2}px)`, xs: `calc(50% - ${36 / 2}px)` },
        width: { md: 40, xs: 36 },
        height: { md: 40, xs: 36 },
        zIndex: 2,
        fill: (theme) => theme.palette.background.paper,
        strokeWidth: (theme) => theme.typography.pxToRem(2),
        stroke: (theme) => theme.palette.grey[700],
        backgroundColor: (theme) => theme.palette.background.paper,
        border: '1px solid',
        borderColor: 'divider',
        ...props?.sx,
      }}
    >
      <Box
        component="img"
        src="/images/splitarrow.svg"
        alt="split"
        sx={{
          height: { md: 20, xs: 18 },
        }}
      />
    </Box>
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
    color: 'text.primary',
    '&::placeholder': {
      color: 'text.secondary',
      opacity: 1,
    },
  },
};
