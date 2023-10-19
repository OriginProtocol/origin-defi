import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Popover,
  Stack,
  useTheme,
} from '@mui/material';
import { InfoTooltip, PercentInput } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { trackEvent } from '../clients';

import type { IconButtonProps } from '@mui/material';
import type { MouseEvent } from 'react';

const DEFAULT_SLIPPAGE = 0.001;
const WARNING_THRESHOLD = 0.05;

const gridStyles = {
  display: 'grid',
  ridTemplateColumns: `1.5fr 1fr`,
  gap: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
};

export type PriceTolerancePopoverProps = {
  buttonProps?: IconButtonProps;
  slippage: number;
  onSlippageChange: (value: number) => void;
};

export function PriceTolerancePopover({
  buttonProps,
  slippage,
  onSlippageChange,
}: PriceTolerancePopoverProps) {
  const theme = useTheme();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget);
    trackEvent({ name: 'open_settings' });
  };

  return (
    <>
      <IconButton onClick={handleClick} {...buttonProps}>
        <img src="/images/settings-icon.svg" alt="settings" />
      </IconButton>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root.MuiPopover-paper': {
            padding: 3,
            boxSizing: 'border-box',
            maxWidth: {
              xs: '90vw',
              md: '16.5rem',
            },
            width: '100%',
            border: '1px solid',
            borderColor: 'grey.700',
            [theme.breakpoints.down('md')]: {
              left: '0 !important',
              right: 0,
              marginInline: 'auto',
            },
          },
        }}
      >
        <Stack justifyContent="center">
          <FormControl variant="standard">
            <InputLabel
              htmlFor="slippage"
              shrink
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {intl.formatMessage({ defaultMessage: 'Max slippage' })}
              <InfoTooltip
                tooltipLabel={intl.formatMessage({
                  defaultMessage:
                    'Your transaction will revert if the price changes unfavorably by more than this percentage.',
                })}
              />
            </InputLabel>
            <Box sx={gridStyles}>
              <Stack direction="row" gap={2}>
                <PercentInput
                  value={slippage}
                  onChange={onSlippageChange}
                  fullWidth
                  sx={{
                    borderColor: (theme) => theme.palette.secondary.main,
                    backgroundColor: (theme) =>
                      alpha(theme.palette.secondary.main, 0.05),
                    paddingInlineEnd: 2,
                    '& .MuiInputBase-input': {
                      textAlign: 'right',
                      '&::placeholder': {
                        color: 'text.primary',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Button
                  variant="action"
                  sx={{
                    borderRadius: 8,
                    fontSize: 14,
                    height: '38px',
                  }}
                  fullWidth
                  disabled={slippage === DEFAULT_SLIPPAGE}
                  onClick={() => {
                    onSlippageChange(DEFAULT_SLIPPAGE);
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'Auto' })}
                </Button>
              </Stack>
            </Box>
            <FormHelperText
              sx={{
                gridColumn: 'span 2',
                mt: 1.25,
                fontSize: 12,
                color: (theme) => theme.palette.warning.main,
                fontWeight: 400,
                fontStyle: 'normal',
                ...(slippage <= WARNING_THRESHOLD && { visibility: 'hidden' }),
              }}
            >
              {intl.formatMessage({
                defaultMessage: 'Your transaction may be frontrun',
              })}
            </FormHelperText>
          </FormControl>
        </Stack>
      </Popover>
    </>
  );
}
