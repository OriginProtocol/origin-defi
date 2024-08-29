import { Box, Stack } from '@mui/material';
import {
  Page,
  PageSection,
  PageTitle,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { BalancesCard } from '../components/BalancesCard';
import { BridgeActivityCard } from '../components/BridgeActivityCard';
import { BridgeCard } from '../components/BridgeCard';
import { BridgeProvider } from '../state';

export function BridgeView() {
  const intl = useIntl();
  const cardWidth = { xs: 1, sm: 552 };
  const cardWidthSide = { xs: 1, sm: 552, lg: 375 };
  return (
    <BridgeProvider>
      <Page>
        <PageTitle
          title={intl.formatMessage({ defaultMessage: 'Bridge' })}
          subtitle={intl.formatMessage({
            defaultMessage:
              'Send wOETH between Ethereum Mainnet and Arbitrum using Chainlink CCIP.',
          })}
          token={tokens.mainnet.wOETH}
        />
        <PageSection containerProps={{ maxWidth: 'lg' }}>
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            sx={{
              width: 1,
              justifyContent: { lg: 'center' },
              alignItems: { xs: 'center', lg: 'inherit' },
              gap: 3,
            }}
          >
            <Box
              sx={{
                minWidth: cardWidth,
                maxWidth: cardWidth,
              }}
            >
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <BridgeCard />
              </ErrorBoundary>
            </Box>
            <Stack
              sx={{
                minWidth: cardWidthSide,
                maxWidth: cardWidthSide,
                gap: 3,
              }}
            >
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <BalancesCard
                  title={intl.formatMessage({
                    defaultMessage: 'Your wOETH balances',
                  })}
                />
              </ErrorBoundary>
              <ErrorBoundary
                ErrorComponent={<ErrorCard />}
                onError={trackSentryError}
              >
                <BridgeActivityCard />
              </ErrorBoundary>
            </Stack>
          </Stack>
        </PageSection>
      </Page>
    </BridgeProvider>
  );
}
