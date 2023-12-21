import { Box, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackSentryError } from '@origin/governance/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { MyVotingHistoryCard } from '../components/MyVotingHistoryCard';
import { MyVotingPowerCard } from '../components/MyVotingPowerCard';
import { ProposalsCard } from '../components/ProposalsCard';
import { ProposalsHeader } from '../components/ProposalsHeader';
import { ProposalsSummaryCard } from '../components/ProposalsSummaryCard';
import { VoteDelegationCard } from '../components/VoteDelegationCard';

export const ProposalsView = () => {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ProposalsHeader />
      </ErrorBoundary>
      <Box>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={8}>
            <Stack spacing={3}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <ProposalsSummaryCard />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <ProposalsCard />
              </ErrorBoundary>
            </Stack>
          </Grid2>
          <Grid2 xs={12} md={4}>
            <Stack spacing={3}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <MyVotingPowerCard />
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
