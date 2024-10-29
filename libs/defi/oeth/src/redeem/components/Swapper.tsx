import { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  activityOptions,
  TokenButton,
  TokenInput,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '@origin/defi/shared';
import {
  InfoTooltipLabel,
  LoadingLabel,
  ValueLabel,
} from '@origin/shared/components';
import {
  ConnectedButton,
  getTokenPriceKey,
  SwapProvider,
  useDeleteNotification,
  useGasPrice,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  usePushNotification,
  useSwapperPrices,
  useSwapRouteAllowance,
  useSwapState,
  useWatchBalance,
} from '@origin/shared/providers';
import { formatError, isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useWithdrawalRequestsQuery } from '../queries.generated';
import { RedeemActionCard } from './RedeemActionCard';
import { WithdrawalRequestModal } from './WithdrawalRequestModal';

import type { StackProps } from '@mui/material';
import type { Activity } from '@origin/defi/shared';
import type {
  EstimatedSwapRoute,
  GasPrice,
  SwapState,
} from '@origin/shared/providers';
import type { Dnum } from 'dnum';

import type { WithdrawalRequestModalProps } from './WithdrawalRequestModal';

export type SwapperProps = Pick<
  SwapState,
  'swapActions' | 'swapRoutes' | 'trackEvent'
> & {
  onError?: (error: Error) => void;
} & Omit<StackProps, 'onError'>;

export const Swapper = ({
  swapActions,
  swapRoutes,
  trackEvent,
  ...rest
}: SwapperProps) => {
  const intl = useIntl();
  const { address } = useAccount();
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<Partial<WithdrawalRequestModalProps>>();
  const { data, refetch } = useWithdrawalRequestsQuery(
    {
      address: address?.toLowerCase() ?? ZERO_ADDRESS,
    },
    { enabled: false },
  );

  return (
    <SwapProvider
      swapActions={swapActions}
      swapRoutes={swapRoutes}
      trackEvent={trackEvent}
      onApproveStart={(state) => {
        const activity = pushActivity({
          type: 'approval',
          status: 'pending',
          tokenIdIn: state.tokenIn.id,
          amountIn: state.amountIn,
        });

        return activity.id;
      }}
      onApproveSigned={({ amountIn, tokenIn }) => {
        const activity: Activity = {
          type: 'approval',
          status: 'pending',
          amountIn,
          tokenIdIn: tokenIn.id,
        };
        const notifId = pushNotification({
          icon: activityOptions.approval.icon(activity),
          title: activityOptions.approval.title(activity, intl),
          message: activityOptions.approval.subtitle(activity, intl),
          severity: 'pending',
          hideDuration: undefined,
        });

        return notifId;
      }}
      onApproveSuccess={({ trackId, txReceipt, amountIn, notifId }) => {
        deleteNotification(notifId);
        const updated = updateActivity({
          id: trackId,
          status: 'success',
          amountIn,
        });
        if (updated) {
          pushNotification({
            icon: activityOptions.approval.icon(updated),
            title: activityOptions.approval.title(updated, intl),
            message: activityOptions.approval.subtitle(updated, intl),
            blockExplorerLinkProps: {
              hash: txReceipt.transactionHash,
            },
            severity: 'success',
          });
        }
      }}
      onApproveReject={({ trackId, notifId }) => {
        deleteNotification(notifId);
        deleteActivity(trackId);
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Approval cancelled' }),
          message: intl.formatMessage({
            defaultMessage: 'User rejected operation',
          }),
          severity: 'info',
        });
      }}
      onApproveFailure={({ error, trackId, notifId }) => {
        deleteNotification(notifId);
        const updated = updateActivity({
          id: trackId,
          status: 'error',
          error: formatError(error),
        });
        if (updated) {
          pushNotification({
            icon: activityOptions.approval.icon(updated),
            title: activityOptions.approval.title(updated, intl),
            message: formatError(error),
            severity: 'error',
          });
        }
      }}
      onSwapStart={({ tokenIn, tokenOut, amountIn }) => {
        const activity = pushActivity({
          type: 'redeem',
          status: 'pending',
          tokenIdIn: tokenIn.id,
          tokenIdOut: tokenOut.id,
          amountIn,
        });
        refetch();

        return activity.id;
      }}
      onSwapSigned={({ amountIn, amountOut, tokenIn, tokenOut }) => {
        const activity: Activity = {
          type: 'redeem',
          status: 'pending',
          tokenIdIn: tokenIn.id,
          tokenIdOut: tokenOut.id,
          amountIn,
        };
        const notifId = pushNotification({
          title: activityOptions.redeem.title(activity, intl),
          message: activityOptions.redeem.subtitle(activity, intl),
          icon: activityOptions.redeem.icon(activity),
          severity: 'pending',
          hideDuration: undefined,
        });
        setInfo({
          tokenIn,
          tokenOut,
          amountOut,
          initialRequests: data,
        });
        setOpen(true);

        return notifId;
      }}
      onSwapSuccess={({ trackId, txReceipt, notifId }) => {
        setInfo({
          txReceipt,
        });
        deleteNotification(notifId);
        const updated = updateActivity({
          id: trackId,
          status: 'success',
        });
        if (updated) {
          pushNotification({
            severity: 'success',
            icon: activityOptions.redeem.icon(updated),
            title: activityOptions.redeem.title(updated, intl),
            message: activityOptions.redeem.subtitle(updated, intl),
            blockExplorerLinkProps: {
              hash: txReceipt.transactionHash,
            },
          });
        }
      }}
      onSwapReject={({ trackId, notifId }) => {
        deleteNotification(notifId);
        deleteActivity(trackId);
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Operation cancelled' }),
          message: intl.formatMessage({
            defaultMessage: 'User rejected operation',
          }),
          severity: 'warning',
        });
      }}
      onSwapFailure={({ error, trackId, notifId }) => {
        deleteNotification(notifId);
        const updated = updateActivity({
          id: trackId,
          status: 'error',
          error: formatError(error),
        });
        if (updated) {
          pushNotification({
            icon: activityOptions.swap.icon(updated),
            title: activityOptions.swap.title(updated, intl),
            message: formatError(error),
            severity: 'error',
          });
        }
      }}
    >
      <SwapperWrapped {...rest} />
      {open && (
        <WithdrawalRequestModal
          open
          onClose={() => {
            setOpen(false);
          }}
          {...info}
        />
      )}
    </SwapProvider>
  );
};

