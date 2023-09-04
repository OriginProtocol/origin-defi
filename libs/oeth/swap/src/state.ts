import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { useDebouncedEffect } from '@react-hookz/web';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import { swapActions } from './actions';
import { getAvailableRoutes } from './utils';

import type { SwapState } from './types';

export const { Provider: SwapProvider, useTracked: useSwapState } =
  createContainer(() => {
    const [state, setState] = useState<SwapState>({
      amountIn: 0n,
      tokenIn: tokens.mainnet.ETH,
      amountOut: 0n,
      tokenOut: tokens.mainnet.OETH,
      isAmountOutLoading: false,
      isPriceOutLoading: false,
      isBalanceOutLoading: false,
      slippage: 0.01,
      swapRoute: getAvailableRoutes(tokens.mainnet.ETH, tokens.mainnet.OETH)[0],
    });

    useDebouncedEffect(
      async () => {
        const estimatedAmout = await swapActions[
          state.swapRoute.action
        ].estimateAmount(state);
        setState(
          produce((draft) => {
            draft.amountOut = estimatedAmout;
            draft.isAmountOutLoading = false;
            draft.isPriceOutLoading = false;
          }),
        );
      },
      [state.amountIn],
      800,
    );

    return [state, setState];
  });
