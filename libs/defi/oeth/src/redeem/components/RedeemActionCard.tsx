import { Card, Stack, Typography } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
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

import type { CardProps, TypographyProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

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
        p: 2,
        border: '1px solid',
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
            ? {
                borderColor: 'primary.main',
                backgroundColor: 'background.highlight',
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
      <Stack useFlexGap>
        <Stack
          direction="row"
          sx={{
            gap: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
          }}
        >
          <Typography fontWeight={500}>
            {intl.formatMessage(routeLabel)}
          </Typography>
          {action === 'redeem-vault' ? (
            <Origin sx={{ fontSize: 20 }} />
          ) : (
            <Curve sx={{ fontSize: 20 }} />
          )}
        </Stack>
        {isDisabled ? (
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage: 'Larger redemptions coming soon',
            })}
          </Typography>
        ) : (
          <Stack spacing={1.25}>
            <ValueLabel
              {...valueLabelProps}
              label={intl.formatMessage({ defaultMessage: 'Wait time:' })}
              value={
                isEmptyValue ? (
                  <EmptyValue />
                ) : (
                  intl.formatMessage({ defaultMessage: '~1min' })
                )
              }
              isLoading={isSwapRoutesLoading}
            />
            <ValueLabel
              {...valueLabelProps}
              label={intl.formatMessage({ defaultMessage: 'Rate:' })}
              value={
                isEmptyValue ? (
                  <EmptyValue />
                ) : (
                  intl.formatMessage(
                    { defaultMessage: '1:{rate}' },
                    { rate: formatQuantity(estimatedRoute?.rate) },
                  )
                )
              }
              isLoading={isSwapRoutesLoading}
            />
            <ValueLabel
              {...valueLabelProps}
              label={intl.formatMessage({ defaultMessage: 'Gas:' })}
              value={
                isEmptyValue ? (
                  <EmptyValue />
                ) : (
                  intl.formatMessage(
                    { defaultMessage: '~{value}' },
                    { value: formatCurrency(gasPrice) },
                  )
                )
              }
              isLoading={isGasLoading}
            />
          </Stack>
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

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  justifyContent: 'space-between',
  labelProps: {
    variant: 'body3',
    fontWeight: 'medium',
    color: 'text.secondary',
  },
  valueProps: { fontWeight: 'medium' },
  minWidth: 120,
};
