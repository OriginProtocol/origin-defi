import { alpha, Card, Stack, Typography } from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { Curve, Origin } from '@origin/shared/icons';
import {
  routeEq,
  useFormat,
  useGasPrice,
  useHandleSelectSwapRoute,
  useIsSwapRouteAvailable,
  useSwapRouteAllowance,
  useSwapState,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import type { CardProps, StackProps, TypographyProps } from '@mui/material';

import type { RedeemAction } from '../types';

export type RedeemActionCardProps = {
  action: RedeemAction;
} & Omit<CardProps, 'onSelect'>;

export const RedeemActionCard = ({
  action,
  ...rest
}: RedeemActionCardProps) => {
  const intl = useIntl();
  const { formatCurrency, formatQuantity } = useFormat();
  const [
    {
      amountIn,
      tokenIn,
      tokenOut,
      isSwapRoutesLoading,
      swapRoutes,
      swapActions,
      selectedSwapRoute,
      estimatedSwapRoutes,
    },
  ] = useSwapState();
  const handleSelectSwapRoute = useHandleSelectSwapRoute();

  const route = swapRoutes.find((r) =>
    routeEq({ tokenIn, tokenOut, action }, r),
  );
  const estimatedRoute = estimatedSwapRoutes.find((r) => routeEq(route, r));

  const {
    data: swapGasPrice,
    isLoading: swapGasPriceLoading,
    isFetching: swapGasPriceFetching,
  } = useGasPrice(estimatedRoute?.gas, {
    refetchInterval: 30e3,
    enabled: !!estimatedRoute && estimatedRoute?.gas > 0n,
  });
  const {
    data: approvalGasPrice,
    isLoading: approvalGasPriceLoading,
    isFetching: approvalGasPriceFetching,
  } = useGasPrice(estimatedRoute?.approvalGas, {
    refetchInterval: 30e3,
    enabled: !!estimatedRoute && estimatedRoute?.approvalGas > 0n,
  });
  const { data: allowance } = useSwapRouteAllowance(route);
  const { data: isRouteAvailable, isLoading: isRouteAvailableLoading } =
    useIsSwapRouteAvailable(route);

  const isSelected = routeEq(selectedSwapRoute, route);
  const isEmptyValue = isNilOrEmpty(estimatedRoute) || amountIn === 0n;
  const isGasLoading =
    isSwapRoutesLoading ||
    (swapGasPriceLoading && swapGasPriceFetching) ||
    (approvalGasPriceLoading && approvalGasPriceFetching);
  const gasPrice =
    (swapGasPrice?.gasCostUsd ?? 0) +
    ((allowance ?? 0n) < amountIn ? approvalGasPrice?.gasCostUsd ?? 0 : 0);
  const routeLabel = swapActions[action].routeLabel;
  const isDisabled = !isRouteAvailableLoading && !isRouteAvailable;

  return (
    <Card
      {...rest}
      sx={{
        px: 1.5,
        py: 2,
        border: `1px solid`,
        borderColor: 'grey.800',
        boxShadow: 'none',
        ...(isDisabled
          ? { opacity: 0.5, cursor: 'default' }
          : isSelected
            ? {
                cursor: 'pointer',
                borderColor: 'transparent',
                background: (theme) =>
                  `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
              }
            : amountIn > 0n
              ? {
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'grey.600',
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
                }
              : {}),
        ...rest?.sx,
      }}
      role="button"
      onClick={() => {
        if (!isDisabled && estimatedRoute && amountIn > 0n) {
          handleSelectSwapRoute(estimatedRoute);
        }
      }}
    >
      <Stack spacing={0.5}>
        <Stack {...rowProps} pb={0.5}>
          <Typography fontWeight={500}>
            {intl.formatMessage(routeLabel)}
          </Typography>
          {action === 'redeem-vault' ? (
            <Origin sx={{ fontSize: 16 }} />
          ) : (
            <Curve sx={{ fontSize: 16 }} />
          )}
        </Stack>
        {isDisabled ? (
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage: 'Larger redemptions coming soon',
            })}
          </Typography>
        ) : (
          <>
            <Stack {...rowProps}>
              <Typography color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Wait time:' })}
              </Typography>
              {isEmptyValue ? (
                <EmptyValue />
              ) : (
                <LoadingLabel isLoading={isSwapRoutesLoading} sWidth={60}>
                  {intl.formatMessage({ defaultMessage: '~1min' })}
                </LoadingLabel>
              )}
            </Stack>
            <Stack {...rowProps}>
              <Typography color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Rate:' })}
              </Typography>
              {isEmptyValue ? (
                <EmptyValue />
              ) : (
                <LoadingLabel isLoading={isSwapRoutesLoading} sWidth={60}>
                  1:{formatQuantity(estimatedRoute?.rate)}
                </LoadingLabel>
              )}
            </Stack>
            <Stack {...rowProps}>
              <Typography color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Gas:' })}
              </Typography>
              {isEmptyValue ? (
                <EmptyValue />
              ) : (
                <LoadingLabel isLoading={isGasLoading}>
                  ~{formatCurrency(gasPrice)}
                </LoadingLabel>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
};

function EmptyValue(props: TypographyProps) {
  return (
    <Typography color="text.secondary" pr={0.5} {...props}>
      -
    </Typography>
  );
}

const rowProps: StackProps = {
  direction: 'row',
  gap: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
};
