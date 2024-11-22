import { useCallback, useMemo } from 'react';

import {
  Button,
  Card,
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
  InfoTooltipLabel,
  Spinner,
  TablePagination,
} from '@origin/shared/components';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import { oTokenConfig } from '../../constants';
import { useOTokenStatsConnectionQuery } from '../../queries';
import { dailyStatMapper } from '../../utils';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { OTokenStatsConnectionQuery } from '../../queries';

export type PoYListProps = { token: Token; from?: string } & StackProps;

const columnHelper = createColumnHelper<ReturnType<typeof dailyStatMapper>>();

export const PoYList = ({ token, from, ...rest }: PoYListProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const navigate = useNavigate();
  const { data, isLoading } = useOTokenStatsConnectionQuery(
    {
      token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
      chainId: token.chainId,
      first: undefined,
      from: from ?? config?.from,
    },
    {
      select: useCallback(
        (data: OTokenStatsConnectionQuery) =>
          data?.oTokenDailyStatsConnection?.edges?.map((n) =>
            dailyStatMapper(n.node, token),
          ) ?? [],
        [token],
      ),
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        cell: (info) => format(new Date(info.getValue()), 'dd MMM yyyy'),
        header: intl.formatMessage({ defaultMessage: 'Date' }),
        size: 400,
      }),
      columnHelper.accessor('yieldETH', {
        cell: (info) =>
          intl.formatNumber(info.getValue(), {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
          }),
        header: intl.formatMessage({ defaultMessage: 'Yield distributed' }),
        size: 200,
      }),
      columnHelper.accessor('apy', {
        cell: (info) =>
          info.row.index === 0 ? (
            <InfoTooltipLabel
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The daily APY of the current day is usually lower because yield can be dripped multiple times per day',
              })}
            >
              {intl.formatNumber(info.getValue(), {
                style: 'percent',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </InfoTooltipLabel>
          ) : (
            intl.formatNumber(info.getValue(), {
              style: 'percent',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          ),
        header: intl.formatMessage({ defaultMessage: 'Daily APY' }),
        size: 200,
      }),
      columnHelper.accessor('rebasingSupply', {
        cell: (info) =>
          intl.formatNumber(info.getValue(), {
            maximumFractionDigits: 0,
            roundingMode: 'floor',
          }),
        header: intl.formatMessage({ defaultMessage: 'Yield-earning supply' }),
        size: 200,
      }),
      columnHelper.display({
        id: 'link',
        size: 10,
        cell: () => (
          <Button variant="outlined" color="secondary" size="small">
            <FaArrowRightRegular />
          </Button>
        ),
      }),
    ],
    [intl],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Stack spacing={3} {...rest}>
      <Stack spacing={1}>
        <Typography variant="featured2" sx={{ fontWeight: 'bold' }}>
          {intl.formatMessage(
            {
              defaultMessage: `{symbol}'s yield is transparent, real and 100% verifiable on-chain.`,
            },
            { symbol: token.name },
          )}
        </Typography>
        <Typography color="text.secondary">
          {intl.formatMessage(
            {
              defaultMessage: `See the evidence of {symbol}'s consistent performance.`,
            },
            { symbol: token.symbol },
          )}
        </Typography>
      </Stack>
      <Card>
        {isLoading ? (
          <Spinner sx={{ width: 1, height: 400 }} />
        ) : (
          <>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table
                sx={{
                  '& .MuiTableCell-root': {
                    px: { xs: 2, md: 3 },
                    py: { xs: 2, md: 2.5 },
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
                    <TableRow
                      key={row.id}
                      onClick={() => navigate(row?.original?.id ?? '')}
                      sx={{
                        textDecoration: 'none',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' },
                      }}
                    >
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
            {table.getPageCount() > 1 && (
              <Stack
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TablePagination
                  table={table}
                  buttonsProps={{
                    variant: 'outlined',
                    color: 'secondary',
                  }}
                />
              </Stack>
            )}
          </>
        )}
      </Card>
    </Stack>
  );
};
