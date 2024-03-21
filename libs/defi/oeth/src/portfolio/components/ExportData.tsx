import { useCallback, useRef } from 'react';

import { Button, Link } from '@mui/material';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useOethHistoryTransactionQuery } from '../queries.generated';

export function ExportData() {
  const link = useRef<HTMLAnchorElement>(null);
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data } = useOethHistoryTransactionQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data?.oethHistories ?? [] },
  );

  const generateCSV = useCallback(() => {
    if (!data || !link?.current) {
      return;
    }
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
      <Button
        onClick={generateCSV}
        size="small"
        variant="outlined"
        disabled={!isConnected}
      >
        {intl.formatMessage({ defaultMessage: 'Download CSV' })}
      </Button>
    </>
  );
}
