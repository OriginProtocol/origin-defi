import { Card, CardContent, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const ProposalsSummaryCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Proposals' })}
            value={97}
            sx={{ width: 1 }}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Active Proposals' })}
            value={1}
            sx={{ width: 1 }}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Registered Voters' })}
            value={1325}
            sx={{ width: 1 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
