import { Button, Divider, Popover, Stack, Typography } from '@mui/material';
import {
  ActivityIcon,
  ErrorTooltipLabel,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { useActivityState } from '@origin/shared/providers';
import { formatAmount, isNilOrEmpty } from '@origin/shared/utils';
import { produce } from 'immer';
import { descend, pipe, sort, take } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { StackProps } from '@mui/material';
import type { NotificationSnackProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { Activity, GlobalActivityStatus } from '@origin/shared/providers';
import type { MessageDescriptor } from 'react-intl';
import type { TransactionReceipt } from 'viem';

export type AcitivityPopoverProps = {
  anchor: HTMLElement | null;
  setAnchor: (value: HTMLButtonElement | null) => void;
};

export const ActivityPopover = ({
  anchor,
  setAnchor,
}: AcitivityPopoverProps) => {
  const intl = useIntl();
  const [{ activities, maxVisible }, setActivityState] = useActivityState();

  const handleClose = () => {
    setAnchor(null);
  };

  const handleClearAll = () => {
    setActivityState(
      produce((state) => {
        state.activities = [];
      }),
    );
  };

  const sortedActivities = pipe(
    sort(descend((a: Activity) => a.createdOn)),
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
      sx={(theme) => ({
        zIndex: theme.zIndex.modal + 2,
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
      })}
    >
      <Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
          }}
        >
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Recent Activity' })}
          </Typography>
          <Button
            variant="text"
            disabled={isNilOrEmpty(sortedActivities)}
            onClick={handleClearAll}
            sx={{ transform: 'translateX(9px)' }}
          >
            {intl.formatMessage({ defaultMessage: 'Clear' })}
          </Button>
        </Stack>
        <Divider />
        <Stack divider={<Divider />}>
          {isNilOrEmpty(sortedActivities) ? (
            <EmptyActivity sx={{ px: 3, py: 3 }} />
          ) : (
            sortedActivities.map(
              (a) =>
                ({
                  bridge: null,
                  redeem: null,
                  swap: null,
                  approval: (
                    <ApprovalNotification
                      key={a.id}
                      {...a}
                      sx={{ px: 3, py: 2 }}
                    />
                  ),
                  transaction: (
                    <TransactionNotification
                      key={a.id}
                      {...a}
                      title={
                        a?.title ??
                        intl.formatMessage({
                          defaultMessage: 'New transaction',
                        })
                      }
                      subtitle={a?.subtitle ?? ''}
                      sx={{ px: 3, py: 2 }}
                    />
                  ),
                })[a.type],
            )
          )}
        </Stack>
      </Stack>
    </Popover>
  );
};

function EmptyActivity(props: StackProps) {
  const intl = useIntl();

  return (
    <Stack
      {...props}
      sx={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Typography>
        {intl.formatMessage({ defaultMessage: 'No Activity' })}
      </Typography>
    </Stack>
  );
}

type TransactionNotificationProps = {
  status: GlobalActivityStatus;
  txReceipt?: TransactionReceipt;
  error?: string;
} & NotificationSnackProps;

const TransactionNotification = ({
  status,
  txReceipt,
  error,
  ...rest
}: TransactionNotificationProps) => {
  return (
    <NotificationSnack
      {...rest}
      icon={<ActivityIcon status={status} sx={{ width: 20, height: 20 }} />}
      href={
        isNilOrEmpty(txReceipt?.transactionHash)
          ? undefined
          : `https://etherscan.io/tx/${txReceipt?.transactionHash}`
      }
      subtitle={
        isNilOrEmpty(error) ? (
          rest?.subtitle
        ) : (
          <ErrorTooltipLabel>{error}</ErrorTooltipLabel>
        )
      }
    />
  );
};

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

const ApprovalNotification = ({
  status,
  tokenIn,
  amountIn,
  txReceipt,
  error,
  sx,
}: ApprovalNotificationProps) => {
  const intl = useIntl();
  const amount = +formatUnits(amountIn ?? 0n, tokenIn?.decimals ?? 18);

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
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage(
              {
                defaultMessage: '{amountIn} {symbolIn}',
              },
              {
                amountIn: formatAmount(amount),
                symbolIn: tokenIn?.symbol,
              },
            )}
          </Typography>
        ) : (
          <ErrorTooltipLabel>{error}</ErrorTooltipLabel>
        )
      }
      endIcon={<TokenIcon token={tokenIn} sx={{ fontSize: 20 }} />}
    />
  );
};
