import { Box, Card, Skeleton, Stack } from '@mui/material';
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

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { EstimatedSwapRoute } from '@origin/shared/providers';

export type SwapRouteCardProps = {
  isSelected: boolean;
  isBest: boolean;
  onSelect: (route: EstimatedSwapRoute) => void;
  route: EstimatedSwapRoute;
} & Omit<CardProps, 'onSelect'>;

export function SwapRouteCard({
  isSelected,
  isBest,
  onSelect,
  route,
  ...rest
}: SwapRouteCardProps) {
  const intl = useIntl();
  const { formatAmount, formatCurrency, formatQuantity } = useFormat();
  const [{ amountIn, tokenOut, isSwapRoutesLoading, swapActions }] =
    useSwapState();
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
    <Card
      {...rest}
      sx={{
        px: 1.5,
        pb: 2,
        pt: 3.5,
        cursor: 'pointer',
        position: 'relative',
        boxShadow: 'none',
        height: 1,
        borderWidth: 1,
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        '&:hover': {
          borderColor: 'primary.main',
        },
        ...(isSelected && { borderColor: 'primary.main' }),
        ...rest?.sx,
      }}
      role="button"
      onClick={() => {
        onSelect(route);
      }}
    >
      {isBest && (
        <Box
          sx={{
            position: 'absolute',
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
            color: 'primary.contrastText',
            backgroundColor: 'primary.main',
            fontSize: 12,
            top: 0,
            right: 0,
            px: 1,
            pt: 0.25,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Best' })}
        </Box>
      )}
      <Stack height={1} spacing={1.25}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={0.5}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            {isSwapRoutesLoading ? (
              <Skeleton variant="circular" width={24} height={24} />
            ) : (
              <TokenIcon token={tokenOut} sx={{ fontSize: 24 }} />
            )}
            <LoadingLabel
              fontWeight="medium"
              isLoading={isSwapRoutesLoading}
              sWidth={100}
            >
              {formatAmount(route.estimatedAmount, route.tokenOut.decimals)}
            </LoadingLabel>
          </Stack>
          <LoadingLabel
            color="text.secondary"
            noWrap
            isLoading={isSwapRoutesLoading}
            sWidth={60}
          >
            {formatCurrency(convertedAmount)}
          </LoadingLabel>
        </Stack>
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Route:' })}
          value={intl.formatMessage(routeLabel)}
          isLoading={isSwapRoutesLoading}
        />
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
    </Card>
  );
}

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  justifyContent: 'space-between',
  labelProps: { variant: 'mono' },
  valueProps: { fontWeight: 'medium' },
};
