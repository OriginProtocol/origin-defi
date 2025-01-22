import { isNilOrEmpty } from '@origin/shared/utils';

export type CurrencyLabelProps = {
  currency?: 'ETH' | 'USD' | 'S';
};

export const CurrencyLabel = ({ currency }: CurrencyLabelProps) => {
  const symbol = isNilOrEmpty(currency) ? (
    ''
  ) : currency === 'ETH' ? (
    <span style={{ fontFamily: 'Arial' }}>Ξ</span>
  ) : currency === 'S' ? (
    'S'
  ) : (
    '$'
  );

  return symbol;
};
