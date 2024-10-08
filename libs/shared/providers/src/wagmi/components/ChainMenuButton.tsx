import { useRef, useState } from 'react';

import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { ClickAwayMenu, NetworkIcon } from '@origin/shared/components';
import { supportedChainNames } from '@origin/shared/constants';
import {
  FaCheckRegular,
  FaCircleInfoRegular,
  FaTriangleExclamationRegular,
} from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useSwitchChain } from 'wagmi';

import type { ButtonProps, MenuItemProps } from '@mui/material';
import type {
  ClickAwayPopoverProps,
  SupportedChain,
} from '@origin/shared/components';

export type ChainMenuButtonProps = {
  hideChainName?: boolean;
  iconSize?: number;
  menuProps?: Omit<
    ClickAwayPopoverProps,
    'anchorEl' | 'open' | 'onClose' | 'children'
  >;
  menuItemProps?: Omit<MenuItemProps, 'selected' | 'onClick'>;
} & Omit<ButtonProps, 'onClick' | 'children' | 'ref'>;

export const ChainMenuButton = ({
  hideChainName,
  iconSize = 24,
  menuProps,
  menuItemProps,
  ...rest
}: ChainMenuButtonProps) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const { chain, isConnected } = useAccount();
  const { chains, switchChain, isPending } = useSwitchChain();

  const handleChainClick = (chainId: number) => () => {
    if (chainId !== chain?.id) {
      switchChain({ chainId });
      setOpen(false);
    }
  };

  const isWrongChain =
    isConnected && isNilOrEmpty(chains.find((c) => c.id === chain?.id));
  const chainId = isConnected
    ? isWrongChain
      ? 0
      : (chain?.id ?? chains[0].id)
    : chains[0].id;

  return (
    <>
      <Button
        {...rest}
        onClick={() => {
          setOpen(true);
        }}
        ref={anchorEl}
      >
        {isPending ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress
              size={Math.max(20, iconSize - 6)}
              color="inherit"
            />
          </Box>
        ) : isWrongChain ? (
          <FaTriangleExclamationRegular
            sx={{
              fontSize: 20,
              color: 'warning.main',
            }}
          />
        ) : (
          <NetworkIcon chainId={chainId as SupportedChain} size={iconSize} />
        )}
        {!hideChainName && !isWrongChain && (
          <Typography sx={{ ml: 1 }}>
            {supportedChainNames[chainId].short}
          </Typography>
        )}
      </Button>
      <ClickAwayMenu
        {...menuProps}
        menuListProps={{
          component: Stack,
          sx: { gap: 0.5 },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {chains.map((c) => (
          <MenuItem
            {...menuItemProps}
            key={c.id}
            selected={c.id === chainId}
            onClick={handleChainClick(c.id)}
            sx={{ minWidth: 150, ...menuItemProps?.sx }}
          >
            <Stack
              direction="row"
              useFlexGap
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {supportedChainNames[c.id].short}
              {c.id === chainId && (
                <FaCheckRegular sx={{ fontSize: 16, ml: 2 }} />
              )}
            </Stack>
          </MenuItem>
        ))}
        {isWrongChain && (
          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              alignItems: 'flex-start',
              backgroundColor: 'warning.faded',
              p: 1,
              mt: 0.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'warning.main',
            }}
          >
            <FaTriangleExclamationRegular
              sx={{ color: 'warning.main', fontSize: 14 }}
            />
            <Typography sx={{ fontSize: 12 }}>
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Currently selected chain<br></br>is not supported',
                },
                { chain: chain?.name },
              )}
            </Typography>
          </Stack>
        )}
        {!isConnected && (
          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              alignItems: 'flex-start',
              backgroundColor: 'primary.faded',
              p: 1,
              mt: 0.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'primary.main',
            }}
          >
            <FaCircleInfoRegular sx={{ color: 'primary.main', fontSize: 14 }} />
            <Typography sx={{ fontSize: 12 }}>
              {intl.formatMessage({
                defaultMessage:
                  'Connect your wallet to<br></br>select the network',
              })}
            </Typography>
          </Stack>
        )}
      </ClickAwayMenu>
    </>
  );
};
