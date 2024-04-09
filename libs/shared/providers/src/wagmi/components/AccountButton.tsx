import { Button } from '@mui/material';
import { useAccount } from 'wagmi';

import { AddressLabel } from './AddressLabel';
import { UserAvatar } from './UserAvatar';

import type { ButtonProps } from '@mui/material';

export type AccountButtonProps = { hideAddress?: boolean } & Omit<
  ButtonProps,
  'children'
>;

export const AccountButton = ({ hideAddress, ...rest }: AccountButtonProps) => {
  const { address } = useAccount();

  return (
    <Button
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0.75,
        minWidth: 0,
        ...rest?.sx,
      }}
    >
      <UserAvatar />
      {!hideAddress && (
        <AddressLabel
          address={address}
          enableEnsName
          short
          fontStyle="normal"
          fontWeight={500}
          fontSize={{
            xs: 13,
            md: 16,
          }}
        />
      )}
    </Button>
  );
};
