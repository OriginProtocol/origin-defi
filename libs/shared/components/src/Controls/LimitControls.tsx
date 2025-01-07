import { useRef, useState } from 'react';

import {
  Button,
  ButtonGroup,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FaBarsRegular } from '@origin/shared/icons';
import { not } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';

import { ClickAwayMenu } from '../Menus';

export type LimitControlsProps = {
  limit: number | undefined;
  setLimit: (value: number | undefined) => void;
  disableAll?: boolean;
  span?: 'all' | 'week' | '3months';
};

const options = (disableAll: boolean) => ({
  all: [
    {
      value: 7,
      label: defineMessage({ defaultMessage: '1W' }),
      longLabel: defineMessage({ defaultMessage: '1 week' }),
    },
    {
      value: 30,
      label: defineMessage({ defaultMessage: '1M' }),
      longLabel: defineMessage({ defaultMessage: '1 month' }),
    },
    {
      value: 182,
      label: defineMessage({ defaultMessage: '6M' }),
      longLabel: defineMessage({ defaultMessage: '6 months' }),
    },
    {
      value: 365,
      label: defineMessage({ defaultMessage: '1YR' }),
      longLabel: defineMessage({ defaultMessage: '1 year' }),
    },
    ...(disableAll
      ? []
      : [
          {
            value: undefined,
            label: defineMessage({ defaultMessage: 'All' }),
            longLabel: defineMessage({ defaultMessage: 'All' }),
          },
        ]),
  ],
  week: [
    {
      value: 1,
      label: defineMessage({ defaultMessage: '1D' }),
      longLabel: defineMessage({ defaultMessage: '1 day' }),
    },
    {
      value: 3,
      label: defineMessage({ defaultMessage: '3D' }),
      longLabel: defineMessage({ defaultMessage: '3 days' }),
    },
    {
      value: 5,
      label: defineMessage({ defaultMessage: '5D' }),
      longLabel: defineMessage({ defaultMessage: '5 days' }),
    },
    {
      value: 6,
      label: defineMessage({ defaultMessage: '6D' }),
      longLabel: defineMessage({ defaultMessage: '6 days' }),
    },
    {
      value: 7,
      label: defineMessage({ defaultMessage: '1W' }),
      longLabel: defineMessage({ defaultMessage: '1 week' }),
    },
  ],
  '3months': [
    {
      value: 7,
      label: defineMessage({ defaultMessage: '1W' }),
      longLabel: defineMessage({ defaultMessage: '1 week' }),
    },
    {
      value: 30,
      label: defineMessage({ defaultMessage: '1M' }),
      longLabel: defineMessage({ defaultMessage: '1 month' }),
    },
    {
      value: 60,
      label: defineMessage({ defaultMessage: '2M' }),
      longLabel: defineMessage({ defaultMessage: '2 months' }),
    },
    {
      value: 90,
      label: defineMessage({ defaultMessage: '3M' }),
      longLabel: defineMessage({ defaultMessage: '3 months' }),
    },
  ],
});

export const LimitControls = ({
  limit,
  setLimit,
  disableAll = false,
  span = 'all',
}: LimitControlsProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  const opts = options(disableAll)[span];

  return isSm ? (
    <>
      <Button
        variant="outlined"
        color="secondary"
        ref={anchorEl}
        onClick={() => {
          setOpen(not);
        }}
      >
        <FaBarsRegular sx={{ fontSize: 14 }} />
      </Button>
      <ClickAwayMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        paperProps={{ sx: { p: 0 } }}
      >
        {opts.map((o) => (
          <MenuItem
            key={o.value ?? 'all'}
            selected={o.value === limit}
            onClick={() => {
              setLimit(o.value);
              setOpen(false);
            }}
            sx={[
              ...(o.value === limit
                ? [{ backgroundColor: 'action.selected' }]
                : []),
            ]}
          >
            {intl.formatMessage(o.longLabel)}
          </MenuItem>
        ))}
      </ClickAwayMenu>
    </>
  ) : (
    <ButtonGroup size="small" variant="outlined" color="secondary">
      {opts.map((o) => (
        <Button
          key={o.value ?? 'all'}
          onClick={() => {
            setLimit(o.value);
          }}
          sx={[
            ...(o.value === limit
              ? [{ backgroundColor: 'action.selected' }]
              : []),
          ]}
        >
          {intl.formatMessage(o.label)}
        </Button>
      ))}
    </ButtonGroup>
  );
};
