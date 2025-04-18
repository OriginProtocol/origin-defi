import { Box, Grid, Stack, Typography } from '@mui/material';
import { trackSentryError, useLayout } from '@origin/analytics/shared';
import {
  ErrorBoundary,
  ErrorCard,
  ExternalLink,
} from '@origin/shared/components';
import { ORIGIN_DAPP_URL } from '@origin/shared/constants';
import { useIntl } from 'react-intl';

import { Controls } from '../components/Controls';
import { NetAssetsCard } from '../components/NetAssetsCard';
import {
  OgnPerformanceCard,
  OgnPriceCard,
  OgnStatsCard,
} from '../components/OgnCards';
import { ProtocolRevenueCard } from '../components/ProtocolRevenueCard';
import { TokenSupplyCard } from '../components/TokenSupplyCard';
import { TvlCard } from '../components/TvlCard';
import { CHART_HEIGHT } from '../constants';

export const HomeView = () => {
  const intl = useIntl();
  const [{ isDrawerOpen }] = useLayout();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 8, lg: 8 }}>
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
              <Box
                component="a"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                }}
                data-eo-form-toggle-id="e4ae2b76-b74f-11ef-8609-9d9db35fed7a"
                href="#"
              >
                {intl.formatMessage({
                  defaultMessage: 'Weekly Analytics Email',
                })}
              </Box>
            </Stack>
            <Controls />
          </Stack>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <NetAssetsCard height={CHART_HEIGHT} />
              </ErrorBoundary>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <ProtocolRevenueCard height={CHART_HEIGHT} />
              </ErrorBoundary>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <TokenSupplyCard height={CHART_HEIGHT} />
              </ErrorBoundary>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <TvlCard height={CHART_HEIGHT} />
              </ErrorBoundary>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 4, lg: 4 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}
          >
            <Typography variant="featured3" sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage({ defaultMessage: 'OGN Token Metrics' })}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}
            >
              <ExternalLink
                href={`${ORIGIN_DAPP_URL}/#/ogn`}
                iconType="arrow"
                color="primary.main"
              >
                {intl.formatMessage({ defaultMessage: 'Buy' })}
              </ExternalLink>
              <ExternalLink
                href={`${ORIGIN_DAPP_URL}/#/ogn/staking`}
                iconType="arrow"
                color="primary.main"
              >
                {intl.formatMessage({ defaultMessage: 'Stake' })}
              </ExternalLink>
            </Stack>
          </Stack>
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
      </Grid>
    </Grid>
  );
};
