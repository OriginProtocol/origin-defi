import { includes } from '@origin/shared/utils';

import type { ReactNode } from 'react';

import type { Currency } from '../Controls';

export type CurrencyLabelProps = {
  currency?: Currency;
  children?: ReactNode;
};

export const CurrencyLabel = ({ currency, children }: CurrencyLabelProps) => {
  if (!currency) {
    return children;
  }

  const symbol =
    currency === 'ETH' ? (
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
