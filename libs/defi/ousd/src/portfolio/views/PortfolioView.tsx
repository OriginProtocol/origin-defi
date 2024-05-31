import { Stack } from '@mui/material';
import { Page, PageSection, PageTitle } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { HistoryCard } from '../components/HistoryCard';
import { StatsCard } from '../components/StatsCard';

export const PortfolioView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'History' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Earnings and transaction history',
        })}
        token={tokens.mainnet.OUSD}
      />
      <PageSection>
        <Stack spacing={5}>
          <StatsCard />
          <HistoryCard />
        </Stack>
      </PageSection>
    </Page>
  );
};
