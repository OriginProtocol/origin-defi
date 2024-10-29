import {
  SwapProvider as SharedSwapProvider,
  useDeleteNotification,
  usePushNotification,
} from '@origin/shared/providers';
import { formatError } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import {
  activityOptions,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../Activities';

import type { SwapState } from '@origin/shared/providers';
import type { ReactNode } from 'react';

import type { Activity, ActivityType } from '../Activities';

export type SwapperProviderProps = Pick<
  SwapState,
  'swapActions' | 'swapRoutes' | 'trackEvent'
> & {
  children: ReactNode;
  activityType?: ActivityType;
};

export const SwapProvider = ({
  children,
  swapActions,
  swapRoutes,
  trackEvent,
  activityType = 'swap',
}: SwapperProviderProps) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();

  const actOptions = activityOptions[activityType];

  return (
    <SharedSwapProvider
      swapActions={swapActions}
      swapRoutes={swapRoutes}
      trackEvent={trackEvent}
      onApproveStart={({ tokenIn, amountIn }) => {
        const activity = pushActivity({
          type: 'approval',
          status: 'pending',
          tokenIdIn: tokenIn.id,
          amountIn,
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
      onApproveSuccess={({ trackId, txReceipt, notifId }) => {
        deleteNotification(notifId);
        const updated = updateActivity({ id: trackId, status: 'success' });
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
      onSwapStart={({ amountIn, amountOut, tokenIn, tokenOut }) => {
        const act = pushActivity({
          type: activityType,
          status: 'pending',
          tokenIdIn: tokenIn.id,
          tokenIdOut: tokenOut.id,
          amountIn,
          amountOut,
        } as Activity);

        return act.id;
      }}
      onSwapSigned={({ amountIn, amountOut, tokenIn, tokenOut }) => {
        const act = {
          type: activityType,
          status: 'pending',
          tokenIdIn: tokenIn.id,
          tokenIdOut: tokenOut.id,
          amountIn,
          amountOut,
        } as Activity;
        const notifId = pushNotification({
          title: actOptions.title(act, intl),
          message: actOptions.subtitle(act, intl),
          icon: actOptions.icon(act),
          severity: 'pending',
          hideDuration: undefined,
        });

        return notifId;
      }}
      onSwapSuccess={({ trackId, amountOut, txReceipt, notifId }) => {
        deleteNotification(notifId);
        const updated = updateActivity({
          id: trackId,
          status: 'success',
          amountOut,
        });
        if (updated) {
          pushNotification({
            severity: 'success',
            icon: actOptions.icon(updated),
            title: actOptions.title(updated, intl),
            message: actOptions.subtitle(updated, intl),
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
          severity: 'info',
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
            icon: actOptions.icon(updated),
            title: actOptions.title(updated, intl),
            message: formatError(error),
            severity: 'error',
          });
        }
      }}
    >
      {children}
    </SharedSwapProvider>
  );
};
