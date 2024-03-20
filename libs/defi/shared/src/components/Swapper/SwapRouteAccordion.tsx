import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import { FaChevronDownRegular } from '@origin/shared/icons';
import {
  routeEq,
  useHandleSelectSwapRoute,
  useSwapState,
} from '@origin/shared/providers';
import { not } from 'ramda';
import { useIntl } from 'react-intl';

import { SwapRouteAccordionItem } from './SwapRouteAccordionItem';

import type { AccordionProps } from '@mui/material';

export function SwapRouteAccordion(props: Omit<AccordionProps, 'children'>) {
  const intl = useIntl();
  const [showMore, setShowMore] = useState(false);
  const [{ estimatedSwapRoutes, selectedSwapRoute, trackEvent }] =
    useSwapState();
  const handleSelectSwapRoute = useHandleSelectSwapRoute();

  return (
    <Accordion
      {...props}
      expanded={showMore}
      sx={{ px: 1, ...props?.sx }}
      disableGutters
    >
      <AccordionSummary
        onClick={() => {
          setShowMore(not);
          trackEvent?.({ name: 'show_swap_routes' });
        }}
        expandIcon={<FaChevronDownRegular sx={{ color: 'text.secondary' }} />}
        sx={{ py: 1 }}
      >
        <Typography sx={{ pl: 1, flex: 1 }} color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Show more' })}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pb: 1, px: 0 }}>
        <Stack gap={0.25} mt={1.5}>
          {estimatedSwapRoutes.slice(2).map((route, index) => (
            <SwapRouteAccordionItem
              key={`route-${index}`}
              route={route}
              isSelected={routeEq(selectedSwapRoute, route)}
              onSelect={handleSelectSwapRoute}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
