import { Card, Stack, Typography } from '@mui/material';
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

import type { OethRedeemAction } from '../types';

export type RedeemActionCardProps = {
  action: OethRedeemAction;
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
  } = useGasPrice(estimatedRoute?.gas, estimatedRoute?.tokenIn.chainId, {
    refetchInterval: 30e3,
    enabled: !!estimatedRoute && estimatedRoute?.gas > 0n,
  });
  const {
    data: approvalGasPrice,
    isLoading: approvalGasPriceLoading,
    isFetching: approvalGasPriceFetching,
  } = useGasPrice(
    estimatedRoute?.approvalGas,
    estimatedRoute?.tokenIn.chainId,
    {
      refetchInterval: 30e3,
      enabled: !!estimatedRoute && estimatedRoute?.approvalGas > 0n,
    },
  );
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
        borderWidth: 1,
        borderColor: 'divider',
        ...(amountIn > 0n && {
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }),
        ...(isDisabled
          ? { opacity: 0.5, cursor: 'default' }
          : isSelected
            ? { borderColor: 'primary.main' }
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
              <Typography {...labelProps}>
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
              <Typography {...labelProps}>
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
              <Typography {...labelProps}>
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
  sx: {
    gap: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

const labelProps: TypographyProps = {
  color: 'text.secondary',
};
