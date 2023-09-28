import { useState } from 'react';

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { defineMessage, useIntl } from 'react-intl';

import { useApiesQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';

const trailingOptions = [
  { label: defineMessage({ defaultMessage: '30 days trailing' }), value: 30 },
  { label: defineMessage({ defaultMessage: '7 days trailing' }), value: 7 },
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
    <Paper>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={(theme) => theme.spacing(2, 3)}
      >
        {apyLoading ? (
          <Skeleton width={100} height={40} />
        ) : (
          <Typography
            fontSize={32}
            fontWeight={700}
            fontFamily="Sailec"
            lineHeight="40px"
          >
            {intl.formatNumber(
              trailing.value === 30 ? apy.apy30DayAvg : apy.apy7DayAvg,
              { minimumFractionDigits: 2, maximumFractionDigits: 2 },
            )}
            %
          </Typography>
        )}

        <Button
          color="secondary"
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            borderRadius: 1,
            color: 'text.secondary',
            backgroundColor: 'grey.700',
            img: { marginLeft: 0.75 },
          }}
        >
          {intl.formatMessage(trailing.label)}
          <Box component="img" src={`/images/downarrow.png`} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
          MenuListProps={{ dense: true }}
        >
          {trailingOptions.map((t) => (
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
    </Paper>
  );
};
