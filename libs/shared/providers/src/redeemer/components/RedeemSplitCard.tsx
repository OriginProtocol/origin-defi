import {
  Divider,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { InfoTooltip, Mix, TokenIcon } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useGasPrice } from '../../gas';
import { useFormat } from '../../intl';
import { getTokenPriceKey } from '../../prices';
import { MIX_TOKEN } from '../constants';
import { useRedeemerPrices } from '../hooks';
import { useRedeemState } from '../state';

import type { StackProps } from '@mui/material';

import type { RedeemEstimate } from '../types';

export const RedeemSplitCard = (props: Omit<StackProps, 'children'>) => {
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
  const imgSrc = split.map((s) => s.token.symbol);

  return (
    <Stack
      sx={{
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'transparent',
        background: (theme) =>
          `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
        ...props?.sx,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <Stack direction="row" alignItems="stretch" spacing={1} px={2} py={1.5}>
        {!isXs && (
          <Stack justifyContent="center">
            <Mix imgSrc={imgSrc} />
          </Stack>
        )}
        <Stack flex={1} direction="column" gap={0.5}>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            <Stack direction="row" gap={1} alignItems="baseline">
              <Typography fontWeight={500}>
                {isEstimateLoading ? (
                  <Skeleton width={100} />
                ) : (
                  formatAmount(amountOut, MIX_TOKEN.decimals)
                )}
              </Typography>
              <Typography variant="body2" noWrap color="text.secondary">
                {isEstimateLoading || isPricesLoading ? (
                  <Skeleton width={60} />
                ) : (
                  `(${formatCurrency(convertedAmount)})`
                )}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Gas:' })}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {isEstimateLoading || gasPriceLoading ? (
                  <Skeleton width={60} />
                ) : (
                  `~${formatCurrency(gasPrice?.gasCostUsd)}`
                )}
              </Typography>
            </Stack>
          </Stack>
          <Typography noWrap>
            {intl.formatMessage({
              defaultMessage: 'Redeem for mix via Origin Vault',
            })}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        px={1.5}
        py={1.5}
      >
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Rate:' })}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {isEstimateLoading ? (
              <Skeleton width={60} />
            ) : (
              `1:${formatQuantity(rate)}`
            )}
          </Typography>
        </Stack>
        <InfoTooltip
          tooltipLabel={intl.formatMessage({
            defaultMessage: 'Exchange rate',
          })}
        />
      </Stack>
      <Divider />
      <Stack spacing={2} py={1.5} px={2}>
        {split?.map((s) => (
          <SplitRow
            key={s.token.symbol}
            estimate={s}
            price={prices?.[getTokenPriceKey(s.token)]}
            isEstimateLoading={isEstimateLoading}
            isPricesLoading={isPricesLoading}
          />
        ))}
      </Stack>
    </Stack>
  );
};

type SplitRowProps = {
  estimate: RedeemEstimate;
  price?: number;
  isEstimateLoading: boolean;
  isPricesLoading: boolean;
} & StackProps;

function SplitRow({
  estimate,
  price,
  isEstimateLoading,
  isPricesLoading,
  ...rest
}: SplitRowProps) {
  const { formatAmount, formatCurrency } = useFormat();

  const converted =
    +formatUnits(estimate.amount, estimate.token.decimals) * (price ?? 0);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      {...rest}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <TokenIcon symbol={estimate.token.symbol} />
        <Typography fontWeight={500}>{estimate.token.symbol}</Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Typography fontWeight={500}>
          {isEstimateLoading ? (
            <Skeleton width={80} />
          ) : (
            formatAmount(estimate.amount, estimate.token.decimals)
          )}
        </Typography>
        {isPricesLoading || isEstimateLoading ? (
          <Skeleton width={80} />
        ) : (
          <Typography
            noWrap
            fontWeight={500}
            color="text.secondary"
            textAlign="end"
            minWidth={80}
          >
            {formatCurrency(converted)}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
