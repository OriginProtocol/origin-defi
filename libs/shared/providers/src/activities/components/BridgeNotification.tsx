import { Stack, Typography } from '@mui/material';
import {
  ActivityIcon,
  ErrorTooltipLabel,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenById } from '@origin/shared/contracts';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { formatAmount, isNilOrEmpty, txLink } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useConfig } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { ActivityStatus, BridgeActivity } from '../types';

type BridgeNotificationProps = {
  activity: BridgeActivity;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Bridging' }),
  signed: defineMessage({ defaultMessage: 'Bridging' }),
  success: defineMessage({ defaultMessage: 'Bridge Started' }),
  error: defineMessage({ defaultMessage: 'Error while bridging' }),
  idle: defineMessage({ defaultMessage: 'Bridge' }),
};

export const BridgeNotification = ({
  activity,
  sx,
}: BridgeNotificationProps) => {
  const intl = useIntl();
  const config = useConfig();
  const tokenIn = getTokenById(activity.tokenIdIn);
  const tokenOut = getTokenById(activity.tokenIdOut);
  const chainIn = config.chains.find((c) => c.id === tokenIn.chainId);
  const chainOut = config.chains.find((c) => c.id === tokenOut.chainId);
  const amount = +formatUnits(activity.amountIn ?? 0n, tokenIn.decimals ?? 18);
  return (
    <NotificationSnack
      sx={sx}
      icon={
        <ActivityIcon status={activity.status} sx={{ width: 20, height: 20 }} />
      }
      title={intl.formatMessage(title[activity.status])}
      href={
        isNilOrEmpty(activity.txHash)
          ? undefined
          : txLink(
              config.chains.find((c) => c.id === tokenIn.chainId),
              activity.txHash,
            )
      }
      subtitle={
        isNilOrEmpty(activity.error) ? (
          <Typography color="text.secondary">
            {tokenIn.symbol === tokenOut.symbol
              ? intl.formatMessage(
                  {
                    defaultMessage:
                      'Sending {amountIn} {symbolIn} to {chainOutName}.',
                  },
                  {
                    amountIn: formatAmount(amount),
                    symbolIn: tokenIn.symbol,
                    symbolOut: tokenOut.symbol,
                    chainInName: chainIn?.name,
                    chainOutName: chainOut?.name,
                  },
                )
              : intl.formatMessage(
                  {
                    defaultMessage:
                      'Sending {amountIn} {symbolIn} as {symbolOut} to {chainOutName}.',
                  },
                  {
                    amountIn: formatAmount(amount),
                    symbolIn: tokenIn.symbol,
                    symbolOut: tokenOut.symbol,
                    chainInName: chainIn?.name,
                    chainOutName: chainOut?.name,
                  },
                )}
          </Typography>
        ) : (
          <ErrorTooltipLabel>{activity.error}</ErrorTooltipLabel>
        )
      }
      endIcon={
        <Stack direction="row" alignItems="center" spacing={1}>
          <TokenIcon token={tokenIn} sx={{ fontSize: 20 }} />
          <FaArrowRightRegular sx={{ fontSize: 14 }} />
          <TokenIcon token={tokenOut} sx={{ fontSize: 20 }} />
        </Stack>
      }
    />
  );
};
