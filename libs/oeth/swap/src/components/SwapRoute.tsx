import { useState } from 'react';

import { Skeleton, Stack, Typography } from '@mui/material';
import { Card, cardStyles } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { BestRoutes } from './BestRoutes';
import { SwapInfo } from './SwapInfo';
import { SwapRouteAccordion } from './SwapRouteAccordion';

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

interface Props {
  isLoading: boolean;
  routes: Route[];
}

export function SwapRoute({ isLoading = false, routes }: Props) {
  const intl = useIntl();
  const [selectedRoute, setSelectedRoute] = useState(0);

  const hasContent = routes.length > 0;
  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: (theme) => theme.palette.background.default,
        backgroundColor: 'grey.900',
      }}
      title={
        isLoading ? (
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
          <BestRoutes
            routes={routes}
            selected={selectedRoute}
            onSelect={(index) => setSelectedRoute(index)}
          />
          <SwapRouteAccordion
            routes={routes}
            selected={selectedRoute}
            onSelect={(index) => setSelectedRoute(index)}
            sx={{ mt: 2 }}
          />
        </>
      ) : undefined}
    </Card>
  );
}
