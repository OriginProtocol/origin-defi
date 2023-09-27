import { useState } from 'react';

import {
  Box,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useIntl } from 'react-intl';
import { formatEther } from 'viem';

import * as colors from './colors';
import { useFinancialStatementReportQuery } from './FinancialStatement.generated';

dayjs.extend(LocalizedFormat);

const calculateChange = (from: number, to: number) => {
  if (from === 0 && to === 0) return 0;
  const change = -(1 - to / from);
  const mod = to < 0 ? -1 : 1;
  return (Math[change > 0 ? 'floor' : 'ceil'](change * 10000) / 100) * mod;
};

const getTotals = (data: Record<string, Record<string, number[]>>) => {
  return Object.values(data).reduce((totals, section) => {
    for (const asset of Object.values(section)) {
      for (let i = 0; i < asset.length; i++) {
        totals[i] = (totals[i] ?? 0) + asset[i];
      }
    }
    return totals;
  }, [] as number[]);
};

export const LiveFinancialStatement = () => {
  const [sevenDaysAgo] = useState(dayjs().subtract(7, 'days').toISOString());
  const { isLoading, data } = useFinancialStatementReportQuery({
    compareDate: sevenDaysAgo,
  });

  if (isLoading || !data) return null;

  const fs = data.financialStatements[0];
  const fsC = data.financialStatementsCompare[0];
  const c = (n: string) => Number(formatEther(BigInt(n)));

  if (!fs) return null;
  if (!fsC) return null;

  return (
    <FinancialStatement
      ethPrice={1650}
      lastUpdated={{
        blockNumber: fs.blockNumber,
        timestamp: Date.parse(fs.timestamp),
      }}
      columns={[
        dayjs(fsC.timestamp).format('lll'),
        dayjs(fs.timestamp).format('lll'),
      ]}
      data={{
        assets: {
          Vault: {
            WETH: [fsC.vault.weth, fs.vault.weth].map(c),
            stETH: [fsC.vault.stETH, fs.vault.stETH].map(c),
            rETH: [fsC.vault.rETH, fs.vault.rETH].map(c),
            frxETH: [fsC.vault.frxETH, fs.vault.frxETH].map(c),
          },
          Curve: {
            ETH: [fsC.curveLP.eth, fs.curveLP.eth].map(c),
            OETH: [fsC.curveLP.oeth, fs.curveLP.oeth].map(c),
          },
          'Frax Staking': {
            frxETH: [fsC.fraxStaking.frxETH, fs.fraxStaking.frxETH].map(c),
          },
          'Morpho Aave': {
            WETH: [fsC.morphoAave.weth, fs.morphoAave.weth].map(c),
          },
          Dripper: {
            WETH: [fsC.dripper.weth, fs.dripper.weth].map(c),
          },
        },
        liabilities: {
          'Token Supply': {
            OETH: [fsC.oeth.totalSupply, fs.oeth.totalSupply].map(c),
          },
        },
      }}
    />
  );
};

export const FinancialStatement = (props: {
  ethPrice: number;
  lastUpdated: {
    blockNumber: number;
    timestamp: number;
  };
  columns: string[];
  data: Record<
    'assets' | 'liabilities',
    Record<string, Record<string, number[]>>
  >;
}) => {
  const assetTotals = getTotals(props.data['assets']);
  const liabilityTotals = getTotals(props.data['liabilities']);

  return (
    <Stack
      gap={2}
      color={(theme) => theme.palette.text.primary}
      fontFamily={'Inter'}
      fontSize={{ xs: '.7rem', sm: '.875rem' }}
    >
      <Header columns={props.columns} />
      <Table
        title={'Assets'}
        data={props.data['assets']}
        totals={assetTotals}
      />
      <Table
        title={'Liabilities'}
        data={props.data['liabilities']}
        totals={liabilityTotals}
      />

      <Paper sx={{ borderRadius: { xs: 1, sm: 2, md: 3 }, overflow: 'hidden' }}>
        <Total
          title={'PROTOCOL NET VALUE'}
          totals={assetTotals.map((val, index) => val - liabilityTotals[index])}
        />
      </Paper>
      <Box mt={{ xs: 1, sm: 2, md: 3 }}>
        <Typography>
          {`Last updated ${dayjs(props.lastUpdated.timestamp).format(
            'll',
          )} at `}
          {`${dayjs(props.lastUpdated.timestamp).format('LT')}, block #${
            props.lastUpdated.blockNumber
          }`}
        </Typography>
        <Typography>
          {`Using ETH price of $${props.ethPrice} from Chainlink`}
        </Typography>
      </Box>
    </Stack>
  );
};

