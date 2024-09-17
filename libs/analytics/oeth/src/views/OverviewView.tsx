import { Stack } from '@mui/material';
import {
  ApyCard,
  PercentWrappedCard,
  ProtocolRevenueCard,
  RateCard,
  TotalSupplyCard,
  useLayout,
  WrappedSupplyCard,
} from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';

import { oethConfig } from '../constants';

export const OverviewView = () => {
  const [{ width }] = useLayout();

  return (
    <Stack spacing={3} sx={{ alignItems: 'flex-end', flexGrow: 1 }}>
      <ApyCard
        token={tokens.mainnet.OETH}
        width={width}
        height={400}
        from={oethConfig.from}
      />
      <TotalSupplyCard
        token={tokens.mainnet.OETH}
        width={width}
        height={200}
        from={oethConfig.from}
      />
      <WrappedSupplyCard
        token={tokens.mainnet.OETH}
        width={width}
        height={200}
        from={oethConfig.from}
      />
      <ProtocolRevenueCard
        token={tokens.mainnet.OETH}
        width={width}
        height={200}
        from={oethConfig.from}
      />
      <PercentWrappedCard
        token={tokens.mainnet.OETH}
        width={width}
        height={200}
        from={oethConfig.from}
      />
      <RateCard
        token={tokens.mainnet.OETH}
        currency="ETH"
        width={width}
        height={200}
        from={oethConfig.from}
      />
    </Stack>
  );
};
