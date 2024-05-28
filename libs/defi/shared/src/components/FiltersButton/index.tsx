import { useState } from 'react';

import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { FaFilterRegular } from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { ButtonProps } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import type { MessageDescriptor } from 'react-intl';

export type FiltersButtonProps<FilterValue extends string> = {
  filters: FilterValue[];
  setFilters: Dispatch<SetStateAction<FilterValue[]>>;
  filterOptions: { label: MessageDescriptor; value: FilterValue }[];
} & Omit<ButtonProps, 'onClick'>;

export const FiltersButton = <FilterValue extends string>({
  filters,
  setFilters,
  filterOptions,
  ...rest
}: FiltersButtonProps<FilterValue>) => {
  const intl = useIntl();
  const [selected, setSelectedTypes] = useState<FilterValue[]>(filters);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { isConnected } = useAccount();

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: FilterValue,
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
        size="small"
        variant="outlined"
        color="secondary"
        disabled={!isConnected}
        {...rest}
        sx={{ gap: 0.75, ...rest?.sx }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <FaFilterRegular />
        {intl.formatMessage({ defaultMessage: 'Filters' })}&nbsp;(
        {filters.length})
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'background.highlight',
              width: 300,
              borderRadius: 4,
              mt: 1,
            },
          },
        }}
      >
        <Stack p={3}>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Filters' })}
          </Typography>
        </Stack>
        <Divider />
        <Stack p={3}>
          {filterOptions.map((filter) => (
            <FormControlLabel
              key={filter.value}
              label={intl.formatMessage(filter.label)}
              labelPlacement="start"
              value={filter.value}
              control={
                <Checkbox
                  checked={selected.includes(filter.value)}
                  onChange={(e) => handleSelect(e, filter.value)}
                  sx={{ p: 0 }}
                />
              }
              slotProps={{ typography: { width: 1 } }}
              sx={{ mx: 0, my: 1 }}
            />
          ))}
          <Stack direction="row" justifyContent="flex-end" pt={2} spacing={1.5}>
            <Button
              variant="text"
              color="secondary"
              disabled={clearDisabled}
              onClick={() => {
                setAnchorEl(null);
                setFilters([]);
                setSelectedTypes([]);
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Clear all' })}
            </Button>
            <Button
              disabled={applyDisabled}
              onClick={() => {
                setAnchorEl(null);
                setFilters(selected);
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Apply' })}
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};
