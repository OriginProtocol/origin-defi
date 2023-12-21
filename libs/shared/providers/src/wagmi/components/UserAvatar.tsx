import { Box } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

import type { BoxProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';

export type UserAvatarProps = { address?: HexAddress; width?: number } & Omit<
  BoxProps<'img'>,
  'width'
>;

export const UserAvatar = ({ address, ...rest }: UserAvatarProps) => {
  const { address: self } = useAccount();
  const adr = address ?? self;
  const { data: ensName } = useEnsName({
    address: adr,
    enabled: !isNilOrEmpty(adr),
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: !!ensName,
  });

  if (isNilOrEmpty(adr)) {
    return (
      <Box
        borderRadius="50%"
        width={24}
        height={24}
        {...rest}
        component="img"
        src="/images/user.svg"
      />
    );
  }

  if (ensAvatar) {
    return (
      <Box
        borderRadius="50%"
        width={24}
        height={24}
        {...rest}
        component="img"
        src={ensAvatar}
      />
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...rest}
      sx={{
        'svg, img': {
          borderRadius: '50%',
          width: rest?.width ?? 24,
          height: rest?.width ?? 24,
        },
        ...rest?.sx,
      }}
    >
      <Jazzicon diameter={rest?.width ?? 24} seed={jsNumberForAddress(adr)} />
    </Box>
  );
};
