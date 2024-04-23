import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { trackEvent } from '@origin/oeth/shared';
import { tokens } from '@origin/shared/contracts';
import {
  AccountPopover,
  ActivityButton,
  ChainSwitcherButton,
  OpenAccountModalButton,
} from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { routes } from '../routes';
import { DisableLstBanner } from './DisableLstBanner';

import type { BoxProps } from '@mui/material';

export function Topnav(props: BoxProps) {
  return (
    <>
      <Box
        sx={{
          height: {
            xs: 162,
            md: 105,
          },
        }}
      />
      <Box
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          width: 1,
          zIndex: theme.zIndex.appBar,
          height: {
            xs: 162,
            md: 105,
          },
        })}
      >
        <DisableLstBanner />
        <Stack
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.background.default, 0.6),
            backdropFilter: 'blur(15px)',
            display: 'grid',
            borderBottom: {
              xs: 'none',
              md: `1px solid ${theme.palette.background.paper}`,
            },
            columnGap: { xs: 1, md: 3, xl: 6 },
            rowGap: 0,
            alignItems: 'center',
            px: {
              xs: 1.5,
              lg: 3,
            },
            pt: {
              xs: 1,
              md: 0,
            },
            gridTemplateColumns: {
              xs: '1fr 1fr',
              md: 'auto 1fr auto',
            },
          })}
        >
          <OriginEtherLogo />
          <RouteLinks />
          <NavButtons />
        </Stack>
      </Box>
    </>
  );
}

const OriginEtherLogo = () => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        img: {
          height: {
            xs: 16,
            md: 24,
          },
        },
      }}
    >
      <img src="/images/origin-ether-logo.svg" alt="Origin logo" />
    </Box>
  );
};

const RouteLinks = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const pathroot = `/${location.pathname.split('/').filter((x) => x)[0] ?? ''}`;
  return (
    <Tabs
      value={pathroot}
      onChange={(_, value) => {
        navigate(value);
      }}
      sx={{
        order: {
          xs: 2,
          md: 0,
        },
        gridColumn: {
          xs: 'span 2',
          md: 'span 1',
        },
        marginBlockStart: {
          xs: 2,
          md: 0,
        },
        '& .MuiTabs-flexContainer': {
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
        },
      }}
    >
      {routes?.[0]?.children?.map((route) => (
        <Tab
          key={route?.path ?? '/'}
          value={route?.path ?? '/'}
          label={intl.formatMessage(route.handle.label)}
        />
      ))}
    </Tabs>
  );
};

const NavButtons = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.5, lg: 2 },
        }}
      >
        <Button
          href="https://oeth.on.fleek.co/"
          target="_blank"
          variant={'nav'}
        >
          {isMd
            ? intl.formatMessage({ defaultMessage: 'IPFS' })
            : intl.formatMessage({ defaultMessage: 'View on IPFS' })}
        </Button>
        <OpenAccountModalButton
          variant="nav"
          hideAddress={isMd}
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
              lg: 2,
              xs: isConnected ? 0.75 : 2,
            },
            paddingY: 0.75,
            minWidth: 36,
            maxWidth: { xs: isConnected ? 36 : 160, lg: 220 },
            fontWeight: 500,
            minHeight: { xs: 36, md: 44 },
          }}
          disconnectedProps={{
            sx: {
              color: 'text.primary',
              '&:hover': {
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                opacity: 1,
              },
              '&:disabled': {
                opacity: 0.5,
                color: 'text.primary',
              },
              background: 'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
            },
          }}
        />
        <AccountPopover
          anchor={accountModalAnchor}
          setAnchor={setAccountModalAnchor}
          balanceTokens={[
            tokens.mainnet.ETH,
            tokens.mainnet.OETH,
            tokens.mainnet.wOETH,
            tokens.mainnet.WETH,
            tokens.mainnet.rETH,
            tokens.mainnet.frxETH,
            tokens.mainnet.sfrxETH,
            tokens.mainnet.stETH,
          ]}
        />
        <ChainSwitcherButton variant="nav" />
        {isConnected && (
          <ActivityButton
            variant="nav"
            onClick={() => {
              trackEvent({ name: 'open_activity' });
            }}
            sx={{
              padding: {
                xs: 0,
              },
            }}
          />
        )}
      </Box>
      <Divider
        sx={{
          display: { xs: 'block', md: 'none' },
          gridColumn: 'span 2',
          gridRowStart: 1,
          borderColor: (theme) => theme.palette.background.paper,
          position: 'relative',
          width: 'calc(100% + 1.5rem)',
          bottom: '-3rem',
          left: '-0.75rem',
        }}
      />
    </>
  );
};
