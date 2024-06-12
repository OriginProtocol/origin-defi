import { useState } from 'react';

import { useIntervalEffect } from '@react-hookz/web';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import csv from './data.csv';

export const { Provider: DPriceProvider, useTracked: useDPrice } =
  createContainer(() => {
    const [state, setState] = useState<State>({
      interval: undefined,
      index: 0,
      total: csv.length,
    });

    useIntervalEffect(
      () => {
        setState(
          produce((draft) => {
            draft.index += 1;
          }),
        );
      },
      state.index < state.total ? state.interval : undefined,
    );

    return [state, setState];
  });
