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
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { ValueLabelProps } from '@origin/shared/components';
import type { EstimatedSwapRoute } from '@origin/shared/providers';

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
  const { formatAmount, formatCurrency, formatQuantity } = useFormat();
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

  const estimatedAmount = +formatUnits(
    route.estimatedAmount,
    route.tokenOut.decimals,
  );
  const convertedAmount =
    (prices?.[getTokenPriceKey(route.tokenOut)] ?? 1) * estimatedAmount;
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
        borderRadius: 1,
        backgroundColor: 'background.paper',
        border: `1px solid`,
        borderColor: 'divider',
        px: 2,
        py: 1.5,
        ':hover': {
          borderColor: 'primary.main',
        },
        ...(isSelected && {
          borderColor: 'primary.main',
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
        <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1}>
          <Stack direction="row" spacing={0.5} alignItems="baseline">
            <LoadingLabel fontWeight="medium" isLoading={isSwapRoutesLoading}>
              {formatAmount(route.estimatedAmount, route.tokenOut.decimals)}
            </LoadingLabel>
            <LoadingLabel
              color="text.secondary"
              isLoading={isSwapRoutesLoading}
            >
              ({formatCurrency(convertedAmount)})
            </LoadingLabel>
          </Stack>
          <LoadingLabel isLoading={isSwapRoutesLoading} sWidth={80}>
            {intl.formatMessage(routeLabel)}
          </LoadingLabel>
        </Stack>
      </Stack>
      <Stack spacing={1}>
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
  labelProps: { variant: 'mono' },
  valueProps: { fontWeight: 'medium' },
};
