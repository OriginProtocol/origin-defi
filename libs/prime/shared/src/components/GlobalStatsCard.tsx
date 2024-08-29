import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltip, LoadingLabel } from '@origin/shared/components';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import { useAPY } from '../hooks';
import { useTVL } from '../hooks/useTVL';

import type { CardProps } from '@mui/material';

export const GlobalStatsCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: tvl, isLoading: isTvlLoading } = useTVL();
  const { data: apy, isLoading: isApyLoading } = useAPY();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Global Stats' })}
      />
      <CardContent>
        <Stack
          sx={{
            mb: 3,
          }}
        >
          <Typography gutterBottom>
            {intl.formatMessage({ defaultMessage: 'TVL' })}&nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage: 'Total Value Locked',
              })}
            />
          </Typography>
          <LoadingLabel
            isLoading={isTvlLoading}
            fontWeight="medium"
            fontSize={20}
          >
            {intl.formatMessage(
              { defaultMessage: '{tvl} ETH' },
              {
                tvl: format(
                  tvl?.tvl ?? from(0),
                  getFormatPrecision(tvl?.tvl ?? from(2)),
                ),
              },
            )}
          </LoadingLabel>
          <LoadingLabel variant="body2" fontWeight="medium">
            ${format(tvl?.tvlUsd ?? from(0), 2)}
          </LoadingLabel>
        </Stack>
        <Stack>
          <Typography gutterBottom>
            {intl.formatMessage({ defaultMessage: 'APY' })}&nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The yield from the underlying LSTs, calculated daily.',
              })}
            />
          </Typography>
          <LoadingLabel
            isLoading={isApyLoading}
            fontWeight="medium"
            fontSize={20}
          >
            {intl.formatNumber((apy ?? 0) / 100, {
              style: 'percent',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </LoadingLabel>
          <Typography variant="body2">
            {intl.formatMessage({ defaultMessage: '+ EigenLayer Points' })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
