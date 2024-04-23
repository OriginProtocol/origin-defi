import { Stack, Typography } from '@mui/material';
import {
  ActivityIcon,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { MessageDescriptor } from 'react-intl';
import type { TransactionReceipt } from 'viem';

import type { GlobalActivityStatus } from '../types';

type SwapNotificationProps = {
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
  pending: defineMessage({ defaultMessage: 'Swapping' }),
  success: defineMessage({ defaultMessage: 'Swapped' }),
  error: defineMessage({ defaultMessage: 'Error while swapping' }),
  idle: defineMessage({ defaultMessage: 'Swap' }),
};

export const SwapNotification = ({
  status,
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  txReceipt,
  error,
  sx,
}: SwapNotificationProps) => {
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
                defaultMessage:
                  '{amountIn} {symbolIn} for {amountOut} {symbolOut}',
              },
              {
                amountIn: intl.formatNumber(
                  +formatUnits(amountIn ?? 0n, tokenIn?.decimals ?? 18),
                  { minimumFractionDigits: 0, maximumFractionDigits: 2 },
                ),
                symbolIn: tokenIn?.symbol,
                amountOut: intl.formatNumber(
                  +formatUnits(amountOut ?? 0n, tokenOut?.decimals ?? 18),
                  { minimumFractionDigits: 0, maximumFractionDigits: 2 },
                ),
                symbolOut: tokenOut?.symbol,
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
          <FaArrowRightRegular sx={{ fontSize: 14 }} />
          <TokenIcon token={tokenOut} sx={{ fontSize: 20 }} />
        </Stack>
      }
    />
  );
};
