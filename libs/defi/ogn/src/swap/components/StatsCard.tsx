import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { getTokenPriceKey, useTokenPrice } from '@origin/shared/providers';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import { useOgnStatsQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const StatsCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(tokens.mainnet.OGN),
  );
  const { data: stats, isLoading: isStatsLoading } = useOgnStatsQuery();

  return (
    <Card {...props}>
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: 'background.default',
        }}
      >
        <AccordionSummary
          expandIcon={<FaChevronDownRegular />}
          sx={{ p: 3, minHeight: 72 }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              pr: 0.5,
            }}
          >
            <Typography
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Global stats' })}
            </Typography>
          </Stack>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ p: 3 }}>
          <Stack spacing={3}>
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'Circ. Supply' })}
              value={intl.formatNumber(
                stats?.ognStats?.circulatingSupply ?? 0,
                {
                  notation: 'compact',
                  maximumFractionDigits: 2,
                },
              )}
              labelInfoTooltip={intl.formatMessage({
                defaultMessage: 'Circulating supply of OGN',
              })}
              isLoading={isStatsLoading}
              {...valueLabelProps}
            />
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'Total Supply' })}
              value={intl.formatNumber(stats?.ognStats?.totalSupply ?? 0, {
                notation: 'compact',
                maximumFractionDigits: 2,
              })}
              labelInfoTooltip={intl.formatMessage({
                defaultMessage: 'Total supply of OGN',
              })}
              isLoading={isStatsLoading}
              {...valueLabelProps}
            />
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'Price' })}
              value={format(price ?? from(0), 3)}
              isLoading={isPriceLoading}
              currency="USD"
              labelInfoTooltip={intl.formatMessage({
                defaultMessage: 'Price of OGN',
              })}
              {...valueLabelProps}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  sx: { justifyContent: 'space-between', width: 1 },
  labelProps: { variant: 'body3', sx: { fontWeight: 'medium' } },
  valueProps: { sx: { fontWeight: 'medium' } },
};
