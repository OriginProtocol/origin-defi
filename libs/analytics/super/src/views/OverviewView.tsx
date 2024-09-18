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

export const OverviewView = () => {
  const [{ cardWidth }] = useLayout();

  return (
    <Stack spacing={3}>
      <ApyCard token={tokens.base.superOETHb} width={cardWidth} height={400} />
      <TotalSupplyCard
        token={tokens.base.superOETHb}
        width={cardWidth}
        height={200}
      />
      <WrappedSupplyCard
        token={tokens.base.superOETHb}
        width={cardWidth}
        height={200}
      />
      <PercentWrappedCard
        token={tokens.base.superOETHb}
        width={cardWidth}
        height={200}
      />
      <RateCard
        token={tokens.base.superOETHb}
        currency="ETH"
        width={cardWidth}
        height={200}
      />
    </Stack>
  );
};
