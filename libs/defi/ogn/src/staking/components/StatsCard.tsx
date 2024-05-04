import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const StatsCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Global stats' })}
      />
      <Divider />
      <CardContent>
        <Stack spacing={3}>
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Total OGN Staked' })}
            labelProps={{ variant: 'body3', fontWeight: 'medium' }}
            value={'80.6%'}
          />
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'xOGN holders' })}
            labelProps={{ variant: 'body3', fontWeight: 'medium' }}
            value={'4.36K'}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
