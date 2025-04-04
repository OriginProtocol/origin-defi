import { Box, Card, Skeleton, Stack } from '@mui/material';
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
  const gasLabel = lt(gasPrice, from(0.01, 18))
    ? `<$0.01`
    : `~$${format(gasPrice, 2)}`;
  const routeLabel = swapActions[route.action].routeLabel;

  return (
    <Card
      {...rest}
      sx={[
        {
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
        },
        isSelected && {
          borderColor: 'primary.main',
          backgroundColor: 'background.highlight',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
      role="button"
      onClick={() => {
        onSelect(route);
      }}
    >
      {isBest && (
        <Box
          sx={(theme) => ({
            position: 'absolute',
            borderBottomLeftRadius: theme.shape.borderRadius,
            color: 'primary.contrastText',
            backgroundColor: 'primary.main',
            fontSize: 12,
            top: 0,
            right: 0,
            px: 1,
            py: 0.25,
          })}
        >
          {intl.formatMessage({ defaultMessage: 'Best' })}
        </Box>
      )}
      <Stack
        useFlexGap
        sx={{
          height: 1,
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: 'center',
            mb: 0.5,
          }}
        >
          {isSwapRoutesLoading ? (
            <Skeleton variant="circular" width={20} height={20} />
          ) : (
            <TokenIcon token={tokenOut} sx={{ fontSize: 20 }} />
          )}
          <LoadingLabel
            sx={{ fontWeight: 'bold' }}
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
          sx={{ color: 'text.secondary' }}
          noWrap
          isLoading={isSwapRoutesLoading}
          sWidth={60}
        >
          (${format(convertedAmount, 2)})
        </LoadingLabel>
        <LoadingLabel
          noWrap
          isLoading={isSwapRoutesLoading}
          sWidth={60}
          sx={{ color: 'primary.main', fontWeight: 'medium', my: 1.25 }}
        >
          {intl.formatMessage(routeLabel)}
        </LoadingLabel>
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Rate:' })}
          value={intl.formatMessage(
            { defaultMessage: '1:{value}' },
            {
              value:
                route.rate < 0.001
                  ? '<0.001'
                  : intl.formatNumber(route.rate, {
                      maximumFractionDigits: 3,
                      minimumFractionDigits: 3,
                    }),
            },
          )}
          isLoading={isSwapRoutesLoading}
          sx={{ ...valueLabelProps.sx, mb: 0.5 }}
        />
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Gas:' })}
          value={gasLabel}
          isLoading={isGasLoading}
        />
      </Stack>
    </Card>
  );
}

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  sx: { justifyContent: 'space-between' },
  labelProps: {
    variant: 'body3',
    sx: { fontWeight: 'medium', color: 'text.secondary' },
  },
  valueProps: { sx: { fontWeight: 'medium' } },
};
