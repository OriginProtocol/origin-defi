import { alpha, Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useGasPrice } from '../../gas';
import { useFormat } from '../../intl';
import { getTokenPriceKey } from '../../prices';
import { useSwapperPrices, useSwapRouteAllowance } from '../hooks';
import { useSwapState } from '../state';

import type { CardProps } from '@mui/material';

import type { EstimatedSwapRoute } from '../types';

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
  } = useGasPrice(route.gas, {
    refetchInterval: 30e3,
    enabled: route.gas > 0n,
  });
  const {
    data: approvalGasPrice,
    isLoading: approvalGasPriceLoading,
    isFetching: approvalGasPriceFetching,
  } = useGasPrice(route.approvalGas, {
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
        pt: 3,
        cursor: 'pointer',
        border: `1px solid transparent`,
        position: 'relative',
        boxShadow: 'none',
        height: 1,
        ...(isSelected
          ? {
              borderColor: 'transparent',
              background: (theme) =>
                `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
            }
          : {
              borderColor: 'grey.800',
              '&:hover': {
                borderColor: `transparent`,
                background: (theme) =>
                  `linear-gradient(${theme.palette.grey['800']}, ${
                    theme.palette.grey['800']
                  }) padding-box, linear-gradient(90deg, ${alpha(
                    theme.palette.primary.main,
                    0.4,
                  )} 0%, ${alpha(
                    theme.palette.primary.dark,
                    0.4,
                  )} 100%) border-box;`,
              },
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
            background:
              'linear-gradient(90deg,#8c66fc -28.99%,#0274f1 144.97%)',
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
      <Stack height={1}>
        <Grid2 container spacing={0.5}>
          <Grid2 display="flex" alignItems="center">
            {isSwapRoutesLoading ? (
              <Skeleton variant="circular" width={16} height={16} />
            ) : (
              <TokenIcon token={tokenOut} sx={{ fontSize: 16 }} />
            )}
          </Grid2>
          <Grid2 display="flex" alignItems="center">
            <LoadingLabel
              fontWeight={500}
              isLoading={isSwapRoutesLoading}
              sWidth={100}
            >
              {formatAmount(route.estimatedAmount, route.tokenOut.decimals)}
            </LoadingLabel>
          </Grid2>
          <Grid2 display="flex" alignItems="center" xs={12} sm="auto">
            <LoadingLabel
              color="text.secondary"
              variant="body2"
              noWrap
              isLoading={isSwapRoutesLoading}
              sWidth={60}
            >
              ({formatCurrency(convertedAmount)})
            </LoadingLabel>
          </Grid2>
        </Grid2>
        <Stack justifyContent="space-between" height={1}>
          <LoadingLabel
            fontWeight={500}
            sx={{ fontSize: 12, my: { xs: 1.5, md: 1 } }}
            isLoading={isSwapRoutesLoading}
            sWidth={80}
          >
            {intl.formatMessage(routeLabel)}
          </LoadingLabel>
          <Stack gap={0.5}>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Rate:' })}
              </Typography>
              <LoadingLabel
                variant="body2"
                fontWeight={500}
                isLoading={isSwapRoutesLoading}
                sWidth={60}
              >
                1:{formatQuantity(route.rate)}
              </LoadingLabel>
            </Stack>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Gas:' })}
              </Typography>
              <LoadingLabel
                variant="body2"
                fontWeight={500}
                isLoading={isGasLoading}
              >
                ~{formatCurrency(gasPrice)}
              </LoadingLabel>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
