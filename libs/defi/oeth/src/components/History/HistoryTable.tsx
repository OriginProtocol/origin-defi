import { useEffect, useMemo, useRef } from 'react';

import { Box, Stack } from '@mui/material';
import { DataTable, LinkIcon, quantityFormat } from '@origin/shared/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useIntl } from 'react-intl';

import type { DataTableRef } from '@origin/shared/components';
import type { ColumnFilter } from '@tanstack/react-table';

type Filter = 'swap' | 'yield' | 'received' | 'sent';

export interface HistoryRow {
  date: Date;
  type: Filter;
  change: number;
  balance: number;
  link: string;
  [key: string]: unknown;
}

interface Props {
  rows: HistoryRow[];
  isLoading: boolean;
  filter: ColumnFilter;
}

const columnHelper = createColumnHelper<HistoryRow>();

export function HistoryTable({ rows, filter, isLoading }: Props) {
  const intl = useIntl();
  const ref = useRef<DataTableRef>(null);

  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        cell: (info) => intl.formatDate(info.getValue()),
        header: intl.formatMessage({ defaultMessage: 'Date' }),
      }),
      columnHelper.accessor('type', {
        id: 'type',
        cell: (info) => info.getValue(),
        header: intl.formatMessage({ defaultMessage: 'Type' }),
        enableColumnFilter: true,
        filterFn: (row, _, value) => {
          if (!value.value.length) return true;
          return value.value.includes(row.original.type);
        },
      }),
      columnHelper.accessor('change', {
        cell: (info) => intl.formatNumber(info.getValue(), quantityFormat),
        header: intl.formatMessage({ defaultMessage: 'Change' }),
      }),
      columnHelper.accessor('balance', {
        cell: (info) => (
          <Stack
            direction="row"
            alignItems="center"
            gap={0.5}
            sx={{ textAlign: 'right' }}
          >
            <Box
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '75%',
              }}
              component="span"
            >
              {intl.formatNumber(info.getValue(), quantityFormat)}
            </Box>

            <LinkIcon url={info.row.original.link} />
          </Stack>
        ),
        header: intl.formatMessage({ defaultMessage: 'OETH Balance' }),
      }),
    ],
    [intl],
  );

  useEffect(() => {
    ref?.current?.setFilter(filter, 'type');
  }, [filter]);

  return (
    <DataTable
      ref={ref}
      rows={rows}
      // @ts-expect-error typescript doesn't like my generic prop for whatever reason
      columns={columns}
      pageCount={rows.length / 3}
      isLoading={isLoading}
    />
  );
}
