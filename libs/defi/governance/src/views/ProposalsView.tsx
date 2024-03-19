import { Container, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const ProposalsView = () => {
  const intl = useIntl();

  return (
    <Container>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Proposals' })}
      </Typography>
    </Container>
  );
};
