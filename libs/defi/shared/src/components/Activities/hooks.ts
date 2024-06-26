import { useCallback, useEffect, useState } from 'react';

import { isNilOrEmpty } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { produce } from 'immer';
import { groupBy, prop } from 'ramda';

import { useActivityState } from './state';

import type { Activity, ActivityStatus, ActivityType } from './types';

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
          state.activities.unshift(
            activity as Extract<Activity, { type: ActivityType }>,
          );
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
    <T extends Activity = Activity>(
      activity: Partial<T> | undefined | null,
    ) => {
      let updated;
      if (activity) {
        setState(
          produce((state) => {
            const idx = state.activities.findIndex((a) => a.id === activity.id);
            if (idx > -1) {
              updated = { ...state.activities[idx], ...activity };
              state.activities[idx] = updated;
            }
          }),
        );
      }

      return updated;
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
            const idx = state.activities.findIndex((a) => a.id === id);
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
  const [pendingCount, setPendingCount] = useState(0);
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
        setPendingCount(0);
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else if (
        !isNilOrEmpty(grouped.error) &&
        prevGrouped?.error?.length !== grouped?.error?.length
      ) {
        setStatus('error');
        setPendingCount(0);
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('idle');
        setPendingCount(0);
      }
    } else {
      setStatus('pending');
      setPendingCount(grouped.pending?.length ?? 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities]);

  return { status, pendingCount };
};

export const useClearActivities = () => {
  const [, setState] = useActivityState();

  return useCallback(() => {
    setState(
      produce((state) => {
        state.activities = [];
      }),
    );
  }, [setState]);
};

export const useActivity = () => {
  const [local, setLocal] = useState<Activity | undefined>();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();

  return {
    activity: local,
    pushActivity: useCallback(
      (act: Activity) => {
        const activity = pushActivity(act);
        setLocal(activity);

        return activity;
      },
      [pushActivity],
    ),
    updateActivity: useCallback(
      (act: Partial<Activity>) => {
        if (local?.id) {
          const updated = updateActivity({
            ...act,
            type: local.type,
            id: local.id,
          });
          setLocal(updated);

          return updated;
        }
      },
      [local, updateActivity],
    ),
    deleteActivity: useCallback(() => {
      if (local?.id) {
        deleteActivity(local.id);
        setLocal(undefined);
      }
    }, [deleteActivity, local?.id]),
  };
};
