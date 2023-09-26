import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Popover,
  Stack,
  useTheme,
} from '@mui/material';
import { PercentInput } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { useFeeData } from 'wagmi';

import type { IconButtonProps } from '@mui/material';

const DEFAULT_SLIPPAGE = 0.01;
const WARNING_THRESHOLD = 0.05;

const gridStyles = {
  display: 'grid',
  ridTemplateColumns: `1.5fr 1fr`,
  gap: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
};

export type GasPopoverProps = {
  buttonProps?: IconButtonProps;
  slippage: number;
  onSlippageChange: (value: number) => void;
};

export function GasPopover({
  buttonProps,
  slippage,
  onSlippageChange,
}: GasPopoverProps) {
  const theme = useTheme();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data: feeData } = useFeeData({ formatUnits: 'gwei' });

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        data-testid="gas-popover-button"
        {...buttonProps}
      >
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
        <Stack gap={1}>
          <FormControl variant="standard">
            <InputLabel htmlFor="slippage" shrink>
              {intl.formatMessage({ defaultMessage: 'Slippage' })}
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
                  variant="contained"
                  sx={{
                    borderRadius: 20,
                    height: '38px',
                    bgColor:
                      'linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%)',
                    '&:disabled': {
                      opacity: 0.3,
                    },
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
                fontSize: (theme) => theme.typography.pxToRem(12),
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
          <FormControl>
            <InputLabel htmlFor="gas" shrink>
              {intl.formatMessage({ defaultMessage: 'Gas Price' })}
            </InputLabel>
            <Box sx={gridStyles}>
              <InputBase
                id="gas"
                readOnly
                defaultValue={intl.formatNumber(
                  parseFloat(feeData?.formatted.gasPrice ?? '0'),
                  { maximumFractionDigits: 4 },
                )}
                fullWidth
                sx={{
                  borderColor: (theme) => theme.palette.secondary.main,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.secondary.main, 0.05),
                  paddingInlineEnd: 2,
                  '& .MuiInputBase-input': {
                    textAlign: 'right',
                    borderColor: (theme) => theme.palette.secondary.main,
                    '&::placeholder': {
                      color: 'text.primary',
                      opacity: 1,
                    },
                  },
                }}
                endAdornment={
                  <InputAdornment position="end" sx={{ ml: 0 }}>
                    {intl.formatMessage({ defaultMessage: 'GWEI' })}
                  </InputAdornment>
                }
              />
            </Box>
          </FormControl>
        </Stack>
      </Popover>
    </>
  );
}
