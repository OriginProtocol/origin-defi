import {
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { GasPopover } from '@origin/oeth/shared';
import { TokenInput } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  ConnectedButton,
  usePrices,
  useSlippage,
} from '@origin/shared/providers';
import { composeContexts } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { RedeemRoute } from '../components/RedeemRoute';
import { useHandleAmountInChange, useHandleRedeem } from '../hooks';
import { RedeemProvider, useRedeemState } from '../state';

import type { BoxProps } from '@mui/material';

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

export const RedeemView = () =>
  composeContexts([[RedeemProvider]], <RedeemViewWrapped />);

function RedeemViewWrapped() {
  const intl = useIntl();
  const { value: slippage, set: setSlippage } = useSlippage();
  const { address, isConnected } = useAccount();
  const [{ amountIn, isRedeemLoading, isEstimateLoading }] = useRedeemState();
  const { data: prices, isLoading: isPricesLoading } = usePrices();
  const { data: balOeth, isLoading: isBalOethLoading } = useBalance({
    address,
    token: tokens.mainnet.OETH.address,
    watch: true,
    scopeKey: 'redeem_balance',
  });

  const handleAmountInChange = useHandleAmountInChange();
  const handleRedeem = useHandleRedeem();

  const handleSlippageChange = (val: number) => {
    setSlippage(val);
  };

  const redeemButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > balOeth?.value
      ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
      : intl.formatMessage({ defaultMessage: 'Redeem' });
  const redeemButtonDisabled =
    isBalOethLoading ||
    isEstimateLoading ||
    isRedeemLoading ||
    amountIn > balOeth?.value ||
    amountIn === 0n;

  return (
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
            <GasPopover
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
          balance={balOeth?.value}
          isBalanceLoading={isBalOethLoading}
          token={tokens.mainnet.OETH}
          isTokenClickDisabled
          tokenPriceUsd={prices?.OETH}
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
          ) : isRedeemLoading ? (
            intl.formatMessage({ defaultMessage: 'Waiting for signature' })
          ) : (
            redeemButtonLabel
          )}
        </ConnectedButton>
      </CardContent>
    </Card>
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
        sx={{
          height: { md: 20, xs: 18 },
        }}
      />
    </Box>
  );
}
