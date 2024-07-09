import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useViewSelect = () => {
  const [search, setSearch] = useSearchParams({
    v: 'request',
  });

  return useMemo(
    () => ({
      view: search.get('v') ?? 'request',
      update: (newVal: 'request' | 'claim') => {
        setSearch((params) => {
          params.set('v', newVal);
          return params;
        });
      },
    }),
    [search, setSearch],
  );
};
