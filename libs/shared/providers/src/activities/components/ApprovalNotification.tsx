import { Typography } from '@mui/material';
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

type ApprovalNotificationProps = {
  status: GlobalActivityStatus;
  tokenIn?: Token;
  amountIn?: bigint;
  txReceipt?: TransactionReceipt;
  error?: string;
  sx?: StackProps['sx'];
};

const title: Record<GlobalActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Approving' }),
  success: defineMessage({ defaultMessage: 'Approved' }),
  error: defineMessage({ defaultMessage: 'Error while approving' }),
  idle: defineMessage({ defaultMessage: 'Approve' }),
};

export const ApprovalNotification = ({
  status,
  tokenIn,
  amountIn,
  txReceipt,
  error,
  sx,
}: ApprovalNotificationProps) => {
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
          <Typography color="text.tertiary">
            {intl.formatMessage(
              {
                defaultMessage: '{amountIn} {symbolIn}',
              },
              {
                amountIn: intl.formatNumber(
                  +formatUnits(amountIn ?? 0n, tokenIn?.decimals ?? 18),
                  { minimumFractionDigits: 0, maximumFractionDigits: 2 },
                ),
                symbolIn: tokenIn?.symbol,
              },
            )}
          </Typography>
        ) : (
          <Typography color="error">{error}</Typography>
        )
      }
      endIcon={<TokenIcon symbol={tokenIn?.symbol} sx={{ fontSize: 20 }} />}
    />
  );
};
