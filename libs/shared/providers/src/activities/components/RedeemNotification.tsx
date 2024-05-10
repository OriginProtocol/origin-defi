import { Stack, Typography } from '@mui/material';
import {
  ActivityIcon,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenById } from '@origin/shared/contracts';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { StackProps } from '@mui/material';
import type { TokenId } from '@origin/shared/contracts';
import type { MessageDescriptor } from 'react-intl';
import type { Hex } from 'viem';

import type { ActivityStatus } from '../types';

type RedeemNotificationProps = {
  status: ActivityStatus;
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
  amountOut: bigint;
  txHash?: Hex;
  error?: string;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Redeeming' }),
  success: defineMessage({ defaultMessage: 'Redeemed' }),
  error: defineMessage({ defaultMessage: 'Error while redeeming' }),
  idle: defineMessage({ defaultMessage: 'Redeem' }),
};

export const RedeemNotification = ({
  status,
  tokenIdIn,
  tokenIdOut,
  amountIn,
  amountOut,
  txHash,
  error,
  sx,
}: RedeemNotificationProps) => {
  const tokenIn = getTokenById(tokenIdIn);
  const tokenOut = getTokenById(tokenIdOut);
  const intl = useIntl();

  return (
    <NotificationSnack
      sx={sx}
      icon={<ActivityIcon status={status} sx={{ width: 20, height: 20 }} />}
      title={intl.formatMessage(title[status])}
      href={
        isNilOrEmpty(txHash) ? undefined : `https://etherscan.io/tx/${txHash}`
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
          <FaArrowRightRegular sx={{ fontSize: 14 }} />
        </Stack>
      }
    />
  );
};
