/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

import { useIntervalEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';

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
  maxRetries?: number;
  interval?: number;
};

export const useRefresher = <QueryResult = any>({
  queryKey,
  queryFn,
  isResultProcessed,
  maxRetries = 10,
  interval = 2000,
}: UseRefresherProps<QueryResult>) => {
  const queryClient = useQueryClient();
  const prev = queryClient.getQueryData<QueryResult>(queryKey);
  const [retries, setRetries] = useState(0);
  const [status, setStatus] = useState<RefreshStatus>('idle');
  const [pollInterval, setPollInterval] = useState<number | undefined>(
    undefined,
  );

  const startRefresh = useCallback(() => {
    setPollInterval(interval);
    setStatus('polling');
  }, [interval]);

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
        if (!prev || !next) {
          setPollInterval(undefined);
          setStatus('error');
        } else if (retries > maxRetries) {
          setPollInterval(undefined);
          setStatus('timeout');
        } else if (isResultProcessed(prev, next)) {
          setPollInterval(undefined);
          setStatus('processed');
        }
      } catch {
        setPollInterval(undefined);
        setStatus('error');
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