const Header = (props: { columns: string[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columnWeight = props.columns.length + 2;
  return (
    <Paper
      sx={{
        borderRadius: { xs: 1, sm: 2, md: 3 },
        overflow: 'hidden',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        color={(theme) => theme.palette.primary.contrastText}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paperHeader,
        }}
        fontSize={{ xs: '.875rem', sm: '1.125rem' }}
        px={{ xs: 1, sm: 2, md: 4 }}
        py={{ xs: 2, sm: 3, md: 4 }}
      >
        <Box width={`${(100 / columnWeight) * 1.5}%`} />
        {props.columns.map((column, index) => (
          <Box
            key={column}
            width={`${100 / columnWeight}%`}
            maxWidth={250}
            textAlign={'right'}
            ml={1}
          >
            {column}
          </Box>
        ))}
        <Box
          width={`${100 / columnWeight}%`}
          maxWidth={250}
          textAlign={'right'}
        >
          {isMobile ? 'Diff' : 'Difference'}
        </Box>
      </Stack>
    </Paper>
  );
};

const Table = (props: {
  title: string;
  data: Record<string, Record<string, number[]>>;
  totals: number[];
}) => {
  return (
    <Paper
      key={props.title}
      sx={{
        borderRadius: { xs: 1, sm: 2, md: 3 },
        overflow: 'hidden',
      }}
    >
      <Stack>
        {/* Header */}
        <Box
          pt={{ xs: 1, sm: 2, md: 4 }}
          px={{ xs: 1, sm: 2, md: 4 }}
          pb={{ xs: 0.5, sm: 1, md: 2 }}
          color={(theme) => theme.palette.primary.contrastText}
          fontSize={{ xs: '.875rem', sm: '1rem' }}
          sx={{
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderBottomColor: (theme) => theme.palette.grey['700'],
          }}
        >
          {props.title}
        </Box>

        {/* Body */}
        <Stack>
          {Object.entries(props.data).map(([title, data]) => (
            <Section key={title} title={title} data={data} />
          ))}
        </Stack>

        {/* Total */}
        <Total title={`TOTAL ${props.title}`} totals={props.totals} />
      </Stack>
    </Paper>
  );
};

const Total = (props: { title: string; totals: number[] }) => {
  const columnWeight = props.totals.length + 2;
  return (
    <Stack
      direction={'row'}
      p={{ xs: 1, sm: 2, md: 4 }}
      color={(theme) => theme.palette.primary.contrastText}
      sx={{ backgroundColor: (theme) => theme.palette.background.paperFooter }}
    >
      <Box width={`${(100 / columnWeight) * 1.5}%`}>
        {props.title.toUpperCase()}
      </Box>
      {props.totals.map((value, index) => (
        <DataColumn key={index} columnWeight={columnWeight} value={value} />
      ))}
      <ChangeColumn columnWeight={columnWeight} values={props.totals} />
    </Stack>
  );
};

const Section = (props: { title: string; data: Record<string, number[]> }) => {
  return (
    <Stack
      sx={{
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: (theme) => theme.palette.grey['700'],
      }}
      px={{ xs: 1, sm: 2, md: 4 }}
      gap={{ xs: 1, sm: 2, md: 4 }}
      pt={{ xs: 1, sm: 2, md: 4 }}
    >
      <Stack
        direction={'row'}
        color={(theme) => theme.palette.primary.contrastText}
      >
        {props.title}
      </Stack>
      <Stack gap={{ xs: 1, sm: 2, md: 4 }} pb={{ xs: 1, sm: 2, md: 4 }}>
        {Object.entries(props.data).map(([title, data]) => (
          <Asset key={title} title={title} data={data} />
        ))}
      </Stack>
    </Stack>
  );
};

const Asset = (props: { title: string; data: number[] }) => {
  const columnWeight = props.data.length + 2;
  return (
    <Stack key={props.title}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box pl={2} mr={-2} width={`${(100 / columnWeight) * 1.5}%`}>
          {props.title}
        </Box>
        {props.data.map((value, index) => (
          <DataColumn key={index} columnWeight={columnWeight} value={value} />
        ))}
        <ChangeColumn columnWeight={columnWeight} values={props.data} />
      </Stack>
    </Stack>
  );
};

export const DataColumn = ({
  value,
  columnWeight,
}: {
  value: number;
  columnWeight: number;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const intl = useIntl();
  return (
    <Box
      width={`${100 / columnWeight}%`}
      maxWidth={250}
      textAlign={'right'}
      color={(theme) => theme.palette.primary.contrastText}
      ml={1}
    >
      <Box
        component={'span'}
        color={(theme) => theme.palette.text.primary}
        pr={{ xs: 0.1, sm: 0.15, md: 0.2 }}
      >
        {'Ξ'}
      </Box>
      {intl.formatNumber(value, {
        notation: isMobile ? 'compact' : 'standard',
        maximumFractionDigits: isMobile ? 1 : 2,
      })}
    </Box>
  );
};

export const ChangeColumn = ({
  values,
  columnWeight,
}: {
  values: number[];
  columnWeight: number;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const intl = useIntl();
  const change = calculateChange(
    values[values.length - 2],
    values[values.length - 1],
  );
  return (
    <Box
      width={`${100 / columnWeight}%`}
      maxWidth={250}
      textAlign={'right'}
      color={(theme) =>
        change > 0
          ? colors.positive
          : change < 0
          ? colors.negative
          : theme.palette.text.primary
      }
    >
      {isFinite(change) && change > 0 && '+'}
      {!isNaN(change) &&
        isFinite(change) &&
        `${intl.formatNumber(change, {
          notation: isMobile ? 'compact' : 'standard',
          maximumFractionDigits: isMobile ? 1 : 2,
        })}%`}
    </Box>
  );
};
