import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { SwapRouteAccordionItem } from './SwapRouteAccordionItem';

import type { SxProps } from '@mui/material';

import type { Route } from './SwapRoute';

interface Props {
  routes: Route[];
  selected: number;
  onSelect: (index: number) => void;
  sx?: SxProps;
}

export function SwapRouteAccordion({ routes, selected, onSelect, sx }: Props) {
  const intl = useIntl();
  return (
    <Accordion
      sx={{
        '&.MuiPaper-root': {
          padding: 0,
          backgroundColor: 'grey.900',
          paddingInline: 2,
          paddingBlock: 1,
        },

        ...sx,
      }}
      disableGutters
    >
      <AccordionSummary
        sx={{
          minHeight: 0,
          fontSize: (theme) => theme.typography.pxToRem(14),
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
          sx={{
            height: (theme) => theme.typography.pxToRem(12),
            width: (theme) => theme.typography.pxToRem(12),
            alignSelf: 'center',
          }}
        ></Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          paddingBlockStart: 1,
          paddingBlockEnd: 0,
          paddingInline: 0,
          position: 'relative',
          marginInline: (theme) => theme.spacing(-1),
          '&:before': {
            content: '""',
            width: (theme) => `calc(100% + ${theme.spacing(2)})`,
            position: 'absolute',
            left: (theme) => theme.spacing(-1),
            height: '1px',
            borderBlockEnd: '1px solid',
            display: 'block',
          },
        }}
      >
        <Stack gap={0.25} mt={1.5}>
          {routes.slice(2).map((route, index) => (
            <SwapRouteAccordionItem
              key={index}
              route={route}
              index={index + 2}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
