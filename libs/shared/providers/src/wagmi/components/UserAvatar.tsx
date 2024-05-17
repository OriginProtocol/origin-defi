import { Box } from '@mui/material';
import { FaUserRegular } from '@origin/shared/icons';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
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
    query: {
      enabled: !isNilOrEmpty(adr),
    },
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    query: {
      enabled: !!ensName,
    },
  });

  if (isNilOrEmpty(adr)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" {...rest}>
        <FaUserRegular sx={{ fontSize: rest?.width ?? 24 }} />
      </Box>
    );
  }

  if (ensAvatar) {
    return (
      <Box
        borderRadius="50%"
        {...rest}
        width={rest?.width ?? 24}
        height={rest?.width ?? 24}
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
      <Jazzicon
        diameter={rest?.width ?? 24}
        seed={jsNumberForAddress(adr ?? ZERO_ADDRESS)}
      />
    </Box>
  );
};
