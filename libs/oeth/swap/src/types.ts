import type { Contract, Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';

export type TokenSource = 'tokenIn' | 'tokenOut';

export type SwapAction =
  | 'swap-curve'
  | 'swap-curve-eth'
  | 'swap-zapper-eth'
  | 'swap-zapper-sfrxeth'
  | 'mint-vault'
  | 'redeem-vault'
  | 'wrap-oeth'
  | 'unwrap-woeth';

type Args = {
  tokenIn: Token;
  tokenOut: Token;
  amountIn: bigint;
  amountOut?: bigint;
  slippage: number;
  route: SwapRoute;
  estimatedRoute: EstimatedSwapRoute;
  curve?: {
    CurveRegistryExchange: Contract;
    OethPoolUnderlyings: HexAddress[];
  };
};

export type EstimateAmount = (
  args: Pick<Args, 'tokenIn' | 'tokenOut' | 'amountIn' | 'curve'>,
) => Promise<bigint>;

export type EstimateGas = (
  args: Pick<
    Args,
    'tokenIn' | 'tokenOut' | 'amountIn' | 'amountOut' | 'slippage' | 'curve'
  >,
) => Promise<bigint>;

export type EstimateRoute = (
  args: Pick<
    Args,
    | 'tokenIn'
    | 'tokenOut'
    | 'amountIn'
    | 'amountOut'
    | 'slippage'
    | 'route'
    | 'curve'
  >,
) => Promise<EstimatedSwapRoute>;

export type Swap = (
  args: Pick<
    Args,
    | 'tokenIn'
    | 'tokenOut'
    | 'amountIn'
    | 'amountOut'
    | 'slippage'
    | 'estimatedRoute'
    | 'curve'
  >,
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
