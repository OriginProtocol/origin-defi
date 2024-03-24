import { Container, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const RedeemView = () => {
  const intl = useIntl();

  return (
    <Container>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Redeem' })}
      </Typography>
    </Container>
  );
};
