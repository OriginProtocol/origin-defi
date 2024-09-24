import { Grid2 } from '@mui/material';
import { tokens } from '@origin/shared/contracts';

import { OriginProtocolRevenueCard } from '../components/OriginProtocolRevenueCard';
import { OriginTvlCard } from '../components/OriginTvlCard';
import { TokenCard } from '../components/TokenCard';

export const HomeView = () => {
  return (
    <Grid2 container spacing={2}>
      {[tokens.base.superOETHb, tokens.mainnet.OETH, tokens.mainnet.OUSD].map(
        (t) => (
          <Grid2 key={t.id} size={{ xs: 12, md: 4 }}>
            <TokenCard token={t} />
          </Grid2>
        ),
      )}
      <Grid2 size={{ xs: 12, md: 6 }}>
        <OriginTvlCard height={320} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <OriginProtocolRevenueCard height={300} />
      </Grid2>
    </Grid2>
  );
};
