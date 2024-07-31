import { Box, Card, Skeleton, Stack } from '@mui/material';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import {
  getTokenPriceKey,
  useGasPrice,
  useSwapperPrices,
  useSwapRouteAllowance,
  useSwapState,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { add, format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { EstimatedSwapRoute } from '@origin/shared/providers';
import type { Dnum } from 'dnum';

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
    <Card
      {...rest}
      sx={{
        px: 2,
        pb: 2,
        pt: 3,
        cursor: 'pointer',
        position: 'relative',
        boxShadow: 'none',
        height: 1,
        borderWidth: 1,
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.default',
        '&:hover': {
          borderColor: 'primary.main',
        },
        ...(isSelected && {
          borderColor: 'primary.main',
          backgroundColor: 'background.highlight',
        }),
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
            py: 0.25,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Best' })}
        </Box>
      )}
      <Stack height={1} useFlexGap>
        <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
          {isSwapRoutesLoading ? (
            <Skeleton variant="circular" width={20} height={20} />
          ) : (
            <TokenIcon token={tokenOut} sx={{ fontSize: 20 }} />
          )}
          <LoadingLabel
            fontWeight="bold"
            isLoading={isSwapRoutesLoading}
            sWidth={100}
          >
            {format(estimatedAmount, {
              digits: getFormatPrecision(estimatedAmount),
              decimalsRounding: 'ROUND_DOWN',
            })}
          </LoadingLabel>
        </Stack>
        <LoadingLabel
          color="text.secondary"
          noWrap
          isLoading={isSwapRoutesLoading}
          sWidth={60}
        >
          (${format(convertedAmount, 2)})
        </LoadingLabel>
        <LoadingLabel
          fontWeight="medium"
          noWrap
          isLoading={isSwapRoutesLoading}
          sWidth={60}
          my={1.25}
        >
          {intl.formatMessage(routeLabel)}
        </LoadingLabel>
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Rate:' })}
          value={intl.formatMessage(
            { defaultMessage: '1:{value}' },
            { value: format(from(route?.rate ?? 0), 3) },
          )}
          isLoading={isSwapRoutesLoading}
          mb={0.5}
        />
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Gas:' })}
          value={intl.formatMessage(
            { defaultMessage: '~{value}' },
            { value: `$${format(gasPrice, 2)}` },
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
  labelProps: {
    variant: 'body3',
    fontWeight: 'medium',
    color: 'text.secondary',
  },
  valueProps: { fontWeight: 'medium' },
};
