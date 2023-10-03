import {
  Box,
  Divider,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { LinkIcon } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { descend, pipe, prop, sort, take } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useActivityState } from '../state';
import { ActivityIcon } from './ActivityIcon';

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { Activity, ActivityType } from '../types';

export type AcitivityPopoverProps = {
  anchor: HTMLElement | null;
  setAnchor: (value: HTMLButtonElement | null) => void;
};

export const ActivityPopover = ({
  anchor,
  setAnchor,
}: AcitivityPopoverProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [{ activities, maxVisible }] = useActivityState();

  const handleClose = () => {
    setAnchor(null);
  };

  const sortedActivities = pipe(
    sort(descend(prop('createdOn'))),
    take(maxVisible),
  )(activities) as Activity[];

  return (
    <Popover
      open={!!anchor}
      anchorEl={anchor}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 50,
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPopover-paper': {
          borderRadius: 1,
          width: (theme) => ({
            xs: '90vw',
            md: `min(${theme.typography.pxToRem(400)}, 90vw)`,
          }),
          [theme.breakpoints.down('md')]: {
            left: '0 !important',
            right: 0,
            marginInline: 'auto',
          },
        },
      }}
    >
      <Stack>
        <Typography sx={{ px: 3, py: 2 }}>
          {intl.formatMessage({ defaultMessage: 'Recent activity' })}
        </Typography>
        <Divider />
        <Stack divider={<Divider />}>
          {isNilOrEmpty(sortedActivities) ? (
            <EmptyActivity sx={{ px: 3, py: 3 }} />
          ) : (
            sortedActivities.map((a) => (
              <ActivityItem key={a.id} activity={a} sx={{ px: 3, py: 2 }} />
            ))
          )}
        </Stack>
      </Stack>
    </Popover>
  );
};

type ActivityItemProps = {
  activity: Activity;
} & StackProps;

const activityLabel: Record<ActivityType, MessageDescriptor> = {
  swap: defineMessage({ defaultMessage: 'Swapped' }),
  approval: defineMessage({ defaultMessage: 'Approved' }),
};

function ActivityItem({ activity, ...rest }: ActivityItemProps) {
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
}

function EmptyActivity(props: StackProps) {
  const intl = useIntl();

  return (
    <Stack {...props} justifyContent="center" alignItems="center" py={3}>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'No activity' })}
      </Typography>
    </Stack>
  );
}
