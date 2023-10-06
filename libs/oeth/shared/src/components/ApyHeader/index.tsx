import { useState } from 'react';

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { defineMessage, useIntl } from 'react-intl';

import { useApiesQuery } from './queries.generated';

import type { StackProps } from '@mui/material';

const trailingOptions = [
  {
    label: defineMessage({ defaultMessage: '30 Day Trailing APY' }),
    value: 30,
  },
  { label: defineMessage({ defaultMessage: '7 Day Trailing APY' }), value: 7 },
];

export const ApyHeader = (props: StackProps) => {
  const intl = useIntl();
  const [trailing, setTrailing] = useState(trailingOptions[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: apy, isLoading: apyLoading } = useApiesQuery(
    {
      limit: 1,
    },
    {
      select: (data) => data.apies[0],
    },
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.paper"
      px={{ xs: 2, md: 3 }}
      py={{ xs: 1.5, md: 2 }}
      {...props}
    >
      {apyLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <Typography variant="h1">
          {intl.formatNumber(
            trailing.value === 30 ? apy.apy30DayAvg : apy.apy7DayAvg,
            { minimumFractionDigits: 2, maximumFractionDigits: 2 },
          )}
          %
        </Typography>
      )}

      <Button
        color="secondary"
        variant="text"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: 1,
          color: 'text.secondary',
          transform: 'translateX(5px)',
        }}
      >
        {intl.formatMessage(trailing.label)}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: 'grey.600',
            color: 'text.secondary',
            p: 0.2,
            transform: 'translateY(2px)',
            width: 16,
            height: 16,
          }}
        >
          <Box component="img" src="/images/dropdown.svg" />
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{ dense: true }}
      >
        {trailingOptions
          .filter((t) => t.value !== trailing.value)
          .map((t) => (
            <MenuItem
              divider
              key={t.value}
              selected={trailing.value === t.value}
              onClick={() => {
                setTrailing(t);
                setAnchorEl(null);
              }}
            >
              {intl.formatMessage(t.label)}
            </MenuItem>
          ))}
      </Menu>
    </Stack>
  );
};
