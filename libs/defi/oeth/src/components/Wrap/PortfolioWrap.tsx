import { PortfolioCard } from '@origin/shared/components';
import { useIntl } from 'react-intl';

export function PortfolioWrap() {
  const intl = useIntl();
  return (
    <PortfolioCard
      title={intl.formatMessage({ defaultMessage: 'OETH Portfolio' })}
      balanceText={intl.formatMessage({ defaultMessage: 'wOETH Balance' })}
      balanceValue={intl.formatNumber(0)}
      pendingYieldText={intl.formatMessage({
        defaultMessage: 'Current Value (OETH)',
      })}
      pendingYieldValue={intl.formatNumber(0)}
      valueText={intl.formatMessage({
        defaultMessage: 'Current Value (OETH)',
      })}
      value={intl.formatNumber(0)}
      logoSrc="https://app.oeth.com/images/currency/woeth-icon-small.svg"
    ></PortfolioCard>
  );
}
