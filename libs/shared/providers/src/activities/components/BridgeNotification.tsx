import { Typography } from '@mui/material';
import {
  ActivityIcon,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenById } from '@origin/shared/contracts';
import { formatAmount, isNilOrEmpty, txLink } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useConfig } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { TokenId } from '@origin/shared/contracts';
import type { MessageDescriptor } from 'react-intl';
import type { Hex } from 'viem';

import type { ActivityStatus } from '../types';

type BridgeNotificationProps = {
  status: ActivityStatus;
  tokenIdIn: TokenId;
  amountIn?: bigint;
  txHash?: Hex;
  error?: string;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Bridging' }),
  success: defineMessage({ defaultMessage: 'Bridge Started' }),
  error: defineMessage({ defaultMessage: 'Error while bridging' }),
  idle: defineMessage({ defaultMessage: 'Bridge' }),
};

export const BridgeNotification = ({
  status,
  tokenIdIn,
  amountIn,
  txHash,
  error,
  sx,
}: BridgeNotificationProps) => {
  const tokenIn = getTokenById(tokenIdIn);
  const intl = useIntl();
  const config = useConfig();
  const amount = +formatUnits(amountIn ?? 0n, tokenIn.decimals ?? 18);
  return (
    <NotificationSnack
      sx={sx}
      icon={<ActivityIcon status={status} sx={{ width: 20, height: 20 }} />}
      title={intl.formatMessage(title[status])}
      href={
        isNilOrEmpty(txHash)
          ? undefined
          : txLink(
              config.chains.find((c) => c.id === tokenIn.chainId),
              txHash,
            )
      }
      subtitle={
        isNilOrEmpty(error) ? (
          <Typography color="text.tertiary">
            {intl.formatMessage(
              {
                defaultMessage: '{amountIn} {symbolIn}',
              },
              {
                amountIn: formatAmount(amount),
                symbolIn: tokenIn.symbol,
              },
            )}
          </Typography>
        ) : (
          <Typography color="error">{error}</Typography>
        )
      }
      endIcon={<TokenIcon token={tokenIn} sx={{ fontSize: 20 }} />}
    />
  );
};
