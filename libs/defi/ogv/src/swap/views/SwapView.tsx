import {
  Page,
  PageSection,
  PageTitle,
  Swapper,
  trackEvent,
} from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { ogvSwapActions } from '../actions';
import { ogvSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Swap' })}
        token={tokens.mainnet.OGV}
      />
      <PageSection>
        <Swapper
          swapActions={ogvSwapActions}
          swapRoutes={ogvSwapRoutes}
          buttonsProps={{ variant: 'action' }}
          trackEvent={trackEvent}
        />
      </PageSection>
    </Page>
  );
};
