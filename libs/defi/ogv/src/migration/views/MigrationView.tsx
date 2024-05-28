import { Stack } from '@mui/material';
import {
  ConnectPage,
  MergerBanner,
  Page,
  PageSection,
  PageTitle,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { MigrationForm } from '../components/MigrationForm';

export const MigrationView = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Migration' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Convert your OGV to OGN',
        })}
        token={tokens.mainnet.OGV}
      />
      <PageSection>
        <MergerBanner />
        <Stack pt={5}>
          {isConnected ? (
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <MigrationForm />
            </ErrorBoundary>
          ) : (
            <ConnectPage
              subtitle={intl.formatMessage({
                defaultMessage:
                  'You will be able to convert your tokens after connecting your wallet.',
              })}
              pt={3}
            />
          )}
        </Stack>
      </PageSection>
    </Page>
  );
};
