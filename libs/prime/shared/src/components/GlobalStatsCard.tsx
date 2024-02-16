import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltip, LoadingLabel } from '@origin/shared/components';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import { useAPY } from '../hooks';
import { useTVL } from '../hooks/useTVL';

import type { CardProps } from '@mui/material';

export const GlobalStatsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount, formatCurrency } = useFormat();
  const { data: tvl, isLoading: isTvlLoading } = useTVL();
  const { data: apy, isLoading: isApyLoading } = useAPY();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Global Stats' })}
      />
      <CardContent>
        <Stack mb={3}>
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
              { tvl: formatAmount(tvl?.tvl) },
            )}
          </LoadingLabel>
          <LoadingLabel variant="body2" fontWeight="medium">
            {formatCurrency(tvl?.tvlUsd)}
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
          <Typography variant="body2">
            {intl.formatMessage({ defaultMessage: '+ primeETH XP' })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
