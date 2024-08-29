import { Grid2, Stack } from '@mui/material';
import {
  AnalyticsCard,
  GlobalStatsCard,
  Page,
  PageSection,
  PageTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { OUSD_ANALYTICS_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { ousdSwapActions } from '../actions';
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
          <Grid2 size={{ xs: 12, md: 6 }} offset={{ md: 2 }}>
            <Swapper
              swapActions={ousdSwapActions}
              swapRoutes={ousdSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid2>
          <Grid2 size={12} offset={{ md: 3 }}>
            <Stack spacing={4}>
              <GlobalStatsCard token={tokens.mainnet.OUSD} />
              <AnalyticsCard
                token={tokens.mainnet.OUSD}
                href={OUSD_ANALYTICS_URL}
              />
            </Stack>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
