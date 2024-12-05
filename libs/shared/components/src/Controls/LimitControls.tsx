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
import { useIntl } from 'react-intl';

import { ClickAwayMenu } from '../Menus';

export type LimitControlsProps = {
  limit: number | undefined;
  setLimit: (value: number | undefined) => void;
  disableAll?: boolean;
  span?: 'all' | 'week';
};

export const LimitControls = ({
  limit,
  setLimit,
  disableAll,
  span = 'all',
}: LimitControlsProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  const options = [
    ...(span === 'week'
      ? [
          {
            value: 1,
            label: intl.formatMessage({ defaultMessage: '1D' }),
            longLabel: intl.formatMessage({ defaultMessage: '1 day' }),
          },
          {
            value: 3,
            label: intl.formatMessage({ defaultMessage: '3D' }),
            longLabel: intl.formatMessage({ defaultMessage: '3 days' }),
          },
          {
            value: 5,
            label: intl.formatMessage({ defaultMessage: '5D' }),
            longLabel: intl.formatMessage({ defaultMessage: '5 days' }),
          },
          {
            value: 6,
            label: intl.formatMessage({ defaultMessage: '6D' }),
            longLabel: intl.formatMessage({ defaultMessage: '6 days' }),
          },
        ]
      : []),
    {
      value: 7,
      label: intl.formatMessage({ defaultMessage: '1W' }),
      longLabel: intl.formatMessage({ defaultMessage: '1 week' }),
    },
    ...(span === 'all'
      ? [
          {
            value: 30,
            label: intl.formatMessage({ defaultMessage: '1M' }),
            longLabel: intl.formatMessage({ defaultMessage: '1 month' }),
          },
          {
            value: 182,
            label: intl.formatMessage({ defaultMessage: '6M' }),
            longLabel: intl.formatMessage({ defaultMessage: '6 months' }),
          },
          {
            value: 365,
            label: intl.formatMessage({ defaultMessage: '1YR' }),
            longLabel: intl.formatMessage({ defaultMessage: '1 year' }),
          },
          ...(disableAll
            ? []
            : [
                {
                  value: undefined,
                  label: intl.formatMessage({ defaultMessage: 'All' }),
                  longLabel: intl.formatMessage({ defaultMessage: 'All' }),
                },
              ]),
        ]
      : []),
  ];

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
        {options.map((o) => (
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
            {o.longLabel}
          </MenuItem>
        ))}
      </ClickAwayMenu>
    </>
  ) : (
    <ButtonGroup size="small" variant="outlined" color="secondary">
      {options.map((o) => (
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
          {o.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
