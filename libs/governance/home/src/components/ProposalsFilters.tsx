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
import { useIntl } from 'react-intl';

import { statusLabels } from '../constants';

import type { OgvProposalState } from '@origin/governance/shared';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type ProposalsFiltersProps = {
  filters: OgvProposalState[];
  setFilters: Dispatch<SetStateAction<OgvProposalState[]>>;
};

const filterOptions = Object.entries(statusLabels).map(([key, value]) => ({
  label: value,
  value: key as OgvProposalState,
}));

const styles = {
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 1.6,
};

export const ProposalsFilters = ({
  filters,
  setFilters,
}: ProposalsFiltersProps) => {
  const [selected, setSelectedTypes] = useState<OgvProposalState[]>(filters);
  const intl = useIntl();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSelect = (
    e: ChangeEvent<HTMLInputElement>,
    value: OgvProposalState,
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
      >
        {intl.formatMessage(
          {
            defaultMessage:
              '{count, plural, =0 {All Proposals} =1 {1 Filter} other {# Filters}}',
          },
          { count: filters.length },
        )}
        &nbsp;
        <Box
          component="img"
          src="images/icons/chevron-down-regular.svg"
          width={10}
        />
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
};
