import { Button, Stack } from '@mui/material';
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
    <Button {...rest}>
      <Stack direction="row" alignItems="center" gap={1}>
        <UserAvatar />
        {!hideAddress && <AddressLabel address={address} enableEnsName short />}
      </Stack>
    </Button>
  );
};
