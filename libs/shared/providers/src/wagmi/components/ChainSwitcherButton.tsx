import { useState } from 'react';

import { Button, Popover, Stack, Typography } from '@mui/material';
import { ChainIcon } from '@origin/shared/components';
import { FaCheckRegular } from '@origin/shared/icons';
import { useAccount, useSwitchChain } from 'wagmi';
import { arbitrum, mainnet } from 'wagmi/chains';

import type { Dispatch, SetStateAction } from 'react';

export const ChainSwitcherButton = () => {
  const { chain } = useAccount();
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement>();
  if (!chain) {
    return null;
  }
  return (
    <>
      <Button
        variant={'nav'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: {
            xs: 0,
          },
          paddingLeft: {
            lg: 1.5,
          },
          paddingRight: {
            lg: 2,
          },
        }}
        onClick={(e) => setPopoverAnchor(e.currentTarget)}
      >
        <ChainIcon chainId={chain.id} sx={{ fonTSize: 24 }} />
        <Typography
          variant="inherit"
          sx={{ display: { xs: 'none', lg: 'block' } }}
        >
          {chain.id === arbitrum.id ? 'Arbitrum' : chain.name}
        </Typography>
      </Button>
      <ChainSwitcherPopover
        anchor={popoverAnchor}
        setAnchor={setPopoverAnchor}
      />
    </>
  );
};

export function ChainSwitcherPopover({
  anchor,
  setAnchor,
}: {
  anchor: HTMLElement | undefined;
  setAnchor: Dispatch<SetStateAction<HTMLElement | undefined>>;
}) {
  const { switchChain } = useSwitchChain();
  const { connector, chainId: currentChainId, isConnected } = useAccount();

  function close() {
    setAnchor(undefined);
  }

  if (!isConnected) return null;

  const chains = [mainnet, arbitrum];

  return (
    <Popover
      open={!!anchor}
      anchorEl={anchor}
      onClose={close}
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
          borderRadius: 1,
          width: 175,
        },
      }}
    >
      <Stack>
        {chains.map((chain) => (
          <Stack
            key={chain.id}
            alignItems="center"
            direction="row"
            spacing={1.5}
            sx={{
              px: 2,
              py: 1.5,
              ':hover': {
                cursor: 'pointer',
                backgroundColor: 'rgba(255,255,255,.05)',
              },
            }}
            onClick={() => {
              switchChain({ connector, chainId: chain.id });
              close();
            }}
          >
            <ChainIcon chainId={chain.id} />
            <Typography>
              {chain.id === arbitrum.id ? 'Arbitrum' : chain.name}
            </Typography>
            {chain.id === currentChainId && <FaCheckRegular />}
          </Stack>
        ))}
      </Stack>
    </Popover>
  );
}
