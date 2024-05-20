import { Button, Stack, Typography } from '@mui/material';
import { InfoTooltipLabel, PercentInput } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useSlippage } from '../hooks';

import type { ButtonProps, StackProps } from '@mui/material';

const DEFAULT_SLIPPAGE = 0.001;
const WARNING_THRESHOLD = 0.05;

export type SlippageFormControlProps = {
  onChange?: (val: number) => void;
  buttonProps?: ButtonProps;
} & Omit<StackProps, 'onChange'>;

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
    <Stack {...rest}>
      <InfoTooltipLabel
        tooltipLabel={intl.formatMessage({
          defaultMessage:
            'Your transaction will revert if the price changes unfavorably by more than this percentage.',
        })}
      >
        {intl.formatMessage({ defaultMessage: 'Max slippage' })}
      </InfoTooltipLabel>
      <Stack direction="row" gap={2} pt={1}>
        <PercentInput
          value={slippage}
          onChange={handleSlippageChange}
          fullWidth
          sx={{
            pr: 2,
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
          fullWidth
          disabled={slippage === DEFAULT_SLIPPAGE}
          onClick={() => {
            handleSlippageChange(DEFAULT_SLIPPAGE);
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Auto' })}
        </Button>
      </Stack>
      <Typography
        sx={{
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
      </Typography>
    </Stack>
  );
}
