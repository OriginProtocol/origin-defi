import { useState } from 'react';

import { Card, Chip, Divider, Stack, Typography } from '@mui/material';
import {
  CurrencyControls,
  CurrencyLabel,
  Spinner,
  TokenIcon,
} from '@origin/shared/components';
import { format as dateFormat } from 'date-fns';
import { format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';

import { useBalanceSheet } from './hooks';

import type { StackProps, TypographyProps } from '@mui/material';
import type { Currency } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';
import type { ReactNode } from 'react';

export type BalanceSheetProps = { token: Token };

export const BalanceSheet = ({ token }: BalanceSheetProps) => {
  const intl = useIntl();
  const [currency, setCurrency] = useState<Currency>('ETH');
  const { data: balanceSheet, isLoading: isBalanceSheetLoading } =
    useBalanceSheet(token);

  const convertToUSD = (value: Dnum) => {
    if (currency === 'USD' && balanceSheet?.ethPrice) {
      return mul(from(value), balanceSheet.ethPrice);
    }
    return value;
  };

  if (isBalanceSheetLoading) {
    return <Spinner sx={{ width: 1, height: 300 }} />;
  }

  if (!balanceSheet?.assets || !balanceSheet?.liabilities) {
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
      <Card>
        <Stack divider={<Divider />}>
          <BalanceSheetRow
            titleElement={intl.formatMessage({ defaultMessage: 'Assets' })}
            titleProps={{ variant: 'body1', sx: { fontWeight: 'bold' } }}
            sx={{ px: 3, py: 2 }}
            today={dateFormat(
              new Date(balanceSheet?.todayDailyStat?.date),
              'dd MMM yyyy',
            )}
            lastWeek={intl.formatMessage({ defaultMessage: '1 week ago' })}
            difference={intl.formatMessage({ defaultMessage: 'Difference' })}
          />
          {balanceSheet.assets.map((s) => (
            <Stack key={s.strategy.id} sx={{ py: 0.5 }}>
              <BalanceSheetRow
                titleElement={s.strategy.title}
                titleProps={{ variant: 'body2', sx: { fontWeight: 'bold' } }}
                sx={{ px: 3, py: 2 }}
              />
              {s.balances.map((b) => (
                <BalanceSheetRow
                  key={b.token.id}
                  titleElement={
                    <Chip
                      icon={<TokenIcon token={b.token} />}
                      label={b.token.symbol}
                      size="small"
                      color="secondary"
                    />
                  }
                  today={format(convertToUSD(b.todayValue), 2)}
                  lastWeek={format(convertToUSD(b.lastWeekValue), 2)}
                  difference={intl.formatNumber(b.pctDifference, {
                    signDisplay: b.pctDifference !== 0 ? 'always' : 'never',
                    style: 'percent',
                    maximumFractionDigits: 2,
                  })}
                  currency={currency}
                  colorizeDifference={b.pctDifference}
                  sx={{ px: 3, py: 1.5 }}
                />
              ))}
            </Stack>
          ))}
          <BalanceSheetRow
            titleElement={intl.formatMessage({
              defaultMessage: 'Total Assets',
            })}
            titleProps={{ variant: 'body2', sx: { fontWeight: 'bold' } }}
            sx={{ px: 3, py: 2 }}
            today={format(convertToUSD(balanceSheet.totalAssets.todayValue), 2)}
            lastWeek={format(
              convertToUSD(balanceSheet.totalAssets.lastWeekValue),
              2,
            )}
            difference={intl.formatNumber(
              balanceSheet.totalAssets.pctDifference,
              {
                signDisplay:
                  balanceSheet.totalAssets.pctDifference > 0
                    ? 'always'
                    : 'never',
                style: 'percent',
                maximumFractionDigits: 2,
              },
            )}
            currency={currency}
            colorizeDifference={balanceSheet.totalAssets.pctDifference}
          />
        </Stack>
      </Card>
      <Card>
        <Stack divider={<Divider />}>
          <BalanceSheetRow
            titleElement={intl.formatMessage({ defaultMessage: 'Liabilities' })}
            titleProps={{ variant: 'body1', sx: { fontWeight: 'bold' } }}
            sx={{ px: 3, py: 2 }}
          />
          <>
            <BalanceSheetRow
              titleElement={intl.formatMessage({
                defaultMessage: 'Token Supply',
              })}
              titleProps={{ variant: 'body2', sx: { fontWeight: 'bold' } }}
              sx={{ px: 3, py: 2 }}
            />
            <BalanceSheetRow
              titleElement={
                <Chip
                  icon={<TokenIcon token={token} />}
                  label={token.symbol}
                  size="small"
                  color="secondary"
                />
              }
              today={format(
                convertToUSD(balanceSheet.liabilities.todayValue),
                2,
              )}
              lastWeek={format(
                convertToUSD(balanceSheet.liabilities.lastWeekValue),
                2,
              )}
              difference={intl.formatNumber(
                balanceSheet.liabilities.pctDifference,
                {
                  signDisplay:
                    balanceSheet.liabilities.pctDifference > 0
                      ? 'always'
                      : 'never',
                  style: 'percent',
                  maximumFractionDigits: 2,
                },
              )}
              currency={currency}
              colorizeDifference={balanceSheet.liabilities.pctDifference}
              sx={{ px: 3, py: 1.5 }}
            />
          </>
          <BalanceSheetRow
            titleElement={intl.formatMessage({
              defaultMessage: 'Total Liabilities',
            })}
            titleProps={{ variant: 'body2', sx: { fontWeight: 'bold' } }}
            sx={{ px: 3, py: 2 }}
            today={format(
              convertToUSD(balanceSheet.totalLiabilities.todayValue),
              2,
            )}
            lastWeek={format(
              convertToUSD(balanceSheet.totalLiabilities.lastWeekValue),
              2,
            )}
            difference={intl.formatNumber(
              balanceSheet.totalLiabilities.pctDifference,
              {
                signDisplay:
                  balanceSheet.totalLiabilities.pctDifference > 0
                    ? 'always'
                    : 'never',
                style: 'percent',
                maximumFractionDigits: 2,
              },
            )}
            currency={currency}
            colorizeDifference={balanceSheet.totalLiabilities.pctDifference}
          />
        </Stack>
      </Card>
      <Stack>
        <Typography variant="caption1" color="text.secondary">
          {intl.formatMessage(
            { defaultMessage: 'Last updated {last}, block #{block}' },
            {
              last: dateFormat(
                new Date(balanceSheet.todayDailyStat.date),
                'dd MMM yyyy',
              ),
              block: balanceSheet.todayDailyStat.blockNumber,
            },
          )}
        </Typography>
        <Typography variant="caption1" color="text.secondary">
          {intl.formatMessage(
            { defaultMessage: 'Using ETH price of ${price} from Chainlink' },
            { price: format(balanceSheet.ethPrice ?? from(0), 2) },
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

type BalanceSheetRowProps = {
  titleElement?: ReactNode;
  titleProps?: TypographyProps;
  today?: string;
  lastWeek?: string;
  difference?: string;
  colorizeDifference?: number;
  currency?: Currency;
} & StackProps;

const BalanceSheetRow = ({
  titleElement,
  titleProps,
  today,
  lastWeek,
  difference,
  colorizeDifference,
  currency,
  ...rest
}: BalanceSheetRowProps) => {
  const color =
    !colorizeDifference || colorizeDifference === 0
      ? 'text.primary'
      : colorizeDifference > 0
        ? 'success.main'
        : 'error.main';

  return (
    <Stack direction="row" spacing={2} {...rest}>
      {typeof titleElement === 'string' ? (
        <Typography {...titleProps} sx={{ width: 1 }}>
          {titleElement}
        </Typography>
      ) : (
        <Stack direction="row" sx={{ alignItems: 'center', width: 1 }}>
          {titleElement}
        </Stack>
      )}
      <Typography sx={[cellSx, !today && { display: 'none' }]}>
        <CurrencyLabel currency={currency} />
        {today}
      </Typography>
      <Typography sx={[cellSx, !lastWeek && { display: 'none' }]}>
        <CurrencyLabel currency={currency} />
        {lastWeek}
      </Typography>
      <Typography
        sx={[
          cellSx,
          !difference && { display: 'none' },
          ...(colorizeDifference ? [{ color }] : []),
        ]}
      >
        {difference}
      </Typography>
    </Stack>
  );
};

const cellSx = {
  width: 0.175,
  textAlign: 'right',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};
