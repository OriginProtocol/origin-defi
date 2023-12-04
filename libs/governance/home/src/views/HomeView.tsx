import { Box, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { HomeHeader } from '../components/HomeHeader';
import { MyVotingHistoryCard } from '../components/MyVotingHistoryCard';
import { MyVotingPowerCard } from '../components/MyVotingPowerCard';
import { ProposalsCard } from '../components/ProposalsCard';
import { ProposalsSummaryCard } from '../components/ProposalsSummaryCard';
import { VoteDelegationCard } from '../components/VoteDelegationCard';

export const HomeView = () => {
  return (
    <Stack spacing={3}>
      <HomeHeader />
      <Box>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={8}>
            <Stack spacing={3}>
              <ProposalsSummaryCard />
              <ProposalsCard />
            </Stack>
          </Grid2>
          <Grid2 xs={12} md={4}>
            <Stack spacing={3}>
              <MyVotingPowerCard />
              <VoteDelegationCard />
              <MyVotingHistoryCard />
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
};
