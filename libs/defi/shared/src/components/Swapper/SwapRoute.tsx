import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { useSwapState } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import { BestRoutes } from './BestRoutes';
import { SwapRouteAccordion } from './SwapRouteAccordion';

import type { AccordionProps } from '@mui/material';

export function SwapRoute(
  props: Omit<AccordionProps, 'children' | 'expanded'>,
) {
  const intl = useIntl();
  const [{ estimatedSwapRoutes, isSwapRoutesLoading }] = useSwapState();

  return (
    <Accordion
      {...props}
      expanded={estimatedSwapRoutes.length > 0}
      sx={{
        px: 2,
        py: 0,
        backgroundColor: 'grey.900',
        borderRadius: 1,
        ...props?.sx,
      }}
      disableGutters
    >
      <AccordionSummary
        sx={{ p: 0, '&&.MuiAccordionSummary-root': { cursor: 'default' } }}
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
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 1, pb: 2, px: 0 }}>
        <BestRoutes />
        {estimatedSwapRoutes.length > 2 && (
          <SwapRouteAccordion sx={{ mt: 2 }} />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
