import { useEffect } from 'react';

import { usePrevious } from '@react-hookz/web';
import useIdle from 'react-use/lib/useIdle';
import { useBlockNumber, useReadContracts } from 'wagmi';

import type { Abi } from 'viem';
import type { UseReadContractsParameters } from 'wagmi';

export const useWatchContracts = <T extends Abi | readonly unknown[]>(
  config: UseReadContractsParameters<T>,
) => {
  const isIdle = useIdle();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { enabled: !isIdle },
  });
  const prev = usePrevious(Number(blockNumber));
  const res = useReadContracts(config);

  useEffect(() => {
    if (Number(blockNumber) !== prev) {
      res?.refetch();
    }
  }, [blockNumber, prev, res]);

  return res;
};
