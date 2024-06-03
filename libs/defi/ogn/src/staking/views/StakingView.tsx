import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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
          <Grid2 container spacing={3}>
            {/* <Grid2 xs={12} md={3}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <StatsCard />
            </ErrorBoundary>
          </Grid2> */}
            <Grid2 xs={12} md={6} mdOffset={3}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <StakingForm />
              </ErrorBoundary>
            </Grid2>
            <Grid2 xs={12} md={3}>
              <Stack spacing={3}>
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <BalanceCard />
                </ErrorBoundary>{' '}
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <RewardCard />
                </ErrorBoundary>{' '}
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <VotingPowerCard />
                </ErrorBoundary>
              </Stack>
            </Grid2>
            <Grid2 xs={12}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <LockupsCard />
              </ErrorBoundary>
            </Grid2>
          </Grid2>
        </PageSection>
      </Page>
    </LockupPollingProvider>
  );
};
