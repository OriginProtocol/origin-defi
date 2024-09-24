/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';

import {
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { CurrencyControls } from '@origin/analytics/shared';
import { LoadingLabel } from '@origin/shared/components';
import { formatInTimeZone } from 'date-fns-tz';
import { format, from, mul, toNumber } from 'dnum';
import { useIntl } from 'react-intl';

import { useBalanceSheet } from '../hooks';
import { calculateChange } from '../utils';

import type { StackProps, TypographyProps } from '@mui/material';
import type { Currency } from '@origin/analytics/shared';

export const BalanceSheet = () => {
  const intl = useIntl();
  const [currency, setCurrency] = useState<Currency>('ETH');
  const { data: balanceSheet, isLoading: isBalanceSheetLoading } =
    useBalanceSheet();

  const assets = balanceSheet?.data?.assets;
  const liabilities = balanceSheet?.data?.liabilities;

  const convertToUSD = (value: number) => {
    if (currency === 'USD' && balanceSheet?.ethPrice) {
      return toNumber(mul(from(value), balanceSheet.ethPrice), {
        digits: 2,
        decimalsRounding: 'ROUND_DOWN',
      });
    }
    return value;
  };

  if (isBalanceSheetLoading) {
    return (
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 300 }}
      >
        <CircularProgress size={36} />
      </Stack>
    );
  }

  if (!assets || !liabilities) {
    return (
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 300 }}
      >
        <Typography color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Empty balance sheet' })}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <CurrencyControls currency={currency} setCurrency={setCurrency} />
      <BalanceSheetSection
        title={intl.formatMessage({ defaultMessage: 'Assets' })}
        data={assets}
        totals={balanceSheet?.data?.assetTotals}
        isLoading={isBalanceSheetLoading}
        currency={currency}
        convertToUSD={convertToUSD}
        balanceSheet={balanceSheet}
      />
      <BalanceSheetSection
        title={intl.formatMessage({ defaultMessage: 'Liabilities' })}
        data={liabilities}
        totals={balanceSheet?.data?.liabilityTotals}
        isLoading={isBalanceSheetLoading}
        currency={currency}
        convertToUSD={convertToUSD}
        balanceSheet={balanceSheet}
        hideHeaderContent
      />
      <BalanceSheetFooter balanceSheet={balanceSheet} />
    </Stack>
  );
};

type BalanceSheetSectionProps = {
  title: string;
  data: Record<string, Record<string, number[]>>;
  totals: number[] | undefined;
  isLoading: boolean;
  currency: Currency;
  convertToUSD: (value: number) => number;
  balanceSheet: ReturnType<typeof useBalanceSheet>['data'];
  hideHeaderContent?: boolean;
};

const BalanceSheetSection = ({
  title,
  data,
  totals,
  isLoading,
  currency,
  convertToUSD,
  balanceSheet,
  hideHeaderContent,
}: BalanceSheetSectionProps) => {
  const intl = useIntl();

  return (
    <Card>
      <BalanceSheetRow
        title={title}
        titleProps={{ variant: 'body2', sx: { fontWeight: 'medium' } }}
        today={
          hideHeaderContent
            ? undefined
            : formatInTimeZone(
                balanceSheet?.timestamp ?? new Date(),
                'UTC',
                'dd MMM yyyy',
              )
        }
        lastWeek={
          hideHeaderContent
            ? undefined
            : intl.formatMessage({ defaultMessage: '1 week ago' })
        }
        difference={
          hideHeaderContent
            ? undefined
            : intl.formatMessage({ defaultMessage: 'Difference' })
        }
        isLoading={isLoading}
        sx={{ py: 2.5 }}
      />
      <Divider />
      {Object.entries(data).map(([k, v]) => (
        <BalanceSheetCategory
          key={k}
          category={k}
          data={v}
          currency={currency}
          convertToUSD={convertToUSD}
        />
      ))}
      <BalanceSheetTotalRow
        title={`Total ${title}`}
        totals={totals}
        isLoading={isLoading}
        currency={currency}
        convertToUSD={convertToUSD}
      />
    </Card>
  );
};

type BalanceSheetCategoryProps = {
  category: string;
  data: Record<string, number[]>;
  currency: Currency;
  convertToUSD: (value: number) => number;
};

