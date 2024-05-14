import { Stack } from '@mui/material';
import {
  ConnectPage,
  MergerBanner,
  Page,
  PageSection,
  PageTitle,
} from '@origin/defi/shared';
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
            <MigrationForm />
          ) : (
            <ConnectPage
              subtitle={intl.formatMessage({
                defaultMessage:
                  'You will be able to convert your tokens after connecting your wallet.',
              })}
              pt={3}
              buttonProps={{ variant: 'action' }}
            />
          )}
        </Stack>
      </PageSection>
    </Page>
  );
};
