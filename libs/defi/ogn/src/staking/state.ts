import { useEffect, useState } from 'react';

import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntervalEffect, usePrevious } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import { createContainer } from 'react-tracked';
import { useAccount } from 'wagmi';

import { useOgnLockupsQuery } from './queries.generated';

const MAX_RETRY = 10;

type LockupPollingState = {
  refetchInterval: number | false;
  lockupId?: string;
  retries: number;
};

export const { Provider: LockupPollingProvider, useTracked: useLockupPolling } =
  createContainer(() => {
    const [state, setState] = useState<LockupPollingState>({
      refetchInterval: false,
      retries: 0,
    });
    const { address } = useAccount();
    const { data } = useQuery({
      queryKey: useOgnLockupsQuery.getKey({
        address: address?.toLowerCase() ?? ZERO_ADDRESS,
      }),
      queryFn: useOgnLockupsQuery.fetcher({
        address: address?.toLowerCase() ?? ZERO_ADDRESS,
      }),
      refetchInterval: state.refetchInterval,
      enabled: !!state.refetchInterval,
      select: (data) => data?.esLockups ?? [],
    });
    const prev = usePrevious(data);

    useEffect(() => {
      let isDifferent = false;
      if (state.lockupId === undefined) {
        isDifferent = data?.length !== prev?.length;
      } else {
        const latestLockup = data?.find((l) => l.lockupId === state.lockupId);
        const prevLockup = prev?.find((l) => l.lockupId === state.lockupId);
        isDifferent =
          !!latestLockup &&
          !!prevLockup &&
          (latestLockup.amount !== prevLockup.amount ||
            latestLockup.end !== prevLockup.end);
      }
      if (isDifferent || state.retries > MAX_RETRY) {
        setState({ refetchInterval: false, lockupId: undefined, retries: 0 });
      }
    }, [data, prev, state.lockupId, state.retries]);

    useIntervalEffect(
      () => {
        setState((prev) => ({ ...prev, retries: prev.retries++ }));
      },
      state.refetchInterval ? state.refetchInterval : undefined,
    );

    return [state, setState];
  });
