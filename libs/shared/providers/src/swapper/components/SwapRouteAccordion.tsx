import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { useHandleSelectSwapRoute } from '../hooks';
import { useSwapState } from '../state';
import { routeEq } from '../utils';
import { SwapRouteAccordionItem } from './SwapRouteAccordionItem';

import type { AccordionProps } from '@mui/material';

export function SwapRouteAccordion(props: Omit<AccordionProps, 'children'>) {
  const intl = useIntl();
  const [{ estimatedSwapRoutes, selectedSwapRoute }] = useSwapState();
  const handleSelectSwapRoute = useHandleSelectSwapRoute();

  return (
    <Accordion
      {...props}
      sx={{
        '&.MuiPaper-root': {
          padding: 0,
          backgroundColor: 'grey.900',
          paddingInline: 2,
          paddingBlock: 1,
          borderColor: 'grey.800',
        },
        ...props?.sx,
      }}
      disableGutters
    >
      <AccordionSummary
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
          sx={{ flex: 1 }}
          variant="body2"
          color="text.secondary"
        >
          {intl.formatMessage({ defaultMessage: 'Show more' })}
        </Typography>

        <Box
          component="img"
          src="/images/arrow-down.svg"
          alt="arrow"
          sx={{
            height: 12,
            width: 12,
            alignSelf: 'center',
          }}
        ></Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          pt: 1,
          pb: 0,
          px: 0,
        }}
      >
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
