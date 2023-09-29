import { createContext, useContext, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Experimental_CssVarsProvider as CssVarsProvider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { queryClient } from '@origin/oeth/shared';
import { useChainlinkEthUsd } from '@origin/shared/providers';
import { theme } from '@origin/shared/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  endOfToday,
  formatRelative,
  intlFormat,
  startOfDay,
  subDays,
} from 'date-fns';
import { IntlProvider, useIntl } from 'react-intl';
import { formatEther } from 'viem';

import * as colors from './colors';
import { useFinancialStatementQuery } from './FinancialStatement.generated';

const calculateChange = (from: number, to: number) => {
  if (from === 0 && to === 0) return 0;
  const change = -(1 - to / from);
  const mod = to < 0 ? -1 : 1;
  const result =
    (Math[change > 0 ? 'floor' : 'ceil'](change * 10000) / 100) * mod;
  if (result.toFixed(2) === '0.00') return 0; // Weed out tiny rounding issues
  return result;
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

export default function SelfContainedFinancialStatement() {
  return (
    <IntlProvider messages={{}} locale="en" defaultLocale="en">
      <CssVarsProvider theme={theme} defaultMode="dark">
        <QueryClientProvider client={queryClient}>
          <LiveFinancialStatement />
        </QueryClientProvider>
      </CssVarsProvider>
    </IntlProvider>
  );
}

export const LiveFinancialStatement = () => {
  const todayEnd = endOfToday();
  const sevenDaysAgo = startOfDay(subDays(todayEnd, 7));

  const { isLoading: fsIsLoading, data: fs } = useFinancialStatementQuery({
    compareDate: endOfToday,
  });
  const { isLoading: fsCIsLoading, data: fsC } = useFinancialStatementQuery({
    compareDate: sevenDaysAgo,
  });
  const { isLoading: ethPriceIsLoading, data: ethPrice } = useChainlinkEthUsd();

  if (fsIsLoading || !fs) return null;
  if (fsCIsLoading || !fsC) return null;
  if (ethPriceIsLoading || !ethPrice) return null;

  const c = (n?: string) => Number(formatEther(BigInt(n ?? 0)));

  const blockNumber = Math.max(
    fs.vaults[0]?.blockNumber,
    fs.curveLps[0]?.blockNumber,
    fs.morphoAaves[0]?.blockNumber,
    fs.drippers[0]?.blockNumber,
    fs.oeths[0]?.blockNumber,
    fs.fraxStakings[0]?.blockNumber,
  );
  const timestamp = Math.max(
    Date.parse(fs.vaults[0]?.timestamp),
    Date.parse(fs.curveLps[0]?.timestamp),
    Date.parse(fs.morphoAaves[0]?.timestamp),
    Date.parse(fs.drippers[0]?.timestamp),
    Date.parse(fs.oeths[0]?.timestamp),
    Date.parse(fs.fraxStakings[0]?.timestamp),
  );

  return (
    <FinancialStatement
      ethPrice={ethPrice?.floatUsd}
      lastUpdated={{
        blockNumber,
        timestamp,
      }}
      columns={[formatRelative(sevenDaysAgo, new Date()), intlFormat(todayEnd)]}
      data={{
        assets: {
          Vault: {
            WETH: [fsC.vaults[0]?.weth, fs.vaults[0]?.weth].map(c),
            stETH: [fsC.vaults[0]?.stETH, fs.vaults[0]?.stETH].map(c),
            rETH: [fsC.vaults[0]?.rETH, fs.vaults[0]?.rETH].map(c),
            frxETH: [fsC.vaults[0]?.frxETH, fs.vaults[0]?.frxETH].map(c),
          },
          Curve: {
            ETH: [fsC.curveLps[0]?.eth, fs.curveLps[0]?.eth].map(c),
            OETH: [fsC.curveLps[0]?.oeth, fs.curveLps[0]?.oeth].map(c),
          },
          'Frax Staking': {
            frxETH: [
              fsC.fraxStakings[0]?.frxETH,
              fs.fraxStakings[0]?.frxETH,
            ].map(c),
          },
          'Morpho Aave': {
            WETH: [fsC.morphoAaves[0]?.weth, fs.morphoAaves[0]?.weth].map(c),
          },
          Dripper: {
            WETH: [fsC.drippers[0]?.weth, fs.drippers[0]?.weth].map(c),
          },
        },
        liabilities: {
          'Token Supply': {
            OETH: [fsC.oeths[0]?.totalSupply, fs.oeths[0]?.totalSupply].map(c),
          },
        },
      }}
    />
  );
};

const FinancialStatementContext = createContext({
  ethPrice: undefined as number | undefined,
  showUsdPrice: false,
});

export const FinancialStatement = (props: {
  ethPrice?: number;
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
  const intl = useIntl();
  const assetTotals = getTotals(props.data['assets']);
  const liabilityTotals = getTotals(props.data['liabilities']);
  const [showUsdPrice, setShowUsdPrice] = useState(!!props.ethPrice);

  return (
    <FinancialStatementContext.Provider
      value={{
        ethPrice: props.ethPrice,
        showUsdPrice,
      }}
    >
      <Stack
        gap={2}
        color={(theme) => theme.palette.text.primary}
        fontFamily={'Inter'}
        fontSize={{ xs: '.7rem', sm: '.875rem' }}
      >
        <Stack direction={'row'} justifyContent={'end'}>
          <Stack
            direction={'row'}
            gap={{ xs: 0.25, sm: 0.5, md: 1 }}
            sx={{
              height: { xs: 30, sm: 35, md: 40 },
              borderRadius: 999,
              overflow: 'hidden',
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <Button
              sx={{
                borderRadius: 999,
                p: '1px',
                background: !showUsdPrice
                  ? (theme) => theme.palette.background.gradient3
                  : 'transparent',
              }}
              onClick={() => setShowUsdPrice(false)}
            >
              <Box
                sx={{
                  borderRadius: 999,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: (theme) =>
                    !showUsdPrice
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  background: (theme) =>
                    alpha(theme.palette.background.paper, 0.85),
                }}
              >
                ETH
              </Box>
            </Button>
            <Button
              sx={{
                borderRadius: 999,
                p: '1px',
                background: showUsdPrice
                  ? (theme) => theme.palette.background.gradient3
                  : 'transparent',
              }}
              onClick={() => setShowUsdPrice(true)}
            >
              <Box
                sx={{
                  borderRadius: 999,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: (theme) =>
                    showUsdPrice
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  background: (theme) =>
                    alpha(theme.palette.background.paper, 0.85),
                }}
              >
                USD
              </Box>
            </Button>
          </Stack>
        </Stack>
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

        <Paper
          sx={{ borderRadius: { xs: 1, sm: 2, md: 3 }, overflow: 'hidden' }}
        >
          <Total
            title={'PROTOCOL NET VALUE'}
            totals={assetTotals.map(
              (val, index) => val - liabilityTotals[index],
            )}
          />
        </Paper>
        <Box
          mt={{ xs: 1, sm: 2, md: 3 }}
          color={(theme) => theme.palette.primary.contrastText}
        >
          <Typography>
            {`Last updated ${intlFormat(props.lastUpdated.timestamp)}, `}
            {`block #${props.lastUpdated.blockNumber}`}
          </Typography>
          <Typography>
            {props.ethPrice &&
              `Using ETH price of $${intl.formatNumber(props.ethPrice, {
                maximumFractionDigits: 2,
              })} from Chainlink`}
          </Typography>
        </Box>
      </Stack>
    </FinancialStatementContext.Provider>
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
        {props.columns.map((column) => (
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
      justifyContent={'space-between'}
      alignItems={'center'}
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
  const { showUsdPrice, ethPrice } = useContext(FinancialStatementContext);
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
        {showUsdPrice && ethPrice ? '$' : 'Ξ'}
      </Box>
      {intl.formatNumber(showUsdPrice && ethPrice ? value * ethPrice : value, {
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
