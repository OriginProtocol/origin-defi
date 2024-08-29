import { alpha, Skeleton, Stack, Typography } from '@mui/material';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { getFormatPrecision } from '@origin/shared/utils';
import { add, format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';

import { useGasPrice } from '../../gas';
import { getTokenPriceKey } from '../../prices';
import { useSwapperPrices, useSwapRouteAllowance } from '../hooks';
import { useSwapState } from '../state';

import type { Dnum } from 'dnum';

import type { EstimatedSwapRoute } from '../types';

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
    route.estimatedAmount,
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
  const routeLabel = swapActions[route.action].routeLabel;

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      gap={1}
      sx={[
        {
          borderRadius: 1,
          backgroundColor: 'background.paper',
          border: '1px solid',
          px: 2,
          py: 1,
        },
        isSelected
          ? {
              borderColor: 'transparent',
              background: (theme) =>
                `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}) padding-box,
            linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
            }
          : {
              borderColor: 'grey.800',
              ':hover': {
                borderColor: 'transparent',
                background: (theme) =>
                  `linear-gradient(${theme.palette.grey[800]}, ${
                    theme.palette.grey[800]
                  }) padding-box,
            linear-gradient(90deg, ${alpha(
              theme.palette.primary.main,
              0.4,
            )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
              },
            },
      ]}
      onClick={() => onSelect(route)}
      role="button"
    >
      <Stack direction="row" alignItems="center" gap={1}>
        {isSwapRoutesLoading ? (
          <Skeleton variant="circular" width={24} height={24} />
        ) : (
          <TokenIcon token={route.tokenOut} />
        )}
        <Stack
          direction={{ xs: 'row', sm: 'column' }}
          spacing={{ xs: 1, sm: 0 }}
        >
          <Stack direction="row" spacing={0.5} alignItems="baseline">
            <LoadingLabel variant="body2" isLoading={isSwapRoutesLoading}>
              {format(
                [route.estimatedAmount ?? 0n, route.tokenOut.decimals],
                getFormatPrecision([
                  route.estimatedAmount ?? 0n,
                  route.tokenOut.decimals,
                ]),
              )}
            </LoadingLabel>
            <LoadingLabel
              variant="body2"
              color="text.secondary"
              isLoading={isSwapRoutesLoading}
            >
              (${format(convertedAmount, 2)})
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
            fontWeight={500}
            isLoading={isSwapRoutesLoading}
            sWidth={50}
          >
            1:{format(from(route?.rate ?? 0), 3)}
          </LoadingLabel>
        </Stack>
        <Stack direction="row" spacing={0.75} justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Est gas:' })}
          </Typography>
          <LoadingLabel
            variant="body2"
            fontWeight={500}
            isLoading={isGasLoading}
            sWidth={40}
          >
            ~${format(gasPrice, 2)}
          </LoadingLabel>
        </Stack>
      </Stack>
    </Stack>
  );
}
