import { Box, Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useIntl } from 'react-intl';

import * as colors from './colors';

const calculateChange = (from: number, to: number) => {
  if (from === 0 && to === 0) return 0;
  const change = -(1 - to / from);
  return Math[change > 0 ? 'floor' : 'ceil'](change * 10000) / 100;
};

export const FinancialStatement = (props: {
  dataLastUpdated: number;
  columns: string[];
  data: Record<string, Record<string, Record<string, number[]>>>;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columnWeight = props.columns.length + 2;
  return (
    <Stack
      gap={2}
      color={(theme) => theme.palette.text.primary}
      fontFamily={'Inter'}
      fontSize={{ xs: '.7rem', sm: '.875rem' }}
    >
      <Paper
        sx={{
          borderRadius: { xs: 1, sm: 2, md: 3 },
          overflow: 'hidden',
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          color={(theme) => theme.palette.primary.contrastText}
          sx={{ backgroundColor: (theme) => theme.palette.grey[800] }}
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
      {Object.entries(props.data).map(([title, data]) => (
        <Table key={title} title={title} data={data} />
      ))}
    </Stack>
  );
};

const Table = (props: {
  title: string;
  data: Record<string, Record<string, number[]>>;
}) => {
  const totals = Object.values(props.data).reduce((totals, section) => {
    for (const asset of Object.values(section)) {
      for (let i = 0; i < asset.length; i++) {
        totals[i] = (totals[i] ?? 0) + asset[i];
      }
    }
    return totals;
  }, [] as number[]);
  const columnWeight = totals.length + 2;

  return (
    <Paper
      key={props.title}
      sx={{
        borderRadius: { xs: 1, sm: 2, md: 3 },
        overflow: 'hidden',
      }}
    >
      <Stack>
        {/* Body */}
        <Stack>
          {Object.entries(props.data).map(([title, data]) => (
            <Section key={title} title={title} data={data} />
          ))}
        </Stack>

        {/* Total */}
        <Stack
          direction={'row'}
          p={{ xs: 1, sm: 2, md: 3 }}
          color={(theme) => theme.palette.primary.contrastText}
          sx={{ backgroundColor: (theme) => theme.palette.grey[800] }}
        >
          <Box width={`${(100 / columnWeight) * 1.5}%`}>
            TOTAL {props.title.toUpperCase()}
          </Box>
          {totals.map((value, index) => (
            <DataColumn key={index} columnWeight={columnWeight} value={value} />
          ))}
          <ChangeColumn columnWeight={columnWeight} values={totals} />
        </Stack>
      </Stack>
    </Paper>
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
        {'$'}
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
          maximumFractionDigits: isMobile ? 1 : 0,
        })}%`}
    </Box>
  );
};
