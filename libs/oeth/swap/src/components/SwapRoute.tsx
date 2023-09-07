import { Skeleton, Stack, Typography } from '@mui/material';
import { Card, cardStyles } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useSwapState } from '../state';
import { BestRoutes } from './BestRoutes';
import { SwapInfo } from './SwapInfo';
import { SwapRouteAccordion } from './SwapRouteAccordion';

import type { CardProps } from '@mui/material';

import type { EstimatedSwapRoute } from '../types';

interface Swap {
  type: 'swap';
}
export interface Redeem {
  type: 'redeem';
  tokenAbbreviation: string;
  waitTime: string;
}

export type Route = {
  name: string;
  icon: string | string[];
  quantity: number;
  value: number;
  rate: number;
  transactionCost: number;
} & (Swap | Redeem);

export type SwapRouteProps = {
  isLoading: boolean;
  routes: EstimatedSwapRoute[];
};

export function SwapRoute(props: Omit<CardProps, 'children'>) {
  const intl = useIntl();
  const [{ swapRoutes, isSwapRoutesLoading }] = useSwapState();

  const hasContent = swapRoutes.length > 0;

  return (
    <Card
      {...props}
      sx={{
        border: '1px solid',
        borderColor: (theme) => theme.palette.background.default,
        backgroundColor: 'grey.900',
        borderRadius: 1,
        ...props?.sx,
      }}
      title={
        isSwapRoutesLoading ? (
          <Typography
            color="primary.contrastText"
            sx={{
              fontSize: (theme) => theme.typography.pxToRem(12),
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Skeleton
              variant="circular"
              width="0.5rem"
              height="0.5rem"
              sx={{
                mr: 1.5,
                backgroundColor: (theme) => theme.palette.primary.contrastText,
              }}
            />
            {intl.formatMessage({
              defaultMessage: 'Finding the best route...',
            })}
          </Typography>
        ) : (
          <Stack
            direction="row"
            gap={0.5}
            component={Typography}
            variant="body2"
            alignItems="center"
            color="primary.contrastText"
          >
            {intl.formatMessage({ defaultMessage: 'Route' })}
            <SwapInfo />
          </Stack>
        )
      }
      sxCardTitle={{ borderBottom: 'none', paddingBlock: 1, paddingInline: 2 }}
      sxCardContent={{
        ...(hasContent
          ? cardStyles
          : {
              p: 0,
              paddingBlock: 0,
              paddingInline: 0,
              '&:last-child': { pb: 0 },
            }),
      }}
    >
      {hasContent ? (
        <>
          <BestRoutes />
          <SwapRouteAccordion sx={{ mt: 2 }} />
        </>
      ) : undefined}
    </Card>
  );
}
