/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TransactionReceipt } from 'viem';

export type HexAddress = `0x${string}`;

export type TokenSource = 'tokenIn' | 'tokenOut';

export type SwapAction = string;

type Args = {
  tokenIn: Token;
  tokenOut: Token;
  amountIn: bigint;
  amountOut?: bigint;
  slippage: number;
  route: SwapRoute;
  estimatedRoute: EstimatedSwapRoute;
};

export type IsRouteAvailable = (
  args: Pick<Args, 'tokenIn' | 'tokenOut' | 'amountIn'>,
) => Promise<boolean>;

export type EstimateAmount = (
  args: Pick<Args, 'tokenIn' | 'tokenOut' | 'amountIn'>,
) => Promise<bigint>;

export type EstimateGas = (
  args: Pick<
    Args,
    'tokenIn' | 'tokenOut' | 'amountIn' | 'amountOut' | 'slippage'
  >,
) => Promise<bigint>;

export type EstimateRoute = (
  args: Pick<
    Args,
    'tokenIn' | 'tokenOut' | 'amountIn' | 'amountOut' | 'slippage' | 'route'
  >,
) => Promise<EstimatedSwapRoute>;

export type Allowance = (
  args?: Pick<Args, 'tokenIn' | 'tokenOut'>,
) => Promise<bigint>;

export type EstimateApprovalGas = (
  args?: Pick<Args, 'tokenIn' | 'tokenOut' | 'amountIn'>,
) => Promise<bigint>;

export type Approve = (
  args: Pick<Args, 'tokenIn' | 'tokenOut' | 'amountIn'>,
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
  >,
) => Promise<HexAddress>;

export type SwapApi = {
  isRouteAvailable: IsRouteAvailable;
  estimateAmount: EstimateAmount;
  estimateGas: EstimateGas;
  estimateRoute: EstimateRoute;
  allowance: Allowance;
  estimateApprovalGas: EstimateApprovalGas;
  approve: Approve;
  swap: Swap;
  buttonLabel: string;
  routeLabel: string;
};

export type SwapActions = Record<SwapAction, SwapApi>;

export type SwapRoute<S = SwapAction> = {
  tokenIn: Token;
  tokenOut: Token;
  action: S;
};

export type EstimatedSwapRoute = {
  estimatedAmount: bigint;
  allowanceAmount: bigint;
  rate: number;
  gas: bigint;
  approvalGas: bigint;
} & SwapRoute;

export type SwapState = {
  swapActions: SwapActions;
  swapRoutes: SwapRoute[];
  amountIn: bigint;
  tokenIn: Token;
  amountOut: bigint;
  tokenOut: Token;
  estimatedSwapRoutes: EstimatedSwapRoute[];
  selectedSwapRoute: EstimatedSwapRoute | null;
  isSwapWaitingForSignature: boolean;
  isSwapRoutesLoading: boolean;
  isApprovalLoading: boolean;
  isApprovalWaitingForSignature: boolean;
  isSwapLoading: boolean;
  slippage: number;
  debounceTime?: number;
  onInputAmountChange?: (amountIn?: bigint) => void;
  onInputTokenChange?: (token?: Token) => void;
  onOutputTokenChange?: (token?: Token) => void;
  onTokenFlip?: (tokenIn?: Token, tokenOut?: Token) => void;
  onSwapRouteChange?: (action?: SwapAction) => void;
  onApproveStart?: (token?: Token) => string;
  onApproveSuccess?: (
    token?: Token,
    txReceipt?: TransactionReceipt,
    trackId?: string,
  ) => void;
  onApproveReject?: (token?: Token, trackId?: string) => void;
  onApproveFailure?: (token?: Token, error?: string, trackId?: string) => void;
  onSwapStart?: (
    tokenIn?: Token,
    tokenOut?: Token,
    action?: SwapAction,
    amountIn?: bigint,
  ) => string;
  onSwapSuccess?: (
    tokenIn?: Token,
    tokenOut?: Token,
    action?: SwapAction,
    amountIn?: bigint,
    txReceipt?: TransactionReceipt,
    trackId?: string,
  ) => void;
  onSwapReject?: (
    tokenIn?: Token,
    tokenOut?: Token,
    action?: SwapAction,
    amountIn?: bigint,
    trackId?: string,
  ) => void;
  onSwapFailure?: (
    tokenIn?: Token,
    tokenOut?: Token,
    action?: SwapAction,
    amountIn?: bigint,
    error?: string,
    trackId?: string,
  ) => void;
};

export type Token<Abi = any> = {
  chainId: number;
  address: undefined | HexAddress;
  abi: Abi;
  symbol: string;
  decimals: number;
  name?: string;
};
