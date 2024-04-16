import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  Popover,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackEvent } from '@origin/governance/shared';
import { PauseBanner, usePoints } from '@origin/prime/shared';
import {
  ExternalLink,
  LoadingLabel,
  TokenIcon,
  WalletIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  EigenPoints,
  FaArrowUpRightRegular,
  FaBarsRegular,
  PrimePoints,
  PrimeStake,
} from '@origin/shared/icons';
import {
  AddressLabel,
  OpenAccountModalButton,
  useWatchBalance,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch } from 'react-router-dom';
import { formatUnits } from 'viem';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';

import { routes } from '../routes';

import type { BoxProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { RouteObject } from 'react-router-dom';

export function Topnav(props: BoxProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/*<PauseBanner />*/}
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
          <Grid2 xs={3}>
            <Stack
              direction="row"
              component={RouterLink}
              to="/"
              justifyContent="flex-start"
            >
              <PrimeStake
                sx={{ width: { xs: 140, md: 160 }, height: { xs: 36, md: 44 } }}
              />
            </Stack>
          </Grid2>
          <Grid2 xs={3}>
            {!isSm && (
              <Navigation
                direction="row"
                spacing={3}
                alignItems="center"
                height={1}
              />
            )}
          </Grid2>
          <Grid2 xs={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {!isSm && <PointsBadges mr={2} />}
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

const PointsBadges = (props: StackProps) => {
  const intl = useIntl();
  const { data: points, isLoading: isPointsLoading } = usePoints();

  return (
    <Stack direction="row" alignItems="center" spacing={3} {...props}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <TokenIcon
          token={tokens.mainnet.primeETH}
          sx={{ width: 28, height: 28 }}
        />
        <LoadingLabel isLoading={isPointsLoading} fontWeight="medium">
          {intl.formatNumber(+formatUnits(points?.primePoints ?? 0n, 18), {
            maximumFractionDigits: 3,
            roundingMode: 'floor',
          })}
        </LoadingLabel>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <PrimePoints sx={{ width: 28, height: 28 }} />
        <LoadingLabel isLoading={isPointsLoading} fontWeight="medium">
          {intl.formatNumber(+formatUnits(points?.xpPoints ?? 0n, 18), {
            maximumFractionDigits: 0,
            roundingMode: 'floor',
          })}
        </LoadingLabel>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <EigenPoints sx={{ width: 28, height: 28 }} />
        <LoadingLabel isLoading={isPointsLoading} fontWeight="medium">
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
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: eth, isLoading: ethLoading } = useWatchBalance();
  const { data: walletClient } = useWalletClient();

  const close = () => {
    setAccountModalAnchor(null);
  };

  const handleAddTokenToWallet = () => {
    walletClient?.watchAsset({
      type: 'ERC20',
      options: tokens.mainnet.primeETH,
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
            trackEvent({
              name: 'open_account',
            });
          } else {
            trackEvent({
              name: 'connect_click',
            });
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
        <Stack>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            sx={{ px: 2, py: 1.5 }}
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
            <Stack direction="row" alignItems="center">
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

          <Divider />
          <Stack sx={{ px: 2, py: 3 }} gap={2}>
            <BalanceRow
              token={tokens.mainnet.ETH}
              balance={+formatUnits(eth ?? 0n, 18)}
              isBalanceLoading={ethLoading}
            />
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

type BalanceRowProps = {
  token: Token;
  balance: number;
  isBalanceLoading: boolean;
} & StackProps;

function BalanceRow({
  token,
  balance,
  isBalanceLoading,
  ...rest
}: BalanceRowProps) {
  const intl = useIntl();

  return (
    <Stack direction="row" alignItems="center" gap={1} {...rest}>
      <TokenIcon token={token} sx={{ width: 20, height: 20 }} />
      <Typography>
        {isBalanceLoading ? (
          <Skeleton width={38} />
        ) : (
          intl.formatNumber(balance, {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          })
        )}
      </Typography>
      <Typography>{token.symbol}</Typography>
    </Stack>
  );
}
