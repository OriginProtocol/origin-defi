import { useState } from 'react';

import { Card, CardContent, Stack } from '@mui/material';
import { CurrencyControls } from '@origin/analytics/shared';

import type { Currency } from '@origin/analytics/shared';

export const BalanceSheet = () => {
  const [currency, setCurrency] = useState<Currency>('ETH');

  return (
    <Stack>
      <CurrencyControls currency={currency} setCurrency={setCurrency} />
      <Card>
        <CardContent></CardContent>
      </Card>
    </Stack>
  );
};
