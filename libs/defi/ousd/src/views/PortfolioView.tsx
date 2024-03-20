import { Container, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const PortfolioView = () => {
  const intl = useIntl();

  return (
    <Container>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Portfolio' })}
      </Typography>
    </Container>
  );
};
