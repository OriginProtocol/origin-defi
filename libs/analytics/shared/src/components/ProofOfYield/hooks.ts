import { useCallback } from 'react';

import { produce } from 'immer';

import { usePoYState } from './state';

export const usePoY = () => {
  const [state, setState] = usePoYState();

  const selectedIdx =
    state.data?.findIndex((s) => s.id === state.selectedId) ?? -1;
  const selectedItem = selectedIdx > -1 ? state?.data?.[selectedIdx] : null;
  const hasNext = selectedIdx < (state?.data?.length ?? 0) - 1;
  const hasPrev = selectedIdx > 0;

  const handleNext = useCallback(() => {
    setState(
      produce((draft) => {
        const nextId = state?.data?.[selectedIdx + 1]?.id;
        if (nextId) {
          draft.selectedId = nextId;
        }
      }),
    );
  }, [selectedIdx, setState, state?.data]);

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

  return {
    ...state,
    setState,
    selectedItem,
    hasNext,
    hasPrev,
    handleNext,
    handlePrev,
    handleSelect,
    handleLimitChange,
  };
};
