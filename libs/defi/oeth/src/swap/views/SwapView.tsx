import { Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  Page,
  PageSection,
  PageTitle,
  SectionTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { oethSwapActions } from '../actions';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { DetailsCard } from '../components/DetailsCard';
import { PageTitleSection } from '../components/PageTitleSection';
import { oethSwapRoutes } from '../constants';
import { useSupportedChainTokens } from '../hooks';

export const SwapView = () => {
  const intl = useIntl();
  const { connected, disconnected } = useSupportedChainTokens();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Origin Ether' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Ethereum liquid staking made simple',
        })}
        token={tokens.mainnet.OETH}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={5}>
          <Grid2 xs={12} md={6} mdOffset={2}>
            <Swapper
              swapActions={oethSwapActions}
              swapRoutes={oethSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <Stack spacing={4}>
              <Stack spacing={2}>
                <SectionTitle
                  dotColor="success.dark"
                  label={intl.formatMessage({ defaultMessage: 'Connected to' })}
                />
                <DetailsCard token={connected} />
              </Stack>
              <Stack spacing={2}>
                <Typography variant="mono">
                  {intl.formatMessage({
                    defaultMessage: 'More available networks',
                  })}
                </Typography>
                <Stack spacing={1}>
                  {disconnected?.map((t) => (
                    <DetailsCard
                      key={t.symbol}
                      token={t}
                      defaultExpanded={false}
                    />
                  ))}
                </Stack>
              </Stack>
              <AnalyticsCard />
            </Stack>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
