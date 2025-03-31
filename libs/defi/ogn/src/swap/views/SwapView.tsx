import { Grid } from '@mui/material';
import {
  Page,
  PageSection,
  PageTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { OGN } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import { ognSwapActions } from '../actions';
import { PageTitleSection } from '../components/PageTitleSection';
import { ognSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Origin Token' })}
        subtitle={intl.formatMessage({
          defaultMessage: `Govern & share in the success of Origin's products.`,
        })}
        icon={OGN}
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
            offset={{
              md: 3,
            }}
          >
            <Swapper
              swapActions={ognSwapActions}
              swapRoutes={ognSwapRoutes}
              buttonsProps={{ variant: 'action' }}
              trackEvent={trackEvent}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          ></Grid>
        </Grid>
      </PageSection>
    </Page>
  );
};
