import { Grid2, Stack, Typography } from '@mui/material';
import { trackSentryError, useLayout } from '@origin/analytics/shared';
import {
  ErrorBoundary,
  ErrorCard,
  ExternalLink,
} from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { CirculatingSupplyCard } from '../components/CirculatingSupplyCard';
import { Controls } from '../components/Controls';
import { NetAssetsCard } from '../components/NetAssetsCard';
import {
  OgnPerformanceCard,
  OgnPriceCard,
  OgnStatsCard,
} from '../components/OgnCards';
import { ProtocolRevenueCard } from '../components/ProtocolRevenueCard';
import { TvlCard } from '../components/TvlCard';
import { CHART_HEIGHT } from '../constants';

export const HomeView = () => {
  const intl = useIntl();
  const [{ isDrawerOpen }] = useLayout();

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 8, lg: 8 }}>
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              useFlexGap
              sx={{
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                rowGap: 2,
                columnGap: 2,
              }}
            >
              <Typography variant="featured3" sx={{ fontWeight: 'bold' }}>
                {intl.formatMessage({ defaultMessage: 'Protocol Metrics' })}
              </Typography>
              <ExternalLink
                href="https://www.originprotocol.com/#mailing"
                color="primary.main"
                iconType="arrow"
              >
                {intl.formatMessage({
                  defaultMessage: 'Subscribe to our weekly analytics email',
                })}
              </ExternalLink>
            </Stack>
            <Controls />
          </Stack>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <NetAssetsCard height={CHART_HEIGHT} />
              </ErrorBoundary>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <ProtocolRevenueCard height={CHART_HEIGHT} />
              </ErrorBoundary>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <TvlCard height={CHART_HEIGHT} />
              </ErrorBoundary>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <CirculatingSupplyCard height={CHART_HEIGHT} />
              </ErrorBoundary>
            </Grid2>
          </Grid2>
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 4, lg: 4 }}>
        <Stack spacing={2}>
          <Typography variant="featured3" sx={{ fontWeight: 'bold' }}>
            {intl.formatMessage({ defaultMessage: 'OGN Token Metrics' })}
          </Typography>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
              md: isDrawerOpen ? 'row' : 'column',
              lg: 'column',
            }}
            spacing={2}
            sx={{ '> *': { width: 1 } }}
          >
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <OgnPriceCard />
            </ErrorBoundary>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <OgnStatsCard />
            </ErrorBoundary>
          </Stack>
          <OgnPerformanceCard />
        </Stack>
      </Grid2>
    </Grid2>
  );
};
