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
import { OETH_ANALYTICS_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import { superOETH } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import { oethSwapActions } from '../actions';
import { superOethbSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Super OETH' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Beyond liquid staking',
        })}
        icon={superOETH}
      />
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
              <GlobalStatsCard token={tokens.base.superOETHb} showTokenHeader />
              <AnalyticsCard
                token={tokens.base.superOETHb}
                title="superOETH"
                href={OETH_ANALYTICS_URL}
              />
            </Stack>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
