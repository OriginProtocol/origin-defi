import { Grid2 } from '@mui/material';
import { useLayout } from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';

import { TokenCard } from '../components/TokenCard';

export const HomeView = () => {
  const [{ isDrawerOpen }] = useLayout();

  return (
    <Grid2 container spacing={2}>
      {[tokens.base.superOETHb, tokens.mainnet.OETH, tokens.mainnet.OUSD].map(
        (t) => (
          <Grid2
            key={t.id}
            size={{ xs: 12, sm: 4, md: isDrawerOpen ? 6 : 4, lg: 4 }}
          >
            <TokenCard token={t} sx={{ height: 1 }} />
          </Grid2>
        ),
      )}
      {/* <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <OriginTvlCard height={320} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <TotalProtocolRevenueCard height={300} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <TotalSupplySplitCard height={300} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <CumulativeProtocolRevenueCard height={300} />
      </Grid2> */}
    </Grid2>
  );
};
