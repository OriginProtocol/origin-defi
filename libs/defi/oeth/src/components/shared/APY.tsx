import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Card } from '@origin/shared/components';
import React from 'react';
import { useIntl } from 'react-intl';

export function APY() {
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ dense: true }}
      >
        <MenuItem divider>
          {intl.formatMessage(
            { defaultMessage: '{days} day trailing' },
            { days: 7 }
          )}
        </MenuItem>
        <MenuItem>
          {intl.formatMessage(
            { defaultMessage: '{days} day trailing' },
            { days: 30 }
          )}
        </MenuItem>
      </Menu>
      <Card
        title="APY"
        sxCardContent={{
          display: 'grid',
          alignItems: 'center',
          height: 'calc(100% - 100px)',
        }}
      >
        <Box>
          <Typography color="primary">
            {intl.formatMessage(
              { defaultMessage: '{days} day trailing' },
              { days: 7 }
            )}
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ marginInlineStart: 0.5 }}
            >
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
            {intl.formatNumber(5.96)}%
          </Typography>
        </Box>
      </Card>
    </>
  );
}
