import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
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
      sx={[
        {
          backgroundColor: 'background.default',
          '&&&': { borderRadius: 3 },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
      disableGutters
    >
      <AccordionSummary
        onClick={() => {
          setShowMore(not);
          trackEvent?.({ name: 'show_swap_routes' });
        }}
        expandIcon={<FaChevronDownRegular sx={{ color: 'text.secondary' }} />}
        sx={{ py: 2, pl: 1, pr: 2 }}
      >
        <Typography
          variant="caption1"
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            pl: 1,
            flex: 1,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Show more' })}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pb: 1, pt: 0, px: 0 }}>
        <Divider />
        <Stack
          sx={{
            gap: 1,
            px: 1,
            pt: 1,
          }}
        >
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
