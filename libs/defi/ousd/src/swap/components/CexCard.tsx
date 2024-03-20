import { Card, CardHeader } from '@mui/material';
import { useIntl } from 'react-intl';

export const CexCard = () => {
  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Trading pairs on centralized exchanges',
        })}
      />
    </Card>
  );
};
