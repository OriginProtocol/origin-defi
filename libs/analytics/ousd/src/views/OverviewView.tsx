import { Stack } from '@mui/material';
import {
  ApyCard,
  ProtocolRevenueCard,
  RateCard,
  TotalSupplyCard,
  useLayout,
} from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';

import { ousdConfig } from '../constants';

export const OverviewView = () => {
  const [{ cardWidth }] = useLayout();

  return (
    <Stack spacing={3}>
      <ApyCard
        token={tokens.mainnet.OUSD}
        width={cardWidth}
        height={400}
        from={ousdConfig.from}
      />
      <TotalSupplyCard
        token={tokens.mainnet.OUSD}
        width={cardWidth}
        height={200}
        from={ousdConfig.from}
      />
      <ProtocolRevenueCard
        token={tokens.mainnet.OUSD}
        width={cardWidth}
        height={200}
        from={ousdConfig.from}
      />
      <RateCard
        token={tokens.mainnet.OUSD}
        currency="USD"
        width={cardWidth}
        height={200}
        from={ousdConfig.from}
      />
    </Stack>
  );
};
