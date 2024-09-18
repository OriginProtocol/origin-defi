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

export const OverviewView = () => {
  const [{ cardWidth }] = useLayout();

  return (
    <Stack spacing={3}>
      <ApyCard token={tokens.mainnet.OETH} width={cardWidth} height={400} />
      <TotalSupplyCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={200}
      />
      <WrappedSupplyCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={200}
      />
      <ProtocolRevenueCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={200}
      />
      <PercentWrappedCard
        token={tokens.mainnet.OETH}
        width={cardWidth}
        height={200}
      />
      <RateCard
        token={tokens.mainnet.OETH}
        currency="ETH"
        width={cardWidth}
        height={200}
      />
    </Stack>
  );
};
