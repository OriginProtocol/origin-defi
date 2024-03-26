import {
  Card,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LoadingLabel, MultiTokenIcon } from '@origin/shared/components';
import {
  getTokenPriceKey,
  useFormat,
  useGasPrice,
  useRedeemerPrices,
  useRedeemState,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { BreakdownAccordion } from './BreakdownAccordion';

import type { CardProps, StackProps, TypographyProps } from '@mui/material';

export const RedeemSplitCard = (props: Omit<CardProps, 'children'>) => {
  const intl = useIntl();
  const { formatAmount, formatCurrency, formatQuantity } = useFormat();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: prices, isLoading: isPricesLoading } = useRedeemerPrices();
  const [{ amountOut, gas, rate, split, isEstimateLoading }] = useRedeemState();
  const { data: gasPrice, isLoading: gasPriceLoading } = useGasPrice(gas);

  const convertedAmount =
    isPricesLoading || isEstimateLoading || isNilOrEmpty(prices)
      ? 0
      : split.reduce((acc, curr) => {
          return (
            acc +
            +formatUnits(curr.amount, curr.token.decimals) *
              (prices?.[getTokenPriceKey(curr.token)] ?? 0)
          );
        }, 0);

  return (
    <Card
      {...props}
      sx={{
        px: 1.5,
        py: 2,
        borderWidth: 1,
        borderColor: 'divider',
        ...props?.sx,
      }}
    >
      <Stack height={1} spacing={0.5}>
        <Stack {...rowProps} pb={0.5}>
          <Typography noWrap>
            {intl.formatMessage({
              defaultMessage: 'Redeem for mix via Origin Vault',
            })}
          </Typography>
          <MultiTokenIcon tokens={split.map((s) => s.token)} size={1} />
        </Stack>
        <Stack {...rowProps}>
          <Typography {...labelProps}>
            {intl.formatMessage({ defaultMessage: 'Wait time:' })}
          </Typography>
          <LoadingLabel isLoading={isEstimateLoading}>
            {intl.formatMessage({ defaultMessage: 'Instant' })}
          </LoadingLabel>
        </Stack>
        <Stack {...rowProps}>
          <Typography {...labelProps}>
            {intl.formatMessage({ defaultMessage: 'Rate:' })}
          </Typography>
          <LoadingLabel isLoading={isEstimateLoading}>
            1:{formatQuantity(rate)}
          </LoadingLabel>
        </Stack>
        <Stack {...rowProps}>
          <Typography {...labelProps}>
            {intl.formatMessage({ defaultMessage: 'Route:' })}
          </Typography>
          <LoadingLabel isLoading={isEstimateLoading}>
            {intl.formatMessage({ defaultMessage: 'Origin Vault' })}
          </LoadingLabel>
        </Stack>
        <Stack {...rowProps}>
          <Typography {...labelProps}>
            {intl.formatMessage({ defaultMessage: 'Gas:' })}
          </Typography>
          <LoadingLabel isLoading={isEstimateLoading || gasPriceLoading}>
            ~{formatCurrency(gasPrice?.gasCostUsd)}
          </LoadingLabel>
        </Stack>
      </Stack>
      <BreakdownAccordion sx={{ mt: 2 }} />
    </Card>
  );
};

const rowProps: StackProps = {
  direction: 'row',
  sx: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
  },
};

const labelProps: TypographyProps = {
  color: 'text.secondary',
};
