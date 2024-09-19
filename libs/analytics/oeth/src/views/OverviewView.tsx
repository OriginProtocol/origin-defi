import { Stack } from '@mui/material';
import {
  ApyCard,
  PercentWrappedCard,
  ProtocolRevenueCard,
  RateCard,
  TotalSupplyCard,
  WrappedSupplyCard,
} from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';

export const OverviewView = () => {
  return (
    <Stack spacing={3}>
      <ApyCard token={tokens.mainnet.OETH} height={400} />
      <TotalSupplyCard token={tokens.mainnet.OETH} height={200} />
      <WrappedSupplyCard token={tokens.mainnet.OETH} height={200} />
      <ProtocolRevenueCard token={tokens.mainnet.OETH} height={200} />
      <PercentWrappedCard token={tokens.mainnet.OETH} height={200} />
      <RateCard token={tokens.mainnet.OETH} currency="ETH" height={200} />
    </Stack>
  );
};
