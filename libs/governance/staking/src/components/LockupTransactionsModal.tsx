import { useMemo, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { CgClose } from 'react-icons/cg';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
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
        header: intl.formatMessage({ defaultMessage: 'Transaction Time' }),
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
        header: intl.formatMessage({ defaultMessage: 'Transaction Hash' }),
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
                color: 'primary.main',
                svg: {
                  color: 'primary.main',
                },
              },
            }}
          >
            <MiddleTruncated maxWidth={80}>{info.getValue()}</MiddleTruncated>
            <FaArrowUpRightFromSquare fontSize={12} />
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
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Transaction history' })}
        <IconButton
          onClick={(evt) => {
            rest?.onClose?.(evt, 'backdropClick');
          }}
        >
          <CgClose fontSize={14} />
        </IconButton>
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
            rest.onClick?.(e);
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
