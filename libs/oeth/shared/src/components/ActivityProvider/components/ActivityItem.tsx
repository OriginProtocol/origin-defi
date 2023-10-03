import { Box, Stack, Typography } from '@mui/material';
import { LinkIcon } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { ActivityIcon } from './ActivityIcon';

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { Activity, ActivityType } from '../types';

type ActivityItemProps = {
  activity: Activity;
} & StackProps;

const activityLabel: Record<ActivityType, MessageDescriptor> = {
  swap: defineMessage({ defaultMessage: 'Swapped' }),
  approval: defineMessage({ defaultMessage: 'Approved' }),
  redeem: defineMessage({ defaultMessage: 'Redeemed' }),
};

export const ActivityItem = ({ activity, ...rest }: ActivityItemProps) => {
  const intl = useIntl();

  return (
    <Stack {...rest} direction="row" justifyContent="space-between">
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ActivityIcon
            status={activity.status}
            sx={{ width: 20, height: 20 }}
          />
          <Typography>
            {intl.formatMessage(activityLabel[activity.type])}
          </Typography>
          {!isNilOrEmpty(activity?.txReceipt?.transactionHash) && (
            <LinkIcon
              size={10}
              url={`https://etherscan.io/tx/${activity.txReceipt.transactionHash}`}
            />
          )}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography color="text.tertiary">
            {intl.formatMessage(
              {
                defaultMessage:
                  '{amountIn} {symbolIn} for {amountOut} {symbolOut}',
              },
              {
                amountIn: intl.formatNumber(
                  +formatUnits(activity.amountIn, activity.tokenIn.decimals),
                  { minimumFractionDigits: 4, maximumFractionDigits: 4 },
                ),
                symbolIn: activity.tokenIn.symbol,
                amountOut: intl.formatNumber(
                  +formatUnits(activity.amountOut, activity.tokenOut.decimals),
                  { minimumFractionDigits: 4, maximumFractionDigits: 4 },
                ),
                symbolOut: activity.tokenOut.symbol,
              },
            )}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          component="img"
          src={activity.tokenIn.icon}
          sx={{ width: 24, height: 24 }}
        />
        <Box
          component="img"
          src="images/arrow-right.svg"
          sx={{ width: 12, height: 12 }}
        />
        <Box
          component="img"
          src={activity.tokenOut.icon}
          sx={{ width: 24, height: 24 }}
        />
      </Stack>
    </Stack>
  );
};
