import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { MessageDescriptor } from 'react-intl';

import type { CurveState } from '../curve';

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
  curve?: CurveState;
};

export type IsRouteAvailable = (
  args: Pick<Args, 'tokenIn' | 'tokenOut' | 'amountIn' | 'curve'>,
) => Promise<boolean>;

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
  isRouteAvailable: IsRouteAvailable;
  estimateAmount: EstimateAmount;
  estimateGas: EstimateGas;
  estimateRoute: EstimateRoute;
  allowance: Allowance;
  estimateApprovalGas: EstimateApprovalGas;
  approve: Approve;
  swap: Swap;
  buttonLabel: MessageDescriptor;
  routeLabel: MessageDescriptor;
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
  trackEvent: (event: SwapTrackEvent) => void;
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
  debounceTime?: number;
};

export type SwapTrackEvent =
  | { name: 'approve_started'; approval_token: string }
  | { name: 'approve_complete'; approval_token: string }
  | { name: 'approve_failed'; approval_token: string; approve_error: string }
  | { name: 'approve_rejected'; approval_token: string }
  | {
      name: 'swap_started';
      swap_route: string;
      swap_token: string;
      swap_to: string;
      swap_amount: bigint;
    }
  | {
      name: 'swap_complete';
      swap_route: string;
      swap_token: string;
      swap_to: string;
      swap_amount: bigint;
    }
  | {
      name: 'swap_failed';
      swap_route: string;
      swap_token: string;
      swap_to: string;
      swap_amount: bigint;
      swap_error: string;
    }
  | {
      name: 'swap_rejected';
      swap_route: string;
      swap_token: string;
      swap_to: string;
      swap_amount: bigint;
    }
  | { name: 'change_input_amount'; change_amount_to: bigint }
  | { name: 'change_input_currency'; change_input_to: string }
  | { name: 'change_output_currency'; change_output_to: string }
  | { name: 'change_swap_route'; change_route_to: string }
  | { name: 'change_input_output' }
  | { name: 'open_settings' }
  | { name: 'show_swap_routes' }
  | { name: 'change_price_tolerance'; price_tolerance: number };
