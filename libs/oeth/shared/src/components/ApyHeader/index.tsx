import { useEffect, useRef, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
} from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { Dropdown } from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';

import { trackEvent } from '../../clients';
import { useApiesQuery } from './queries.generated';

import type { StackProps } from '@mui/material';

const trailingOptions = [
  {
    label: defineMessage({ defaultMessage: '30-Day Trailing APY' }),
    value: 30,
  },
  { label: defineMessage({ defaultMessage: '7-Day Trailing APY' }), value: 7 },
] as const;

export const ApyHeader = (props: StackProps) => {
  const intl = useIntl();
  const once = useRef(false);
  const [trailing, setTrailing] = useState<
    (typeof trailingOptions)[number] | null
  >(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: apy, isLoading: apyLoading } = useApiesQuery(
    {
      limit: 1,
    },
    {
      select: (data) => data.oTokenApies[0],
    },
  );

  useEffect(() => {
    if (!once.current && !apyLoading && apy?.apy30DayAvg && apy?.apy7DayAvg) {
      setTrailing(trailingOptions[apy?.apy30DayAvg > apy?.apy7DayAvg ? 0 : 1]);
      once.current = true;
    }
  }, [apy, apyLoading]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.paper"
      px={{ xs: 2, md: 3 }}
      py={{ xs: 1.5, md: 2 }}
      borderRadius={1}
      {...props}
    >
      <LoadingLabel
        variant="h1"
        sWidth={100}
        isLoading={apyLoading || isNilOrEmpty(trailing)}
      >
        {intl.formatNumber(
          trailing?.value === 30
            ? (apy?.apy30DayAvg ?? 0)
            : (apy?.apy7DayAvg ?? 0),
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'percent',
          },
        )}
      </LoadingLabel>

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
          width: 180,
          ':hover .dd': {
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
          },
        }}
      >
        {apyLoading || !trailing?.label ? (
          <Skeleton height={16} width={100} />
        ) : (
          intl.formatMessage(trailing.label)
        )}
        <Box
          className="dd"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.1),
            color: 'text.secondary',
            p: 0.2,
            width: 20,
            height: 20,
          }}
        >
          <Dropdown />
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
          .filter((t) => t.value !== trailing?.value)
          .map((t) => (
            <MenuItem
              divider
              key={t.value}
              selected={trailing?.value === t.value}
              onClick={() => {
                setTrailing(t);
                setAnchorEl(null);
                trackEvent({
                  name: 'change_apy',
                  change_apy_to: t.value,
                });
              }}
              sx={{ height: 40, width: 172 }}
            >
              {intl.formatMessage(t.label)}
            </MenuItem>
          ))}
      </Menu>
    </Stack>
  );
};
