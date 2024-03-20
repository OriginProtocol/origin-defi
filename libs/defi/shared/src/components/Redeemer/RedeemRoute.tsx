import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { useRedeemState } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

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
      sx={{ px: 2, borderRadius: 1, ...props?.sx }}
    >
      <AccordionSummary
        sx={{ py: 2, '&&.MuiAccordionSummary-root': { cursor: 'default' } }}
      >
        {isEstimateLoading ? (
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
                defaultMessage: 'Estimating...',
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
