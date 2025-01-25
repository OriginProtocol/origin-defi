import { Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CurrencyControls, LimitControls } from '@origin/shared/components';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type {
  StackProps,
  TextFieldProps,
  TextFieldVariants,
  Theme,
} from '@mui/material';

export const Controls = (props: StackProps) => {
  const intl = useIntl();
  const {
    currency,
    limit,
    from,
    minFrom,
    to,
    handleSetLimit,
    handleSetCurrency,
    handleSetFrom,
    handleSetTo,
  } = useHomeView();

  return (
    <Stack
      direction="row"
      useFlexGap
      {...props}
      sx={[
        {
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
      ]}
    >
      <CurrencyControls currency={currency} setCurrency={handleSetCurrency} />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <DatePicker
            value={from ? dayjs.utc(from) : null}
            onChange={(d) => {
              if (d?.isValid()) {
                handleSetFrom(d);
              }
            }}
            disableFuture
            timezone="UTC"
            formatDensity="dense"
            minDate={dayjs.utc(minFrom)}
            maxDate={dayjs.utc(to)}
            slotProps={{
              textField: textFieldProps(
                intl.formatMessage({ defaultMessage: 'Start date' }),
              ),
              openPickerButton: openPickerButtonProps,
            }}
          />
          <Typography>-</Typography>
          <DatePicker
            value={to ? dayjs.utc(to) : null}
            onChange={(d) => {
              if (d?.isValid()) {
                handleSetTo(d);
              }
            }}
            disableFuture
            formatDensity="dense"
            timezone="UTC"
            minDate={dayjs.utc(from ?? minFrom)}
            maxDate={dayjs.utc()}
            slotProps={{
              textField: textFieldProps(
                intl.formatMessage({ defaultMessage: 'End date' }),
              ),
              openPickerButton: openPickerButtonProps,
            }}
          />
        </Stack>
        <LimitControls limit={limit} setLimit={handleSetLimit} />
      </Stack>
    </Stack>
  );
};

const textFieldProps = (placeholder: string) =>
  ({
    variant: 'outlined' as TextFieldVariants,
    placeholder,
    sx: (theme) => ({
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      '.MuiInputBase-input': {
        fontSize: 11,
        pl: 1,
        py: 1,
        pr: 0,
        width: 75,
        '::placeholder': {
          fontSize: 11,
          fontWeight: 'normal',
          color: theme.palette.text.secondary,
        },
      },
    }),
  }) as TextFieldProps;

const openPickerButtonProps = {
  sx: (theme: Theme) => ({
    p: 0,
    m: 0,
    color: theme.palette.text.secondary,
    svg: {
      width: 16,
      height: 16,
    },
  }),
};
