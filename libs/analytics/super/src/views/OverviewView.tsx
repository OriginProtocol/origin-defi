import { Stack } from '@mui/material';
import {
  ApyCard,
  PercentWrappedCard,
  RateCard,
  TotalSupplyCard,
  useLayout,
  WrappedSupplyCard,
} from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';

import { superConfig } from '../constants';

export const OverviewView = () => {
  const [{ width }] = useLayout();

  return (
    <Stack spacing={3}>
      <ApyCard
        token={tokens.base.superOETHb}
        width={width}
        height={400}
        from={superConfig.from}
      />
      <TotalSupplyCard
        token={tokens.base.superOETHb}
        width={width}
        height={200}
        from={superConfig.from}
      />
      <WrappedSupplyCard
        token={tokens.base.superOETHb}
        width={width}
        height={200}
        from={superConfig.from}
      />
      <PercentWrappedCard
        token={tokens.base.superOETHb}
        width={width}
        height={200}
        from={superConfig.from}
      />
      <RateCard
        token={tokens.base.superOETHb}
        currency="ETH"
        width={width}
        height={200}
        from={superConfig.from}
      />
    </Stack>
  );
};
