import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
} from '@mui/material';
import { InfoTooltip, PercentInput } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useSlippage } from '../hooks';

import type { ButtonProps, FormControlProps } from '@mui/material';

const DEFAULT_SLIPPAGE = 0.001;
const WARNING_THRESHOLD = 0.05;

export type SlippageFormControlProps = {
  onChange?: (val: number) => void;
  buttonProps?: ButtonProps;
} & Omit<FormControlProps, 'onChange'>;

export function SlippageFormControl({
  onChange,
  buttonProps,
  ...rest
}: SlippageFormControlProps) {
  const intl = useIntl();
  const { value: slippage, set: setSlippage } = useSlippage();

  const handleSlippageChange = (value: number) => {
    setSlippage(value);
    onChange?.(value);
  };

  return (
    <FormControl variant="standard" {...rest}>
      <InputLabel
        htmlFor="slippage"
        shrink
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pb: 1 }}
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
          onChange={handleSlippageChange}
          fullWidth
          sx={{
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
          {...buttonProps}
          sx={{
            borderRadius: 8,
            fontSize: 14,
            height: '38px',
            ...buttonProps?.sx,
          }}
          fullWidth
          disabled={slippage === DEFAULT_SLIPPAGE}
          onClick={() => {
            handleSlippageChange(DEFAULT_SLIPPAGE);
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
  );
}
