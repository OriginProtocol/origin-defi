import { Grid2 } from '@mui/material';
import { useLayout } from '@origin/analytics/shared';

import { ApyChart, OwnershipChart, TvlChart } from '../components/Charts';

export const OverviewView = () => {
  const [{ isDrawerOpen }] = useLayout();

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <ApyChart height={300} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <TvlChart height={300} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
        <OwnershipChart height={300} />
      </Grid2>
    </Grid2>
  );
};
