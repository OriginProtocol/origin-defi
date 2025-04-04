import { Grid, Stack } from '@mui/material';
import {
  Page,
  PageSection,
  PageTitle,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { BalanceCard } from '../components/BalanceCard';
import { LockupsCard } from '../components/LockupsCard';
import { PageTitleSection } from '../components/PageTitleSection';
import { RewardCard } from '../components/RewardCard';
import { StakingForm } from '../components/StakingForm';
import { StatsCard } from '../components/StatsCard';
import { VotingPowerCard } from '../components/VotingPowerCard';
import { LockupPollingProvider } from '../state';

export const StakingView = () => {
  const intl = useIntl();

  return (
    <LockupPollingProvider>
      <Page>
        <PageTitle
          title={intl.formatMessage({ defaultMessage: 'Staking' })}
          subtitle={intl.formatMessage({
            defaultMessage: 'Earn rewards and help govern Origin products',
          })}
          token={tokens.mainnet.OGN}
        >
          <PageTitleSection />
        </PageTitle>
        <PageSection containerProps={{ maxWidth: 'lg' }}>
          <Grid container spacing={3}>
            <Grid sx={{ order: { xs: 3, md: 1 } }} size={12}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <LockupsCard />
              </ErrorBoundary>
            </Grid>
            <Grid
              sx={{ order: { xs: 1, md: 2 } }}
              size={{
                xs: 12,
                md: 3,
              }}
            >
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <StatsCard />
              </ErrorBoundary>
            </Grid>
            <Grid
              sx={{ order: { xs: 4, md: 3 } }}
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <StakingForm />
              </ErrorBoundary>
            </Grid>
            <Grid
              sx={{ order: { xs: 2, md: 4 } }}
              size={{
                xs: 12,
                md: 3,
              }}
            >
              <Stack spacing={3}>
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <BalanceCard />
                </ErrorBoundary>
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <RewardCard />
                </ErrorBoundary>
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <VotingPowerCard />
                </ErrorBoundary>
              </Stack>
            </Grid>
          </Grid>
        </PageSection>
      </Page>
    </LockupPollingProvider>
  );
};
