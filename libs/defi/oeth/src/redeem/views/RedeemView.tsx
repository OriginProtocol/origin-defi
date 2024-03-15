import { Stack } from '@mui/material';
import { PageTitle } from '@origin/defi/shared';
import { OETH } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

export const RedeemView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Redeem' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Request redemptions to ETH or a mix of LSTs',
        })}
        icon={OETH}
      />
    </Stack>
  );
};
