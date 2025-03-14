import { Card, CardHeader, Divider, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { usePoY } from '../hooks';

import type { CardProps } from '@mui/material';

export const BonusCard = (props: CardProps) => {
  const intl = useIntl();
  const { selectedItem, isLoading, token } = usePoY();

  const rawApr =
    (selectedItem?.circulatingSupply ?? 0) > 0
      ? ((selectedItem?.rebasingSupply ?? 0) /
          (selectedItem?.circulatingSupply ?? 1)) *
        (selectedItem?.apy ?? 0)
      : 0;
  const rawApy = ((1 + rawApr / 365.25 / 100) ** 365.25 - 1) * 100;
  const apyBoost =
    (selectedItem?.rebasingSupply ?? 0) > 0
      ? (selectedItem?.circulatingSupply ?? 0) /
        ((selectedItem?.rebasingSupply ?? 1) * 100)
      : 0;

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Yield Bonus' })}
      />
      <Divider />
      <Stack
        divider={<Divider />}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          m: 2,
        }}
      >
        {[
          {
            label: intl.formatMessage({
              defaultMessage: 'Raw yield generated',
            }),
            value: `${intl.formatNumber(rawApy ?? 0, {
              style: 'percent',
              maximumFractionDigits: 2,
            })} APY`,
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Circulating supply / yield-earning supply',
            }),
            value: intl.formatMessage(
              {
                defaultMessage: 'x {value} multiplier',
              },
              {
                value: intl.formatNumber(apyBoost * 100, {
                  maximumFractionDigits: 2,
                }),
              },
            ),
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Actual yield distributed',
            }),
            value: intl.formatMessage(
              {
                defaultMessage: '= {value} APY',
              },
              {
                value: intl.formatNumber(selectedItem?.apy ?? 0, {
                  style: 'percent',
                  maximumFractionDigits: 2,
                }),
              },
            ),
          },
        ].map((option) => (
          <ValueLabel
            key={option.label}
            isLoading={isLoading}
            direction="row"
            flexDirection="row-reverse"
            justifyContent="space-between"
            sx={{ py: 1 }}
            labelProps={{
              variant: 'body3',
              sx: {
                width: 0.5,
                fontWeight: 'medium',
                textAlign: 'right',
                textWrap: 'balance',
              },
            }}
            valueProps={{
              variant: 'body2',
              sx: {
                width: 0.5,
                fontWeight: 'medium',
                textAlign: 'left',
              },
            }}
            {...option}
          />
        ))}
      </Stack>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-around"
        divider={<Divider orientation="vertical" flexItem />}
      >
        {[
          {
            label: intl.formatMessage({ defaultMessage: 'Rebasing' }),
            value: intl.formatNumber(selectedItem?.rebasingSupply ?? 0, {
              maximumFractionDigits: 3,
            }),
            labelInfoTooltip: intl.formatMessage(
              {
                defaultMessage: 'Amount of {symbol} that earns yield',
              },
              { symbol: token.symbol },
            ),
          },
          {
            label: intl.formatMessage({ defaultMessage: 'Non-rebasing' }),
            value: intl.formatNumber(selectedItem?.nonRebasingSupply ?? 0, {
              maximumFractionDigits: 3,
            }),
            labelInfoTooltip: intl.formatMessage(
              {
                defaultMessage: 'Amount of {symbol} that gives up yield',
              },
              { symbol: token.symbol },
            ),
          },
        ].map(({ label, value }) => (
          <ValueLabel
            key={label}
            label={label}
            value={value}
            isLoading={isLoading}
            sx={{ px: 1, py: 2 }}
            labelProps={{
              variant: 'body3',
              sx: { fontWeight: 'medium', textAlign: 'center' },
            }}
            valueProps={{
              variant: 'body1',
              sx: { fontWeight: 'bold', textAlign: 'left' },
            }}
          />
        ))}
      </Stack>
    </Card>
  );
};
