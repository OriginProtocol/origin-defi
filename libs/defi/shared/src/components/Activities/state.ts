import { useState } from 'react';

import { createContainer } from 'react-tracked';

import type { Activity } from './types';

type ActivityState = {
  activities: Activity[];
  maxVisible: number;
};

export const { Provider: ActivityProvider, useTracked: useActivityState } =
  createContainer(() =>
    useState<ActivityState>({ activities: [], maxVisible: 10 }),
  );
