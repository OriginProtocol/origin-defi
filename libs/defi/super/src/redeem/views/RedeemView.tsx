import { Stack } from '@mui/material';
import {
  ChainsChip,
  Page,
  PageSection,
  PageTitle,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { superOETH } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { base, plumeMainnet } from 'viem/chains';

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
          defaultMessage: '1:1 WETH redemptions via the Super OETH vault',
        })}
        icon={superOETH}
      >
        <ChainsChip
          chainIds={[base.id, plumeMainnet.id]}
          minHeight={40}
          sx={{ mt: 3 }}
        />
      </PageTitle>
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
