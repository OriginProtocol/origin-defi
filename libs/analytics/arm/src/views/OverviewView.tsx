import { Grid } from '@mui/material';
import { useLayout } from '@origin/analytics/shared';

import { ApyChart } from '../components/ApyChart';
import { ProtocolRevenueChart } from '../components/ProtocolRevenueChart';
import { TradesChart } from '../components/TradesChart';
import { TradingProfitChart } from '../components/TradingProfitChart';
import { TradingVolumeChart } from '../components/TradingVolumeChart';
import { TvlChart } from '../components/TvlChart';
import { VaultAssetsChart } from '../components/VaultAssetsChart';

export const OverviewView = () => {
  const [{ isDrawerOpen }] = useLayout();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <ApyChart height={300} />
      </Grid>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <TvlChart height={300} />
      </Grid>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <VaultAssetsChart height={300} />
      </Grid>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <ProtocolRevenueChart height={300} />
      </Grid>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <TradingVolumeChart height={300} />
      </Grid>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <TradingProfitChart height={300} />
      </Grid>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <TradesChart height={300} />
      </Grid>
    </Grid>
  );
};
