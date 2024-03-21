import { useMemo, useState } from 'react';

import {
  Card,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import {
  DownloadCsvButton,
  SliderSwitch,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ConnectedButton } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useAggregatedHistory } from '../hooks';
import { useOethHistoryTransactionQuery } from '../queries.generated';
import { HistoryFilters } from './HistoryFilters';
import { HistoryTable } from './HistoryTable';

import type { HistoryType } from '@origin/oeth/shared';
import type { Option } from '@origin/shared/components';

export function HistoryCard() {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [filters, setFilters] = useState<HistoryType[]>([]);
  const { data, isFetching } = useAggregatedHistory(filters);
  const [chartOption, setChartOption] = useState('OETH');
  const chartOptions: Option[] = useMemo(
    () => [
      {
        label: (
          <Stack direction="row" alignItems="center" spacing={1}>
            <TokenIcon token={tokens.mainnet.OETH} sx={{ fontSize: 24 }} />
            <Typography>
              {intl.formatMessage({
                defaultMessage: 'OETH Transaction history',
              })}
            </Typography>
          </Stack>
        ),
        value: 'OETH',
      },
      {
        label: (
          <Stack direction="row" alignItems="center" spacing={1}>
            <TokenIcon token={tokens.mainnet.wOETH} sx={{ fontSize: 24 }} />
            <Typography>
              {intl.formatMessage({
                defaultMessage: 'wOETH Transaction history',
              })}
            </Typography>
          </Stack>
        ),
        value: 'wOETH',
      },
    ],
    [intl],
  );

  const handleChartOptionChange = (newVal: string | number) => {
    setChartOption(newVal as string);
  };

  return (
    <Card>
      <CardHeader
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <SliderSwitch
              options={chartOptions}
              value={chartOption}
              onChange={handleChartOptionChange}
            />
            <Stack direction="row" alignItems="center" gap={1}>
              <HistoryFilters filters={filters} setFilters={setFilters} />
              <ExportDataButton />
            </Stack>
          </Stack>
        }
      />
      {isConnected ? (
        isFetching ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <CircularProgress />
          </Stack>
        ) : isNilOrEmpty(data) ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'No transaction' })}
            </Typography>
          </Stack>
        ) : (
          <HistoryTable filters={filters} />
        )
      ) : (
        <Stack
          sx={{
            height: '15rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography>
            {intl.formatMessage({
              defaultMessage: 'Connect your wallet to see your history',
            })}
          </Typography>
          <ConnectedButton color="inherit" size="large" />
        </Stack>
      )}
    </Card>
  );
}

function ExportDataButton() {
  const { address, isConnected } = useAccount();
  const { data: txData } = useOethHistoryTransactionQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      enabled: isConnected,
      select: (data) => {
        if (!data?.oethHistories) {
          return;
        }

        return data.oethHistories.reduce(
          (acc, curr) => [
            ...acc,
            [curr.timestamp, curr.type, curr.value, curr.balance, curr.txHash],
          ],
          [['Date', 'Type', 'Amount', 'Balance', 'Transaction Hash']],
        );
      },
    },
  );

  return (
    <DownloadCsvButton
      data={txData}
      filename="oeth_transaction_history.csv"
      hideIcon
      variant="outlined"
    />
  );
}
