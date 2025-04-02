import { Grid, Stack } from '@mui/material';
import {
  AnalyticsCard,
  Page,
  PageSection,
  PageTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { ORIGIN_ANALYTICS_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import { OGN } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import { ognSwapActions } from '../actions';
import { PageTitleSection } from '../components/PageTitleSection';
import { StatsCard } from '../components/StatsCard';
import { ognSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Origin Token' })}
        subtitle={intl.formatMessage({
          defaultMessage: `Capture value from all of Origin's yield-bearing products`,
        })}
        icon={OGN}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid container spacing={5}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
            offset={{
              md: 3,
            }}
          >
            <Swapper
              swapActions={ognSwapActions}
              swapRoutes={ognSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Stack spacing={4}>
              <StatsCard />
              <AnalyticsCard
                token={tokens.mainnet.OGN}
                href={`${ORIGIN_ANALYTICS_URL}`}
              />
            </Stack>
          </Grid>
        </Grid>
      </PageSection>
    </Page>
  );
};
