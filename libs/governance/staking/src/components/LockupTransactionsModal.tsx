import { useMemo, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { MiddleTruncated } from '@origin/shared/components';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useIntl } from 'react-intl';

import type { ButtonProps, DialogProps } from '@mui/material';

import type { LockupTransaction } from '../types';

const columnHelper = createColumnHelper<LockupTransaction>();

export type LockupTransactionsModalProps = {
  logs: LockupTransaction[];
} & DialogProps;

export const LockupTransactionsModal = ({
  logs,
  ...rest
}: LockupTransactionsModalProps) => {
  const intl = useIntl();

  const columns = useMemo(
    () => [
      columnHelper.accessor('timestamp', {
        header: intl.formatMessage({ defaultMessage: 'Transaction time' }),
        cell: (info) => (
          <Typography>
            {intl.formatDate(info.getValue(), {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hourCycle: 'h23',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        ),
        size: 160,
      }),
      columnHelper.accessor('event', {
        header: intl.formatMessage({ defaultMessage: 'Event' }),
        cell: (info) => (
          <Typography textTransform="capitalize">{info.getValue()}</Typography>
        ),
        size: 80,
      }),
      columnHelper.accessor('hash', {
        header: intl.formatMessage({ defaultMessage: 'Transaction hash' }),
        cell: (info) => (
          <Link
            href={`https://etherscan.io/tx/${info.getValue()}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
            sx={{
              ':hover': {
                background: 'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',

                svg: {
                  fill: 'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                },
              },
            }}
          >
            <MiddleTruncated maxWidth={80}>{info.getValue()}</MiddleTruncated>
            <Box
              component="img"
              src="/images/icons/arrow-up-right-from-square.svg"
              alt="link"
              sx={{
                height: 12,
                width: 12,
              }}
            />
          </Link>
        ),
      }),
    ],
    [intl],
  );

  const table = useReactTable({
    data: logs,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Transaction history' })}
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{ width: header.getSize(), color: 'text.secondary' }}
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
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export type LockupTransactionsButtonProps = {
  logs: LockupTransaction[];
} & ButtonProps;

export const LockupTransactionsButton = ({
  logs,
  ...rest
}: LockupTransactionsButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...rest}
        onClick={(e) => {
          setOpen(true);
          if (rest?.onClick) {
            rest.onClick(e);
          }
        }}
      />
      <LockupTransactionsModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        logs={logs}
      />
    </>
  );
};
