import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export function APY() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelect(days: number) {
    handleClose();
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ dense: true }}
      >
        <MenuItem divider>7 days trailing</MenuItem>
        <MenuItem>30 days trailing</MenuItem>
      </Menu>
      <Card sx={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
        <CardHeader title="APY"></CardHeader>
        <CardContent
          sx={{
            display: 'grid',
            alignContent: 'center',
            flex: 1,
            paddingTop: 0,
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <Box>
            <Typography color="primary">
              7 day trailing
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Box
                  component={'img'}
                  src={`https://app.oeth.com/images/downarrow.svg`}
                  sx={{
                    transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: (theme) =>
                      theme.transitions.create(['transform']),
                  }}
                />
              </IconButton>
            </Typography>
            <Typography
              sx={{
                background: (theme) => theme.palette.background.gradient2,
                fontSize: (theme) => theme.typography.pxToRem(32),
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              7%
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
