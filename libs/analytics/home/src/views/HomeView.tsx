import { Grid2, Stack, Typography } from '@mui/material';
import { useLayout } from '@origin/analytics/shared';
import { useIntl } from 'react-intl';

import { CirculatingSupplyCard } from '../components/CirculatingSupplyCard';
import { Controls } from '../components/Controls';
import { NetAssetsCard } from '../components/NetAssetsCard';
import { OgnPriceCard, OgnStatsCard } from '../components/OgnCards';
import { ProtocolRevenueCard } from '../components/ProtocolRevenueCard';
import { TvlCard } from '../components/TvlCard';
import { CHART_HEIGHT } from '../constants';

export const HomeView = () => {
  const intl = useIntl();
  const [{ isDrawerOpen }] = useLayout();

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 8, lg: 8 }}>
        <Stack spacing={2}>
          <Controls />
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <NetAssetsCard height={CHART_HEIGHT} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <ProtocolRevenueCard height={CHART_HEIGHT} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TvlCard height={CHART_HEIGHT} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CirculatingSupplyCard height={CHART_HEIGHT} />
            </Grid2>
          </Grid2>
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 4, lg: 4 }}>
        <Stack spacing={2}>
          <Typography variant="featured3" sx={{ fontWeight: 'bold' }}>
            {intl.formatMessage({ defaultMessage: 'OGN Token Metrics' })}
          </Typography>
          <OgnPriceCard />
          <OgnStatsCard />
        </Stack>
      </Grid2>
    </Grid2>
  );
};
