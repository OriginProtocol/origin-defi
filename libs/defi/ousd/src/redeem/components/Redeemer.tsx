import {
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
import { SettingsButton, TokenInput, useTxButton } from '@origin/defi/shared';
import {
  ErrorBoundary,
  ErrorCard,
  LoadingLabel,
  MultiTokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  getTokenPriceKey,
  MIX_TOKEN,
  RedeemProvider,
  TxButton,
  useHandleRedeemAmountInChange,
  useRedeemerPrices,
  useRedeemState,
  useSlippage,
  useWatchBalance,
} from '@origin/shared/providers';
import {
  composeContexts,
  getFormatPrecision,
  isNilOrEmpty,
  subPercentage,
} from '@origin/shared/utils';
import { add, format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';

import { BreakdownAccordion } from './BreakdownAccordion';
import { RedeemSplitCard } from './RedeemSplitCard';

import type { ButtonProps, CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { RedeemState } from '@origin/shared/providers';
import type { Dnum } from 'dnum';

export type RedeemerProps = Pick<
  RedeemState,
  'trackEvent' | 'tokenIn' | 'vaultContract'
> & {
  gasBuffer?: bigint;
  onError?: (error: Error) => void;
  buttonsProps?: ButtonProps;
  mixTokenLabel?: string;
} & Omit<CardProps, 'onError'>;

export const Redeemer = ({
  tokenIn,
  trackEvent,
  gasBuffer = 25n,
  vaultContract,
  mixTokenLabel,
  ...rest
}: RedeemerProps) =>
  composeContexts(
    [
      [
        RedeemProvider,
        { tokenIn, trackEvent, gasBuffer, vaultContract, mixTokenLabel },
      ],
    ],
    <RedeemerWrapped {...rest} />,
  );

function RedeemerWrapped({
  onError,
  buttonsProps,
  mixTokenLabel,
  ...rest
}: Omit<RedeemerProps, 'trackEvent' | 'tokenIn' | 'vaultContract'>) {
  const intl = useIntl();
  const { value: slippage } = useSlippage();
  const [
    {
      amountIn,
      amountOut,
      tokenIn,
      split,
      isRedeemLoading,
      isEstimateLoading,
      isRedeemWaitingForSignature,
      vaultContract,
      gas,
      gasBuffer,
    },
  ] = useRedeemState();
  const { data: prices, isLoading: isPricesLoading } = useRedeemerPrices();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokenIn,
  });
  const handleAmountInChange = useHandleRedeemAmountInChange();
  const amt = [amountOut ?? 0n, 18] as Dnum;
  const minAmountOut = subPercentage(amt, slippage);

  const { params, callbacks } = useTxButton({
    params: {
      contract: vaultContract,
      functionName: 'redeem',
      args: [amountIn, minAmountOut[0]],
    },
    activity: {
      type: 'redeem',
      status: 'idle',
      amountIn,
      tokenIdIn: tokens.mainnet.OUSD.id,
      tokenIdOut: MIX_TOKEN.id,
    },
  });

  const redeemButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > (balance ?? 0n)
        ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
        : intl.formatMessage({ defaultMessage: 'Redeem' });
  const redeemButtonDisabled =
    isBalanceLoading ||
    isEstimateLoading ||
    isRedeemWaitingForSignature ||
    isRedeemLoading ||
    amountIn > (balance ?? 0n) ||
    amountIn === 0n;
  const convertedAmount =
    isPricesLoading || isEstimateLoading || isNilOrEmpty(prices)
      ? from(0)
      : split.reduce((acc, curr) => {
          return add(
            acc,
            mul(
              [curr.amount, curr.token.decimals],
              prices?.[getTokenPriceKey(curr.token)] ?? 0,
            ),
          );
        }, from(0));

  return (
    <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
      <Card {...rest}>
        <CardHeader
          title={intl.formatMessage({ defaultMessage: 'Redeem' })}
          action={<SettingsButton />}
        />
        <Divider />
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pb: 0 }}
        >
          <Typography fontWeight="medium">
            {intl.formatMessage({ defaultMessage: 'Redeem amount' })}
          </Typography>
          <TokenInput
            amount={amountIn}
            onAmountChange={handleAmountInChange}
            balance={balance}
            isBalanceLoading={isBalanceLoading}
            token={tokenIn}
            isTokenClickDisabled
            tokenPriceUsd={prices?.[getTokenPriceKey(tokenIn)]}
            isPriceLoading={isPricesLoading}
            isAmountDisabled={isRedeemLoading}
            sx={{
              px: 3,
              py: 2,
              borderRadius: 3,
              backgroundColor: 'background.highlight',
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
          <Typography pt={1.5} fontWeight="medium">
            {intl.formatMessage({ defaultMessage: 'Route' })}
          </Typography>
          <RedeemSplitCard />
          <Typography pt={1.5} fontWeight="medium">
            {intl.formatMessage({ defaultMessage: 'Receive amount' })}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              backgroundColor: 'background.highlight',
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <Stack spacing={1.5}>
              <LoadingLabel
                isLoading={isEstimateLoading}
                sWidth={60}
                variant="h6"
                color={amountIn === 0n ? 'text.secondary' : 'text.primary'}
              >
                {format(amt, {
                  digits: getFormatPrecision(amt),
                  decimalsRounding: 'ROUND_DOWN',
                })}
              </LoadingLabel>
              <LoadingLabel
                isLoading={isEstimateLoading}
                sWidth={60}
                color="text.secondary"
              >
                ${amountIn === 0n ? '0.00' : format(convertedAmount, 2)}
              </LoadingLabel>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MixTokenButton
                tokens={split.map((s) => s.token)}
                label={
                  mixTokenLabel ??
                  intl.formatMessage({ defaultMessage: 'Stablecoin mix' })
                }
              />
            </Stack>
          </Stack>
          <Collapse in={amountOut > 0n}>
            <BreakdownAccordion />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              py={3}
              px={1}
            >
              <Typography color="text.secondary" fontWeight="medium">
                {intl.formatMessage(
                  {
                    defaultMessage:
                      'Minimum received with {slippage} slippage:',
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
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <LoadingLabel
                  isLoading={isRedeemLoading}
                  sWidth={60}
                  fontWeight="medium"
                >
                  ${format(subPercentage(convertedAmount, slippage), 2)}
                </LoadingLabel>
              </Stack>
            </Stack>
          </Collapse>
        </CardContent>
        <CardContent sx={{ pt: 0 }}>
          <TxButton
            variant="action"
            params={params}
            callbacks={callbacks}
            gas={gas + (gas * gasBuffer) / 100n}
            fullWidth
            disabled={redeemButtonDisabled}
            label={
              isEstimateLoading ? (
                <CircularProgress size={32} color="inherit" />
              ) : isRedeemWaitingForSignature ? (
                intl.formatMessage({
                  defaultMessage: 'Waiting for signature',
                })
              ) : isRedeemLoading ? (
                intl.formatMessage({
                  defaultMessage: 'Processing Transaction',
                })
              ) : (
                (redeemButtonLabel ?? '')
              )
            }
          />
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}

type MixTokenButtonProps = { tokens: Token[]; label: string } & ButtonProps;

function MixTokenButton({ tokens, label, ...rest }: MixTokenButtonProps) {
  return (
    <Button
      disabled
      color="inherit"
      size="small"
      {...rest}
      sx={{
        gap: 1,
        minHeight: 32,
        borderRadius: 8,
        fontSize: '1rem',
        fontWeight: 500,
        border: 'none',
        backgroundColor: 'background.default',
        '&.Mui-disabled': {
          color: 'text.primary',
          border: 'none',
          backgroundColor: 'background.default',
          pr: 2,
        },
        ...rest?.sx,
      }}
    >
      <MultiTokenIcon tokens={tokens} spacing={1.8} size={1.75} />
      <Typography variant="inherit">{label}</Typography>
    </Button>
  );
}
