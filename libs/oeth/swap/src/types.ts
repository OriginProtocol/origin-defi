import type { Token } from '@origin/shared/contracts';

export type TokenSource = 'tokenIn' | 'tokenOut';

export type SwapAction =
  | 'swap-curve'
  | 'swap-zapper'
  | 'mint-vault'
  | 'redeem-mix'
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
  slippage: number;
  swapRoute: SwapRoute | null;
};