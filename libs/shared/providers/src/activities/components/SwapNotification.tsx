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

import type { ActivityStatus, SwapActivity } from '../types';

type SwapNotificationProps = SwapActivity & {
  status: ActivityStatus;
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
  amountOut: bigint;
  txHash?: string;
  error?: string;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Swapping' }),
  success: defineMessage({ defaultMessage: 'Swapped' }),
  error: defineMessage({ defaultMessage: 'Error while swapping' }),
  idle: defineMessage({ defaultMessage: 'Swap' }),
};

export const SwapNotification = ({
  status,
  tokenIdIn,
  tokenIdOut,
  amountIn,
  amountOut,
  txHash,
  error,
  sx,
}: SwapNotificationProps) => {
  const intl = useIntl();

  const tokenIn = getTokenById(tokenIdIn);
  const tokenOut = getTokenById(tokenIdOut);

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
                defaultMessage:
                  '{amountIn} {symbolIn} for {amountOut} {symbolOut}',
              },
              {
                amountIn: intl.formatNumber(
                  +formatUnits(amountIn ?? 0n, tokenIn.decimals ?? 18),
                  { minimumFractionDigits: 0, maximumFractionDigits: 2 },
                ),
                symbolIn: tokenIn.symbol,
                amountOut: intl.formatNumber(
                  +formatUnits(amountOut ?? 0n, tokenOut.decimals ?? 18),
                  { minimumFractionDigits: 0, maximumFractionDigits: 2 },
                ),
                symbolOut: tokenOut.symbol,
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
