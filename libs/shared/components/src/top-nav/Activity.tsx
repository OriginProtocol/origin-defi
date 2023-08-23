import { useState } from 'react';

import {
  Box,
  Divider,
  IconButton,
  Popover,
  Typography,
  useTheme,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { Icon } from './Icon';
import { Transaction } from './Transaction';
import { styles } from './utils';

import type { Transaction as ITransaction } from './types';

interface Props {
  transactions: ITransaction[];
}

export function Activity({ transactions }: Props) {
  const theme = useTheme();
  const intl = useIntl();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <IconButton
        disableFocusRipple
        disableRipple
        disableTouchRipple
        sx={{
          // @ts-expect-error types mismatch
          backgroundColor: styles?.backgroundColor,
          // @ts-expect-error types mismatch
          boxShadow: styles?.boxShadow,
          width: (theme) => theme.typography.pxToRem(40),
          height: (theme) => theme.typography.pxToRem(40),
          padding: 1,
          '&:hover': {
            background: (theme) => theme.palette.background.gradientHover,
          },
        }}
        data-testid="activity-button"
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        <Icon src="https://app.oeth.com/images/activity.svg" />
      </IconButton>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
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
            width: (theme) => ({
              xs: '90vw',
              md: `min(${theme.typography.pxToRem(370)}, 90vw)`,
            }),
            maxHeight: (theme) =>
              `min(${theme.typography.pxToRem(450)}, calc(100vh - 150px))`,
            paddingBlockEnd: 3,
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('md')]: {
              left: '0 !important',
              right: 0,
              marginInline: 'auto',
            },
          },
        }}
        transitionDuration={theme.transitions.duration.shortest}
      >
        <Typography color="primary.contrastText" sx={{ padding: 2 }}>
          {intl.formatMessage({ defaultMessage: 'Recent activity' })}
        </Typography>
        <Divider />
        {!transactions.length ? (
          <Typography sx={{ padding: 2, paddingBlockEnd: 0 }}>
            {intl.formatMessage({
              defaultMessage: 'No transaction activity',
            })}
          </Typography>
        ) : (
          <Box
            sx={{
              overflow: 'auto',
              maxHeight: 'calc(100% - 100px)',
            }}
          >
            {transactions.map((transaction, index) => (
              <Transaction
                transaction={transaction}
                key={transaction.status + transaction.type + index}
              />
            ))}
          </Box>
        )}
        {transactions.length ? <Divider /> : undefined}
      </Popover>
    </>
  );
}
