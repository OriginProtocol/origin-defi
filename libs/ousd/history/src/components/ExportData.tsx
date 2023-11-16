import { useCallback, useRef } from 'react';

import { Box, Button, Link } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useHistoryTransactionQuery } from '../queries.generated';

export function ExportData() {
  const link = useRef<HTMLAnchorElement>(null);
  const intl = useIntl();
  const { address } = useAccount();
  const { data } = useHistoryTransactionQuery(
    { address },
    { select: (data) => data?.ousdAddresses?.at(0)?.history ?? [] },
  );

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
      <Button onClick={generateCSV} sx={{ gap: 0.75 }} size="small">
        <Box
          component="img"
          src="/images/download.svg"
          alt="export"
          width={12}
        />
        {intl.formatMessage({ defaultMessage: 'CSV' })}
      </Button>
    </>
  );
}