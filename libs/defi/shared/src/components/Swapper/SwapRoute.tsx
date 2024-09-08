import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltipLabel } from '@origin/shared/components';
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
      sx={[
        {
          backgroundColor: 'background.default',
          border: 'none',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <AccordionSummary
        sx={{
          pt: 3,
          pb: 1.5,
          px: 0,
          backgroundColor: 'transparent',
          '&&.MuiAccordionSummary-root': { cursor: 'default' },
        }}
      >
        {isSwapRoutesLoading ? (
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CircularProgress size={14} />
            <Typography
              variant="caption1"
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage({
                defaultMessage: 'Finding the best route...',
              })}
            </Typography>
          </Stack>
        ) : (
          <InfoTooltipLabel
            labelProps={{
              variant: 'caption1',
              color: 'text.secondary',
              fontWeight: 'medium',
            }}
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The best swap route factors in the best price after transaction costs',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Route' })}
          </InfoTooltipLabel>
        )}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: 2,
          backgroundColor: 'background.default',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <BestRoutes />
        {estimatedSwapRoutes.length > 2 && (
          <SwapRouteAccordion sx={{ mt: 1.5 }} />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
