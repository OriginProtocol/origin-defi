import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { QueryClient } from '@tanstack/react-query';
import type { MessageDescriptor } from 'react-intl';
import type { TransactionReceipt } from 'viem';
import type { Config } from 'wagmi';

export type TokenSource = 'tokenIn' | 'tokenOut';

export type SwapAction = string;

export type SwapArgs = {
  tokenIn: Token;
  tokenOut: Token;
  amountIn: bigint;
  amountOut?: bigint;
  slippage?: number;
  route: SwapRoute;
  estimatedRoute?: EstimatedSwapRoute;
};

export type SwapClient = {
  config: Config;
  queryClient: QueryClient;
};

export type IsRouteAvailable = (
  client: SwapClient,
  args: Pick<SwapArgs, 'tokenIn' | 'tokenOut' | 'amountIn'>,
) => Promise<boolean>;

export type EstimateAmount = (
  client: SwapClient,
  args: Pick<SwapArgs, 'tokenIn' | 'tokenOut' | 'amountIn' | 'slippage'>,
) => Promise<bigint>;

export type EstimateGas = (
  client: SwapClient,
  args: Pick<
    SwapArgs,
    'tokenIn' | 'tokenOut' | 'amountIn' | 'amountOut' | 'slippage'
  >,
) => Promise<bigint>;

export type EstimateRoute = (
  client: SwapClient,
  args: Pick<
    SwapArgs,
    'tokenIn' | 'tokenOut' | 'amountIn' | 'slippage' | 'route'
  >,
) => Promise<EstimatedSwapRoute>;

export type Allowance = (
  client: SwapClient,
  args: Pick<SwapArgs, 'tokenIn' | 'tokenOut' | 'estimatedRoute'>,
) => Promise<bigint>;

export type EstimateApprovalGas = (
  client: SwapClient,
  args: Pick<SwapArgs, 'tokenIn' | 'tokenOut' | 'amountIn' | 'estimatedRoute'>,
) => Promise<bigint>;

export type Approve = (
  client: SwapClient,
  args: Pick<SwapArgs, 'tokenIn' | 'tokenOut' | 'amountIn' | 'estimatedRoute'>,
) => Promise<HexAddress | null>;

export type Swap = (
  client: SwapClient,
  args: Pick<
    SwapArgs,
    | 'tokenIn'
    | 'tokenOut'
    | 'amountIn'
    | 'amountOut'
    | 'slippage'
    | 'estimatedRoute'
  >,
) => Promise<HexAddress | null>;

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

export type SwapRoute<S = SwapAction, M = object> = {
  tokenIn: Token;
  tokenOut: Token;
  action: S;
  meta?: M;
  noSlippage?: boolean;
  refreshInterval?: number;
};

export type EstimatedSwapRoute = {
  estimatedAmount: bigint;
  allowanceAmount: bigint;
  rate: number;
  gas: bigint;
  approvalGas: bigint;
} & SwapRoute;

export type SwapStatus =
  | 'idle'
  | 'swapRoutesLoading'
  | 'approvalWaitingForSignature'
  | 'approvalWaitingForTransaction'
  | 'approvalTransactionSuccess'
  | 'approvalTransactionRejected'
  | 'approvalTransactionFailure'
  | 'swapWaitingForSignature'
  | 'swapWaitingForTransaction'
  | 'swapTransactionSuccess'
  | 'swapTransactionRejected'
  | 'swapTransactionFailure'
  | 'noAvailableRoute';

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
  debounceTime: number;
  status: SwapStatus;
  trackEvent?: (event: SwapTrackEvent) => void;
  onInputAmountChange?: (state: SwapState) => void;
  onInputTokenChange?: (state: SwapState) => void;
  onOutputTokenChange?: (state: SwapState) => void;
  onTokenFlip?: (state: SwapState) => void;
  onSwapRouteChange?: (state: SwapState) => void;
  onApproveStart?: (state: SwapState) => string;
  onApproveSigned?: (
    state: SwapState & { trackId?: string },
  ) => string | undefined;
  onApproveSuccess?: (
    state: SwapState & {
      txReceipt: TransactionReceipt;
      trackId?: string;
      notifId?: string;
    },
  ) => void;
  onApproveReject?: (
    state: SwapState & { trackId?: string; notifId?: string },
  ) => void;
  onApproveFailure?: (
    state: SwapState & { error: Error; trackId?: string; notifId?: string },
  ) => void;
  onSwapStart?: (state: SwapState) => string;
  onSwapSigned?: (
    state: SwapState & { trackId?: string },
  ) => string | undefined;
  onSwapSuccess?: (
    state: SwapState & {
      txReceipt: TransactionReceipt;
      trackId?: string;
      notifId?: string;
    },
  ) => void;
  onSwapReject?: (
    state: SwapState & { trackId?: string; notifId?: string },
  ) => void;
  onSwapFailure?: (
    state: SwapState & { error: Error; trackId?: string; notifId?: string },
  ) => void;
};

export type TokenOption<M = object> = Token & {
  isSwappable: boolean;
  isSelected: boolean;
  meta?: M;
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
      swap_data: string;
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
