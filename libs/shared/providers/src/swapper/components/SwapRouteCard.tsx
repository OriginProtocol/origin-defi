import { alpha, Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  currencyFormat,
  formatAmount,
  quantityFormat,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useGasPrice } from '../../gas';
import { usePrices } from '../../prices';
import { useSwapRouteAllowance } from '../hooks';
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
  const [{ amountIn, tokenOut, isSwapRoutesLoading, swapActions }] =
    useSwapState();
  const { data: prices } = usePrices();
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
    (prices?.[route.tokenOut.symbol] ?? 1) * estimatedAmount;
  const isGasLoading =
    isSwapRoutesLoading ||
    (swapGasPriceLoading && swapGasPriceFetching) ||
    (approvalGasPriceLoading && approvalGasPriceFetching);
  const gasPrice =
    (swapGasPrice?.gasCostUsd ?? 0) +
    (allowance < amountIn ? approvalGasPrice?.gasCostUsd ?? 0 : 0);
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
              <Box
                component="img"
                src={tokenOut.icon}
                height={16}
                width={16}
                display="flex"
                alignItems="center"
                justifyContent="center"
              />
            )}
          </Grid2>
          <Grid2 display="flex" alignItems="center">
            <Typography fontWeight={500}>
              {isSwapRoutesLoading ? (
                <Skeleton width={100} />
              ) : (
                formatAmount(route.estimatedAmount, route.tokenOut.decimals)
              )}
            </Typography>
          </Grid2>
          <Grid2 display="flex" alignItems="center" xs={12} sm="auto">
            <Typography color="text.secondary" variant="body2" noWrap>
              {isSwapRoutesLoading ? (
                <Skeleton width={60} />
              ) : (
                `(${intl.formatNumber(convertedAmount, currencyFormat)})`
              )}
            </Typography>
          </Grid2>
        </Grid2>
        <Stack justifyContent="space-between" height={1}>
          <Typography
            fontWeight={500}
            sx={{ fontSize: 12, marginBlock: { xs: 1.5, md: 1 } }}
          >
            {isSwapRoutesLoading ? (
              <Skeleton width={80} />
            ) : (
              intl.formatMessage(routeLabel)
            )}
          </Typography>
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
              <Typography variant="body2" fontWeight={500}>
                {isSwapRoutesLoading ? (
                  <Skeleton width={60} />
                ) : (
                  `1:${intl.formatNumber(route.rate, quantityFormat)}`
                )}
              </Typography>
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
              <Typography variant="body2" fontWeight={500}>
                {isGasLoading ? (
                  <Skeleton width={60} />
                ) : (
                  `~${intl.formatNumber(gasPrice, currencyFormat)}`
                )}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
