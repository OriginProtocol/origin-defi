import { useRef, useState } from 'react';

import {
  Button,
  ButtonGroup,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ClickAwayMenu } from '@origin/shared/components';
import { FaBarsRegular } from '@origin/shared/icons';
import { not } from 'ramda';
import { useIntl } from 'react-intl';

export type LimitControlsProps = {
  limit: number | undefined;
  setLimit: (value: number | undefined) => void;
  disableAll?: boolean;
};

export const LimitControls = ({
  limit,
  setLimit,
  disableAll,
  ...rest
}: LimitControlsProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  const options = [
    { value: 7, label: intl.formatMessage({ defaultMessage: '1W' }) },
    { value: 30, label: intl.formatMessage({ defaultMessage: '1M' }) },
    {
      value: Math.floor((365 / 12) * 6),
      label: intl.formatMessage({ defaultMessage: '6M' }),
    },
    {
      value: 365,
      label: intl.formatMessage({ defaultMessage: '1YR' }),
    },
    ...(disableAll
      ? []
      : [
          {
            value: undefined,
            label: intl.formatMessage({ defaultMessage: 'All' }),
          },
        ]),
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
            key={o.value}
            selected={o.value === limit}
            onClick={() => {
              setLimit(o.value);
              setOpen(false);
            }}
            sx={[
              (theme) => ({ typography: theme.typography.body3 }),
              ...(o.value === limit
                ? [{ backgroundColor: 'secondary.main' }]
                : []),
            ]}
          >
            {o.label}
          </MenuItem>
        ))}
      </ClickAwayMenu>
    </>
  ) : (
    <ButtonGroup size="small" variant="outlined" color="secondary" {...rest}>
      {options.map((o) => (
        <Button
          key={o.value ?? 'all'}
          onClick={() => {
            setLimit(o.value);
          }}
          sx={[
            ...(o.value === limit
              ? [{ backgroundColor: 'secondary.main' }]
              : []),
          ]}
        >
          {o.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
