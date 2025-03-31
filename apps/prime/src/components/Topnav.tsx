import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Divider,
  Drawer,
  Grid2,
  Link,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { usePoints } from '@origin/prime/shared';
import {
  ExternalLink,
  LoadingLabel,
  TokenIcon,
  WalletIcon,
} from '@origin/shared/components';
import { getTokenIconUrl, tokens } from '@origin/shared/contracts';
import {
  EigenPoints,
  FaArrowUpRightRegular,
  FaBarsRegular,
  PrimePoints,
  PrimeStake,
} from '@origin/shared/icons';
import { AddressLabel, OpenAccountModalButton } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch } from 'react-router';
import { formatUnits } from 'viem';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';

import { routes } from '../routes';

import type { BoxProps, StackProps } from '@mui/material';
import type { RouteObject } from 'react-router';

export function Topnav(props: BoxProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        component="nav"
        {...props}
        sx={(theme) => ({
          height: `${theme.mixins.toolbar.height}px`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          px: {
            xs: 1.5,
            md: 3,
          },
          mb: {
            md: 4,
          },
          backgroundColor: (theme) =>
            alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(15px)',
        })}
      >
        <Grid2 container sx={{ width: 1 }}>
          <Grid2 size={6}>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                alignItems: 'center',
              }}
            >
              <Stack
                direction="row"
                component={RouterLink}
                to="/"
                sx={{
                  justifyContent: 'flex-start',
                }}
              >
                <PrimeStake
                  sx={{
                    width: { xs: 140, md: 160 },
                    height: { xs: 36, md: 44 },
                  }}
                />
              </Stack>
              {!isSm && (
                <Navigation
                  direction="row"
                  spacing={3}
                  alignItems="center"
                  justifyContent={{ xs: 'center', lg: 'flex-end' }}
                  height={1}
                />
              )}
            </Stack>
          </Grid2>
          <Grid2 size={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {!isMd && <PointsBadges mr={2} />}
              <AccountPopoverButton />

              {isSm && (
                <Button
                  onClick={() => {
                    setDrawerOpen(not);
                  }}
                  variant="outlined"
                  color="secondary"
                  sx={{
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    minWidth: 0,
                    p: 0,
                  }}
                >
                  <FaBarsRegular />
                </Button>
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Box>
      {isSm && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
          PaperProps={{ sx: { minWidth: 250, p: 3 } }}
        >
          <PrimeStake sx={{ width: 140, height: 36, mb: 4 }} />
          <Navigation
            direction="column"
            spacing={3}
            alignItems="flex-start"
            width={1}
            onLinkClick={() => {
              setDrawerOpen(false);
            }}
          />
        </Drawer>
      )}
    </>
  );
}

type NavigationProps = {
  onLinkClick?: () => void;
} & StackProps;

