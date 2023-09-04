import type { Token } from '@origin/shared/contracts';

export type TokenSource = 'tokenIn' | 'tokenOut';

export type SwapAction =
  | 'swap-curve'
  | 'swap-zapper-eth'
  | 'swap-zapper-sfrxeth'
  | 'mint-vault'
  | 'redeem-vault'
  | 'wrap-oeth'
  | 'unwrap-woeth';

export type SwapApi = {
  estimateAmount: (state: SwapState) => Promise<bigint>;
  estimateRoutes: (state: SwapState) => Promise<SwapRoute[]>;
  swap: (state: SwapState) => Promise<void>;
};

export type SwapRoute = {
  tokenIn: Token;
  tokenOut: Token;
  action: SwapAction;
};

export type SwapState = {
  amountIn: bigint;
  tokenIn: Token;
  amountOut: bigint;
  tokenOut: Token;
  isAmountOutLoading: boolean;
  isPriceOutLoading: boolean;
  isBalanceOutLoading: boolean;
  slippage: number;
  swapRoute: SwapRoute | null;
};
