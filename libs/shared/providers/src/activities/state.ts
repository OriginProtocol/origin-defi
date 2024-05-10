import { useEffect, useState } from 'react';

import { parse, stringify } from '@origin/shared/utils';
import { createContainer } from 'react-tracked';

import type { Activity } from './types';

type ActivityState = {
  activities: Activity[];
  maxVisible: number;
};

let initialState: ActivityState = {
  activities: [],
  maxVisible: 10,
};
try {
  const persistedState = localStorage.getItem('ActivityState');
  if (persistedState) {
    initialState = parse<ActivityState>(persistedState);
  }
} catch (err) {
  console.log(err);
  console.log('Error loading persisted activity state.');
}

export const { Provider: ActivityProvider, useTracked: useActivityState } =
  createContainer(() => {
    const [state, setState] = useState<ActivityState>(initialState);
    useEffect(() => {
      localStorage.setItem('ActivityState', stringify(state));
    }, [state]);
    return [state, setState] as const;
  });
