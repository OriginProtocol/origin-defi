import { Collapse, Skeleton, Stack, Typography } from '@mui/material';
import { Card, cardStyles } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useSwapState } from '../state';
import { BestRoutes } from './BestRoutes';
import { SwapInfo } from './SwapInfo';
import { SwapRouteAccordion } from './SwapRouteAccordion';

import type { CardProps } from '@mui/material';

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
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={(theme) => ({ color: theme.palette.primary.contrastText })}
          >
            <Skeleton
              variant="circular"
              width="0.5rem"
              height="0.5rem"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.contrastText,
              }}
            />
            <Typography variant="body2">
              {intl.formatMessage({
                defaultMessage: 'Finding the best route...',
              })}
            </Typography>
          </Stack>
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
      <Collapse in={hasContent}>
        <BestRoutes />
        {swapRoutes.length > 2 && <SwapRouteAccordion sx={{ mt: 2 }} />}
      </Collapse>
    </Card>
  );
}
