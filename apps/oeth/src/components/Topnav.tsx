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
import { OpenAccountModalButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { BoxProps } from '@mui/material';

export function Topnav(props: BoxProps) {
  const theme = useTheme();
  const intl = useIntl();
  const [value, setValue] = useState(0);

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
        onClick={() => setValue(0)}
      >
        <img
          src="https://app.oeth.com/images/origin-ether-logo.svg"
          alt="Origin logo"
        />
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
        {[
          intl.formatMessage({ defaultMessage: 'Swap' }),
          intl.formatMessage({ defaultMessage: 'Wrap' }),
          intl.formatMessage({ defaultMessage: 'History' }),
        ].map((tab) => (
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
          href="https://oeth.on.fleek.co/"
          target="_blank"
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 25,
            paddingBlock: 1,
            color: 'primary.contrastText',
            boxShadow: (theme) => theme.shadows['24'],
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
        <OpenAccountModalButton />
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
