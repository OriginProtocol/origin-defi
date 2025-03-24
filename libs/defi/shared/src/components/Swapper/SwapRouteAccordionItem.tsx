import { Skeleton, Stack } from '@mui/material';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import {
  getTokenPriceKey,
  useGasPrice,
  useIdlePollInterval,
  useSwapperPrices,
  useSwapRouteAllowance,
  useSwapState,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { add, format, from, lt, mul } from 'dnum';
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
  const [{ amountIn, isSwapRoutesLoading, swapActions }] = useSwapState();
  const { data: prices } = useSwapperPrices();
  const refetchInterval = useIdlePollInterval(30000);
  const {
    data: swapGasPrice,
    isLoading: swapGasPriceLoading,
    isFetching: swapGasPriceFetching,
  } = useGasPrice(route.gas, route.tokenIn.chainId, {
    refetchInterval,
    enabled: route.gas > 0n,
  });
  const {
    data: approvalGasPrice,
    isLoading: approvalGasPriceLoading,
    isFetching: approvalGasPriceFetching,
  } = useGasPrice(route.approvalGas, route.tokenIn.chainId, {
    refetchInterval,
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
  const gasPrice = add(
    swapGasPrice?.gasCostUsd ?? from(0),
    (allowance ?? 0n) < amountIn
      ? (approvalGasPrice?.gasCostUsd ?? from(0))
      : from(0),
  );
  const gasLabel = lt(gasPrice, from(0.01, 18))
    ? `<$0.01`
    : `~$${format(gasPrice, 2)}`;
  const routeLabel = swapActions[route.action].routeLabel;

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      onClick={() => onSelect(route)}
      role="button"
      sx={[
        {
          justifyContent: 'space-between',
        },
        {
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
        },
        isSelected && {
          borderColor: 'primary.main',
          backgroundColor: 'background.highlight',
        },
      ]}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: 'center',
        }}
      >
        {isSwapRoutesLoading ? (
          <Skeleton variant="circular" width={28} height={28} />
        ) : (
          <TokenIcon token={route.tokenOut} sx={{ fontSize: 28 }} />
        )}
        <Stack direction="column" spacing={0.5}>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'baseline',
            }}
          >
            <LoadingLabel
              sx={{ fontWeight: 'medium' }}
              isLoading={isSwapRoutesLoading}
            >
              {format(estimatedAmount, {
                digits: getFormatPrecision(estimatedAmount),
                decimalsRounding: 'ROUND_DOWN',
              })}
            </LoadingLabel>
            <LoadingLabel
              sx={{ color: 'text.secondary' }}
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
            { value: format(from(route?.rate ?? 0), 3) },
          )}
          isLoading={isSwapRoutesLoading}
        />
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Gas:' })}
          value={gasLabel}
          isLoading={isGasLoading}
        />
      </Stack>
    </Stack>
  );
}

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  sx: { justifyContent: 'space-between', minWidth: 120 },
  labelProps: {
    variant: 'body3',
    sx: { fontWeight: 'medium', color: 'text.secondary' },
  },
  valueProps: { sx: { fontWeight: 'medium' } },
};
