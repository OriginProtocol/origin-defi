import { Stack } from '@mui/material';
import {
  ApyCard,
  ProtocolRevenueCard,
  RateCard,
  TotalSupplyCard,
} from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';

export const OverviewView = () => {
  return (
    <Stack spacing={3}>
      <ApyCard token={tokens.mainnet.OUSD} height={400} />
      <TotalSupplyCard token={tokens.mainnet.OUSD} height={200} />
      <ProtocolRevenueCard token={tokens.mainnet.OUSD} height={200} />
      <RateCard token={tokens.mainnet.OUSD} currency="USD" height={200} />
    </Stack>
  );
};
