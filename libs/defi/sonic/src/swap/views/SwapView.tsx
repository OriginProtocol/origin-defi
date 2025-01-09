import { Grid2, Stack } from '@mui/material';
import {
  AnalyticsCard,
  DailyStatCard,
  Page,
  PageSection,
  PageTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { SUPEROETHB_ANALYTICS_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import { OS } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import { oethSwapActions } from '../actions';
import { PageTitleSection } from '../components/PageTitleSection';
import { superOethbSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Origin Sonic' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Beyond liquid staking',
        })}
        icon={OS}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={5}>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
            offset={{
              md: 3,
            }}
          >
            <Swapper
              swapActions={oethSwapActions}
              swapRoutes={superOethbSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Stack spacing={4}>
              <DailyStatCard
                token={tokens.base.superOETHb}
                stats={['supply_distribution', 'price']}
              />
              <AnalyticsCard
                token={tokens.base.superOETHb}
                title="superOETH"
                href={SUPEROETHB_ANALYTICS_URL}
              />
            </Stack>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
