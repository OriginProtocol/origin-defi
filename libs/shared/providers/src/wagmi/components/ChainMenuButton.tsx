import { useRef, useState } from 'react';

import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { ChainIcon, ClickAwayMenu } from '@origin/shared/components';
import { supportedChainNames } from '@origin/shared/constants';
import { FaCheckRegular } from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useSwitchChain } from 'wagmi';

import type { ButtonProps, MenuItemProps } from '@mui/material';
import type { ClickAwayPopoverProps } from '@origin/shared/components';

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
  disabled,
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

  const chainId = chain?.id ?? chains[0].id;
  const isWrongChain =
    isConnected && isNilOrEmpty(chains.find((c) => c.id === chain?.id));

  return (
    <>
      <Button
        {...rest}
        disabled={disabled /* || isWrongChain || !isConnected */}
        onClick={() => {
          setOpen(true);
        }}
        ref={anchorEl}
      >
        {isPending ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress
              size={Math.max(20, iconSize - 6)}
              color="inherit"
            />
          </Box> /* : isWrongChain ? (
          <FaXmarkRegular sx={{ fontSize: iconSize, color: 'error.main' }} />
        )  */
        ) : (
          <ChainIcon chainId={chainId} sx={{ fontSize: iconSize }} />
        )}
        {!hideChainName && (
          <Typography sx={{ ml: 1 }}>
            {
              /* isWrongChain
              ? intl.formatMessage({ defaultMessage: 'Unsupported' })
              : */ supportedChainNames[chainId].short
            }
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
              alignItems="center"
              justifyContent="space-between"
              useFlexGap
            >
              {supportedChainNames[c.id].short}
              {c.id === chainId && (
                <FaCheckRegular sx={{ fontSize: 16, ml: 2 }} />
              )}
            </Stack>
          </MenuItem>
        ))}
      </ClickAwayMenu>
    </>
  );
};
