import { alpha, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

import { AddressLabel } from './AddressLabel';

import type { ButtonProps } from '@mui/material';

export function AccountButton(props: Omit<ButtonProps, 'children'>) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address, enabled: isConnected });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: !!ensName,
  });

  return (
    <Button
      disableElevation
      disableRipple
      disableTouchRipple
      disableFocusRipple
      variant="text"
      {...props}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 25,
        color: 'primary.contrastText',
        boxSizing: 'border-box',
        lineHeight: '1rem',
        minHeight: 36,
        minWidth: 36,
        maxWidth: { xs: 36, sm: 160, lg: 220 },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1.5,
        padding: 0.75,
        background: (theme) =>
          `linear-gradient(0deg, ${alpha('#fff', 0.05)} 0%, ${alpha(
            '#fff',
            0.05,
          )} 100%), ${theme.palette.background.paper}`,
        '&:hover': {
          background: (theme) => theme.palette.background.gradient2,
        },
        ...props?.sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          'svg, img': {
            borderRadius: '50%',
            width: 24,
            height: 24,
          },
        }}
      >
        {ensAvatar ? (
          <Box component={'img'} src={ensAvatar} />
        ) : (
          <Jazzicon diameter={24} seed={jsNumberForAddress(address)} />
        )}
      </Box>
      {!isSmall && (
        <AddressLabel
          address={address}
          enableEnsName
          fontFamily="Inter"
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