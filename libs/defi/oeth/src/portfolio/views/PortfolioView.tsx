import { Stack } from '@mui/material';
import {
  Page,
  PageSection,
  PageTitle,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { OethHistoryCard } from '../components/OethHistoryCard';
import { OethStats, WoethStats } from '../components/StatsCard';
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
            {token === 'oeth' ? <OethStats /> : <WoethStats />}
            {token === 'oeth' ? <OethHistoryCard /> : <WoethHistoryCard />}
          </ErrorBoundary>
        </Stack>
      </PageSection>
    </Page>
  );
};
