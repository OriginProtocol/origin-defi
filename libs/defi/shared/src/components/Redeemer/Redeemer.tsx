import {
  Box,
  Button,
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
  MultiTokenIcon,
} from '@origin/shared/components';
import { FaArrowDownRegular } from '@origin/shared/icons';
import {
  ConnectedButton,
  getTokenPriceKey,
  isNativeCurrency,
  RedeemProvider,
  SettingsButton,
  useHandleRedeem,
  useHandleRedeemAmountInChange,
  useMixTokenPrice,
  useRedeemerPrices,
  useRedeemState,
  useWatchBalance,
} from '@origin/shared/providers';
import { composeContexts } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import { TokenInput2 } from '../Swapper';
import { RedeemRoute } from './RedeemRoute';

import type { ButtonProps, IconButtonProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { RedeemState } from '@origin/shared/providers';

export type RedeemerProps = Pick<
  RedeemState,
  'trackEvent' | 'tokenIn' | 'vaultContract'
> & {
  gasBuffer?: bigint;
  onError?: (error: Error) => void;
  buttonsProps?: ButtonProps;
  mixTokenLabel?: string;
} & Omit<StackProps, 'onError'>;

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
  const [
    {
      amountIn,
      amountOut,
      tokenIn,
      split,
      isRedeemLoading,
      isEstimateLoading,
      isRedeemWaitingForSignature,
    },
  ] = useRedeemState();
  const { data: prices, isLoading: isPricesLoading } = useRedeemerPrices();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokenIn,
  });
  const handleAmountInChange = useHandleRedeemAmountInChange();
  const handleRedeem = useHandleRedeem();
  const mixTokenPrice = useMixTokenPrice();

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

  return (
    <Stack spacing={3} {...rest}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={onError}>
        <Card>
          <CardHeader
            title={intl.formatMessage({ defaultMessage: 'Redeem' })}
            action={<SettingsButton />}
          />
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <TokenInput2
              amount={amountIn}
              onAmountChange={handleAmountInChange}
              balance={balance}
              isBalanceLoading={isBalanceLoading}
              isNativeCurrency={isNativeCurrency(tokenIn)}
              token={tokenIn}
              isTokenClickDisabled
              tokenPriceUsd={prices?.[getTokenPriceKey(tokenIn)]}
              isPriceLoading={isPricesLoading}
              isAmountDisabled={isRedeemLoading}
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
              decimals={18}
              isAmountLoading={isEstimateLoading}
              isPriceLoading={isEstimateLoading}
              isNativeCurrency={false}
              isTokenClickDisabled
              hideMaxButton
              tokenPriceUsd={mixTokenPrice}
              tokenButton={
                <MixTokenButton
                  tokens={split.map((s) => s.token)}
                  label={
                    mixTokenLabel ??
                    intl.formatMessage({ defaultMessage: 'Stablecoin mix' })
                  }
                />
              }
              sx={{
                p: 3,
                borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
                borderBottomRightRadius: (theme) => theme.shape.borderRadius,
                backgroundColor: 'background.highlight',
              }}
            />
            <ArrowButton />
          </Box>
          <CardContent>
            <RedeemRoute
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            />
            <ConnectedButton
              fullWidth
              {...buttonsProps}
              disabled={redeemButtonDisabled}
              onClick={handleRedeem}
              sx={{ mt: 1.5, ...buttonsProps?.sx }}
            >
              {isEstimateLoading ? (
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
                redeemButtonLabel
              )}
            </ConnectedButton>
          </CardContent>
        </Card>
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
        '&.Mui-disabled': {
          color: 'text.primary',
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
