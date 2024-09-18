import { useEffect, useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import { useScreenSize } from '@visx/responsive';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import type { LayoutState } from './types';

const DRAWER_MD_OPEN_WIDTH = 300;
const DRAWER_MD_COLLAPSED_WIDTH = 64;
const MARGIN_ADJUST = 17;
const MARGINS = 32;

export const { Provider: LayoutProvider, useTracked: useLayoutState } =
  createContainer(() => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('md'));
    const { width, height } = useScreenSize({
      debounceTime: theme.transitions.duration.enteringScreen,
    });
    const [state, setState] = useState<LayoutState>({
      drawerWidth: isSm ? MARGIN_ADJUST : DRAWER_MD_OPEN_WIDTH,
      isDrawerOpen: !isSm,
      width: Math.max(0, width - (isSm ? 0 : DRAWER_MD_OPEN_WIDTH)),
      cardWidth: Math.max(
        0,
        width - (isSm ? MARGINS : DRAWER_MD_OPEN_WIDTH + MARGINS),
      ),
      height,
    });

    useEffect(() => {
      const dWidth = isSm
        ? MARGIN_ADJUST
        : state.isDrawerOpen
          ? DRAWER_MD_OPEN_WIDTH + MARGIN_ADJUST
          : DRAWER_MD_COLLAPSED_WIDTH + MARGIN_ADJUST;
      setState(
        produce((draft) => {
          draft.width = Math.max(0, width - dWidth);
          draft.height = height;
          draft.cardWidth = Math.max(0, width - (dWidth + MARGINS));
        }),
      );
    }, [height, isSm, state.isDrawerOpen, width]);

    return [state, setState];
  });
