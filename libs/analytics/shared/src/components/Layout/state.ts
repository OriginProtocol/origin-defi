import { useEffect, useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import { useScreenSize } from '@visx/responsive';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import { DRAWER_WIDTH, MARGIN_WIDTH } from './constants';

import type { LayoutState } from './types';

export const { Provider: LayoutProvider, useTracked: useLayoutState } =
  createContainer(() => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('md'));
    const { width, height } = useScreenSize({
      debounceTime: theme.transitions.duration.enteringScreen,
    });
    const [state, setState] = useState<LayoutState>({
      drawerWidth: DRAWER_WIDTH,
      isDrawerOpen: !isSm,
      width: Math.max(0, width - DRAWER_WIDTH),
      height,
    });

    useEffect(() => {
      const dWidth = isSm
        ? 49
        : state.isDrawerOpen
          ? DRAWER_WIDTH + 48
          : MARGIN_WIDTH * 2;
      setState(
        produce((draft) => {
          draft.width = Math.max(0, width - dWidth);
          draft.height = height;
        }),
      );
    }, [height, isSm, state.isDrawerOpen, width]);

    return [state, setState];
  });
