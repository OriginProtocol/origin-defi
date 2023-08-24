import { useEffect, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  debounce,
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
import { isNumber } from 'lodash';
import { useIntl } from 'react-intl';

import type { Theme } from '@mui/material';

const defaultPriceTolerance = 0.01;

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: (theme: Theme) => `1.5fr 1fr`,
  gap: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
};

interface Props {
  gasPrice: number;
  onPriceToleranceChange: (value: number) => void;
}

export function GasPopover({ gasPrice, onPriceToleranceChange }: Props) {
  const theme = useTheme();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [priceTolerance, setPriceTolerance] = useState(defaultPriceTolerance);

  useEffect(() => {
    onPriceToleranceChange(priceTolerance);
  }, [priceTolerance, onPriceToleranceChange]);

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        data-testid="gas-popover-button"
      >
        <img
          src="https://app.oeth.com/images/settings-icon.svg"
          alt="settings"
        />
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
        <Stack gap={2} sx={{ '--origin-blue': '#0074F0' }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="tolerance" shrink>
              {intl.formatMessage({ defaultMessage: 'Price tolerance' })}
            </InputLabel>
            <Box sx={gridStyles}>
              <InputBase
                id="tolerance"
                defaultValue={priceTolerance}
                fullWidth
                sx={{
                  borderColor: 'var(--origin-blue)',
                  backgroundColor: alpha('#0074F0', 0.05),
                  paddingInlineEnd: 2,
                  '& .MuiInputBase-input': {
                    textAlign: 'right',
                    color: 'primary.contrastText',

                    '&::placeholder': {
                      color: 'text.primary',
                      opacity: 1,
                    },
                  },
                }}
                onChange={debounce((e) => {
                  if (isNumber(parseFloat(e.target.value))) {
                    setPriceTolerance(Number(e.target.value));
                  }
                }, 300)}
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ color: 'primary.contrastText', ml: 0 }}
                  >
                    {intl.formatMessage({ defaultMessage: '%' })}
                  </InputAdornment>
                }
              />

              <Button
                variant="contained"
                sx={{
                  borderRadius: 20,
                  height: '38px',
                  color: 'primary.contrastText',
                  bgColor:
                    'linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%)',
                  '&:disabled': {
                    opacity: 0.3,
                  },
                }}
                fullWidth
                disabled={priceTolerance === defaultPriceTolerance}
                onClick={() => setPriceTolerance(defaultPriceTolerance)}
              >
                {intl.formatMessage({ defaultMessage: 'Auto' })}
              </Button>
            </Box>
            {priceTolerance > 1 ? (
              <FormHelperText
                sx={{
                  gridColumn: 'span 2',
                  mt: 1.25,
                  fontSize: (theme) => theme.typography.pxToRem(12),
                  color: (theme) => theme.palette.warning.main,
                  fontWeight: 400,
                  fontStyle: 'normal',
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Your transaction may be frontrun',
                })}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="gas" shrink>
              {intl.formatMessage({ defaultMessage: 'Gas Price' })}
            </InputLabel>
            <Box sx={gridStyles}>
              <InputBase
                id="gas"
                defaultValue={gasPrice}
                fullWidth
                sx={{
                  borderColor: 'var(--origin-blue)',
                  backgroundColor: alpha('#0074F0', 0.05),
                  paddingInlineEnd: 2,
                  '& .MuiInputBase-input': {
                    textAlign: 'right',
                    borderColor: 'var(--origin-blue)',
                    color: 'primary.contrastText',
                    '&::placeholder': {
                      color: 'text.primary',
                      opacity: 1,
                    },
                  },
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ color: 'primary.contrastText', ml: 0 }}
                  >
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
