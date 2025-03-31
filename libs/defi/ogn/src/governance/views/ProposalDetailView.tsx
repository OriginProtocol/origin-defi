import { Container, Grid, Stack } from '@mui/material';
import { Page, trackSentryError } from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { CurrentResultsCard } from '../components/CurrentResultsCard';
import { DetailsCard } from '../components/DetailsCard';
import { ProposalDetailHeader } from '../components/ProposalDetailHeader';
import { StatusCard } from '../components/StatusCard';
import { VoteCard } from '../components/VotesCard';

export const ProposalDetailView = () => {
  return (
    <Page sx={{ backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <ProposalDetailHeader />
        <Grid container spacing={3}>
          <Grid
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
                <CurrentResultsCard />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <DetailsCard />
              </ErrorBoundary>
            </Stack>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Stack spacing={3}>
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
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
