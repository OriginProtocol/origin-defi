import {
  alpha,
  Box,
  Card,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { tokens } from '@origin/shared/contracts';
import { useGasPrice, usePrices } from '@origin/shared/providers';
import {
  currencyFormat,
  formatAmount,
  quantityFormat,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { routeActionLabel } from '../constants';
import { useSwapRouteAllowance } from '../hooks';
import { useSwapState } from '../state';

import type { CardProps } from '@mui/material';

import type { EstimatedSwapRoute } from '../types';

export type SwapRouteCardProps = {
  isSelected: boolean;
  isBest: boolean;
  isLoading: boolean;
  onSelect: (route: EstimatedSwapRoute) => void;
  route: EstimatedSwapRoute;
} & Omit<CardProps, 'onSelect'>;

export function SwapRouteCard({
  isSelected,
  isBest,
  isLoading,
  onSelect,
  route,
  ...rest
}: SwapRouteCardProps) {
  const intl = useIntl();
  const [{ amountIn }] = useSwapState();
  const { data: prices } = usePrices();
  const { data: swapGasPrice, isLoading: swapGasPriceLoading } = useGasPrice(
    route.gas,
  );
  const { data: approvalGasPrice, isLoading: approvalGasPriceLoading } =
    useGasPrice(route.approvalGas);
  const { data: allowance } = useSwapRouteAllowance(route);

  const estimatedAmount = +formatUnits(
    route.estimatedAmount,
    route.tokenOut.decimals,
  );
  const convertedAmount =
    (prices?.[route.tokenOut.symbol] ?? 1) * estimatedAmount;
  const isGasLoading =
    isLoading || swapGasPriceLoading || approvalGasPriceLoading;
  const gasPrice =
    swapGasPrice?.gasCostUsd +
    (allowance < amountIn ? approvalGasPrice?.gasCostUsd : 0);

  return (
    <Card
      {...rest}
      sx={{
        paddingInline: 1.5,
        paddingBlockEnd: 2,
        paddingBlockStart: 3,
        boxShadow: 'none',
        cursor: 'pointer',
        border: (theme) => `1px solid ${theme.palette.grey[800]}`,
        borderRadius: 1,
        height: 1,
        ...(isSelected
          ? {
              background: `linear-gradient(var(--mui-palette-grey-800), var(--mui-palette-grey-800)) padding-box,
             linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%) border-box;`,
              borderColor: 'transparent',
            }
          : {
              '&:hover': {
                borderColor: 'transparent',
                background: (
                  theme,
                ) => `linear-gradient(var(--mui-palette-grey-800), var(--mui-palette-grey-800)) padding-box,
             linear-gradient(90deg, ${alpha(
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
      onClick={() => onSelect(route)}
    >
      <CardHeader
        sx={{
          padding: 0,
          borderBottom: 'none',
        }}
        title={
          <Grid2 container spacing={0.5} position="relative">
            <Grid2 display="flex" alignItems="center">
              {isLoading ? (
                <Skeleton variant="circular" width={16} height={16} />
              ) : (
                <Box
                  component="img"
                  src={tokens.mainnet.OETH.icon}
                  height={16}
                  width={16}
                  mr={0.5}
                />
              )}
            </Grid2>
            <Grid2 display="flex" alignItems="center">
              <Typography fontWeight={600}>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  formatAmount(route.estimatedAmount, route.tokenOut.decimals)
                )}
              </Typography>
            </Grid2>
            <Grid2 display="flex" alignItems="center">
              <Typography color="text.secondary" variant="body2" noWrap>
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  `(${intl.formatNumber(convertedAmount, currencyFormat)})`
                )}
              </Typography>
            </Grid2>

            {isBest && (
              <Box
                sx={{
                  position: 'absolute',
                  borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
                  background: (theme) => theme.palette.background.gradient1,
                  fontSize: (theme) => theme.typography.pxToRem(12),
                  top: (theme) => theme.spacing(-3),
                  right: (theme) => theme.spacing(-1.25),
                  paddingInline: 1,
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Best' })}
              </Box>
            )}
          </Grid2>
        }
      ></CardHeader>

      <Typography fontWeight={600} sx={{ marginBlock: { xs: 1.5, md: 1 } }}>
        {isLoading ? (
          <Skeleton width={80} />
        ) : (
          intl.formatMessage(routeActionLabel[route.action])
        )}
      </Typography>
      <Stack gap={0.5}>
        <Stack direction="row" gap={1} justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Rate:' })}
          </Typography>
          <Typography fontWeight={600}>
            {isLoading ? (
              <Skeleton width={60} />
            ) : (
              `1:${intl.formatNumber(route.rate, quantityFormat)}`
            )}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1} justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Gas:' })}
          </Typography>
          <Typography fontWeight={600}>
            {isGasLoading ? (
              <Skeleton width={60} />
            ) : (
              `~${intl.formatNumber(gasPrice, currencyFormat)}`
            )}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
