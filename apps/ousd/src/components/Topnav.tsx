import { useState } from 'react';

import {
  alpha,
  Box,
  Divider,
  Link as MuiLink,
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
  OpenAccountModalButton,
} from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { routes } from '../routes';

import type { BoxProps } from '@mui/material';

export function Topnav(props: BoxProps) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected } = useAccount();
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Box
        sx={{
          height: (theme) => ({
            xs: '112px',
            md: `${theme.mixins.toolbar.height}px`,
          }),
        }}
      />
      <Box
        component="nav"
        {...props}
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          width: 1,
          zIndex: theme.zIndex.appBar,
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: 'blur(15px)',
          height: {
            xs: '112px',
            md: `${theme.mixins.toolbar.height}px`,
          },
          display: 'grid',
          borderBottom: {
            xs: 'none',
            md: `1px solid ${theme.palette.background.paper}`,
          },
          columnGap: { xs: 1, md: 10 },
          rowGap: { xs: 0, md: 10 },
          alignItems: 'center',
          px: {
            xs: 1.5,
            md: 3,
          },
          pt: {
            xs: 1.5,
            md: 0,
          },
          gridTemplateColumns: {
            xs: '1fr 1fr',
            md: 'auto 1fr auto',
          },
        })}
      >
        <Box
          component={Link}
          to="/"
          sx={(theme) => ({
            '& img': {
              maxHeight: {
                xs: '1rem',
                md: '1.5rem',
              },
              maxWidth: {
                xs: theme.typography.pxToRem(100),
                sm: theme.typography.pxToRem(120),
                md: theme.typography.pxToRem(180),
              },
            },
          })}
        >
          <img src="/images/origin-dollar-logo.svg" alt="Origin logo" />
        </Box>
        <Tabs
          value={location.pathname}
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
          {routes[0].children.map((route) => (
            <Tab
              key={route?.path ?? '/'}
              value={route?.path ?? '/'}
              label={intl.formatMessage(route.handle.label)}
            />
          ))}
        </Tabs>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: { xs: 1, md: 2 },
          }}
        >
          <MuiLink
            href="https://oeth.on.fleek.co/"
            target="_blank"
            noWrap
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 500,
              minHeight: { xs: 36, md: 44 },
              background: `linear-gradient(0deg, ${alpha(
                theme.palette.common.white,
                0.05,
              )} 0%, ${alpha(theme.palette.common.white, 0.05)} 100%), ${
                theme.palette.background.paper
              };`,
              '&:hover': {
                background: (theme) => theme.palette.background.paper,
              },
            }}
          >
            {isMd
              ? intl.formatMessage({ defaultMessage: 'IPFS' })
              : intl.formatMessage({ defaultMessage: 'View on IPFS' })}
          </MuiLink>
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
              fontWeight: 500,
              minHeight: { xs: 36, md: 44 },
            }}
          />
          <AccountPopover
            anchor={accountModalAnchor}
            setAnchor={setAccountModalAnchor}
            balanceTokens={[
              tokens.mainnet.OUSD,
              tokens.mainnet.USDT,
              tokens.mainnet.DAI,
              tokens.mainnet.USDC,
            ]}
          />
          <ActivityButton
            onClick={() => {
              trackEvent({ name: 'open_activity' });
            }}
            sx={{
              width: { xs: 36, md: 44 },
              height: { xs: 36, md: 44 },
              padding: {
                xs: 0.75,
                md: 1,
              },
            }}
          />
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
      </Box>
    </>
  );
}