function SwapperWrapped({
  onError,
}: Omit<SwapperProps, 'swapActions' | 'swapRoutes' | 'trackEvent'>) {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [
    {
      amountIn,
      amountOut,
      tokenIn,
      tokenOut,
      selectedSwapRoute,
      isSwapLoading,
      isSwapWaitingForSignature,
      isSwapRoutesLoading,
      isApprovalLoading,
      isApprovalWaitingForSignature,
      swapActions,
    },
  ] = useSwapState();
  const { data: prices, isLoading: isPriceLoading } = useSwapperPrices();
  const { data: allowance } = useSwapRouteAllowance(selectedSwapRoute);
  const { data: balTokenIn, isLoading: isBalTokenInLoading } = useWatchBalance({
    token: tokenIn,
  });
  const { data: gasPrice, isLoading: isGasPriceLoading } = useGasPrice(
    selectedSwapRoute?.gas,
  );
  const handleAmountInChange = useHandleAmountInChange();
  const handleApprove = useHandleApprove();
  const handleSwap = useHandleSwap();

  const estimatedAmount = [
    selectedSwapRoute?.estimatedAmount ?? 0n,
    tokenOut.decimals,
  ] as Dnum;
  const amountOutUsd = mul(
    estimatedAmount,
    prices?.[getTokenPriceKey(tokenOut)] ?? 0,
  );
  const needsApproval =
    isConnected &&
    amountIn > 0n &&
    !isBalTokenInLoading &&
    (balTokenIn as unknown as bigint) >= amountIn &&
    !isNilOrEmpty(selectedSwapRoute) &&
    (selectedSwapRoute?.allowanceAmount ?? 0n) < amountIn &&
    (allowance ?? 0n) < amountIn;
  const swapButtonLabel =
    amountIn === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : amountIn > (balTokenIn as unknown as bigint)
        ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
        : !isNilOrEmpty(selectedSwapRoute)
          ? intl.formatMessage(
              swapActions[selectedSwapRoute?.action ?? '']?.buttonLabel ?? {
                defaultMessage: 'Swap',
              },
            )
          : intl.formatMessage({ defaultMessage: 'No available route' });
  const amountInInputDisabled = isSwapLoading || isApprovalLoading;
  const approveButtonDisabled =
    isNilOrEmpty(selectedSwapRoute) ||
    isSwapRoutesLoading ||
    isApprovalLoading ||
    isApprovalWaitingForSignature ||
    amountIn > (balTokenIn as unknown as bigint);
  const swapButtonDisabled =
    needsApproval ||
    isNilOrEmpty(selectedSwapRoute) ||
    isBalTokenInLoading ||
    isSwapRoutesLoading ||
    isSwapLoading ||
    isSwapWaitingForSignature ||
    amountIn > (balTokenIn as unknown as bigint) ||
    amountIn === 0n;

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Redeem' })} />
      <Divider />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', pb: 0 }}>
        <Typography
          sx={{
            fontWeight: 'medium',
            mb: 1.5,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Amount' })}
        </Typography>
        <TokenInput
          amount={amountIn}
          decimals={tokenIn.decimals}
          onAmountChange={handleAmountInChange}
          balance={balTokenIn as unknown as bigint}
          isBalanceLoading={isBalTokenInLoading}
          token={tokenIn}
          tokenPriceUsd={prices?.[getTokenPriceKey(tokenIn)]}
          isTokenClickDisabled
          isPriceLoading={isPriceLoading}
          isAmountDisabled={amountInInputDisabled}
          sx={{
            px: 3,
            py: 2,
            mb: 3,
            borderRadius: 3,
            backgroundColor: 'background.highlight',
            border: '1px solid',
            borderColor: 'divider',
          }}
        />
        <Typography
          sx={{
            fontWeight: 'medium',
            mb: 1.5,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Duration' })}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 3,
          }}
        >
          <RedeemActionCard action="redeem-arm-oeth" sx={{ width: 1 }} />
          <RedeemActionCard
            action="redeem-vault-async-oeth"
            sx={{ width: 1 }}
          />
        </Stack>
        <Typography
          sx={{
            fontWeight: 'medium',
            mb: 1.5,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Receive amount' })}
        </Typography>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'background.highlight',
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack
            spacing={1.5}
            sx={{
              overflow: 'hidden',
            }}
          >
            <LoadingLabel
              isLoading={isSwapRoutesLoading}
              sWidth={60}
              variant="h6"
              sx={[
                amountIn === 0n
                  ? {
                      color: 'text.secondary',
                    }
                  : {
                      color: 'text.primary',
                    },
              ]}
            >
              {format([amountOut ?? 0n, tokenOut?.decimals ?? 18], {
                digits: 18,
                decimalsRounding: 'ROUND_DOWN',
              })}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isSwapRoutesLoading}
              sWidth={60}
              sx={{ color: 'text.secondary' }}
            >
              ${amountIn === 0n ? '0.00' : format(amountOutUsd, 2)}
            </LoadingLabel>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
            }}
          >
            <TokenButton token={tokenOut} disabled />
          </Stack>
        </Stack>
        <Collapse in={amountOut > 0n}>
          <ValueLabel
            label={intl.formatMessage({
              defaultMessage: 'Approximate gas cost:',
            })}
            value={
              <GasPriceLabel gasPrice={gasPrice} route={selectedSwapRoute} />
            }
            isLoading={isGasPriceLoading}
            direction="row"
            labelProps={{
              variant: 'body3',
              sx: { fontWeight: 'medium' },
            }}
            sx={{
              justifyContent: 'space-between',
              px: 1,
              mb: 3,
            }}
          />
        </Collapse>
      </CardContent>
      <CardContent sx={{ pt: 0 }}>
        <Collapse in={needsApproval}>
          <Button
            fullWidth
            variant="action"
            disabled={approveButtonDisabled}
            onClick={handleApprove}
            sx={{ mb: 1.5 }}
          >
            {isSwapRoutesLoading ? (
              <CircularProgress size={32} color="inherit" />
            ) : isApprovalWaitingForSignature ? (
              intl.formatMessage({
                defaultMessage: 'Waiting for signature',
              })
            ) : isApprovalLoading ? (
              intl.formatMessage({
                defaultMessage: 'Processing Approval',
              })
            ) : (
              intl.formatMessage({ defaultMessage: 'Approve' })
            )}
          </Button>
        </Collapse>
        <ConnectedButton
          fullWidth
          variant="action"
          disabled={swapButtonDisabled}
          onClick={handleSwap}
          targetChainId={tokenIn.chainId}
        >
          {isSwapRoutesLoading ? (
            <CircularProgress size={32} color="inherit" />
          ) : isSwapWaitingForSignature ? (
            intl.formatMessage({
              defaultMessage: 'Waiting for signature',
            })
          ) : isSwapLoading ? (
            intl.formatMessage({
              defaultMessage: 'Processing Transaction',
            })
          ) : (
            swapButtonLabel
          )}
        </ConnectedButton>
      </CardContent>
    </Card>
  );
}

