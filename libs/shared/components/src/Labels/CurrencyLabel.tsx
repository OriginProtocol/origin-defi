import { isNilOrEmpty } from '@origin/shared/utils';

export type CurrencyLabelProps = {
  currency?: 'ETH' | 'USD';
};

export const CurrencyLabel = ({ currency }: CurrencyLabelProps) => {
  const symbol = isNilOrEmpty(currency) ? (
    ''
  ) : currency === 'ETH' ? (
    <span style={{ fontFamily: 'Arial' }}>Ξ</span>
  ) : (
    '$'
  );

  return symbol;
};
