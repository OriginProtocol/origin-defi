import { Page, PageTitle } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

export const ProposalsView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Proposals' })}
        token={tokens.mainnet.OGN}
      />
    </Page>
  );
};
