import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material';
import { useScreenSize } from '@visx/responsive';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import type { LayoutState } from './types';

export const { Provider: LayoutProvider, useTracked: useLayoutState } =
  createContainer(() => {
    const theme = useTheme();
    const { width, height } = useScreenSize({
      debounceTime: theme.transitions.duration.enteringScreen,
    });
    const [state, setState] = useState<LayoutState>({
      drawerWidth: 370,
      isDrawerOpen: true,
      width: Math.max(0, width - (370 + 72)),
      height,
    });

    useEffect(() => {
      const dWidth = state.isDrawerOpen ? 370 + 72 : 72 * 2;
      setState(
        produce((draft) => {
          draft.width = Math.max(0, width - dWidth);
          draft.height = height;
        }),
      );
    }, [height, state.isDrawerOpen, width]);

    return [state, setState];
  });
