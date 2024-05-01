import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Page, PageSection, PageTitle } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { BalanceCard } from '../components/BalanceCard';
import { LockupsCard } from '../components/LockupsCard';
import { PageTitleSection } from '../components/PageTitleSection';
import { RewardCard } from '../components/RewardCard';
import { StakingForm } from '../components/StakingForm';
import { StatsCard } from '../components/StatsCard';
import { VotingPowerCard } from '../components/VotingPowerCard';

export const StakingView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Staking' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Stake to earn rewards and help govern OETH and OUSD',
        })}
        token={tokens.mainnet.OGN}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={3}>
            <StatsCard />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <StakingForm />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <Stack spacing={3}>
              <BalanceCard />
              <RewardCard />
              <VotingPowerCard />
            </Stack>
          </Grid2>
          <Grid2 xs={12}>
            <LockupsCard />
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
