import { Box, capitalize, Stack, Typography } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { format } from 'date-fns';
import { useIntl } from 'react-intl';

import type { StackProps, TypographyProps } from '@mui/material';
import type {
  ChartColor,
  Serie,
  ValueLabelProps,
} from '@origin/shared/components';

export type ChartTooltipProps<ChartData> = {
  series: Serie<ChartData>[] | null;
  labelProps?: TypographyProps;
} & StackProps;

export const ChartTooltip = <ChartData,>({
  series,
  labelProps,
  ...rest
}: ChartTooltipProps<ChartData>) => {
  const intl = useIntl();

  if (!series) {
    return null;
  }

  return (
    <Stack
      spacing={0.5}
      {...rest}
      sx={[
        { backgroundColor: 'background.default', p: 1 },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Date' })}
        labelProps={labelProps}
        value={format(
          new Date(series[0].data[0]?.[series[0].xKey] as number),
          'dd MMM yyyy',
        )}
        {...valueLabelProps}
      />
      {series.map((s, i) => (
        <ValueLabel
          key={`tooltip-serie-${i}`}
          label={
            <ColorLabel
              label={s?.label ?? capitalize(s.yKey as string) ?? 'Serie'}
              color={s.color}
              labelProps={labelProps}
            />
          }
          value={intl.formatNumber(s.data?.[0]?.[s.yKey] as number, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          })}
          {...valueLabelProps}
        />
      ))}
    </Stack>
  );
};

export type ColorLabelProps = {
  color?: ChartColor;
  label: string;
  labelProps?: TypographyProps;
  colorMarkSize?: number;
} & StackProps;

export const ColorLabel = ({
  color,
  label,
  labelProps,
  colorMarkSize = 15,
  ...rest
}: ColorLabelProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        { alignItems: 'center' },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
      ]}
    >
      {color && (
        <Box
          sx={{
            width: colorMarkSize,
            height: colorMarkSize,
            borderRadius: '50%',
            background:
              Array.isArray(color) && color.length === 2
                ? `linear-gradient(90deg, ${color?.[0]}, ${color[1]});`
                : color,
          }}
        />
      )}
      <Typography {...labelProps}>{label}</Typography>
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  spacing: 1,
  sx: {
    py: 0.25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelProps: {
    variant: 'caption1',
    sx: {
      minWidth: 50,
    },
  },
  valueProps: {
    variant: 'caption1',
    color: 'text.primary',
  },
};
