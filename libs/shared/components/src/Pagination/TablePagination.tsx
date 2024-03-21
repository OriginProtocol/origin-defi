import { Button, Stack, Typography } from '@mui/material';
import {
  FaChevronLeftRegular,
  FaChevronRightRegular,
} from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import type { ButtonProps, StackProps } from '@mui/material';
import type { Table } from '@tanstack/react-table';

export type TablePaginationProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
  disableScrollToTop?: boolean;
  buttonsProps?: Omit<ButtonProps, 'onClick' | 'children' | 'disabled'>;
} & StackProps;

export const TablePagination = ({
  table,
  disableScrollToTop,
  buttonsProps,
  ...rest
}: TablePaginationProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      gap={1}
      {...rest}
      sx={{ px: { xs: 2, md: 3 }, py: 2, ...rest?.sx }}
    >
      <Button
        size="small"
        {...buttonsProps}
        onClick={() => {
          table.setPageIndex(0);
          if (!disableScrollToTop) {
            window.scrollTo(0, 0);
          }
        }}
        disabled={!table.getCanPreviousPage()}
      >
        {intl.formatMessage({ defaultMessage: 'First' })}
      </Button>
      <Button
        size="small"
        {...buttonsProps}
        onClick={() => {
          table.previousPage();
          if (!disableScrollToTop) {
            window.scrollTo(0, 0);
          }
        }}
        disabled={!table.getCanPreviousPage()}
      >
        <FaChevronLeftRegular />
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
        {...buttonsProps}
        onClick={() => {
          table.nextPage();
          if (!disableScrollToTop) {
            window.scrollTo(0, 0);
          }
        }}
        disabled={!table.getCanNextPage()}
      >
        <FaChevronRightRegular />
      </Button>
      <Button
        size="small"
        {...buttonsProps}
        onClick={() => {
          table.setPageIndex(table.getPageCount() - 1);
          if (!disableScrollToTop) {
            window.scrollTo(0, 0);
          }
        }}
        disabled={!table.getCanNextPage()}
      >
        {intl.formatMessage({ defaultMessage: 'Last' })}
      </Button>
    </Stack>
  );
};
