import { Skeleton, Stack } from '@mui/material';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import {
  getTokenPriceKey,
  useFormat,
  useGasPrice,
  useSwapperPrices,
  useSwapRouteAllowance,
  useSwapState,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';

import type { ValueLabelProps } from '@origin/shared/components';
import type { EstimatedSwapRoute } from '@origin/shared/providers';
import type { Dnum } from 'dnum';

export type SwapRouteAccordionItemProps = {
  route: EstimatedSwapRoute;
  isSelected: boolean;
  onSelect: (route: EstimatedSwapRoute) => void;
};

export function SwapRouteAccordionItem({
  route,
  isSelected,
  onSelect,
}: SwapRouteAccordionItemProps) {
  const intl = useIntl();
  const { formatCurrency, formatQuantity } = useFormat();
  const [{ amountIn, isSwapRoutesLoading, swapActions }] = useSwapState();
  const { data: prices } = useSwapperPrices();
  const {
    data: swapGasPrice,
    isLoading: swapGasPriceLoading,
    isFetching: swapGasPriceFetching,
  } = useGasPrice(route.gas, route.tokenIn.chainId, {
    refetchInterval: 30e3,
    enabled: route.gas > 0n,
  });
  const {
    data: approvalGasPrice,
    isLoading: approvalGasPriceLoading,
    isFetching: approvalGasPriceFetching,
  } = useGasPrice(route.approvalGas, route.tokenIn.chainId, {
    refetchInterval: 30e3,
    enabled: route.approvalGas > 0n,
  });
  const { data: allowance } = useSwapRouteAllowance(route);

  const estimatedAmount = [
    route.estimatedAmount ?? 0n,
    route.tokenOut.decimals,
  ] as Dnum;
  const convertedAmount = mul(
    estimatedAmount,
    prices?.[getTokenPriceKey(route.tokenOut)] ?? 0,
  );
  const isGasLoading =
    isSwapRoutesLoading ||
    (swapGasPriceLoading && swapGasPriceFetching) ||
    (approvalGasPriceLoading && approvalGasPriceFetching);
  const gasPrice =
    (swapGasPrice?.gasCostUsd ?? 0) +
    ((allowance ?? 0n) < amountIn ? approvalGasPrice?.gasCostUsd ?? 0 : 0);
  const routeLabel = swapActions[route.action].routeLabel;

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      spacing={1}
      sx={{
        borderRadius: 3,
        backgroundColor: 'background.default',
        border: `1px solid`,
        borderColor: 'divider',
        px: 2,
        py: 1.5,
        cursor: 'pointer',
        ':hover': {
          borderColor: 'primary.main',
        },
        ...(isSelected && {
          borderColor: 'primary.main',
          backgroundColor: 'background.highlight',
        }),
      }}
      onClick={() => onSelect(route)}
      role="button"
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {isSwapRoutesLoading ? (
          <Skeleton variant="circular" width={28} height={28} />
        ) : (
          <TokenIcon token={route.tokenOut} sx={{ fontSize: 28 }} />
        )}
        <Stack direction="column" spacing={0.5}>
          <Stack direction="row" spacing={0.5} alignItems="baseline">
            <LoadingLabel fontWeight="medium" isLoading={isSwapRoutesLoading}>
              {format(estimatedAmount, {
                digits: getFormatPrecision(estimatedAmount),
                decimalsRounding: 'ROUND_DOWN',
              })}
            </LoadingLabel>
            <LoadingLabel
              color="text.secondary"
              isLoading={isSwapRoutesLoading}
            >
              (${format(convertedAmount, 2)})
            </LoadingLabel>
          </Stack>
          <LoadingLabel isLoading={isSwapRoutesLoading} sWidth={80}>
            {intl.formatMessage(routeLabel)}
          </LoadingLabel>
        </Stack>
      </Stack>
      <Stack spacing={0.5}>
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Rate:' })}
          value={intl.formatMessage(
            { defaultMessage: '1:{value}' },
            { value: formatQuantity(route.rate) },
          )}
          isLoading={isSwapRoutesLoading}
        />
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Gas:' })}
          value={intl.formatMessage(
            { defaultMessage: '~{value}' },
            { value: formatCurrency(gasPrice) },
          )}
          isLoading={isGasLoading}
        />
      </Stack>
    </Stack>
  );
}

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  justifyContent: 'space-between',
  labelProps: {
    variant: 'body3',
    fontWeight: 'medium',
    color: 'text.secondary',
  },
  valueProps: { fontWeight: 'medium' },
  minWidth: 120,
};
