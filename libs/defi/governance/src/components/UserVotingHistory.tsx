import { Card, CardHeader } from '@mui/material';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const UserVotingHistory = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My voting history' })}
      />
    </Card>
  );
};
