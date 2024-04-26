import { Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Page, PageSection, PageTitle } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { BalanceCard } from '../components/BalanceCard';
import { BuybackCard } from '../components/BuybackCard';
import { LockupsCard } from '../components/LockupsCard';
import { RewardCard } from '../components/RewardCard';
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
        token={tokens.mainnet.OGV}
      />
      <PageSection>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={7}>
            <StatsCard />
          </Grid2>
          <Grid2 xs={12} md={5}>
            <BuybackCard />
          </Grid2>
          <Grid2 md={12} display={{ xs: 'none', md: 'block' }}>
            <Divider sx={{ my: 2 }} />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <BalanceCard sx={{ height: 1 }} />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <RewardCard sx={{ height: 1 }} />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <VotingPowerCard sx={{ height: 1 }} />
          </Grid2>
          <Grid2 xs={12}>
            <LockupsCard />
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
