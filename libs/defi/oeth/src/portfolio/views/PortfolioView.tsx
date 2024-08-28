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
import { useIntl } from 'react-intl';

import { WoethStats } from '../components/StatsCard';
import { TokenSwitch } from '../components/TokenSwitch';
import { WoethHistoryCard } from '../components/WoethHistoryCard';
import { useTokenSelect } from '../hooks';

export const PortfolioView = () => {
  const intl = useIntl();
  const { token } = useTokenSelect();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'History' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Earnings and transaction history',
        })}
        token={tokens.mainnet.OETH}
      />
      <PageSection>
        <Stack spacing={5}>
          <TokenSwitch />
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            {token === 'oeth' ? (
              <StatsCard token={tokens.mainnet.OETH} />
            ) : (
              <WoethStats />
            )}
            {token === 'oeth' ? (
              <HistoryCard token={tokens.mainnet.OETH} />
            ) : (
              <WoethHistoryCard />
            )}
          </ErrorBoundary>
        </Stack>
      </PageSection>
    </Page>
  );
};