type GasPriceLabelProps = {
  route?: EstimatedSwapRoute | null;
  gasPrice?: GasPrice;
};

const GasPriceLabel = ({ route, gasPrice, ...rest }: GasPriceLabelProps) => {
  const intl = useIntl();

  if (!gasPrice || !route || isNilOrEmpty(gasPrice?.gasCostUsd)) {
    return `$0.00`;
  }

  if (route.action !== 'redeem-vault-async-oeth') {
    return `$${format(gasPrice?.gasCostUsd ?? from(0), 2)}`;
  }

  const req = mul(gasPrice.gasCostUsd, 0.6);
  const claim = mul(gasPrice.gasCostUsd, 0.4);

  return (
    <Stack
      direction="row"
      spacing={0.75}
      sx={{
        alignItems: 'center',
      }}
    >
      <Typography>${format(req, 2)}&nbsp;</Typography>
      <InfoTooltipLabel
        sx={{ fontWeight: 'medium' }}
        tooltipLabel={intl.formatMessage({
          defaultMessage:
            'Claiming your withdrawal will incur this estimated additional gas fee',
        })}
        labelProps={{ sx: { color: 'warning.dark' } }}
        infoTooltipProps={{ iconColor: 'warning.dark' }}
      >
        {`+ $${format(claim, 2)}`}
      </InfoTooltipLabel>
    </Stack>
  );
};
