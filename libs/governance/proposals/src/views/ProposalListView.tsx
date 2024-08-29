import { Box, Grid2, Stack } from '@mui/material';
import { MergerBanner, trackSentryError } from '@origin/governance/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { MyVotingHistoryCard } from '../components/MyVotingHistoryCard';
import { ProposalListCard } from '../components/ProposalListCard';
import { ProposalListHeader } from '../components/ProposalListHeader';
import { ProposalsCountCard } from '../components/ProposalsCountCard';

export const ProposalListView = () => {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ProposalListHeader />
      </ErrorBoundary>
      <MergerBanner />
      <Box>
        <Grid2 container spacing={3}>
          <Grid2
            size={{
              xs: 12,
              md: 8,
            }}
          >
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
          <Grid2
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <MyVotingHistoryCard />
            </ErrorBoundary>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
};
