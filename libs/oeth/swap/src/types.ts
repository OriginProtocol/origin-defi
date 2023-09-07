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

export type EstimateAmount = (
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
) => Promise<bigint>;

export type EstimateGas = (
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
  slippage: number,
) => Promise<bigint>;

export type EstimateRoute = (
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
  route: SwapRoute,
  slippage: number,
) => Promise<EstimatedSwapRoute>;

export type Swap = (
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
  route: EstimatedSwapRoute,
) => Promise<void>;

export type SwapApi = {
  estimateAmount: EstimateAmount;
  estimateGas: EstimateGas;
  estimateRoute: EstimateRoute;
  swap: Swap;
};

export type SwapRoute = {
  tokenIn: Token;
  tokenOut: Token;
  action: SwapAction;
};

export type EstimatedSwapRoute = {
  estimatedAmount: bigint;
  rate: number;
  gas: bigint;
} & SwapRoute;

export type SwapState = {
  amountIn: bigint;
  tokenIn: Token;
  amountOut: bigint;
  tokenOut: Token;
  isAmountOutLoading: boolean;
  isPriceOutLoading: boolean;
  isBalanceOutLoading: boolean;
  slippage: number;
  swapRoutes: EstimatedSwapRoute[];
  selectedSwapRoute: EstimatedSwapRoute | null;
  isSwapRoutesLoading: boolean;
};
