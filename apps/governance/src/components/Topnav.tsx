import { useState } from 'react';

import {
  alpha,
  Box,
  Divider,
  Popover,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { trackEvent } from '@origin/governance/shared';
import { tokens } from '@origin/shared/contracts';
import {
  AccountPanel,
  ActivityButton,
  BalanceList,
  OpenAccountModalButton,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { routes } from '../routes';

import type { BoxProps } from '@mui/material';

export function Topnav(props: BoxProps) {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected } = useAccount();
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);

  const visibleRoutes = routes?.[0]?.children?.filter(
    (route) => !isNilOrEmpty(route?.handle?.label),
  );
  const selectedTab = visibleRoutes
    ?.map((r) => r.path)
    .includes(location.pathname)
    ? location.pathname
    : '/';

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
          columnGap: { xs: 1, md: 6 },
          rowGap: 0,
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
          sx={{
            img: {
              height: {
                xs: 16,
                md: 24,
              },
            },
          }}
        >
          <img src="/images/origin-defi-logo.svg" alt="Origin logo" />
        </Box>
        <Tabs
          value={selectedTab}
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
          {visibleRoutes?.map((route) => (
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
          <OpenAccountModalButton
            hideAddress={isSm}
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
                md: 2,
                xs: isConnected ? 0.75 : 2,
              },
              paddingY: 0.75,
              minWidth: 36,
              maxWidth: { xs: isConnected ? 36 : 160, sm: 160, lg: 220 },
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
          <Popover
            open={!!accountModalAnchor}
            anchorEl={accountModalAnchor}
            onClose={() => {
              setAccountModalAnchor(null);
            }}
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
            <AccountPanel
              onDisconnect={() => {
                setAccountModalAnchor(null);
              }}
            />
            <Divider />
            <BalanceList
              balanceTokens={[
                tokens.mainnet.ETH,
                tokens.mainnet.OGV,
                tokens.mainnet.veOGV,
              ]}
            />
          </Popover>
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
