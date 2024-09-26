import { Stack } from '@mui/material';
import {
  ApyCard,
  PercentWrappedCard,
  PriceCard,
  TotalSupplyCard,
  WrappedSupplyCard,
} from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';

export const OverviewView = () => {
  return (
    <Stack spacing={3}>
      <ApyCard token={tokens.base.superOETHb} height={400} />
      <TotalSupplyCard token={tokens.base.superOETHb} height={200} />
      <WrappedSupplyCard token={tokens.base.superOETHb} height={200} />
      <PercentWrappedCard token={tokens.base.superOETHb} height={200} />
      <PriceCard token={tokens.base.superOETHb} currency="ETH" height={200} />
    </Stack>
  );
};
