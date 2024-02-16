import { Stack, Typography } from '@mui/material';
import { ClipboardButton } from '@origin/shared/components';
import { Friends } from '@origin/shared/icons';
import { hexToBase62 } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { StackProps } from '@mui/material';

export const InviteCard = (props: StackProps) => {
  const intl = useIntl();
  const { isConnected, address } = useAccount();

  return (
    <Stack
      spacing={1}
      {...props}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 5,
        minHeight: 200,
        ...props?.sx,
      }}
    >
      <Friends sx={{ width: 40, height: 40, color: 'primary.main' }} />
      <Typography variant="h5" textAlign="center">
        {intl.formatMessage({ defaultMessage: 'Invite your friends' })}
      </Typography>
      <Typography textAlign="center">
        {intl.formatMessage({
          defaultMessage:
            'Get even more primeETH XP when you invite your friends',
        })}
      </Typography>
      <ClipboardButton
        value={hexToBase62(address)}
        disabled={!address}
        variant="outlined"
        sx={{
          minWidth: 160,
          py: 1.25,
          color: 'primary.main',
          ':hover': {
            color: 'primary.contrastText',
            backgroundColor: 'primary.main',
          },
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Copy Referral Link' })}
      </ClipboardButton>
    </Stack>
  );
};
