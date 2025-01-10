import { Box, Skeleton } from '@mui/material';
import { FaUserRegular } from '@origin/shared/icons';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { mainnet } from 'viem/chains';
import {
  createConfig,
  http,
  useAccount,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

import type { BoxProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';

export type UserAvatarProps = { address?: HexAddress; width?: number } & Omit<
  BoxProps<'img'>,
  'width'
>;

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export const UserAvatar = ({ address, ...rest }: UserAvatarProps) => {
  const { address: self } = useAccount();
  const adr = address ?? self;
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: adr,
    chainId: mainnet.id,
    query: {
      enabled: !isNilOrEmpty(adr),
    },
    config: wagmiConfig,
  });
  const { data: ensAvatar, isLoading: ensAvatarLoading } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    query: {
      enabled: !!ensName,
    },
    config: wagmiConfig,
  });

  if (isNilOrEmpty(adr)) {
    return (
      <Box
        {...rest}
        sx={[
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
        ]}
      >
        <FaUserRegular sx={{ fontSize: rest?.width ?? 24 }} />
      </Box>
    );
  }

  if (ensNameLoading || ensAvatarLoading) {
    return (
      <Box {...rest}>
        <Skeleton
          variant="circular"
          width={rest?.width ?? 24}
          height={rest?.width ?? 24}
        />
      </Box>
    );
  }

  if (ensAvatar) {
    return (
      <Box
        {...rest}
        component="img"
        src={ensAvatar}
        sx={[
          {
            borderRadius: '50%',
            width: rest?.width ?? 24,
            height: rest?.width ?? 24,
          },
          ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
        ]}
      />
    );
  }

  return (
    <Box
      {...rest}
      sx={[
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          'svg, img': {
            borderRadius: '50%',
            width: rest?.width ?? 24,
            height: rest?.width ?? 24,
          },
          ...rest?.sx,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Jazzicon
        diameter={rest?.width ?? 24}
        seed={jsNumberForAddress(adr ?? ZERO_ADDRESS)}
      />
    </Box>
  );
};
