import { Grid, Stack } from '@mui/material';
import {
  AnalyticsCard,
  DailyStatCard,
  Page,
  PageSection,
  PageTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { ORIGIN_ANALYTICS_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';

import { oethSwapActions } from '../actions';
import { PageTitleSection } from '../components/PageTitleSection';
import { oethSwapRoutes } from '../constants';

const supportedTokens = {
  [mainnet.id.toString()]: tokens.mainnet.OETH,
  [arbitrum.id.toString()]: tokens.arbitrum.wOETH,
};

export const SwapView = () => {
  const intl = useIntl();
  const { chain } = useAccount();

  const token =
    supportedTokens[chain?.id ?? mainnet.id] ?? supportedTokens[mainnet.id];

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Origin Ether' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'A superior LST for earning yield across DeFi',
        })}
        token={tokens.mainnet.OETH}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid container spacing={5}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
            offset={{ md: 3 }}
          >
            <Swapper
              swapActions={oethSwapActions}
              swapRoutes={oethSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
            sx={{
              order: { xs: 2, md: 3 },
            }}
          >
            <Stack spacing={4}>
              <DailyStatCard
                token={token}
                stats={['supply_distribution', 'price']}
              />
              <AnalyticsCard
                token={token}
                href={`${ORIGIN_ANALYTICS_URL}/oeth`}
              />
            </Stack>
          </Grid>
        </Grid>
      </PageSection>
    </Page>
  );
};
