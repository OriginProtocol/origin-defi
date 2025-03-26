import { alpha, Card, Stack, SvgIcon, Typography } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { OETH } from '@origin/shared/icons';
import {
  routeEq,
  useHandleSelectSwapRoute,
  useSwapState,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import dayjs from 'dayjs';
import { add, gt, sub } from 'dnum';
import { useIntl } from 'react-intl';

import { useQueueState } from '../hooks';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { SwapRoute } from '@origin/shared/providers';

import type { Meta, OSTokenRedeemAction } from '../types';

export type RedeemActionCardProps = {
  action: OSTokenRedeemAction;
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
  const { data: queueState, isLoading: isQueueStateLoading } = useQueueState();

  const route = swapRoutes.find((r) =>
    routeEq({ tokenIn, tokenOut, action }, r),
  ) as SwapRoute<OSTokenRedeemAction, Meta>;
  const estimatedRoute = estimatedSwapRoutes.find((r) => routeEq(route, r));
  const isSelected = routeEq({ tokenIn, tokenOut, action }, selectedSwapRoute);
  const isComingSoon =
    (route as SwapRoute<OSTokenRedeemAction, Meta>)?.meta?.comingSoon ?? false;
  const routeLabel = swapActions[action].routeLabel;
  const isDisabled = isComingSoon;
  const delayLabel = route?.meta?.waitTime
    ? intl.formatMessage(route.meta.waitTime)
    : isQueueStateLoading || !queueState
      ? '-'
      : gt(
            sub(
              queueState?.vaultWSBalance,
              add(queueState?.pending, [amountIn, tokenIn.decimals]),
            ),
            0,
          )
        ? intl.formatMessage(
            {
              defaultMessage: '{value}d',
            },
            { value: dayjs.duration(queueState?.secondsDelay).asDays() },
          )
        : intl.formatMessage({ defaultMessage: '1-15d' });

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
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
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
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
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
            value={delayLabel}
            isLoading={isSwapRoutesLoading || isQueueStateLoading}
            labelInfoTooltip={intl.formatMessage({
              defaultMessage: `Withdrawals may take up to 15 days due to Sonic validators' 14-day unstaking period, but funds could be available sooner.`,
            })}
            valueProps={{
              ...valueLabelProps.valueProps,
              ...(route?.meta &&
                'waitTimeColor' in route.meta &&
                !isNilOrEmpty(route.meta.waitTimeColor) && {
                  color: route.meta.waitTimeColor as string,
                }),
            }}
          />
          <ValueLabel
            {...valueLabelProps}
            label={intl.formatMessage({ defaultMessage: 'Rate:' })}
            value={intl.formatMessage(
              { defaultMessage: '1:{rate}' },
              {
                rate: intl.formatNumber(estimatedRoute?.rate ?? 1, {
                  maximumFractionDigits: 3,
                  roundingMode: 'floor',
                }),
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
  sx: { justifyContent: 'space-between', minWidth: 120 },
  labelProps: {
    variant: 'body3',
    sx: { fontWeight: 'medium', color: 'text.secondary' },
  },
  valueProps: { sx: { fontWeight: 'medium' } },
};
