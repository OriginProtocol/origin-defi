import {
  Box,
  Button,
  Link as MuiLink,
  Tabs,
  Tab,
  SxProps,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  sx?: SxProps;
}

export function TopNav({ sx }: Props) {
  const [value, setValue] = useState(0);
  return (
    <Box
      component="nav"
      sx={{
        py: 2.5,
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr 1fr',
          md: '1fr auto 1fr',
        },
        alignItems: 'center',
        marginInline: 'auto',
        maxWidth: {
          xs: '90vw',
          md: '85vw',
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
              md: theme.typography.pxToRem(24),
            },
            maxWidth: {
              xs: theme.typography.pxToRem(120),
              md: theme.typography.pxToRem(180),
            },
          },
        })}
      >
        <img
          src="https://app.oeth.com/images/origin-ether-logo.svg"
          alt="OETH logo"
        />
      </Box>
      <Box
        sx={{
          order: {
            xs: 2,
            md: 0,
          },
          gridColumn: {
            xs: 'span 2',
            md: 'span 1',
          },
        }}
      >
        <Tabs
          value={value}
          onChange={(_, val) => setValue(val)}
          sx={{
            width: 'fit-content',
            marginBlockStart: {
              xs: 7,
              md: 0,
            },
            marginInline: 'auto',

            '& .MuiTab-root': {
              fontWeight: 'bold',
              fontSize: {
                xs: '0.75rem',
                md: '1rem',
              },
            },
          }}
        >
          <Tab label="Swap" />
          <Tab label="Wrap" />
          <Tab label="History" />
        </Tabs>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          '& > *': {
            fontSize: {
              xs: theme.typography.pxToRem(12),
              md: theme.typography.pxToRem(14),
            },
          },
        })}
      >
        <MuiLink
          href="https://oeth.on.fleek.co/"
          target="_blank"
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 5,
            fontWeight: 'bold',
            paddingBlock: 1,
            paddingInline: 2.5,
          }}
        >
          View on IPS
        </MuiLink>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBlock: 1,
            paddingInline: 2.5,
            borderRadius: 5,
          }}
        >
          Connect
        </Button>
      </Box>
    </Box>
  );
}
