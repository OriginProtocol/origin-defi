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
  const [{ amountIn, estimatedSwapRoutes, isSwapRoutesLoading }] =
    useSwapState();

  const isExpanded = estimatedSwapRoutes.length > 0 && amountIn > 0n;

  return (
    <Accordion
      {...props}
      expanded={isExpanded}
      sx={{
        px: 2,
        borderRadius: 3,
        backgroundColor: 'background.highlight',
        border: '1px solid',
        borderColor: 'divider',
        ...props?.sx,
      }}
    >
      <AccordionSummary
        sx={{ py: 2, '&&.MuiAccordionSummary-root': { cursor: 'default' } }}
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
            <Typography>
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
