import { Button, Card, CardContent, Typography } from '@mui/material';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const AnalyticsCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography mb={1} fontWeight="medium">
          {intl.formatMessage({ defaultMessage: 'OETH analytics' })}
        </Typography>
        <Typography variant="caption1" mb={3}>
          {intl.formatMessage({
            defaultMessage: 'Detailed analytics on Origin products',
          })}
        </Typography>
        <Button variant="outlined" color="secondary">
          {intl.formatMessage({
            defaultMessage: 'Analytics',
          })}
          &nbsp;
          <FaArrowUpRightRegular />
        </Button>
      </CardContent>
    </Card>
  );
};