const BalanceSheetCategory = ({
  category,
  data,
  currency,
  convertToUSD,
}: BalanceSheetCategoryProps) => {
  const intl = useIntl();

  return (
    <>
      <BalanceSheetRow
        title={category}
        titleProps={{ sx: { fontWeight: 'bold' } }}
      />
      {Object.entries(data).map(([a, b]) => (
        <BalanceSheetRow
          key={`${category}-${a}`}
          title={a}
          titleProps={{ sx: { pl: 2, color: 'text.secondary' } }}
          today={intl.formatNumber(convertToUSD(b[0]))}
          lastWeek={intl.formatNumber(convertToUSD(b[1]))}
          difference={`${intl.formatNumber(calculateChange(b[1], b[0]), { signDisplay: 'always' })}%`}
          colorizeDifference={b[0] > b[1] ? 'success.main' : 'error.main'}
          currency={currency}
        />
      ))}
      <Divider />
    </>
  );
};

type BalanceSheetTotalRowProps = {
  title: string;
  totals: number[] | undefined;
  isLoading: boolean;
  currency: Currency;
  convertToUSD: (value: number) => number;
};

const BalanceSheetTotalRow = ({
  title,
  totals,
  isLoading,
  currency,
  convertToUSD,
}: BalanceSheetTotalRowProps) => {
  const intl = useIntl();

  return (
    <BalanceSheetRow
      title={title}
      titleProps={{ variant: 'body2', sx: { fontWeight: 'medium' } }}
      today={intl.formatNumber(convertToUSD(totals?.[0] ?? 0))}
      lastWeek={intl.formatNumber(convertToUSD(totals?.[1] ?? 0))}
      difference={`${intl.formatNumber(calculateChange(totals?.[1] ?? 0, totals?.[0] ?? 0), { signDisplay: 'always' })}%`}
      colorizeDifference={
        (totals?.[0] ?? 0) > (totals?.[1] ?? 0) ? 'success.main' : 'error.main'
      }
      isLoading={isLoading}
      currency={currency}
    />
  );
};

type BalanceSheetFooterProps = {
  balanceSheet: ReturnType<typeof useBalanceSheet>['data'];
};

const BalanceSheetFooter = ({ balanceSheet }: BalanceSheetFooterProps) => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography variant="caption1" color="text.secondary">
        {intl.formatMessage(
          { defaultMessage: 'Last updated {last}, block #{block}' },
          {
            last: formatInTimeZone(
              balanceSheet?.timestamp ?? new Date(),
              'UTC',
              'dd MMM yyyy',
            ),
            block: balanceSheet?.blocknumber,
          },
        )}
      </Typography>
      <Typography variant="caption1" color="text.secondary">
        {intl.formatMessage(
          { defaultMessage: 'Using ETH price of ${price} from Chainlink' },
          { price: format(balanceSheet?.ethPrice ?? from(0), 2) },
        )}
      </Typography>
    </Stack>
  );
};

type BalanceSheetRowProps = {
  title?: string;
  titleProps?: TypographyProps;
  today?: string;
  lastWeek?: string;
  difference?: string;
  colorizeDifference?: string;
  isLoading?: boolean;
  currency?: Currency;
} & StackProps;

const BalanceSheetRow = ({
  title,
  titleProps,
  today,
  lastWeek,
  difference,
  colorizeDifference,
  isLoading,
  currency,
  ...rest
}: BalanceSheetRowProps) => {
  const currencySymbol = currency ? (currency === 'USD' ? '$' : 'Ξ') : '';

  return (
    <Stack
      direction="row"
      spacing={2}
      {...rest}
      sx={[{ p: 2 }, ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx])]}
    >
      <Typography
        {...titleProps}
        sx={[
          { width: 1 },
          ...(Array.isArray(titleProps?.sx) ? titleProps.sx : [titleProps?.sx]),
        ]}
      >
        {title}
      </Typography>
      <LoadingLabel
        isLoading={isLoading}
        sx={[cellSx, !today && { display: 'none' }]}
      >
        {currencySymbol}&nbsp;
        {today}
      </LoadingLabel>
      <LoadingLabel
        isLoading={isLoading}
        sx={[cellSx, !lastWeek && { display: 'none' }]}
      >
        {currencySymbol}&nbsp;
        {lastWeek}
      </LoadingLabel>
      <LoadingLabel
        isLoading={isLoading}
        sx={[
          cellSx,
          !difference && { display: 'none' },
          ...(colorizeDifference ? [{ color: colorizeDifference }] : []),
        ]}
      >
        {difference}
      </LoadingLabel>
    </Stack>
  );
};

const cellSx = {
  width: 0.175,
  textAlign: 'right',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};
