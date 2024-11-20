import { Stack } from '@mui/material';
import { CurrencyControls, LimitControls } from '@origin/shared/components';

import { useHomeView } from '../hooks';

import type { StackProps } from '@mui/material';

export const Controls = (props: StackProps) => {
  const { currency, limit, handleSetLimit, handleSetCurrency } = useHomeView();

  return (
    <Stack
      direction="row"
      spacing={2}
      {...props}
      sx={[
        { justifyContent: 'space-between', alignItems: 'center' },
        ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
      ]}
    >
      <CurrencyControls currency={currency} setCurrency={handleSetCurrency} />
      <LimitControls limit={limit} setLimit={handleSetLimit} />
    </Stack>
  );
};
