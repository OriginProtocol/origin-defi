import { Container, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const StakingView = () => {
  const intl = useIntl();

  return (
    <Container>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Staking' })}
      </Typography>
    </Container>
  );
};
