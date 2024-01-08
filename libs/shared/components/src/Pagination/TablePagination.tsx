import { Button, Stack, Typography } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { Table } from '@tanstack/react-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TablePaginationProps = { table: Table<any> } & StackProps;

export const TablePagination = ({ table, ...rest }: TablePaginationProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      alignItems="baseline"
      justifyContent="flex-end"
      gap={1}
      {...rest}
      sx={{ px: { xs: 2, md: 3 }, py: 2, ...rest?.sx }}
    >
      <Button
        size="small"
        onClick={() => {
          table.setPageIndex(0);
          window.scrollTo(0, 0);
        }}
        disabled={!table.getCanPreviousPage()}
      >
        {intl.formatMessage({ defaultMessage: 'First' })}
      </Button>
      <Button
        size="small"
        onClick={() => {
          table.previousPage();
          window.scrollTo(0, 0);
        }}
        disabled={!table.getCanPreviousPage()}
      >
        <FaChevronLeft />
      </Button>
      <Typography fontSize={13} px={2}>
        {intl.formatMessage(
          { defaultMessage: '{page} of {lastPage}' },
          {
            page: table.getState().pagination.pageIndex + 1,
            lastPage: table.getPageCount(),
          },
        )}
      </Typography>
      <Button
        size="small"
        onClick={() => {
          table.nextPage();
          window.scrollTo(0, 0);
        }}
        disabled={!table.getCanNextPage()}
      >
        <FaChevronRight />
      </Button>
      <Button
        size="small"
        onClick={() => {
          table.setPageIndex(table.getPageCount() - 1);
          window.scrollTo(0, 0);
        }}
        disabled={!table.getCanNextPage()}
      >
        {intl.formatMessage({ defaultMessage: 'Last' })}
      </Button>
    </Stack>
  );
};
