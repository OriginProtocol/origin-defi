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
  const [{ cardWidth }] = useLayout();

  return (
    <Stack spacing={3}>
      <ApyCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={400}
        from={oethConfig.from}
      />
      <TotalSupplyCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={200}
        from={oethConfig.from}
      />
      <WrappedSupplyCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={200}
        from={oethConfig.from}
      />
      <ProtocolRevenueCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={200}
        from={oethConfig.from}
      />
      <PercentWrappedCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={200}
        from={oethConfig.from}
      />
      <RateCard
        token={tokens.mainnet.OETH}
        currency="ETH"
        width={cardWidth}
        height={200}
        from={oethConfig.from}
      />
    </Stack>
  );
};
