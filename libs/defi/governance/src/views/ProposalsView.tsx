import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const ProposalsView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Proposals' })}
      </Typography>
    </Stack>
  );
};
