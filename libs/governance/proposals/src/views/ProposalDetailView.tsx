import { Box, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackSentryError } from '@origin/governance/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { useMountEffect } from '@react-hookz/web';

import { CurrentResultsCard } from '../components/CurrentResultsCard';
import { DetailsCard } from '../components/DetailsCard';
import { MyVotingPowerCard } from '../components/MyVotingPowerCard';
import { ProposalDetailHeader } from '../components/ProposalDetailHeader';
import { StatusCard } from '../components/StatusCard';
import { VoteCard } from '../components/VotesCard';

export const ProposalDetailView = () => {
  useMountEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ProposalDetailHeader />
      </ErrorBoundary>
      <Box>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={8}>
            <Stack spacing={3}>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <CurrentResultsCard />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <DetailsCard />
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
                <VoteCard />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <StatusCard />
              </ErrorBoundary>
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
};
