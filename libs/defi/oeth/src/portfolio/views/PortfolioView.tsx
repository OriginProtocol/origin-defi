import { Stack } from '@mui/material';
import { Page, PageSection, PageTitle } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { BalanceCard } from '../components/BalanceHeader';
import { ChartCard } from '../components/ChartCard';
import { HistoryCard } from '../components/HistoryCard';
import { StatCards } from '../components/StatCards';

export const PortfolioView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Portfolio' })}
        token={tokens.mainnet.OETH}
      />
      <PageSection>
        <Stack spacing={5}>
          <BalanceCard />
          <StatCards />
          <ChartCard />
          <HistoryCard />
        </Stack>
      </PageSection>
    </Page>
  );
};
