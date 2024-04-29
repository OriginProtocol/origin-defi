import {
  Page,
  PageSection,
  PageTitle,
  trackEvent,
  trackSentryError,
} from '@origin/defi/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { Redeemer } from '../components/Redeemer';

export const RedeemView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Redeem' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Redeem to a mix of stablecoins',
        })}
        token={tokens.mainnet.OUSD}
      />
      <PageSection containerProps={{ maxWidth: 'sm' }}>
        <Redeemer
          tokenIn={tokens.mainnet.OUSD}
          vaultContract={contracts.mainnet.OUSDVault}
          trackEvent={trackEvent}
          onError={trackSentryError}
          buttonsProps={{ variant: 'action' }}
        />
      </PageSection>
    </Page>
  );
};
