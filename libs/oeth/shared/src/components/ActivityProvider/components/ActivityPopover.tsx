import { Divider, Popover, Stack, Typography, useTheme } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { descend, pipe, prop, sort, take } from 'ramda';
import { useIntl } from 'react-intl';

import { useActivityState } from '../state';
import { ApprovalNotification } from './ApprovalNotification';
import { RedeemNotification } from './RedeemNotification';
import { SwapNotification } from './SwapNotification';

import type { StackProps } from '@mui/material';

import type { Activity } from '../types';

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
            sortedActivities.map(
              (a) =>
                ({
                  approval: (
                    <ApprovalNotification
                      key={a.id}
                      {...a}
                      sx={{ px: 3, py: 2 }}
                    />
                  ),
                  redeem: (
                    <RedeemNotification
                      key={a.id}
                      {...a}
                      sx={{ px: 3, py: 2 }}
                    />
                  ),
                  swap: (
                    <SwapNotification key={a.id} {...a} sx={{ px: 3, py: 2 }} />
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
    <Stack {...props} justifyContent="center" alignItems="center" py={3}>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'No activity' })}
      </Typography>
    </Stack>
  );
}
