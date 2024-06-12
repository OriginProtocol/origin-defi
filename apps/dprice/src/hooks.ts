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
        draft.points = [];
      }),
    );
  }, [setDPrice]);
};
