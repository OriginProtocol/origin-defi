import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { useDebouncedEffect } from '@react-hookz/web';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import type { Token } from '@origin/shared/contracts';

export const { Provider: SwapProvider, useTracked: useSwapState } =
  createContainer(() => {
    const [state, setState] = useState({
      amountIn: 0n,
      tokenIn: tokens.mainnet.ETH as Token,
      amountOut: 0n,
      tokenOut: tokens.mainnet.OETH as Token,
      slippage: 0.01,
    });

    useDebouncedEffect(
      () => {
        setState(
          produce((draft) => {
            draft.amountOut = draft.amountIn;
          }),
        );
      },
      [state.amountIn],
      1e3,
    );

    return [state, setState];
  });
