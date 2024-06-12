import { useState } from 'react';

import { useIntervalEffect } from '@react-hookz/web';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import data from './data.csv';

export const { Provider: DPriceProvider, useTracked: useDPrice } =
  createContainer(() => {
    const [state, setState] = useState({ interval: undefined, points: [] });

    useIntervalEffect(() => {
      setState(
        produce((draft) => {
          draft.points.push(data[draft.points.length]);
        }),
      );
    }, state.interval);

    return [state, setState];
  });
