import { useCallback } from 'react';

import { produce } from 'immer';

import { usePoYState } from './state';

export const usePoY = () => {
  const [state, setState] = usePoYState();

  const selectedIdx =
    state.data?.findIndex((s) => s.id === state.selectedId) ?? -1;
  const selectedItem = selectedIdx > -1 ? state?.data?.[selectedIdx] : null;
  const hoveredItem =
    state.hoveredIdx > -1 ? state?.chartData?.[state.hoveredIdx] : selectedItem;
  const hasNext = selectedIdx < (state?.data?.length ?? 0) - 1;
  const hasPrev = selectedIdx > 0;

  const handleNext = useCallback(() => {
    setState(
      produce((draft) => {
        const nextIdx = selectedIdx + 1;
        const nextId = state?.data?.[nextIdx]?.id;
        if (nextId) {
          draft.selectedId = nextId;
        }
        if (state?.limit) {
          if (nextIdx >= 365 && state.limit <= 365) {
            draft.limit = undefined;
          } else if (nextIdx >= 182 && state.limit <= 182) {
            draft.limit = 365;
          } else if (nextIdx >= 30 && state.limit <= 30) {
            draft.limit = 182;
          } else if (nextIdx >= 7 && state.limit <= 7) {
            draft.limit = 30;
          }
        }
      }),
    );
  }, [selectedIdx, setState, state?.data, state.limit]);

  const handlePrev = useCallback(() => {
    setState(
      produce((draft) => {
        const nextId = state?.data?.[selectedIdx - 1]?.id;
        if (nextId) {
          draft.selectedId = nextId;
        }
      }),
    );
  }, [selectedIdx, setState, state?.data]);

  const handleSelect = useCallback(
    (id: string) => {
      setState(
        produce((draft) => {
          draft.selectedId = id;
        }),
      );
    },
    [setState],
  );

  const handleLimitChange = useCallback(
    (limit: number | undefined) => {
      setState(
        produce((draft) => {
          draft.limit = limit;
        }),
      );
    },
    [setState],
  );

  const handleItemHover = useCallback(
    (idx: number | null) => {
      setState(
        produce((draft) => {
          draft.hoveredIdx = idx ?? -1;
        }),
      );
    },
    [setState],
  );

  return {
    ...state,
    setState,
    selectedItem,
    hoveredItem,
    hasNext,
    hasPrev,
    handleNext,
    handlePrev,
    handleSelect,
    handleLimitChange,
    handleItemHover,
  };
};
