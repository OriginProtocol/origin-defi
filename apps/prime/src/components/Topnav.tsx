import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Drawer,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackEvent } from '@origin/governance/shared';
import { PauseBanner, usePoints } from '@origin/prime/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  EigenPoints,
  FaArrowUpRightRegular,
  FaBarsRegular,
  PrimePoints,
  PrimeStake,
} from '@origin/shared/icons';
import {
  AccountPopover,
  OpenAccountModalButton,
  useFormat,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { routes } from '../routes';

import type { BoxProps, StackProps } from '@mui/material';
import type { RouteObject } from 'react-router-dom';

export function Topnav(props: BoxProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const { isConnected } = useAccount();
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: (theme) => `${theme.mixins.toolbar.height}px`,
        }}
      />
      <PauseBanner />
      <Box
        component="nav"
        {...props}
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          width: 1,
          zIndex: theme.zIndex.appBar,
          height: `${theme.mixins.toolbar.height}px`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          px: {
            xs: 1.5,
            md: 3,
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
              <OpenAccountModalButton
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
                    xs: 2,
                  },
                  paddingY: {
                    md: 1,
                    xs: 0.75,
                  },
                  minWidth: 36,
                  maxWidth: { xs: isConnected ? 36 : 160, sm: 160, lg: 220 },
                  minHeight: { xs: 36, md: 44 },
                }}
                connectedProps={{ variant: 'outlined', color: 'secondary' }}
              />
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
              <AccountPopover
                anchor={accountModalAnchor}
                setAnchor={setAccountModalAnchor}
              />
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
  const { formatBalance, formatAmount } = useFormat();
  const { data: points, isLoading: isPointsLoading } = usePoints();

  return (
    <Stack direction="row" alignItems="center" spacing={3} {...props}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <TokenIcon
          symbol={tokens.mainnet.primeETH.symbol}
          sx={{ width: 28, height: 28 }}
        />
        <LoadingLabel isLoading={isPointsLoading} fontWeight="medium">
          {formatBalance(points?.primePoints)}
        </LoadingLabel>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <PrimePoints sx={{ width: 28, height: 28 }} />
        <LoadingLabel isLoading={isPointsLoading} fontWeight="medium">
          {formatAmount(points?.xpPoints)}
        </LoadingLabel>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <EigenPoints sx={{ width: 28, height: 28 }} />
        <LoadingLabel isLoading={isPointsLoading} fontWeight="medium">
          {formatAmount(points?.elPoints)}
        </LoadingLabel>
      </Stack>
    </Stack>
  );
};
