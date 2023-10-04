import { Box, Stack, Typography } from '@mui/material';
import { ActivityIcon, LinkIcon } from '@origin/shared/components';
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
  tokenIn: Token;
  tokenOut: Token;
  amountIn?: bigint;
  txReceipt?: TransactionReceipt;
  error?: string;
} & Pick<StackProps, 'sx'>;

const title: Record<GlobalActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Approving' }),
  success: defineMessage({ defaultMessage: 'Approved' }),
  error: defineMessage({ defaultMessage: 'Error while approving' }),
  idle: defineMessage({ defaultMessage: 'Approve' }),
};

export const ApprovalNotification = ({
  status,
  tokenIn,
  tokenOut,
  amountIn,
  txReceipt,
  error,
  sx,
}: ApprovalNotificationProps) => {
  const intl = useIntl();

  return (
    <Stack direction="row" justifyContent="space-between" sx={sx}>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ActivityIcon status={status} sx={{ width: 20, height: 20 }} />
          <Typography>{intl.formatMessage(title[status])}</Typography>
          {!isNilOrEmpty(txReceipt?.transactionHash) && (
            <LinkIcon
              size={10}
              url={`https://etherscan.io/tx/${txReceipt.transactionHash}`}
            />
          )}
        </Stack>
        <Stack direction="row" alignItems="center">
          {isNilOrEmpty(error) ? (
            <Typography color="text.tertiary">
              {intl.formatMessage(
                {
                  defaultMessage: '{amountIn} {symbolIn}',
                },
                {
                  amountIn: intl.formatNumber(
                    +formatUnits(amountIn, tokenIn.decimals),
                    { minimumFractionDigits: 4, maximumFractionDigits: 4 },
                  ),
                  symbolIn: tokenIn.symbol,
                },
              )}
            </Typography>
          ) : (
            <Typography color="error">{error}</Typography>
          )}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          component="img"
          src={tokenIn.icon}
          sx={{ width: 24, height: 24 }}
        />
      </Stack>
    </Stack>
  );
};
