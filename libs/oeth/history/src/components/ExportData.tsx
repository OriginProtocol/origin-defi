import React, { useCallback, useRef } from 'react';

import { Box, Link } from '@mui/material';
import { useIntl } from 'react-intl';

import { HistoryFilterButton } from './HistoryButton';

import type { Rows } from './HistoryTable';

interface Props {
  data?: Rows;
}

export function ExportData({ data }: Props) {
  const link = useRef<HTMLAnchorElement>(null);
  const intl = useIntl();

  const generateCSV = useCallback(() => {
    const rows = [['Date', 'Type', 'Amount', 'Balance', 'Transaction Hash']];
    data.forEach((row) =>
      rows.push([row.timestamp, row.type, row.value, row.balance, row.txHash]),
    );
    link.current.href =
      'data:text/csv;charset=utf-8,' +
      encodeURI(rows.map((e) => e.join(',')).join('\n'));
    link.current.click();
  }, [data]);

  return (
    <>
      <Link
        ref={link}
        sx={{ display: 'none' }}
        target="_blank"
        download="transaction_history.csv"
      ></Link>
      <HistoryFilterButton onClick={generateCSV}>
        <Box
          component="img"
          src="/images/download.svg"
          sx={{ height: '0.75rem', width: '0.75rem' }}
        ></Box>
        {intl.formatMessage({ defaultMessage: 'CSV' })}
      </HistoryFilterButton>
    </>
  );
}
