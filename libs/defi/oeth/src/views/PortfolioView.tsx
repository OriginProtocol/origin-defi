import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const PortfolioView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Portfolio' })}
      </Typography>
    </Stack>
  );
};
