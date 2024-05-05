import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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
          defaultMessage: 'Govern an expansive ecosystem',
        })}
        token={tokens.mainnet.OGN}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={5}>
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
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <MyVotingHistoryCard />
            </ErrorBoundary>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
