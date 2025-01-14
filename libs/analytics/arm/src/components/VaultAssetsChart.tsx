import { useCallback, useState } from 'react';

import {
  alpha,
  Box,
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
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { toNumber } from 'dnum';
import { ascend, last, prop, takeLast } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ArmStatesQuery } from '@origin/analytics/shared';
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
  const [limit, setLimit] = useState<number | undefined>(7);
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
                const dateHour = formatInTimeZone(
                  toZonedTime(curr.timestamp, 'UTC'),
                  'UTC',
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
                    timestamp: toZonedTime(curr.timestamp, 'UTC').getTime(),
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
              {formatInTimeZone(
                toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
                'UTC',
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
          data={data ?? []}
          xKey="timestamp"
          yKeys={series}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          curveType="step"
          tickYFormat={(value) =>
            intl.formatNumber(Number(value), {
              maximumFractionDigits: 2,
            })
          }
          tooltipLabels={[
            {
              label: (d) =>
                formatInTimeZone(
                  toZonedTime(d?.timestamp ?? Date.now(), 'UTC'),
                  'UTC',
                  'dd MMM yyyy HH:mm',
                ),
            },
            ...series.map((s) => ({
              label: s.label,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value: (d: any) =>
                intl.formatNumber(d?.[s.key] ?? 0, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              color: s.lineColor,
            })),
          ]}
        />
      )}
    </Card>
  );
};
