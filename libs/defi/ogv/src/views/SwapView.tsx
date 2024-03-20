import { Container, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Container>
      <Typography>{intl.formatMessage({ defaultMessage: 'Swap' })}</Typography>
    </Container>
  );
};
