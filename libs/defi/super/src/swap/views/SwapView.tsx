import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  Page,
  PageSection,
  PageTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { oethSwapActions } from '../actions';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { PageTitleSection } from '../components/PageTitleSection';
import { StatsCard } from '../components/StatsCard';
import { oethSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Super OETH' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Beyond liquid staking',
        })}
        token={tokens.base.superOETHb}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={5}>
          <Grid2 xs={12} md={6} mdOffset={3}>
            <Swapper
              swapActions={oethSwapActions}
              swapRoutes={oethSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <Stack spacing={4}>
              <StatsCard token={tokens.base.superOETHb} />
              <AnalyticsCard />
            </Stack>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
