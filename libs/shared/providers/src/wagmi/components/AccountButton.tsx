import { Button, useMediaQuery, useTheme } from '@mui/material';
import { useAccount } from 'wagmi';

import { AddressLabel } from './AddressLabel';
import { UserAvatar } from './UserAvatar';

import type { ButtonProps } from '@mui/material';

export function AccountButton(props: Omit<ButtonProps, 'children'>) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { address } = useAccount();

  return (
    <Button
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...props?.sx,
        gap: 0.75,
        paddingLeft: {
          md: 1,
          xs: 0.75,
        },
        paddingRight: {
          md: 2,
          sm: 1.5,
          xs: 0.75,
        },
      }}
    >
      <UserAvatar />
      {!isSmall && (
        <AddressLabel
          address={address}
          enableEnsName
          short
          fontStyle="normal"
          fontWeight={500}
          fontSize={{
            xs: '0.75rem',
            md: '1rem',
          }}
        />
      )}
    </Button>
  );
}
