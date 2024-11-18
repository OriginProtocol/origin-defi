import { Card, Divider, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { getTokenPriceKey, useTokenPrice } from '@origin/shared/providers';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const OgnPriceCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(tokens.mainnet.OGN),
  );

  return (
    <Card {...props}>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{ justifyContent: 'space-between' }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Price' })}
          value={format(price ?? from(0), 3)}
          isLoading={isPriceLoading}
          currency="USD"
          {...ognPriceCardValueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Market Cap' })}
          value={intl.formatNumber(53_400_000, {
            notation: 'compact',
            minimumSignificantDigits: 2,
          })}
          currency="USD"
          {...ognPriceCardValueLabelProps}
        />
      </Stack>
    </Card>
  );
};

const ognPriceCardValueLabelProps: Partial<ValueLabelProps> = {
  sx: { alignItems: 'flex-start', width: 1, p: 1.5 },
  labelProps: { variant: 'body3', sx: { fontWeight: 'medium' } },
  valueProps: { variant: 'body1', sx: { fontWeight: 'medium' } },
};

export const OgnStatsCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <Stack divider={<Divider flexItem />}>
        <Stack
          direction="row"
          spacing={0.5}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Holders' })}
            value={intl.formatNumber(1324)}
            {...ognStatsCardValueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Circ. Supply' })}
            value={intl.formatNumber(669_000_000, {
              notation: 'compact',
              minimumSignificantDigits: 2,
            })}
            {...ognStatsCardValueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Total Supply' })}
            value={intl.formatNumber(1_412_000_000, {
              notation: 'compact',
              minimumSignificantDigits: 2,
            })}
            {...ognStatsCardValueLabelProps}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={0.5}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Staking Max vAPY' })}
            value={intl.formatNumber(0.6323, {
              style: 'percent',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            {...ognStatsCardValueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: '% Staked' })}
            value={intl.formatNumber(0.3186, {
              style: 'percent',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            {...ognStatsCardValueLabelProps}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

const ognStatsCardValueLabelProps: Partial<ValueLabelProps> = {
  spacing: 0.5,
  sx: { alignItems: 'flex-start', width: 1, p: 1.5 },
  labelProps: { variant: 'caption1' },
  valueProps: { variant: 'caption1' },
};
