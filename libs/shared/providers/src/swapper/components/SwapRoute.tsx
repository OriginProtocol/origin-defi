import { Collapse, Skeleton, Stack, Typography } from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useSwapState } from '../state';
import { BestRoutes } from './BestRoutes';
import { SwapRouteAccordion } from './SwapRouteAccordion';

import type { CardProps } from '@mui/material';

export function SwapRoute(props: Omit<CardProps, 'children'>) {
  const intl = useIntl();
  const [{ estimatedSwapRoutes, isSwapRoutesLoading }] = useSwapState();

  const hasContent = estimatedSwapRoutes.length > 0;

  return (
    <Stack
      {...props}
      sx={{
        backgroundColor: 'grey.900',
        borderRadius: 1,
        padding: 2,
        ...props?.sx,
      }}
    >
      {isSwapRoutesLoading ? (
        <Stack direction="row" alignItems="center" gap={1}>
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
        >
          {intl.formatMessage({ defaultMessage: 'Route' })}
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The best swap route factors in the best price after transaction costs',
            })}
          />
        </Stack>
      )}
      <Collapse in={hasContent} sx={{ pt: hasContent ? 2 : 0 }}>
        <BestRoutes />
        {estimatedSwapRoutes.length > 2 && (
          <SwapRouteAccordion sx={{ mt: 2 }} />
        )}
      </Collapse>
    </Stack>
  );
}
