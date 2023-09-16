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
import { AccountDetails } from '@origin/oeth/shared';
import { OpenAccountModalButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { routes } from '../routes';

import type { BoxProps } from '@mui/material';

export function Topnav(props: BoxProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected } = useAccount();
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);

  return (
    <Box
      component="nav"
      sx={{
        display: 'grid',
        borderBlockEnd: {
          xs: 'none',
          md: '1px solid var(--mui-palette-background-paper)',
        },
        gap: { xs: 1, md: 10 },
        alignItems: 'center',
        backgroundColor: 'divider',
        paddingInline: {
          xs: 1.5,
          md: 3,
        },
        paddingBlockStart: {
          xs: 1.5,
          md: 0,
        },
        gridTemplateColumns: {
          xs: '1fr 1fr',
          md: 'auto 1fr auto',
        },
        ...props?.sx,
      }}
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
        <img src="/images/origin-ether-logo.svg" alt="Origin logo" />
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
            xs: 4,
            md: 0,
          },
          backgroundColor: 'transparent',
          minHeight: 0,
          overflow: 'visible',
          '& .MuiTabs-fixed': {
            overflow: 'visible !important',
          },
          fontSize: {
            xs: '0.875rem',
            md: '1rem',
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
            sx={{
              fontSize: {
                xs: '0.875rem',
                md: '1rem',
              },
              position: 'relative',
              textTransform: 'none',
              boxSizing: 'borderBox',
              paddingInline: 2,
              paddingBlock: { xs: 1, md: 3 },
              lineHeight: '1.6875rem',
              '&:hover:after': {
                content: '""',
                width: '100%',
                height: '2px',
                background: (theme) =>
                  `linear-gradient(90deg, ${alpha(
                    theme.palette.primary.main,
                    0.4,
                  )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%)`,
                position: 'absolute',
                left: 0,
                bottom: 0,
                zIndex: 2,
              },
            }}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          gap: { xs: 1, md: 2 },
          '& > a, & > *': {
            fontSize: {
              xs: '0.75rem',
              md: '1rem',
            },
            color: (theme) => theme.palette.primary.contrastText,
            lineHeight: (theme) => theme.spacing(3),
          },
        }}
      >
        <MuiLink
          href="https://oeth.on.fleek.co/"
          target="_blank"
          sx={{
            borderRadius: 25,
            paddingBlock: 0.75,
            display: 'grid',
            placeContent: 'center',
            paddingInline: {
              md: 3,
              xs: 2,
            },
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            background: ` linear-gradient(0deg, ${alpha(
              theme.palette.common.white,
              0.05,
            )} 0%, ${alpha(theme.palette.common.white, 0.05)} 100%), ${
              theme.palette.background.paper
            };`,
            '&:hover': {
              background: (theme) => theme.palette.background.paper,
              backgroundImage: 'none',
            },
            color: 'primary.contrastText',
            boxSizing: 'border-box',
            lineHeight: '1rem',
          }}
        >
          {isSmall
            ? intl.formatMessage({ defaultMessage: 'IPFS' })
            : intl.formatMessage({ defaultMessage: 'View on IPFS' })}
        </MuiLink>
        <OpenAccountModalButton
          onClick={(e) => {
            if (isConnected) {
              setAccountModalAnchor(e.currentTarget);
            }
          }}
        />
        <AccountDetails
          anchor={accountModalAnchor}
          setAnchor={setAccountModalAnchor}
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
          bottom: '-3.75rem',
          left: '-0.75rem',
        }}
      />
    </Box>
  );
}
