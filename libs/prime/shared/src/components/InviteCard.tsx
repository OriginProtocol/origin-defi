import { Stack, Typography } from '@mui/material';
import { ClipboardButton } from '@origin/shared/components';
import { Friends } from '@origin/shared/icons';
import { ConnectedButton } from '@origin/shared/providers';
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
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          border: `1px solid`,
          borderColor: 'divider',
          borderRadius: 5,
          minHeight: 200,
          ...props?.sx,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Friends sx={{ width: 40, height: 40, color: 'primary.main' }} />
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Invite your friends' })}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        {intl.formatMessage({
          defaultMessage:
            'Get even more primeETH XP when you invite your friends',
        })}
      </Typography>
      {isConnected ? (
        <ClipboardButton
          value={`${window.location.origin}#/restake/?r=${hexToBase62(address)}`}
          variant="outlined"
          sx={{
            minWidth: 160,
            py: 1.25,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Copy Referral Link' })}
        </ClipboardButton>
      ) : (
        <ConnectedButton
          variant="outlined"
          sx={{
            minWidth: 160,
            py: 1.25,
          }}
        />
      )}
    </Stack>
  );
};
