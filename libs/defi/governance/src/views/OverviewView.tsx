import { Container, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const OverviewView = () => {
  const intl = useIntl();

  return (
    <Container>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Overview' })}
      </Typography>
    </Container>
  );
};
