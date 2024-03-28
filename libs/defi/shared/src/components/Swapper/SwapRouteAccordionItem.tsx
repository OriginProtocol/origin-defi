import { Skeleton, Stack, Typography } from '@mui/material';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
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
  } = useGasPrice(route.gas, undefined, {
    refetchInterval: 30e3,
    enabled: route.gas > 0n,
  });
  const {
    data: approvalGasPrice,
    isLoading: approvalGasPriceLoading,
    isFetching: approvalGasPriceFetching,
  } = useGasPrice(route.approvalGas, undefined, {
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
      gap={1}
      sx={{
        borderRadius: 1,
        backgroundColor: 'background.paper',
        border: `1px solid`,
        borderColor: 'divider',
        px: 2,
        py: 1,
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
      <Stack direction="row" alignItems="center" gap={1}>
        {isSwapRoutesLoading ? (
          <Skeleton variant="circular" width={24} height={24} />
        ) : (
          <TokenIcon token={route.tokenOut} sx={{ fontSize: 24 }} />
        )}
        <Stack
          direction={{ xs: 'row', sm: 'column' }}
          spacing={{ xs: 1, sm: 0 }}
        >
          <Stack direction="row" spacing={0.5} alignItems="baseline">
            <LoadingLabel variant="body2" isLoading={isSwapRoutesLoading}>
              {formatAmount(route.estimatedAmount, route.tokenOut.decimals)}
            </LoadingLabel>
            <LoadingLabel
              variant="body2"
              color="text.secondary"
              isLoading={isSwapRoutesLoading}
            >
              ({formatCurrency(convertedAmount)})
            </LoadingLabel>
          </Stack>
          <LoadingLabel
            variant="body2"
            isLoading={isSwapRoutesLoading}
            sWidth={80}
          >
            {intl.formatMessage(routeLabel)}
          </LoadingLabel>
        </Stack>
      </Stack>
      <Stack>
        <Stack direction="row" spacing={0.75} justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Rate:' })}
          </Typography>
          <LoadingLabel
            variant="body2"
            isLoading={isSwapRoutesLoading}
            sWidth={50}
          >
            1:{formatQuantity(route.rate)}
          </LoadingLabel>
        </Stack>
        <Stack direction="row" spacing={0.75} justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Gas:' })}
          </Typography>
          <LoadingLabel variant="body2" isLoading={isGasLoading} sWidth={40}>
            ~{formatCurrency(gasPrice)}
          </LoadingLabel>
        </Stack>
      </Stack>
    </Stack>
  );
}
