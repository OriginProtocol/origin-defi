import { Container } from '@mui/material';
import { PageTitle, Swapper, trackEvent } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { ogvSwapActions } from '../actions';
import { ogvSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Container maxWidth="sm">
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Swap' })}
        token={tokens.mainnet.OGV}
      />
      <Swapper
        swapActions={ogvSwapActions}
        swapRoutes={ogvSwapRoutes}
        buttonsProps={{ variant: 'action' }}
        trackEvent={trackEvent}
      />
    </Container>
  );
};
