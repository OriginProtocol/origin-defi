import { Stack, Typography } from '@mui/material';
import { CurrencyControls, LimitControls } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

export const Controls = () => {
  const intl = useIntl();
  const { currency, limit, handleSetLimit, handleSetCurrency } = useHomeView();

  return (
    <Stack spacing={2}>
      <Typography variant="featured3" sx={{ fontWeight: 'bold' }}>
        {intl.formatMessage({ defaultMessage: 'Protocols Metrics' })}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <CurrencyControls currency={currency} setCurrency={handleSetCurrency} />
        <LimitControls limit={limit} setLimit={handleSetLimit} />
      </Stack>
    </Stack>
  );
};
