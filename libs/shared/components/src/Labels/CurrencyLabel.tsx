import { includes, isNilOrEmpty } from '@origin/shared/utils';

import type { ReactNode } from 'react';

export type CurrencyLabelProps = {
  currency?: 'ETH' | 'USD' | 'S';
  children?: ReactNode;
};

export const CurrencyLabel = ({ currency, children }: CurrencyLabelProps) => {
  const symbol = isNilOrEmpty(currency) ? (
    ''
  ) : currency === 'ETH' ? (
    <span style={{ fontFamily: 'Arial' }}>Ξ</span>
  ) : currency === 'S' ? (
    'S'
  ) : (
    '$'
  );

  return includes(['ETH', 'USD'], currency) ? (
    <>
      {symbol}
      {children}
    </>
  ) : (
    <>
      {children} {symbol}
    </>
  );
};
