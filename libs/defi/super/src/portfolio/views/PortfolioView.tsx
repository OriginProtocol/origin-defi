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
import { getTokenBySymbol, tokens } from '@origin/shared/contracts';
import { superOETH } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { base } from 'viem/chains';

import { useTokenSelect } from '../hooks';

export const PortfolioView = () => {
  const intl = useIntl();
  const { symbol } = useTokenSelect();

  const token = getTokenBySymbol(symbol, base.id) ?? tokens.base.superOETHb;

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
          {/* <TokenSwitch /> */}
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            <StatsCard token={token} />
            <HistoryCard token={token} />
          </ErrorBoundary>
        </Stack>
      </PageSection>
    </Page>
  );
};
