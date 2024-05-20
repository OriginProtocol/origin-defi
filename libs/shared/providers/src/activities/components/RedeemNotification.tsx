import { Stack, Typography } from '@mui/material';
import {
  ActivityIcon,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { MessageDescriptor } from 'react-intl';
import type { TransactionReceipt } from 'viem';

import type { GlobalActivityStatus } from '../types';

type RedeemNotificationProps = {
  status: GlobalActivityStatus;
  tokenIn?: Token;
  tokenOut?: Token;
  amountIn?: bigint;
  amountOut?: bigint;
  txReceipt?: TransactionReceipt;
  error?: string;
  sx?: StackProps['sx'];
};

const title: Record<GlobalActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Redeeming' }),
  success: defineMessage({ defaultMessage: 'Redeemed' }),
  error: defineMessage({ defaultMessage: 'Error while redeeming' }),
  idle: defineMessage({ defaultMessage: 'Redeem' }),
};

export const RedeemNotification = ({
  status,
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  txReceipt,
  error,
  sx,
}: RedeemNotificationProps) => {
  const intl = useIntl();

  return (
    <NotificationSnack
      sx={sx}
      icon={<ActivityIcon status={status} sx={{ width: 20, height: 20 }} />}
      title={intl.formatMessage(title[status])}
      href={
        isNilOrEmpty(txReceipt?.transactionHash)
          ? undefined
          : `https://etherscan.io/tx/${txReceipt?.transactionHash}`
      }
      subtitle={
        isNilOrEmpty(error) ? (
          <Typography color="text.secondary">
            {intl.formatMessage(
              {
                defaultMessage: '{amountIn} {symbolIn}',
              },
              {
                amountIn: intl.formatNumber(
                  +formatUnits(amountIn ?? 0n, tokenIn?.decimals ?? 18),
                  { minimumFractionDigits: 4, maximumFractionDigits: 4 },
                ),
                symbolIn: tokenIn?.symbol,
                amountOut: intl.formatNumber(
                  +formatUnits(amountOut ?? 0n, tokenOut?.decimals ?? 18),
                  { minimumFractionDigits: 4, maximumFractionDigits: 4 },
                ),
              },
            )}
          </Typography>
        ) : (
          <Typography color="error">{error}</Typography>
        )
      }
      endIcon={
        <Stack direction="row" alignItems="center" spacing={1}>
          <TokenIcon token={tokenIn} sx={{ fontSize: 20 }} />
        </Stack>
      }
    />
  );
};
