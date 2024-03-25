import { Typography } from '@mui/material';
import {
  ActivityIcon,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useConfig } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { MessageDescriptor } from 'react-intl';
import type { TransactionReceipt } from 'viem';

import type { GlobalActivityStatus } from '../types';

type BridgeNotificationProps = {
  status: GlobalActivityStatus;
  tokenIn?: Token;
  amountIn?: bigint;
  txReceipt?: TransactionReceipt;
  error?: string;
  sx?: StackProps['sx'];
};

const title: Record<GlobalActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Bridging' }),
  success: defineMessage({ defaultMessage: 'Bridged' }),
  error: defineMessage({ defaultMessage: 'Error while bridging' }),
  idle: defineMessage({ defaultMessage: 'Bridge' }),
};

export const BridgeNotification = ({
  status,
  tokenIn,
  amountIn,
  txReceipt,
  error,
  sx,
}: BridgeNotificationProps) => {
  const intl = useIntl();
  const config = useConfig();
  const amount = +formatUnits(amountIn ?? 0n, tokenIn?.decimals ?? 18);
  const blockExplorerUrl =
    config.chains.find((c) => c.id === tokenIn?.chainId)?.blockExplorers
      ?.default.url ?? 'https://etherscan.io';
  return (
    <NotificationSnack
      sx={sx}
      icon={<ActivityIcon status={status} sx={{ width: 20, height: 20 }} />}
      title={intl.formatMessage(title[status])}
      href={
        isNilOrEmpty(txReceipt?.transactionHash)
          ? undefined
          : `${blockExplorerUrl}/tx/${txReceipt?.transactionHash}`
      }
      subtitle={
        isNilOrEmpty(error) ? (
          <Typography color="text.tertiary">
            {intl.formatMessage(
              {
                defaultMessage: '{amountIn} {symbolIn}',
              },
              {
                amountIn: intl.formatNumber(amount, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits:
                    amount.toString().split('.')[1]?.length ?? 0,
                }),
                symbolIn: tokenIn?.symbol,
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
