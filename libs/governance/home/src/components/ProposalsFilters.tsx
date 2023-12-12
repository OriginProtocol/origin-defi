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

import { useProposals } from '../hooks';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import type { ProposalType } from '../types';

export type ProposalsFiltersProps = {
  filters: ProposalType[];
  setFilters: Dispatch<SetStateAction<ProposalType[]>>;
};

const filterOptions = [
  {
    label: defineMessage({ defaultMessage: 'On chain' }),
    value: 'onchain' as ProposalType,
  },
  {
    label: defineMessage({ defaultMessage: 'Snapshot' }),
    value: 'offchain' as ProposalType,
  },
];

const styles = {
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 1.6,
};

export const ProposalsFilters = ({
  filters,
  setFilters,
}: ProposalsFiltersProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data: proposals } = useProposals({
    select: (data) => {
      if (isNilOrEmpty(filters) || isNilOrEmpty(data)) {
        return data;
      }

      return data.filter((p) => filters.includes(p.type));
    },
  });

  const handleSelect = (
    e: ChangeEvent<HTMLInputElement>,
    value: ProposalType,
  ) => {
    if (e.target.checked) {
      setFilters(isNilOrEmpty(value) ? [] : [value]);
    } else {
      setFilters([]);
    }
    setAnchorEl(null);
  };

  const buttonLabel = isNilOrEmpty(filters)
    ? intl.formatMessage({ defaultMessage: 'All proposals' })
    : filters.includes('onchain')
      ? intl.formatMessage({ defaultMessage: 'On chain' })
      : intl.formatMessage({ defaultMessage: ' Snapshot' });

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="small"
        sx={{ gap: 0.75 }}
      >
        {buttonLabel}
        <Box
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: (theme) => theme.palette.primary.contrastText,
          }}
        />
        {proposals?.length ?? '0'}
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
                  checked={filters.includes(filter.value)}
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
        <Divider sx={{ mt: 2 }} />
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ padding: 2 }}
          gap={1}
        >
          <Button
            variant="text"
            disabled={isNilOrEmpty(filters)}
            sx={styles}
            onClick={() => {
              setAnchorEl(null);
              setFilters([]);
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Clear' })}
          </Button>
        </Stack>
      </Popover>
    </>
  );
};
