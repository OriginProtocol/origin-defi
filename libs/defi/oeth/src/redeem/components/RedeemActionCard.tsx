import { alpha, Card, Stack, SvgIcon, Typography } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { OETH } from '@origin/shared/icons';
import {
  routeEq,
  useHandleSelectSwapRoute,
  useIsSwapRouteAvailable,
  useSwapState,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { SwapRoute } from '@origin/shared/providers';

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
      swapRoutes,
      swapActions,
      estimatedSwapRoutes,
    },
  ] = useSwapState();
  const handleSelectSwapRoute = useHandleSelectSwapRoute();

  const route = swapRoutes.find((r) =>
    routeEq({ tokenIn, tokenOut, action }, r),
  ) as SwapRoute<OethRedeemAction, Meta>;
  const { data: isRouteAvailable, isLoading: isRouteAvailableLoading } =
    useIsSwapRouteAvailable(route);
  const estimatedRoute = estimatedSwapRoutes.find((r) => routeEq(route, r));
  const isSelected = routeEq({ tokenIn, tokenOut, action }, selectedSwapRoute);
  const isComingSoon =
    (route as SwapRoute<OethRedeemAction, Meta>)?.meta?.comingSoon ?? false;
  const routeLabel = swapActions[action].routeLabel;
  const isDisabled =
    !isRouteAvailable || isRouteAvailableLoading || isComingSoon;

  return (
    <Card
      {...rest}
      sx={[
        {
          position: 'relative',
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.highlight',
          ...rest?.sx,
        },
        isDisabled
          ? { opacity: 0.5, cursor: 'default' }
          : isSelected
            ? {
                borderColor: 'primary.main',
                backgroundColor: 'background.highlight',
              }
            : amountIn > 0n
              ? {
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }
              : {},
      ]}
      role="button"
      onClick={() => {
        if (!isDisabled && estimatedRoute && amountIn > 0n) {
          handleSelectSwapRoute(estimatedRoute);
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
            sx={(theme) => ({
              color: theme.palette.getContrastText(
                theme.palette.background.highlight,
              ),
            })}
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
            component={route?.meta?.icon ?? OETH}
            sx={{ fontSize: 20 }}
          />
        </Stack>
        <Stack spacing={1.25}>
          <ValueLabel
            {...valueLabelProps}
            label={intl.formatMessage({ defaultMessage: 'Wait time:' })}
            value={intl.formatMessage(
              route?.meta?.waitTime ?? {
                defaultMessage: '~1 min',
              },
            )}
            valueProps={{
              ...valueLabelProps.valueProps,
              ...(route?.meta &&
                'waitTimeColor' in route.meta &&
                !isNilOrEmpty(route.meta.waitTimeColor) && {
                  color: route.meta.waitTimeColor as string,
                }),
            }}
            isLoading={isSwapRoutesLoading}
          />
          <ValueLabel
            {...valueLabelProps}
            label={intl.formatMessage({ defaultMessage: 'Rate:' })}
            value={intl.formatMessage(
              { defaultMessage: '1:{rate}' },
              {
                rate: 1,
              },
            )}
            isLoading={isSwapRoutesLoading}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

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
