import { Stack } from '@mui/material';
import {
  HistoryCard,
  Page,
  PageSection,
  PageTitle,
  StatsCard,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { superOETH } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

export const PortfolioView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Super OETH history' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Earnings and transaction history',
        })}
        icon={superOETH}
      />
      <PageSection>
        <Stack spacing={5}>
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            <StatsCard token={tokens.base.superOETHb} />
            <HistoryCard token={tokens.base.superOETHb} />
          </ErrorBoundary>
        </Stack>
      </PageSection>
    </Page>
  );
};
