import { useEffect, useState } from 'react';

import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntervalEffect, usePrevious } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import { createContainer } from 'react-tracked';
import { useAccount } from 'wagmi';

import { useOgnLockupsQuery } from './queries.generated';

const MAX_RETRY = 10;

export const { Provider: LockupPollingProvider, useTracked: useLockupPolling } =
  createContainer(() => {
    const [state, setState] = useState<number | false>(false);
    const [retries, setRetries] = useState(0);
    const { address } = useAccount();
    const { data } = useQuery({
      queryKey: useOgnLockupsQuery.getKey({ address: address ?? ZERO_ADDRESS }),
      queryFn: useOgnLockupsQuery.fetcher({ address: address ?? ZERO_ADDRESS }),
      refetchInterval: state,
      enabled: !!state,
      select: (data) => data?.esLockups?.length ?? 0,
    });
    const prev = usePrevious(data);

    useEffect(() => {
      if (data !== prev || retries > MAX_RETRY) {
        setState(false);
      }
    }, [data, prev, retries]);

    useIntervalEffect(
      () => {
        setRetries((prev) => prev++);
      },
      state ? state : undefined,
    );

    return [state, setState];
  });
