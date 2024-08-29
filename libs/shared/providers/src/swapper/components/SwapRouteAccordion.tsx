import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import { ExpandIcon } from '@origin/shared/components';
import { not } from 'ramda';
import { useIntl } from 'react-intl';

import { useHandleSelectSwapRoute } from '../hooks';
import { useSwapState } from '../state';
import { routeEq } from '../utils';
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
      sx={{
        px: 2,
        py: 1,
        backgroundColor: 'grey.900',
        borderColor: 'grey.800',
        ...props?.sx,
      }}
      disableGutters
    >
      <AccordionSummary
        onClick={() => {
          setShowMore(not);
          trackEvent?.({ name: 'show_swap_routes' });
        }}
        sx={{
          minHeight: 0,
          fontSize: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          padding: 0,
          '&.Mui-expanded': {
            minHeight: 0,
            '& img': {
              transform: 'rotate(-180deg)',
            },
          },
        }}
      >
        <Typography
          component="span"
          variant="body2"
          sx={{
            color: 'text.secondary',
            flex: 1,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Show more' })}
        </Typography>
        <ExpandIcon
          isExpanded={showMore}
          sx={{ width: 12, color: 'text.secondary' }}
        />
      </AccordionSummary>
      <AccordionDetails
        sx={{
          pt: 1,
          pb: 0,
          px: 0,
        }}
      >
        <Stack
          sx={{
            gap: 0.25,
            mt: 1.5,
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
