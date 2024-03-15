import { Stack } from '@mui/material';
import { PageTitle } from '@origin/defi/shared';
import { OETH } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

export const PortfolioView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'OETH Portfolio' })}
        icon={OETH}
      />
    </Stack>
  );
};
