import type { Token } from '@origin/shared/contracts';
import type { CurveState } from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';

export type TokenSource = 'tokenIn' | 'tokenOut';

export type SwapAction =
  | 'flipper'
  | 'uniswap-v2'
  | 'uniswap-v3'
  | 'sushiswap'
  | 'vault'
  | 'swap-curve';

type Args = {
  tokenIn: Token;
  tokenOut: Token;
  amountIn: bigint;
  amountOut?: bigint;
  slippage: number;
  route: SwapRoute;
  estimatedRoute: EstimatedSwapRoute;
  curve?: CurveState;
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

export type Allowance = (
  args?: Pick<Args, 'tokenIn' | 'tokenOut' | 'curve'>,
) => Promise<bigint>;

export type EstimateApprovalGas = (
  args?: Pick<Args, 'tokenIn' | 'tokenOut' | 'amountIn' | 'curve'>,
) => Promise<bigint>;

export type Approve = (
  args: Pick<Args, 'tokenIn' | 'tokenOut' | 'amountIn' | 'curve'>,
) => Promise<HexAddress>;

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
) => Promise<HexAddress>;

export type SwapApi = {
  estimateAmount: EstimateAmount;
  estimateGas: EstimateGas;
  estimateRoute: EstimateRoute;
  allowance: Allowance;
  estimateApprovalGas: EstimateApprovalGas;
  approve: Approve;
  swap: Swap;
};

export type SwapRoute = {
  tokenIn: Token;
  tokenOut: Token;
  action: SwapAction;
};

export type EstimatedSwapRoute = {
  estimatedAmount: bigint;
  allowanceAmount: bigint;
  rate: number;
  gas: bigint;
  approvalGas: bigint;
} & SwapRoute;

export type SwapState = {
  amountIn: bigint;
  tokenIn: Token;
  amountOut: bigint;
  tokenOut: Token;
  swapRoutes: EstimatedSwapRoute[];
  selectedSwapRoute: EstimatedSwapRoute | null;
  isSwapWaitingForSignature: boolean;
  isSwapRoutesLoading: boolean;
  isApprovalLoading: boolean;
  isApprovalWaitingForSignature: boolean;
  isSwapLoading: boolean;
};
