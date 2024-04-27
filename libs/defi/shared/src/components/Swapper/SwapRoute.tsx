import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useSwapState } from '@origin/shared/providers';

import { BestRoutes } from './BestRoutes';
import { SwapRouteAccordion } from './SwapRouteAccordion';

import type { AccordionProps } from '@mui/material';

export function SwapRoute(
  props: Omit<AccordionProps, 'children' | 'expanded'>,
) {
  const [{ amountIn, estimatedSwapRoutes }] = useSwapState();

  const isExpanded = estimatedSwapRoutes.length > 0 && amountIn > 0n;

  return (
    <Accordion
      {...props}
      expanded={isExpanded}
      sx={{
        border: 'none',
        ...props?.sx,
      }}
    >
      <AccordionSummary />
      <AccordionDetails sx={{ p: 0, backgroundColor: 'background.default' }}>
        <BestRoutes />
        {estimatedSwapRoutes.length > 2 && (
          <SwapRouteAccordion sx={{ mt: 1.5 }} />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
