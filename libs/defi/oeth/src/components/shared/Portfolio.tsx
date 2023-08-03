import { PortfolioCard } from '@origin/shared/components';
import { useIntl } from 'react-intl';

export function Portfolio() {
  const intl = useIntl();
  return (
    <PortfolioCard
      title={intl.formatMessage({ defaultMessage: 'OETH Portfolio' })}
      balanceText={intl.formatMessage({ defaultMessage: 'Balance' })}
      balanceValue={intl.formatNumber(0)}
      pendingYieldText={intl.formatMessage({ defaultMessage: 'Pending yield' })}
      pendingYieldValue={intl.formatNumber(0)}
      valueText={intl.formatMessage({
        defaultMessage: 'Lifetime earnings',
      })}
      value={intl.formatNumber(0)}
      logoSrc="https://app.oeth.com/images/oeth.svg"
    ></PortfolioCard>
  );
}
