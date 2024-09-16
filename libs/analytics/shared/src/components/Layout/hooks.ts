import { useCallback } from 'react';

import { produce } from 'immer';

import { useLayoutState } from './state';

export const useLayout = () => {
  const [state, setState] = useLayoutState();

  return [
    state,
    {
      handleSetDrawer: useCallback(
        (open: boolean) => {
          setState(
            produce((draft) => {
              draft.isDrawerOpen = open;
            }),
          );
        },
        [setState],
      ),
      handleToggleDrawer: useCallback(() => {
        setState(
          produce((draft) => {
            draft.isDrawerOpen = !draft.isDrawerOpen;
          }),
        );
      }, [setState]),
    },
  ] as const;
};
