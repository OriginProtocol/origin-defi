import { Box, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackSentryError } from '@origin/governance/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { MyVotingHistoryCard } from '../components/MyVotingHistoryCard';
import { MyVotingPowerCard } from '../components/MyVotingPowerCard';
import { ProposalListCard } from '../components/ProposalListCard';
import { ProposalListHeader } from '../components/ProposalListHeader';
import { ProposalsCountCard } from '../components/ProposalsCountCard';
import { VoteDelegationCard } from '../components/VoteDelegationCard';

export const ProposalListView = () => {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ProposalListHeader />
      </ErrorBoundary>
      <Box>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={8}>
            <Stack spacing={3}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <ProposalsCountCard sx={{ minHeight: 116 }} />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <ProposalListCard />
              </ErrorBoundary>
            </Stack>
          </Grid2>
          <Grid2 xs={12} md={4}>
            <Stack spacing={3}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <MyVotingPowerCard sx={{ minHeight: 116 }} />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <VoteDelegationCard />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <MyVotingHistoryCard />
              </ErrorBoundary>
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
};
