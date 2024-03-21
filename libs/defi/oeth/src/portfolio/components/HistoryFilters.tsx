import { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { HistoryType } from '@origin/defi/shared';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { Dispatch, SetStateAction } from 'react';

const styles = {
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 1.6,
};

const filterOptions = [
  {
    label: defineMessage({ defaultMessage: 'Yield' }),
    value: HistoryType.Yield,
  },
  { label: defineMessage({ defaultMessage: 'Swap' }), value: HistoryType.Swap },
  { label: defineMessage({ defaultMessage: 'Sent' }), value: HistoryType.Sent },
  {
    label: defineMessage({ defaultMessage: 'Received' }),
    value: HistoryType.Received,
  },
];

export type HistoryFiltersProps = {
  filters: HistoryType[];
  setFilters: Dispatch<SetStateAction<HistoryType[]>>;
};

export function HistoryFilters({ filters, setFilters }: HistoryFiltersProps) {
  const intl = useIntl();
  const theme = useTheme();
  const [selected, setSelectedTypes] = useState<HistoryType[]>(filters);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { isConnected } = useAccount();

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: HistoryType,
  ) => {
    setSelectedTypes((prev) => {
      if (e.target.checked) {
        return [...prev, value];
      } else {
        return prev.filter((val) => val !== value);
      }
    });
  };

  const applyDisabled =
    filters.length === selected.length &&
    filters.every((item) => selected.includes(item));
  const clearDisabled = isNilOrEmpty(selected);

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="small"
        sx={{ gap: 0.75 }}
        variant="outlined"
        disabled={!isConnected}
      >
        {intl.formatMessage({ defaultMessage: 'Filters' })}
        <Box
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: (theme) => theme.palette.primary.contrastText,
          }}
        />
        {filters.length}
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root.MuiPopover-paper': {
            boxSizing: 'border-box',
            background: 'background-paper',
            maxWidth: '16.5rem',
            width: '100%',
            borderRadius: 2,
            [theme.breakpoints.down('md')]: {
              left: '0 !important',
              right: 0,
              marginInline: 'auto',
            },
          },
        }}
      >
        <Typography sx={{ padding: 2 }}>
          {intl.formatMessage({ defaultMessage: 'Filters' })}
        </Typography>
        <Divider sx={{ marginBlockEnd: 2 }} />
        {filterOptions.map((filter) => (
          <Stack
            key={filter.value}
            direction="row"
            alignItems="center"
            sx={{
              pr: 2,
              ...styles,
              ':hover': {
                background: (theme) => theme.palette.grey[700],
              },
            }}
          >
            <FormControlLabel
              label={intl.formatMessage(filter.label)}
              labelPlacement="start"
              value={filter.value}
              control={
                <Checkbox
                  checked={selected.includes(filter.value)}
                  onChange={(e) => handleSelect(e, filter.value)}
                  sx={{
                    ':hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                />
              }
              sx={{ width: 1 }}
              slotProps={{ typography: { width: 1 } }}
            />
          </Stack>
        ))}
        <Divider sx={{ marginBlockStart: 2 }} />
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ padding: 2 }}
          gap={1}
        >
          <Button
            variant="text"
            disabled={clearDisabled}
            sx={styles}
            onClick={() => {
              setAnchorEl(null);
              setFilters([]);
              setSelectedTypes([]);
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Clear all' })}
          </Button>
          <Button
            variant="action"
            disabled={applyDisabled}
            sx={{
              paddingInline: 2,
              paddingBlock: 0.5,
              maxWidth: '4rem',
              ...styles,
            }}
            onClick={() => {
              setAnchorEl(null);
              setFilters(selected);
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Apply' })}
          </Button>
        </Stack>
      </Popover>
    </>
  );
}
