import { alpha, Card, Stack, SvgIcon, Typography } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { OETH } from '@origin/shared/icons';
import {
  routeEq,
  useHandleSelectSwapRoute,
  useIsSwapRouteAvailable,
  useSwapState,
} from '@origin/shared/providers';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import type { CardProps, TypographyProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { EstimatedSwapRoute, SwapRoute } from '@origin/shared/providers';

import type { Meta, OethRedeemAction } from '../types';

export type RedeemActionCardProps = {
  action: OethRedeemAction;
} & Omit<CardProps, 'onSelect'>;

export const RedeemActionCard = ({
  action,
  ...rest
}: RedeemActionCardProps) => {
  const intl = useIntl();
  const [
    {
      amountIn,
      tokenIn,
      tokenOut,
      isSwapRoutesLoading,
      selectedSwapRoute,
      estimatedSwapRoutes,
      swapRoutes,
      swapActions,
    },
  ] = useSwapState();
  const handleSelectSwapRoute = useHandleSelectSwapRoute();
  const route = swapRoutes.find((r) =>
    routeEq({ tokenIn, tokenOut, action }, r),
  );
  const { data: isRouteAvailable, isLoading: isRouteAvailableLoading } =
    useIsSwapRouteAvailable(route);
  const estimatedRoute = estimatedSwapRoutes.find((r) => routeEq(r, route));
  const isSelected = routeEq({ tokenIn, tokenOut, action }, selectedSwapRoute);
  const isEmptyValue = amountIn === 0n;
  const isComingSoon =
    (route as SwapRoute<OethRedeemAction, Meta>)?.meta?.comingSoon ?? false;
  const routeLabel = swapActions[action].routeLabel;
  const isDisabled =
    isComingSoon || (!isRouteAvailableLoading && !isRouteAvailable);

  return (
    <Card
      {...rest}
      sx={{
        position: 'relative',
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.highlight',
        ...(amountIn > 0n &&
          !isComingSoon && {
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }),
        ...(isSelected && {
          borderColor: 'primary.main',
        }),
        ...rest?.sx,
      }}
      role="button"
      onClick={() => {
        if (!isDisabled && amountIn > 0n) {
          handleSelectSwapRoute(route as unknown as EstimatedSwapRoute);
        }
      }}
    >
      {isComingSoon && (
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            background: (theme) =>
              alpha(theme.palette.background.highlight, 0.8),
            backdropFilter: 'blur(px)',
          }}
        >
          <Typography
            sx={{
              color: (theme) =>
                theme.palette.getContrastText(
                  theme.palette.background.highlight,
                ),
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Coming soon' })}
          </Typography>
        </Stack>
      )}
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
            {intl.formatMessage(routeLabel ?? { defaultMessage: 'Route' })}
          </Typography>
          <SvgIcon
            component={
              (route as SwapRoute<OethRedeemAction, Meta>)?.meta?.icon ?? OETH
            }
            sx={{ fontSize: 20 }}
          />
        </Stack>
        <Stack spacing={1.25}>
          <ValueLabel
            {...valueLabelProps}
            label={intl.formatMessage({ defaultMessage: 'Wait time:' })}
            value={
              isEmptyValue ? (
                <EmptyValue />
              ) : (
                intl.formatMessage(
                  (route as SwapRoute<OethRedeemAction, Meta>)?.meta
                    ?.waitTime ?? { defaultMessage: '~1 min' },
                )
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
                  {
                    rate: format(from(estimatedRoute?.rate ?? 0), 3),
                  },
                )
              )
            }
            isLoading={isSwapRoutesLoading}
          />
        </Stack>
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
