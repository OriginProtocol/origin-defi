import { Stack } from '@mui/material';
import {
  HistoryCard,
  Page,
  PageSection,
  PageTitle,
  StatsCard,
} from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

export const PortfolioView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'History' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Earnings and transaction history',
        })}
        token={tokens.sonic.OS}
      />
      <PageSection>
        <Stack spacing={5}>
          <StatsCard token={tokens.sonic.OS} />
          <HistoryCard token={tokens.sonic.OS} />
        </Stack>
      </PageSection>
    </Page>
  );
};
