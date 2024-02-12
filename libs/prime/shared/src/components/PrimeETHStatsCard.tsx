import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { InfoTooltip, LoadingLabel } from '@origin/shared/components';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import { useTVL } from '../hooks/useTVL';

import type { CardProps } from '@mui/material';

export const PrimeETHStatsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount, formatCurrency } = useFormat();
  const { data, isLoading } = useTVL();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'primeETH Stats' })}
      />
      <CardContent>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'TVL' })}&nbsp;
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'Total Value Locked',
            })}
          />
        </Typography>
        <LoadingLabel isLoading={isLoading} fontWeight="medium">
          {intl.formatMessage(
            { defaultMessage: '{tvl} ETH' },
            { tvl: formatAmount(data?.tvl) },
          )}
        </LoadingLabel>
        <LoadingLabel>{formatCurrency(data?.tvlUsd)}</LoadingLabel>
      </CardContent>
    </Card>
  );
};
