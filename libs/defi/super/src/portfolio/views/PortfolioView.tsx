import { Stack } from '@mui/material';
import {
  ChainsChip,
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
import { base, plumeMainnet } from 'viem/chains';

import { TokenSwitch } from '../components/TokenSwitch';
import { WsuperOethbStats } from '../components/WsuperOethbStatsCard';
import { WsuperOethHistoryCard } from '../components/WsuperOethHistoryCard';
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
      >
        <ChainsChip
          chainIds={[base.id, plumeMainnet.id]}
          minHeight={40}
          sx={{ mt: 3 }}
        />
      </PageTitle>
      <PageSection>
        <Stack spacing={5}>
          <TokenSwitch />
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            {symbol === tokens.base.superOETHb.symbol ? (
              <StatsCard token={token} />
            ) : (
              <WsuperOethbStats />
            )}
            {symbol === tokens.base.superOETHb.symbol ? (
              <HistoryCard token={token} />
            ) : (
              <WsuperOethHistoryCard />
            )}
          </ErrorBoundary>
        </Stack>
      </PageSection>
    </Page>
  );
};
