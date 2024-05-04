import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  GlobalStatsCard,
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
import { oethSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();
  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Origin Ether' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Ethereum liquid staking made simple',
        })}
        token={tokens.mainnet.OETH}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={5}>
          <Grid2 xs={12} md={6} mdOffset={2}>
            <Swapper
              swapActions={oethSwapActions}
              swapRoutes={oethSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <Stack spacing={4}>
              <GlobalStatsCard token={tokens.mainnet.OETH} />
              <AnalyticsCard />
            </Stack>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
