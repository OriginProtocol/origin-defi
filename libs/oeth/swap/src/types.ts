import type { Contract, Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { TransactionReceipt } from 'viem';

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
  onSuccess?: (txReceipt: TransactionReceipt) => void | Promise<void>;
  onError?: (msg: string) => void | Promise<void>;
  onReject?: (msg: string) => void | Promise<void>;
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
  args: Pick<
    Args,
    | 'tokenIn'
    | 'tokenOut'
    | 'amountIn'
    | 'curve'
    | 'onSuccess'
    | 'onError'
    | 'onReject'
  >,
) => Promise<void>;

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
    | 'onSuccess'
    | 'onError'
    | 'onReject'
  >,
) => Promise<void>;

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
  approvedAmount: bigint;
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
  slippage: number;
  isSwapRoutesLoading: boolean;
  isApproved: boolean;
  isApprovalLoading: boolean;
  isSwapLoading: boolean;
};
