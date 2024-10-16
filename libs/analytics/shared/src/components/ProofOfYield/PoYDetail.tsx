import { useCallback, useMemo } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ExternalLink,
  LoadingLabel,
  Spinner,
  TablePagination,
  ValueLabel,
} from '@origin/shared/components';
import { supportedChains } from '@origin/shared/constants';
import { FaArrowLeftRegular, FaArrowRightRegular } from '@origin/shared/icons';
import { middleTruncate, ZERO_ADDRESS } from '@origin/shared/utils';
import { keepPreviousData } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { millisecondsInHour } from 'date-fns/constants';
import { formatInTimeZone } from 'date-fns-tz';
import { sub, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { oTokenConfig } from '../../constants';
import { OTokenDailyStatOrderByInput } from '../../generated/graphql';
import {
  useOTokenDailyStatByIdQuery,
  useOTokenRebasesQuery,
  useOTokenStatsQuery,
} from '../../queries';
import { dailyStatMapper } from '../../utils';
import { useLayout } from '../Layout';

import type { CardProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';
import type { Hex } from 'viem';

import type { OTokenDailyStatByIdQuery } from '../../queries';

export type PoYDetailProps = { token: Token; from?: string } & StackProps;

const columnHelper = createColumnHelper<{
  timestamp: number;
  blocknumber: number;
  amount: number;
  txHash: Hex;
  fees: number;
}>();

export const PoYDetail = ({ token, from, ...rest }: PoYDetailProps) => {
  const intl = useIntl();
  const params = useParams();
  const [{ isDrawerOpen }] = useLayout();
  const { data: dailyStat, isLoading: isDailyStatLoading } =
    useOTokenDailyStatByIdQuery(
      { id: params?.id ?? '' },
      {
        enabled: !!params?.id,
        placeholderData: keepPreviousData,
        select: useCallback(
          (data: OTokenDailyStatByIdQuery) =>
            dailyStatMapper(data?.oTokenDailyStatById, token),
          [token],
        ),
      },
    );
  const morning = new Date(dailyStat?.timestamp ?? 0);
  morning.setUTCHours(0, 0, 0, 0);
  const evening = new Date(dailyStat?.timestamp ?? 0);
  evening.setUTCHours(23, 59, 59, 999);

  const { data: rebases, isLoading: isRebasesLoading } = useOTokenRebasesQuery(
    {
      token: token.address ?? ZERO_ADDRESS,
      chainId: token.chainId,
      from: morning.toISOString(),
      to: evening.toISOString(),
    },
    {
      enabled: !!params.id,
      placeholderData: keepPreviousData,
      select: (data) =>
        data?.oTokenRebases?.map((d) => {
          const fees = [BigInt(d?.feeETH ?? 0), token.decimals] as Dnum;
          const amount = sub([BigInt(d?.yieldETH ?? 0), token.decimals], fees);

          return {
            timestamp: new Date(d.timestamp).getTime(),
            blocknumber: d.blockNumber,
            amount: toNumber(amount, {
              digits: token.decimals,
              decimalsRounding: 'ROUND_DOWN',
            }),
            txHash: d.txHash as Hex,
            fees: toNumber(fees, {
              digits: token.decimals,
              decimalsRounding: 'ROUND_DOWN',
            }),
          };
        }) ?? [],
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('timestamp', {
        cell: (info) =>
          formatInTimeZone(
            new Date(info.getValue()),
            'UTC',
            'dd MMM yyyy HH:mm',
          ),
        header: intl.formatMessage({ defaultMessage: 'Date' }),
        size: 200,
      }),
      columnHelper.accessor('amount', {
        cell: (info) =>
          intl.formatNumber(info.getValue(), { maximumFractionDigits: 4 }),
        header: intl.formatMessage({ defaultMessage: 'Amount' }),
        size: 100,
      }),
      columnHelper.accessor('fees', {
        cell: (info) =>
          intl.formatNumber(info.getValue(), { maximumFractionDigits: 4 }),
        header: intl.formatMessage({ defaultMessage: 'Fees' }),
        size: 100,
      }),
      columnHelper.accessor('txHash', {
        cell: (info) => (
          <ExternalLink
            href={`${supportedChains[token.chainId].blockExplorers.default.url}/tx/${info.getValue()}`}
            noWrap
          >
            {middleTruncate(info.getValue())}
          </ExternalLink>
        ),

        header: intl.formatMessage({ defaultMessage: 'Transaction' }),
        size: 100,
      }),
    ],
    [intl, token.chainId],
  );

  const table = useReactTable({
    data: rebases ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
  });

  return (
    <Stack {...rest}>
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <Card>
            <CardContent>
              <Controls token={token} />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 8, lg: 8 }}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Typography
                    color="text.secondary"
                    sx={{ fontWeight: 'medium' }}
                  >
                    {intl.formatMessage(
                      {
                        defaultMessage: 'Yield distributed: {date}',
                      },
                      {
                        date: formatInTimeZone(
                          new Date(dailyStat?.timestamp ?? 0),
                          'UTC',
                          'dd MMM yyyy',
                        ),
                      },
                    )}
                  </Typography>
                  <Stack direction="row" alignItems="baseline" spacing={1}>
                    <LoadingLabel
                      isLoading={isDailyStatLoading}
                      variant="h6"
                      sWidth={120}
                    >
                      {intl.formatNumber(dailyStat?.yieldETH ?? 0, {
                        maximumFractionDigits: 4,
                      })}
                    </LoadingLabel>
                    <Typography>{token.symbol}</Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-around"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <ValueLabel
                    label={intl.formatMessage({ defaultMessage: 'APY' })}
                    value={intl.formatNumber(dailyStat?.apy ?? 0, {
                      style: 'percent',
                      maximumFractionDigits: 2,
                    })}
                    isLoading={isDailyStatLoading}
                  />
                  <ValueLabel
                    label={intl.formatMessage({
                      defaultMessage: 'Vault value',
                    })}
                    value={intl.formatNumber(dailyStat?.totalSupply ?? 0, {
                      maximumFractionDigits: 1,
                    })}
                    isLoading={isDailyStatLoading}
                  />
                  <ValueLabel
                    label={intl.formatMessage({
                      defaultMessage: 'Fees generated',
                    })}
                    value={intl.formatNumber(dailyStat?.feesETH ?? 0, {
                      maximumFractionDigits: 3,
                      minimumFractionDigits: 3,
                    })}
                    isLoading={isDailyStatLoading}
                  />
                </Stack>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Typography
                    variant="featured3"
                    sx={{ fontWeight: 'bold' }}
                    gutterBottom
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Yield distribution events',
                    })}
                  </Typography>
                  <Typography color="text.secondary">
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          '{symbol} wallet balances increase at least once per day. Anyone can trigger yield distribution at any time. Each time yield is distributed, there is one corresponding transaction on the blockchain.',
                      },
                      { symbol: token.symbol },
                    )}
                  </Typography>
                </Stack>
              </CardContent>
              {isRebasesLoading || isDailyStatLoading ? (
                <Spinner sx={{ width: 1, height: 200 }} />
              ) : (
                <TableContainer sx={{ overflowX: 'auto', minHeight: 200 }}>
                  <Table
                    sx={{
                      '& .MuiTableCell-root': {
                        px: { xs: 2, md: 3 },
                        py: { xs: 1.75, md: 1.5 },
                      },
                    }}
                  >
                    <TableHead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableCell
                              key={header.id}
                              sx={{ width: header.getSize() }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableHead>
                    <TableBody>
                      {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              sx={{ width: cell.column.getSize() }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {table.getPageCount() > 1 && (
                <Stack
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TablePagination
                    table={table}
                    disableScrollToTop
                    buttonsProps={{
                      variant: 'outlined',
                      color: 'secondary',
                      size: 'small',
                    }}
                  />
                </Stack>
              )}
            </Card>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: isDrawerOpen ? 12 : 4, lg: 4 }}>
          <BonusCard
            token={token}
            dailyStat={dailyStat}
            isDailyStatLoading={isDailyStatLoading}
          />
        </Grid2>
        <Grid2 size={12}>
          <Card>
            <CardContent>
              <Stack spacing={1}>
                <Typography
                  variant="featured3"
                  sx={{ fontWeight: 'bold' }}
                  gutterBottom
                >
                  {intl.formatMessage({
                    defaultMessage: 'Dripper',
                  })}
                </Typography>
                <Typography color="text.secondary">
                  {intl.formatMessage({
                    defaultMessage: `When yield is generated, it does not immediately get distributed to users’ wallets. It first goes through the Dripper, which releases the yield steadily over time. Raw yield is often generated at irregular intervals and in unpredictable amounts. The Dripper streams this yield gradually for a smoother and more predictable APY.`,
                  })}
                </Typography>
                <Typography color="text.secondary">
                  {intl.formatMessage({
                    defaultMessage: `Proof of Yield is shown as two distinct categories of information. Above, yield is measured from the perspective of an OETH holder after it leaves the Dripper. Below, yield from various sources is measured for the same time period prior to entering the Dripper.`,
                  })}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

type ControlsProps = { token: Token };

const Controls = ({ token }: ControlsProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];
  const params = useParams();
  const { data: ids, isLoading: isIdsLoading } = useOTokenStatsQuery(
    {
      token: token.address ?? ZERO_ADDRESS,
      chainId: token.chainId,
      from: config?.from,
      orderBy: [OTokenDailyStatOrderByInput.TimestampAsc],
    },
    {
      enabled: !!params.id,
      staleTime: millisecondsInHour,
      select: (data) => {
        if (!data?.oTokenDailyStats)
          return {
            current: null,
            previous: null,
            next: null,
          };

        const idx = data?.oTokenDailyStats?.findIndex(
          (d) => d.id === params.id,
        );

        return {
          current: data?.oTokenDailyStats?.[idx],
          previous: data?.oTokenDailyStats?.[idx - 1],
          next: data?.oTokenDailyStats?.[idx + 1],
        };
      },
    },
  );

  if (!params.id) return null;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button
        component={RouterLink}
        to={`../${ids?.previous?.id}`}
        relative="path"
        disabled={isIdsLoading || !ids?.previous}
        variant="outlined"
        color="secondary"
        size="small"
      >
        <FaArrowLeftRegular />
      </Button>
      <LoadingLabel isLoading={isIdsLoading} variant="caption1">
        {formatInTimeZone(
          new Date(ids?.current?.timestamp ?? 0),
          'UTC',
          'dd MMM yyyy',
        )}
      </LoadingLabel>
      <Button
        component={RouterLink}
        to={`../${ids?.next?.id}`}
        relative="path"
        disabled={isIdsLoading || !ids?.next}
        variant="outlined"
        color="secondary"
        size="small"
      >
        <FaArrowRightRegular />
      </Button>
    </Stack>
  );
};

type BonusCardProps = {
  token: Token;
  dailyStat?: ReturnType<typeof dailyStatMapper>;
  isDailyStatLoading: boolean;
} & CardProps;

const BonusCard = ({
  token,
  dailyStat,
  isDailyStatLoading,
}: BonusCardProps) => {
  const intl = useIntl();

  const rawApr =
    (dailyStat?.circulatingSupply ?? 0) > 0
      ? ((dailyStat?.rebasingSupply ?? 0) /
          (dailyStat?.circulatingSupply ?? 1)) *
        (dailyStat?.apy ?? 0)
      : 0;
  const rawApy = ((1 + rawApr / 365.25 / 100) ** 365.25 - 1) * 100;
  const apyBoost =
    (dailyStat?.rebasingSupply ?? 0) > 0
      ? (dailyStat?.circulatingSupply ?? 0) /
        ((dailyStat?.rebasingSupply ?? 1) * 100)
      : 0;

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Yield Bonus' })}
      />
      <Divider />
      <Stack
        divider={<Divider />}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          m: 2,
        }}
      >
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Raw yield generated',
          })}
          value={intl.formatNumber(rawApy ?? 0, {
            style: 'percent',
            maximumFractionDigits: 2,
          })}
          isLoading={isDailyStatLoading}
          {...valueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Circulating supply / yield-earning supply',
          })}
          value={intl.formatMessage(
            {
              defaultMessage: 'x {value} Boost',
            },
            {
              value: intl.formatNumber(apyBoost * 100, {
                maximumFractionDigits: 2,
              }),
            },
          )}
          isLoading={isDailyStatLoading}
          {...valueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Actual yield distributed',
          })}
          value={intl.formatMessage(
            {
              defaultMessage: '= {value} APY',
            },
            {
              value: intl.formatNumber(dailyStat?.apy ?? 0, {
                style: 'percent',
                maximumFractionDigits: 2,
              }),
            },
          )}
          isLoading={isDailyStatLoading}
          {...valueLabelProps}
        />
      </Stack>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-around"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Rebasing',
          })}
          value={intl.formatNumber(dailyStat?.rebasingSupply ?? 0, {
            maximumFractionDigits: 3,
          })}
          labelInfoTooltip={intl.formatMessage(
            {
              defaultMessage: 'Amount of {symbol} that earns yield',
            },
            { symbol: token.symbol },
          )}
          isLoading={isDailyStatLoading}
          {...downValueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Non-rebasing',
          })}
          value={intl.formatNumber(dailyStat?.nonRebasingSupply ?? 0, {
            maximumFractionDigits: 3,
          })}
          labelInfoTooltip={intl.formatMessage(
            {
              defaultMessage: 'Amount of {symbol} that gives up yield',
            },
            { symbol: token.symbol },
          )}
          isLoading={isDailyStatLoading}
          {...downValueLabelProps}
        />
      </Stack>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  sx: {
    py: 1,
  },
  labelProps: {
    variant: 'body3',
    sx: {
      width: 0.5,
      fontWeight: 'medium',
      textAlign: 'right',
      textWrap: 'balance',
    },
  },
  valueProps: {
    variant: 'body2',
    sx: {
      width: 0.5,
      fontWeight: 'medium',
      textAlign: 'left',
    },
  },
};

const downValueLabelProps: Partial<ValueLabelProps> = {
  sx: {
    px: 1,
    py: 2,
  },
  labelProps: {
    variant: 'body3',
    sx: {
      fontWeight: 'medium',
      textAlign: 'center',
    },
  },
  valueProps: {
    variant: 'body2',
    sx: {
      fontWeight: 'medium',
      textAlign: 'left',
    },
  },
};