const Navigation = ({ onLinkClick, ...rest }: NavigationProps) => {
  const intl = useIntl();

  return (
    <Stack {...rest}>
      {routes?.[0]?.children
        ?.filter((c) => !isNilOrEmpty(c?.handle?.label))
        ?.map((route) => (
          <NavLink
            key={route?.path ?? 'index'}
            route={route}
            onLinkClick={onLinkClick}
          />
        ))}
      <Link
        href="https://docs.primestaked.com/prime-staked-eth/intro-to-primeeth"
        target="_blank"
        rel="noopener noreferrer nofollow"
        noWrap
        sx={{
          fontSize: 16,
          fontWeight: 'medium',
          color: (theme) => alpha(theme.palette.text.primary, 0.6),
          ':hover': {
            color: `text.primary`,
          },
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Docs' })}&nbsp;
        <FaArrowUpRightRegular />
      </Link>
    </Stack>
  );
};

type NavLinkProps = {
  route: RouteObject;
  onLinkClick?: () => void;
};

const NavLink = ({ route, onLinkClick }: NavLinkProps) => {
  const intl = useIntl();
  const match = useMatch(route?.path ?? '');

  return (
    <Link
      component={RouterLink}
      to={route?.path ?? ''}
      onClick={() => {
        onLinkClick?.();
      }}
      sx={{
        fontSize: 16,
        fontWeight: 'medium',
        color: (theme) =>
          isNilOrEmpty(match)
            ? alpha(theme.palette.text.primary, 0.6)
            : theme.palette.text.primary,
        ':hover': {
          color: `text.primary`,
        },
      }}
    >
      {intl.formatMessage(route.handle.label)}
    </Link>
  );
};

type PointsBadgesProps = { iconSize?: number } & StackProps;

const PointsBadges = ({ iconSize = 28, ...rest }: PointsBadgesProps) => {
  const intl = useIntl();
  const { data: points, isLoading: isPointsLoading } = usePoints();

  return (
    <Stack
      direction="row"
      spacing={3}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignItems: 'center',
        }}
      >
        <TokenIcon
          token={tokens.mainnet.primeETH}
          sx={{ fontSize: iconSize }}
        />
        <LoadingLabel isLoading={isPointsLoading} sx={{ fontWeight: 'medium' }}>
          {intl.formatNumber(+formatUnits(points?.primePoints ?? 0n, 18), {
            maximumFractionDigits: 3,
            roundingMode: 'floor',
          })}
        </LoadingLabel>
      </Stack>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignItems: 'center',
        }}
      >
        <PrimePoints sx={{ fontSize: iconSize }} />
        <LoadingLabel isLoading={isPointsLoading} sx={{ fontWeight: 'medium' }}>
          {intl.formatNumber(+formatUnits(points?.xpPoints ?? 0n, 18), {
            maximumFractionDigits: 0,
            roundingMode: 'floor',
          })}
        </LoadingLabel>
      </Stack>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignItems: 'center',
        }}
      >
        <EigenPoints sx={{ fontSize: iconSize }} />
        <LoadingLabel isLoading={isPointsLoading} sx={{ fontWeight: 'medium' }}>
          {intl.formatNumber(+formatUnits(points?.elPoints ?? 0n, 18), {
            maximumFractionDigits: 2,
            roundingMode: 'floor',
          })}
        </LoadingLabel>
      </Stack>
    </Stack>
  );
};

const AccountPopoverButton = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();

  const close = () => {
    setAccountModalAnchor(null);
  };

  const handleAddTokenToWallet = () => {
    walletClient?.watchAsset({
      type: 'ERC20',
      options: {
        address: tokens.mainnet.primeETH.address,
        decimals: tokens.mainnet.primeETH.decimals,
        symbol: tokens.mainnet.primeETH.symbol,
        image: getTokenIconUrl(tokens.mainnet.primeETH),
      },
    });
  };

  return (
    <>
      <OpenAccountModalButton
        hideAddress={isSm}
        connectedProps={{ variant: 'outlined', color: 'secondary' }}
        onClick={(e) => {
          if (isConnected) {
            setAccountModalAnchor(e.currentTarget);
          }
        }}
        sx={{
          borderRadius: 25,
          paddingX: {
            md: 3,
            xs: isConnected ? 0.75 : 3,
          },
          paddingY: {
            md: 1,
            xs: 0.75,
          },
          minWidth: 36,
          maxWidth: { xs: isConnected ? 36 : 160, sm: 160, lg: 220 },
          minHeight: { xs: 36, md: 44 },
        }}
      />
      <Popover
        open={!!accountModalAnchor}
        anchorEl={accountModalAnchor}
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
            width: 250,
          },
        }}
      >
        <Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1.5,
            }}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'Account' })}
            </Typography>
            <Button
              onClick={() => {
                disconnect();
                close();
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Disconnect' })}
            </Button>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ px: 2, py: 3 }}>
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
              }}
            >
              <WalletIcon
                walletName={connector?.name}
                sx={{ width: 20, height: 20, mr: 1.5 }}
              />
              <ExternalLink href={`https://etherscan.io/address/${address}`}>
                <AddressLabel address={address} short />
              </ExternalLink>
            </Stack>
            <Button
              onClick={handleAddTokenToWallet}
              variant="outlined"
              color="secondary"
            >
              <TokenIcon
                token={tokens.mainnet.primeETH}
                sx={{ fontSize: 20, mr: 1 }}
              />
              {intl.formatMessage({
                defaultMessage: 'Add primeETH',
              })}
            </Button>
          </Stack>
          {isMd && (
            <>
              <Divider />
              <PointsBadges
                direction="column"
                alignItems="flex-start"
                spacing={2}
                iconSize={20}
                px={2}
                py={2}
              />
            </>
          )}
        </Stack>
      </Popover>
    </>
  );
};
