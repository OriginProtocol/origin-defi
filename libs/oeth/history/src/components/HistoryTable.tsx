import { useMemo, useState } from 'react';

import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { LinkIcon } from '@origin/shared/components';
import { isNilOrEmpty, quantityFormat } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { addMonths, subMonths } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatEther } from 'viem';

import { HistoryFilterButton } from './HistoryButton';
import { TransactionIcon } from './TransactionIcon';

import type { StackProps } from '@mui/material';
import type { HistoryType } from '@origin/oeth/shared';
import type { ExpandedState } from '@tanstack/react-table';

import type { DailyHistory } from '../types';

interface Props {
  rows: DailyHistory[];
  isLoading: boolean;
  date: Date;
  setDate: (date: Date) => void;
}

const columnHelper = createColumnHelper<DailyHistory>();

export function HistoryTable({ rows, date, setDate }: Props) {
  const intl = useIntl();
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns = useMemo(
    () => [
      columnHelper.accessor('type', {
        cell: (info) => (
          <HistoryTypeCell
            type={info.getValue()}
            timestamp={info.row.original.timestamp}
            sx={{ pl: info.row.depth * 2 }}
          />
        ),
        header: intl.formatMessage({ defaultMessage: 'Type' }),
        enableColumnFilter: true,
        filterFn: (row, _, value) => {
          if (!value.value.length) return true;
          return value.value.includes(row.original.type);
        },
      }),
      columnHelper.accessor('value', {
        cell: (info) => (
          <Typography textAlign="end">
            {intl.formatNumber(
              +formatEther(BigInt(info.getValue() ?? '0')),
              quantityFormat,
            )}
          </Typography>
        ),
        header: () => (
          <Typography textAlign="end">
            {intl.formatMessage({ defaultMessage: 'Change' })}
          </Typography>
        ),
      }),
      columnHelper.accessor('balance', {
        cell: (info) => (
          <Typography textAlign="end">
            {intl.formatNumber(
              +formatEther(BigInt(info.getValue() ?? '0')),
              quantityFormat,
            )}
          </Typography>
        ),
        header: () => (
          <Typography textAlign="end">
            {intl.formatMessage({ defaultMessage: 'Balance' })}
          </Typography>
        ),
      }),
      columnHelper.display({
        id: 'link',
        cell: (info) =>
          !isNilOrEmpty(info.row.original.txHash) && (
            <LinkIcon
              size={10}
              url={`https://etherscan.io/tx/${info.row.original.txHash}`}
            />
          ),
      }),
    ],
    [intl],
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => row?.transactions,
    getExpandedRowModel: getExpandedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // add when we do server side pagination
    // manualPagination: true,
    // add when we do server side pagination
    // onPaginationChange: setPagination
  });

  return (
    <Stack>
      <Table sx={{ '& .MuiTableCell-root': { px: { xs: 2, md: 3 } } }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              sx={{
                '& > *:first-of-type': {
                  width: '50%',
                },
              }}
            >
              {headerGroup.headers.map((header, index) => (
                <TableCell
                  key={header.id}
                  sx={{ py: 3 }}
                  align={index > 0 ? 'center' : 'left'}
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
              onClick={row.getToggleExpandedHandler()}
              sx={{
                ...(row.getCanExpand() && {
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: 'grey.900',
                  },
                }),
                ...(row.getIsExpanded() && {
                  backgroundColor: 'grey.900',
                }),
                ...(row.depth > 0 && {
                  backgroundColor: 'grey.800',
                }),
                '& > *:first-of-type': {
                  width: '50%',
                },
                '& > *:last-of-type': {
                  pl: 0,
                  textAlign: 'end',
                },
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="flex-end"
        gap={1}
        sx={{ px: { xs: 2, md: 3 }, py: 2 }}
      >
        <HistoryFilterButton
          onClick={() => {
            setDate(subMonths(date, 1));
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Previous' })}
        </HistoryFilterButton>
        <Typography fontSize={13} px={2}>
          {intl.formatDate(date, { month: 'short', year: '2-digit' })}
        </Typography>
        <HistoryFilterButton
          onClick={() => {
            setDate(addMonths(date, 1));
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Next' })}
        </HistoryFilterButton>
      </Stack>
    </Stack>
  );
}

type HistoryTypeCellProps = {
  timestamp: string;
  type: HistoryType;
} & StackProps;

function HistoryTypeCell({ timestamp, type, ...rest }: HistoryTypeCellProps) {
  const intl = useIntl();

  return (
    <Stack {...rest} direction="row" alignItems="center" gap={1.5}>
      <TransactionIcon type={type} />
      <Stack>
        <Typography fontWeight="500">{type}</Typography>
        <Typography color="text.secondary" variant="body2">
          {intl.formatDate(new Date(timestamp))}
        </Typography>
      </Stack>
    </Stack>
  );
}
