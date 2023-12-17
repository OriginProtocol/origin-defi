import { Box, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackSentryError } from '@origin/governance/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { CurrentResultsCard } from '../components/CurrentResultsCard';
import { DetailsCard } from '../components/DetailsCard';
import { ProposalHeader } from '../components/ProposalHeader';
import { VoteCard } from '../components/VotesCard';

export const ProposalView = () => {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ProposalHeader />
      </ErrorBoundary>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <CurrentResultsCard />
      </ErrorBoundary>
      <Box>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={8}>
            <Stack spacing={3}>
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
                <VoteCard />
              </ErrorBoundary>
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
};