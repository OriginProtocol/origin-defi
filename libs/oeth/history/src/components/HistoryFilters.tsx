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
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';

import { HistoryFilterButton } from './HistoryButton';

const styles = {
  fontSize: '0.75rem',
  fontWeight: 500,
  lineHeight: '1.25rem',
};

const filterOptions = [
  { label: defineMessage({ defaultMessage: 'Yield' }), value: 'Yield' },
  { label: defineMessage({ defaultMessage: 'Swap' }), value: 'Swap' },
  { label: defineMessage({ defaultMessage: 'Sent' }), value: 'Sent' },
  { label: defineMessage({ defaultMessage: 'Received' }), value: 'Received' },
];

export type HistoryFiltersProps = {
  filters: string[];
  onChange: (values: string[]) => void;
};

export function HistoryFilters({ filters, onChange }: HistoryFiltersProps) {
  const [selected, setSelectedTypes] = useState<string[]>(filters);
  const intl = useIntl();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string,
  ) => {
    setSelectedTypes((prev) => {
      if (e.target.checked) {
        return [...prev, label];
      } else {
        return prev.filter((val) => val !== label);
      }
    });
  };

  const applyDisabled =
    filters.length === selected.length &&
    filters.every((item) => selected.includes(item));
  const clearDisabled = isNilOrEmpty(selected);

  return (
    <>
      <HistoryFilterButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        {intl.formatMessage({ defaultMessage: 'Filters' })}
        <Box
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: (theme) => theme.palette.primary.contrastText,
          }}
        ></Box>
        {filters.length}
      </HistoryFilterButton>
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
              onChange([]);
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
              onChange(selected);
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Apply' })}
          </Button>
        </Stack>
      </Popover>
    </>
  );
}
