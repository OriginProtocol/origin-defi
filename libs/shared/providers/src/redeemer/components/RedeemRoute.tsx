import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useRedeemState } from '../state';
import { RedeemSplitCard } from './RedeemSplitCard';

import type { AccordionProps } from '@mui/material';

export function RedeemRoute(
  props: Omit<AccordionProps, 'children' | 'expanded'>,
) {
  const intl = useIntl();
  const [{ amountOut, isEstimateLoading, tokenIn }] = useRedeemState();

  return (
    <Accordion
      {...props}
      expanded={amountOut > 0n}
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
        {isEstimateLoading ? (
          <Stack direction="row" alignItems="center" gap={1}>
            <Skeleton
              variant="circular"
              width="0.5rem"
              height="0.5rem"
              sx={(theme) => ({
                backgroundColor: theme.palette.primary.contrastText,
              })}
            />
            <Typography variant="body2">
              {intl.formatMessage({
                defaultMessage: 'Estimating...',
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
              tooltipLabel={intl.formatMessage(
                {
                  defaultMessage:
                    'Redeem {token} for the basket of underlying assets',
                },
                { token: tokenIn.symbol },
              )}
            />
          </Stack>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 1, pb: 2, px: 0 }}>
        <RedeemSplitCard />
      </AccordionDetails>
    </Accordion>
  );
}
