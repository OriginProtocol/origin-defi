import { useMemo } from 'react';

import { tokens } from '@origin/shared/contracts';
import { useSearchParams } from 'react-router-dom';

export const useTokenSelect = () => {
  const [search, setSearch] = useSearchParams({
    t: tokens.base.superOETHb.symbol,
  });

  return useMemo(
    () => ({
      symbol: search.get('t') ?? tokens.base.superOETHb.symbol,
      update: (newVal: 'superOETHb' | 'wsuperOETHb') => {
        setSearch((params) => {
          params.set('t', newVal);
          return params;
        });
      },
    }),
    [search, setSearch],
  );
};
