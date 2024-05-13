import {
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { ErrorBoundary } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { produce } from 'immer';
import { descend, pipe, sort, take } from 'ramda';
import { useIntl } from 'react-intl';

import { useActivityState } from '../state';
import { ActivityNotification } from './ActivityNotification';

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
    sort(descend((a: Activity) => a.createdOn as number)),
    take(maxVisible),
  )(activities) as Activity[];

  return (
    <ErrorBoundary
      onError={() => {
        handleClearAll();
        setAnchor(null);
      }}
    >
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
          zIndex: (theme) => theme.zIndex.modal + 2,
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 3, py: 2 }}
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
              sortedActivities.map((a) => {
                return (
                  <ActivityNotification
                    key={a.id}
                    {...a}
                    sx={{ px: 3, py: 2 }}
                  />
                );
              })
            )}
          </Stack>
        </Stack>
      </Popover>
    </ErrorBoundary>
  );
};

function EmptyActivity(props: StackProps) {
  const intl = useIntl();

  return (
    <Stack {...props} justifyContent="center" alignItems="center" py={3}>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'No Activity' })}
      </Typography>
    </Stack>
  );
}
