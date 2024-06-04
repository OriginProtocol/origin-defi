import { useCallback, useEffect, useState } from 'react';

import { isNilOrEmpty, parse, stringify } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { produce } from 'immer';
import { clone, groupBy, prop } from 'ramda';

import { usePushNotificationForActivity } from '../notifications';
import { useActivityState } from './state';

import type { Activity, ActivityStatus } from './types';

export const useActivity = <T extends Activity = Activity>() => {
  const [activity, setActivity] = useState<T>();
  const _pushActivity = usePushActivity();
  const _updateActivity = useUpdateActivity();
  const _deleteActivity = useDeleteActivity();

  return {
    activity,
    pushActivity: useCallback(
      (input: T) => {
        const activity = _pushActivity(input);
        setActivity(activity);
        return activity;
      },
      [_pushActivity],
    ),
    updateActivity: useCallback(
      (input: Partial<T>) => {
        const activity = _updateActivity(input);
        setActivity(activity);
        return activity;
      },
      [_updateActivity],
    ),
    deleteActivity: useCallback(
      (reason?: Parameters<typeof _deleteActivity>[1]) => {
        if (activity) {
          _deleteActivity(activity.id, reason);
        }
        return activity;
      },
      [_deleteActivity, activity],
    ),
  };
};

export const usePushActivity = () => {
  const [, setState] = useActivityState();
  const pushNotificationForActivity = usePushNotificationForActivity();

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

      pushNotificationForActivity(activity);
      return activity;
    },
    [pushNotificationForActivity, setState],
  );
};

export const useUpdateActivity = () => {
  const [, setState] = useActivityState();
  const pushNotificationForActivity = usePushNotificationForActivity();

  return useCallback(
    <T extends Activity = Activity>(
      activity: Partial<T> | undefined | null,
    ) => {
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
            existing = parse(stringify(existing));
          }),
        );
        pushNotificationForActivity(existing);
        return existing as T;
      }
    },
    [pushNotificationForActivity, setState],
  );
};

export const useDeleteActivity = () => {
  const [, setState] = useActivityState();
  const pushNotificationForActivity = usePushNotificationForActivity();

  return useCallback(
    (id: string | undefined | null, reason?: 'rejected') => {
      if (id) {
        setState(
          produce((state) => {
            const idx = state.activities.findIndex((a) => id && a.id === id);
            if (idx > -1) {
              const removed = state.activities.splice(idx, 1);
              if (removed) {
                pushNotificationForActivity(
                  clone(removed) as unknown as Activity,
                  { reason },
                );
              }
            }
          }),
        );
      }
    },
    [pushNotificationForActivity, setState],
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
