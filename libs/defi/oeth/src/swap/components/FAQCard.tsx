import { Card, CardHeader } from '@mui/material';
import { useIntl } from 'react-intl';

export const FAQCard = () => {
  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'FAQ',
        })}
      />
    </Card>
  );
};
