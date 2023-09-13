import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import {
  ActionButton,
  CheckboxIcon,
  EmptyCheckbox,
} from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { HistoryFilterButton } from './HistoryButton';

const styles = {
  fontSize: '0.75rem',
  fontWeight: 500,
  lineHeight: '1.25rem',
  color: 'primary.contrastText',
};

interface Props {
  onChange: (values: string[]) => void;
}

export function HistoryFilters({ onChange }: Props) {
  const [selected, setSelectedTypes] = useState<string[]>([]);
  const intl = useIntl();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function selection(e: React.ChangeEvent<HTMLInputElement>, label: string) {
    setSelectedTypes((prev) => {
      if (e.target.checked) {
        return [...prev, label];
      } else {
        return prev.filter((val) => val !== label);
      }
    });
  }

  return (
    <>
      <HistoryFilterButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        Filters
        <Box
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: (theme) => theme.palette.primary.contrastText,
          }}
        ></Box>
        {selected.length}
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
        <Typography color="primary.contrastText" sx={{ padding: 2 }}>
          {intl.formatMessage({ defaultMessage: 'Filters' })}
        </Typography>
        <Divider sx={{ marginBlockEnd: 2 }} />

        {['Yield', 'Swap', 'Sent', 'Received'].map((label) => (
          <Stack
            key={label}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              paddingInline: 2,
              paddingBlock: 0,
              paddingTop: 0,
              paddingBottom: 0,
              ...styles,
              ':hover': {
                background: (theme) => theme.palette.grey[700],
              },
            }}
          >
            <FormLabel htmlFor={label} sx={{ color: 'primary.contrastText' }}>
              {label}
            </FormLabel>

            <Checkbox
              inputProps={{ id: label }}
              checked={selected.includes(label)}
              checkedIcon={<CheckboxIcon />}
              icon={<EmptyCheckbox />}
              sx={{
                '& svg, input': {
                  width: '1.25rem',
                  height: '1.25rem',
                  top: 'auto',
                  left: 'auto',
                },
                '&:hover:has(input:checked) svg': {
                  fill: (theme) => alpha(theme.palette.secondary.main, 0.4),
                  strokeWidth: '1px',
                  stroke: (theme) => theme.palette.primary.main,
                },
                '&:hover:has(input:not(:checked)) svg': {
                  fill: (theme) => alpha(theme.palette.secondary.main, 0.4),
                },
              }}
              onChange={(e) => selection(e, label)}
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
            sx={styles}
            onClick={() => setSelectedTypes([])}
          >
            {intl.formatMessage({ defaultMessage: 'Clear all' })}
          </Button>
          <ActionButton
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
          </ActionButton>
        </Stack>
      </Popover>
    </>
  );
}
