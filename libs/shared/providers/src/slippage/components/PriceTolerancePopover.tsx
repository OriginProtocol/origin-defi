import {
  alpha,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Popover,
  Stack,
  useTheme,
} from '@mui/material';
import { InfoTooltip, PercentInput } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { PopoverProps } from '@mui/material';

const DEFAULT_SLIPPAGE = 0.001;
const WARNING_THRESHOLD = 0.05;

export type PriceTolerancePopoverProps = {
  slippage: number;
  onSlippageChange: (value: number) => void;
} & PopoverProps;

export function PriceTolerancePopover({
  slippage,
  onSlippageChange,
  ...rest
}: PriceTolerancePopoverProps) {
  const theme = useTheme();
  const intl = useIntl();

  return (
    <Popover
      {...rest}
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
    </Popover>
  );
}
