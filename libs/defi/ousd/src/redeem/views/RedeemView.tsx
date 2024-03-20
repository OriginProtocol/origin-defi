import { Container } from '@mui/material';
import {
  PageTitle,
  Redeemer,
  trackEvent,
  trackSentryError,
} from '@origin/defi/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { OUSD } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

export const RedeemView = () => {
  const intl = useIntl();

  return (
    <Container maxWidth="sm">
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Redeem' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Redeem to a mix of stablecoins',
        })}
        icon={OUSD}
      />
      <Redeemer
        tokenIn={tokens.mainnet.OUSD}
        vaultContract={contracts.mainnet.OUSDVault}
        trackEvent={trackEvent}
        onError={trackSentryError}
        buttonsProps={{ variant: 'action' }}
      />
    </Container>
  );
};
