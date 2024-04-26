import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  Page,
  PageSection,
  PageTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { oethSwapActions } from '../actions';
import { CexCard } from '../components/CexCard';
import { FAQCard } from '../components/FAQCard';
import { OethDetailCard } from '../components/OethDetailCard';
import { PageTitleSection } from '../components/PageTitleSection';
import { oethSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

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
      <PageSection>
        <Grid2 container spacing={4}>
          <Grid2 xs={12} md={8}>
            <Stack spacing={4}>
              <Swapper
                swapActions={oethSwapActions}
                swapRoutes={oethSwapRoutes}
                buttonsProps={{ variant: 'action' }}
                trackEvent={trackEvent}
              />
              <CexCard />
              <FAQCard />
            </Stack>
          </Grid2>
          <Grid2 xs={12} md={4}>
            <OethDetailCard />
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
