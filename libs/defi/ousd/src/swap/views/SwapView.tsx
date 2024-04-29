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

import { ousdSwapActions } from '../actions';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { DetailsCard } from '../components/DetailsCard';
import { PageTitleSection } from '../components/PageTitleSection';
import { ousdSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Origin Dollar' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Yield bearing stablecoin',
        })}
        token={tokens.mainnet.OUSD}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={5}>
          <Grid2 xs={12} md={6} mdOffset={2}>
            <Swapper
              swapActions={ousdSwapActions}
              swapRoutes={ousdSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <Stack spacing={4}>
              <DetailsCard />
              <AnalyticsCard />
            </Stack>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
