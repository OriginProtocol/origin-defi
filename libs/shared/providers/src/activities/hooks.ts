import { useCallback, useEffect, useState } from 'react';

import { isNilOrEmpty } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { produce } from 'immer';
import { groupBy, prop } from 'ramda';

import { useActivityState } from './state';

import type { Activity, ActivityStatus } from './types';

export const usePushActivity = () => {
  const [, setState] = useActivityState();

  return useCallback(
    <T extends Activity = Activity>(value: T) => {
      const activity = {
        ...value,
        id: Date.now().toString(),
        createdOn: Date.now(),
      };
      setState(
        produce((state) => {
          state.activities.unshift(activity as Activity);
        }),
      );

      return activity;
    },
    [setState],
  );
};

export const useUpdateActivity = () => {
  const [, setState] = useActivityState();

  return useCallback(
    (activity: Partial<Activity> | undefined | null) => {
      let existing: Activity | undefined;
      if (activity) {
        setState(
          produce((state) => {
            existing = state.activities.find(
              (a) => a.id && a.id === activity?.id,
            );
            if (existing) {
              Object.assign(existing, activity);
            }
          }),
        );
        return existing;
      }
    },
    [setState],
  );
};

export const useDeleteActivity = () => {
  const [, setState] = useActivityState();

  return useCallback(
    (id: string | undefined | null) => {
      if (id) {
        setState(
          produce((state) => {
            const idx = state.activities.findIndex((a) => id && a.id === id);
            if (idx > -1) {
              state.activities.splice(idx, 1);
            }
          }),
        );
      }
    },
    [setState],
  );
};

export const useActivitiesStatus = () => {
  const [{ activities }] = useActivityState();
  const [status, setStatus] = useState<ActivityStatus>('idle');
  const prev = usePrevious(activities);

  useEffect(() => {
    const prevGrouped = groupBy(prop('status'), prev ?? []);
    const grouped = groupBy(prop('status'), activities ?? []);

    if (isNilOrEmpty(grouped.pending)) {
      if (
        !isNilOrEmpty(grouped.success) &&
        prevGrouped?.success?.length !== grouped?.success?.length
      ) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else if (
        !isNilOrEmpty(grouped.error) &&
        prevGrouped?.error?.length !== grouped?.error?.length
      ) {
        setStatus('error');
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('idle');
      }
    } else {
      setStatus('pending');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities]);

  return status;
};
