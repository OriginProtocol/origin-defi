import { useEffect, useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useWindowSize } from '@react-hookz/web';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import {
  DRAWER_MD_COLLAPSED_WIDTH,
  DRAWER_MD_OPEN_WIDTH,
  VIEWPORT_MIN_WIDTH,
} from './constants';

import type { RouteObject } from 'react-router-dom';

import type { LayoutState } from './types';

export const { Provider: LayoutProvider, useTracked: useLayoutState } =
  createContainer(({ routes }: { routes: RouteObject[] }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('md'));
    const { width } = useWindowSize();

    const visibleRoutes =
      routes?.[0]?.children?.filter((r) => !isNilOrEmpty(r?.handle?.title)) ??
      [];

    const [state, setState] = useState<LayoutState>({
      isDrawerOpen: !isSm,
      expandedSections: visibleRoutes.map((r) => r.path ?? ''),
      routes: visibleRoutes,
      contentWidth: Math.max(
        VIEWPORT_MIN_WIDTH,
        width - (isSm ? 0 : DRAWER_MD_OPEN_WIDTH),
      ),
    });

    useEffect(() => {
      const dWidth = isSm
        ? 0
        : state.isDrawerOpen
          ? DRAWER_MD_OPEN_WIDTH
          : DRAWER_MD_COLLAPSED_WIDTH;
      setState(
        produce((draft) => {
          draft.contentWidth = Math.max(0, width - dWidth);
        }),
      );
    }, [isSm, state.isDrawerOpen, width]);

    return [state, setState];
  });
