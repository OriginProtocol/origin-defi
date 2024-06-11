import { Button, Stack } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useAccount } from 'wagmi';

import { AddressLabel } from './AddressLabel';
import { UserAvatar } from './UserAvatar';

import type { ButtonProps } from '@mui/material';

export type AccountButtonProps = { hideAddress?: boolean } & ButtonProps;

export const AccountButton = ({
  hideAddress,
  children,
  ...rest
}: AccountButtonProps) => {
  const { address } = useAccount();

  return (
    <Button {...rest}>
      {isNilOrEmpty(children) ? (
        <Stack direction="row" alignItems="center" gap={1}>
          <UserAvatar />
          {!hideAddress && (
            <AddressLabel address={address} enableEnsName short />
          )}
        </Stack>
      ) : (
        children
      )}
    </Button>
  );
};
