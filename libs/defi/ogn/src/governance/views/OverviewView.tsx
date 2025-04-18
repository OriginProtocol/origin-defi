import { Grid, Stack } from '@mui/material';
import {
  Page,
  PageSection,
  PageTitle,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { MyVotingHistoryCard } from '../components/MyVotingHistoryCard';
import { MyVotingPowerCard } from '../components/MyVotingPowerCard';
import { PageTitleSection } from '../components/PageTitleSection';
import { ProposalListCard } from '../components/ProposalListCard';
import { ProposalsCountCard } from '../components/ProposalsCountCard';

export const OverviewView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Origin Governance' })}
        subtitle={intl.formatMessage({
          defaultMessage: `Shape the future of Origin's products`,
        })}
        token={tokens.mainnet.OGN}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid container spacing={5}>
          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <Stack spacing={5}>
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
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Stack spacing={5}>
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
                <MyVotingHistoryCard />
              </ErrorBoundary>
            </Stack>
          </Grid>
        </Grid>
      </PageSection>
    </Page>
  );
};
