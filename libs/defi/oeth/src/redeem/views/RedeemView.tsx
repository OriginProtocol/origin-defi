import { Stack } from '@mui/material';
import {
  Page,
  PageSection,
  PageTitle,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { ViewSwitch } from '../components/ViewSwitch';
import { useViewSelect } from '../hooks';
import { ClaimView } from './ClaimView';
import { RequestView } from './RequestView';

export const RedeemView = () => {
  const intl = useIntl();
  const { view } = useViewSelect();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Redeem' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Request redemptions to WETH',
        })}
        token={tokens.mainnet.OETH}
      />

      <PageSection containerProps={{ maxWidth: 'sm' }}>
        <Stack spacing={6}>
          <ViewSwitch />
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            {view === 'request' ? <RequestView /> : <ClaimView />}
          </ErrorBoundary>
        </Stack>
      </PageSection>
    </Page>
  );
};
