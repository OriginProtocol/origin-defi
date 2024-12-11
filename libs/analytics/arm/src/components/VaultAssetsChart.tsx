import { useCallback, useState } from 'react';

import {
  alpha,
  Box,
  capitalize,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useArmStatesQuery } from '@origin/analytics/shared';
import {
  AreaChart,
  InfoTooltipLabel,
  LimitControls,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { ColorLabel, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { toNumber } from 'dnum';
import { ascend, last, prop, takeLast } from 'ramda';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { CardProps } from '@mui/material';
import type { ArmStatesQuery } from '@origin/analytics/shared';
import type { Serie, ValueLabelProps } from '@origin/shared/components';
import type { YKey } from '@origin/shared/components';

export type VaultAssetsChartProps = {
  height: number;
} & CardProps;

export const VaultAssetsChart = ({
  height,
  ...rest
}: VaultAssetsChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(3);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmStatesQuery(
    {
      limit: 11000,
    },
    {
      select: useCallback(
        (data: ArmStatesQuery) => {
          const mapped = Object.values(
            data?.armStates.reduce(
              (acc, curr) => {
                const dateHour = format(
                  new Date(curr.timestamp),
                  'yyyy-MM-dd HH',
                );

                if (!acc[dateHour]) {
                  const weth = toNumber([
                    BigInt(curr?.assets0 ?? 0),
                    tokens.mainnet.WETH.decimals,
                  ]);
                  const steth = toNumber([
                    BigInt(curr?.assets1 ?? 0),
                    tokens.mainnet.stETH.decimals,
                  ]);
                  const redeemingSteth = toNumber([
                    BigInt(curr?.outstandingAssets1 ?? 0),
                    tokens.mainnet.stETH.decimals,
                  ]);
                  const total = weth + steth + redeemingSteth;

                  const mapped = {
                    timestamp: new Date(curr.timestamp).getTime(),
                    weth,
                    steth,
                    redeemingSteth,
                    total,
                  };
                  acc[dateHour] = mapped;
                }
                return acc;
              },
              {} as Record<
                string,
                {
                  timestamp: number;
                  weth: number;
                  steth: number;
                  redeemingSteth: number;
                  total: number;
                }
              >,
            ),
          ).toSorted(ascend(prop('timestamp')));

          return limit ? takeLast(24 * limit, mapped) : mapped;
        },
        [limit],
      ),
    },
  );

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];
  const series = [
    {
      key: 'weth',
      label: 'WETH',
      lineColor: theme.palette.chart4,
      fillColor: alpha(theme.palette.chart4, 0.6),
    },
    {
      key: 'steth',
      label: 'stETH',
      lineColor: theme.palette.chart5,
      fillColor: alpha(theme.palette.chart5, 0.6),
    },
    {
      key: 'redeemingSteth',
      label: 'Redeeming stETH',
      lineColor: theme.palette.chart1,
      fillColor: alpha(theme.palette.chart1, 0.6),
    },
  ] as YKey<{
    timestamp: number;
    weth: number;
    steth: number;
    redeemingSteth: number;
    total: number;
  }>[];

  return (
    <Card
      {...rest}
      ref={ref}
      sx={[{ height: 1 }, ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    >
      <CardHeader
        title={
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: `The amount of Vault-owned assets currently held in WETH, stETH, or Lido's stETH redemption queue.`,
            })}
          >
            {intl.formatMessage({
              defaultMessage: 'Vault Assets',
            })}
          </InfoTooltipLabel>
        }
      />
      <Divider />
      <CardContent sx={{ minHeight: 150 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {format(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'dd MMM yyyy HH:mm',
              )}
            </LoadingLabel>
            <Stack
              direction="row"
              sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1, pt: 1 }}
              useFlexGap
            >
              {series
                .filter((s) => !!s.label)
                .map((s) => (
                  <Stack
                    key={s.key}
                    direction="row"
                    spacing={1}
                    sx={{ minWidth: 260, alignItems: 'center' }}
                  >
                    <Box
                      sx={{
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        background: Array.isArray(s.lineColor)
                          ? `linear-gradient(90deg, ${s?.lineColor?.[0] ?? theme.palette.chart1}, ${s?.lineColor?.[1] ?? s?.lineColor?.[0] ?? theme.palette.chart2});`
                          : s.lineColor,
                      }}
                    />
                    <Typography
                      variant="caption1"
                      color="text.secondary"
                      sx={{ fontWeight: 'medimum' }}
                    >
                      {s?.label ?? 'Serie'}
                    </Typography>
                    <LoadingLabel isLoading={isLoading} color="text.secondary">
                      {intl.formatNumber((activeItem?.[s.key] as number) ?? 0, {
                        notation: 'compact',
                        minimumFractionDigits: 2,
                      })}
                    </LoadingLabel>
                    <Typography
                      variant="caption1"
                      color="text.secondary"
                      sx={{ fontWeight: 'medimum' }}
                    >
                      •
                    </Typography>
                    <LoadingLabel isLoading={isLoading} color="text.secondary">
                      {intl.formatNumber(
                        activeItem?.total === 0
                          ? 0
                          : (activeItem?.[s.key] as number) /
                              (activeItem?.total as number),
                        { style: 'percent', maximumFractionDigits: 2 },
                      )}
                    </LoadingLabel>
                  </Stack>
                ))}
            </Stack>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} span="week" />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ height }} />
      ) : (
        <AreaChart
          width={width}
          height={height}
          serie={data ?? []}
          xKey="timestamp"
          yKeys={series}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          curveType="step"
          Tooltip={ChartTooltip}
          tickYFormat={(value) =>
            intl.formatNumber(Number(value), {
              maximumFractionDigits: 2,
            })
          }
        />
      )}
    </Card>
  );
};

export type ChartTooltipProps<ChartData> = {
  series: Serie<ChartData>[] | null;
} & StackProps;

export const ChartTooltip = <ChartData,>({
  series,
  ...rest
}: ChartTooltipProps<ChartData>) => {
  const intl = useIntl();

  if (!series) {
    return null;
  }

  const timestamp = series?.[0]?.data?.[0]?.[series?.[0]?.xKey] as number;

  return (
    <Stack
      {...rest}
      useFlexGap
      sx={[
        {
          backgroundColor: 'background.default',
          p: 1,
          border: '1px solid',
          borderColor: 'common.white',
          borderRadius: 3,
          gap: 0.5,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {timestamp && (
        <Typography variant="caption1" color="text.secondary" gutterBottom>
          {format(new Date(timestamp), 'dd MMM yyyy HH:mm')}
        </Typography>
      )}
      {series.map((s, i) => (
        <ValueLabel
          key={`tooltip-serie-${i}`}
          label={
            <ColorLabel
              label={s?.label ?? capitalize(s.yKey as string) ?? 'Serie'}
              color={s.color}
              labelProps={valueLabelProps.labelProps}
            />
          }
          value={intl.formatNumber(s.data?.[0]?.[s.yKey] as number, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {...valueLabelProps}
        />
      ))}
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
