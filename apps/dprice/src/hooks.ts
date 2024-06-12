import { useCallback } from 'react';

import { produce } from 'immer';

import { useDPrice } from './state';

export const useStartStop = () => {
  const [, setDPrice] = useDPrice();

  return useCallback(() => {
    setDPrice(
      produce((draft) => {
        draft.interval = draft.interval === undefined ? 200 : undefined;
      }),
    );
  }, [setDPrice]);
};

export const useResetPoints = () => {
  const [, setDPrice] = useDPrice();

  return useCallback(() => {
    setDPrice(
      produce((draft) => {
        draft.index = 0;
      }),
    );
  }, [setDPrice]);
};

export const useNavigatePoints = () => {
  const [{ total }, setDPrice] = useDPrice();

  return useCallback(
    (direction: 'forward' | 'backward', step = 1) => {
      setDPrice(
        produce((draft) => {
          draft.interval = undefined;
          draft.index =
            direction === 'forward'
              ? Math.min(total, draft.index + step)
              : Math.max(0, draft.index - step);
        }),
      );
    },
    [setDPrice, total],
  );
};
