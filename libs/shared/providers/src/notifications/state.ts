import { useState } from 'react';

import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { Notification } from './types';

type NotificationsState = {
  notifications: Notification[];
  maxVisible: number;
  autoHideDuration: number | null;
};

export const { Provider, useTracked } = createContainer<
  NotificationsState,
  Dispatch<SetStateAction<NotificationsState>>,
  { initialState: NotificationsState }
>(({ initialState }) => useState(initialState));
