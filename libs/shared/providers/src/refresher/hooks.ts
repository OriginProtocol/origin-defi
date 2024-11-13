/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useRef, useState } from 'react';

import { useIntervalEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import useIdle from 'react-use/lib/useIdle';

import type { QueryFunction, QueryKey } from '@tanstack/react-query';

export type RefreshStatus =
  | 'idle'
  | 'polling'
  | 'processed'
  | 'timeout'
  | 'error';

export type UseRefresherProps<QueryResult = any> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<QueryResult>;
  isResultProcessed: (prev: QueryResult, next: QueryResult) => boolean;
  onSettled?: (status: RefreshStatus, next: QueryResult) => void;
  maxRetries?: number;
  interval?: number;
};

export const useRefresher = <QueryResult = any>({
  queryKey,
  queryFn,
  isResultProcessed,
  onSettled,
  maxRetries = 10,
  interval = 2000,
}: UseRefresherProps<QueryResult>) => {
  const queryClient = useQueryClient();
  const prev = useRef<QueryResult | null>(null);
  const [retries, setRetries] = useState(0);
  const [status, setStatus] = useState<RefreshStatus>('idle');
  const [pollInterval, setPollInterval] = useState<number | undefined>(
    undefined,
  );

  const startRefresh = useCallback(
    async (initialData: QueryResult | undefined) => {
      if (status !== 'polling') {
        setStatus('polling');
        if (initialData) {
          prev.current = initialData;
          setPollInterval(interval);
        } else {
          setTimeout(() => {
            setStatus('processed');
          }, 12000);
        }
      }
    },
    [interval, status],
  );

  const stopRefresh = useCallback(() => {
    setPollInterval(undefined);
    setStatus('idle');
  }, []);

  useIntervalEffect(() => {
    (async () => {
      const next = await queryClient.fetchQuery({
        queryKey,
        queryFn,
        staleTime: 0,
      });

      try {
        if (!prev.current || !next) {
          setPollInterval(undefined);
          setStatus('error');
          onSettled?.('error', next);
        } else if (retries > maxRetries) {
          setPollInterval(undefined);
          setStatus('timeout');
          onSettled?.('timeout', next);
        } else if (isResultProcessed(prev.current, next)) {
          setPollInterval(undefined);
          setStatus('processed');
          onSettled?.('processed', next);
        }
      } catch {
        setPollInterval(undefined);
        setStatus('error');
        onSettled?.('error', next);
      }
      setRetries((prev) => prev + 1);
    })();
  }, pollInterval);

  return {
    status,
    startRefresh,
    stopRefresh,
  };
};

export const useIdlePollInterval = (pollInterval = 12e3) => {
  const idle = useIdle(pollInterval + 1e3);

  return useMemo(() => (idle ? 0 : pollInterval), [idle, pollInterval]);
};
