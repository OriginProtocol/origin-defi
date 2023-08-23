import { useState } from 'react';

import {
  alpha,
  Box,
  Divider,
  Link as MuiLink,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { Activity } from './Activity';
import { ConnectButton, ConnectedButton } from './ConnectedButton';
import { styles } from './utils';

import type { SxProps } from '@mui/material';

import type { Connected } from './types';

type Props = {
  tabs: string[];
  logo: string;
  selected: number;
  ipfsLink: string;
  sx?: SxProps;
} & ({ connected: false } | Connected);

export function TopNav({
  sx,
  tabs,
  logo,
  selected,
  ipfsLink,
  connected = false,
  ...rest
}: Props) {
  const theme = useTheme();
  const intl = useIntl();
  const [value, setValue] = useState(selected);
  return (
    <Box
      component="nav"
      sx={{
        display: 'grid',
        borderBlockEnd: { xs: 'none', md: '1px solid' },
        borderColor: 'background.paper',
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
        rowGap: {
          xs: 1.5,
          md: 0,
        },
        ...sx,
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
        onClick={() => setValue(0)}
      >
        <img src={logo} />
      </Box>
      <Tabs
        onChange={(_, value) => setValue(value)}
        sx={{
          order: {
            xs: 2,
            md: 0,
          },
          gridColumn: {
            xs: 'span 2',
            md: 'span 1',
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
        value={value}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            component={Link}
            label={tab}
            to={`/${tab.toLowerCase()}`}
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
          ></Tab>
        ))}
      </Tabs>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: { xs: 1, md: 2 },
          '& > a': {
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
          href={ipfsLink}
          target="_blank"
          sx={{
            ...styles,
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
          }}
        >
          {theme.breakpoints.down('md')
            ? intl.formatMessage({ defaultMessage: 'IPFS' })
            : intl.formatMessage({ defaultMessage: 'View on IPFS' })}
        </MuiLink>
        {connected ? (
          <ConnectedButton
            userId={(rest as Connected).userId}
            walletIcon={(rest as Connected).walletIcon}
            values={(rest as Connected).values}
          />
        ) : (
          <ConnectButton connected={false}>
            {intl.formatMessage({ defaultMessage: 'Connect' })}
          </ConnectButton>
        )}
        {connected ? (
          <Activity transactions={(rest as Connected).transactions} />
        ) : undefined}
      </Box>
      <Divider
        sx={{
          display: { xs: 'block', md: 'none' },
          gridColumn: 'span 2',
          gridRowStart: 1,
          borderColor: 'background.paper',
          position: 'relative',
          bottom: '-4rem',
        }}
      />
    </Box>
  );
}
