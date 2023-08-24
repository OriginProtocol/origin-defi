import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { LinkIcon } from '../LinkIcon';
import { MiddleTruncated } from '../MiddleTruncated';
import { Icon } from './Icon';
import { styles } from './utils';

import type { ButtonProps, SxProps, Theme } from '@mui/material';

import type { Connected } from './types';

const padding = { paddingBlock: 1.8, paddingInline: 2 };

interface Props extends Pick<Connected, 'values' | 'userId' | 'walletIcon'> {
  onDisconnect?: () => void;
}

export function ConnectedButton({
  userId,
  walletIcon,
  values,
  onDisconnect,
}: Props) {
  const theme = useTheme();
  const intl = useIntl();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      <ConnectButton
        connected
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          [theme.breakpoints.down('md')]: {
            '& p': {
              display: 'none',
            },
          },
        }}
      >
        <Box
          component={'img'}
          src="	https://app.oeth.com/images/wallet-image.svg"
          sx={{
            width: (theme) => theme.spacing(3),
            height: (theme) => theme.spacing(3),
          }}
        />
        <MiddleTruncated>{userId}</MiddleTruncated>
      </ConnectButton>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: 50,
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': {
            width: (theme) => ({
              xs: '90vw',
              md: `min(${theme.typography.pxToRem(250)}, 90vw)`,
            }),
            [theme.breakpoints.down('md')]: {
              left: '0 !important',
              right: 0,
              marginInline: 'auto',
            },
          },
        }}
      >
        <Box>
          <Stack
            component={Typography}
            color="primary.contrastText"
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            sx={{ ...padding, paddingBlock: 3 }}
          >
            Account
            <Button
              variant="contained"
              sx={{
                borderRadius: 7,
                paddingInline: 2.375,
                paddingBlock: 0.5,
                fontSize: '0.75rem',
                lineHeight: '0.75rem',
                '&:hover': {
                  background: (theme) =>
                    alpha(theme.palette.common.white, 0.05),
                },
              }}
              color="secondary"
              disableElevation
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </Stack>
          <Divider />
          <Stack
            alignItems="center"
            gap={1.5}
            sx={{ ...padding }}
            direction="row"
            color="primary.contrastText"
          >
            <Icon src={walletIcon} />
            <MiddleTruncated>{userId}</MiddleTruncated>
            <LinkIcon url={`https://etherscan.io/address/${userId}`} />
          </Stack>
          <Divider />
          <Stack sx={{ ...padding, paddingBlock: 3 }} gap={2}>
            {values.map((value) => (
              <Stack
                key={value.token}
                component={Typography}
                direction="row"
                alignItems="center"
                color="primary.contrastText"
                gap={1}
              >
                <Icon src={value.tokenIcon} />
                {intl.formatNumber(value.quantity)}
                &nbsp;
                {value.token}
              </Stack>
            ))}
          </Stack>
        </Box>
      </Popover>
    </>
  );
}

export type ConnectButtonProps = {
  connected: boolean;
} & ButtonProps;

export function ConnectButton({ connected, ...rest }: ConnectButtonProps) {
  return (
    <Button
      sx={
        {
          ...styles,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          paddingInline: { xs: 1, sm: 3 },
          paddingBlock: 1,
          borderRadius: 25,
          background: (theme) =>
            connected
              ? `linear-gradient(0deg, ${alpha(
                  theme.palette.common.white,
                  0.05,
                )} 0%, ${alpha(theme.palette.common.white, 0.05)} 100%), ${
                  theme.palette.background.paper
                }`
              : `linear-gradient(0deg, ${alpha(
                  theme.palette.common.white,
                  0.1,
                )} 0%,  ${alpha(theme.palette.common.white, 0.1)}100%), ${
                  theme.palette.background.gradient2
                }`,
          '&:hover': {
            background: (theme) =>
              connected
                ? theme.palette.background.paper
                : theme.palette.background.gradient2,
          },
          minWidth: 0,
          gap: 1.5,
          ...rest?.sx,
        } as SxProps<Theme>
      }
      disableElevation
      disableRipple
      disableTouchRipple
      disableFocusRipple
      variant="text"
      data-testid="connect-button"
      {...rest}
    />
  );
}
