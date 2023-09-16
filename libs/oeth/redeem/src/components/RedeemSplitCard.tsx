import {
  Box,
  Card,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { usePrices } from '@origin/shared/providers';
import { currencyFormat, formatAmount } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useRedeemState } from '../state';
import { Mix } from './Mix';

import type { CardProps } from '@origin/shared/components';

export const RedeemSplitCard = (
  props: Omit<CardProps, 'children' | 'title'>,
) => {
  const intl = useIntl();
  const { data: prices, isLoading: isPricesLoading } = usePrices();
  const [{ split, isEstimateLoading }] = useRedeemState();

  return (
    <Card
      {...props}
      sx={{
        padding: 1.5,
        boxShadow: 'none',
        borderRadius: 1,
        height: 1,
        ...props?.sx,
      }}
    >
      <CardHeader
        sx={{
          padding: (theme) => theme.spacing(0.5, 0, 1.5, 0),
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Mix />
            <Typography>
              {intl.formatMessage({
                defaultMessage: 'Redeem basket of assets',
              })}
            </Typography>
          </Stack>
        }
      />
      <Stack spacing={1} pt={3}>
        {split?.map((s) => {
          const converted =
            +formatUnits(s.amount, s.token.decimals) * prices?.[s.token.symbol];

          return (
            <Stack
              key={s.token.symbol}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box component="img" src={s.token.icon} />
                <Typography>{s.token.symbol}</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
              >
                <Typography color="primary.contrastText">
                  {isEstimateLoading ? (
                    <Skeleton width={80} />
                  ) : (
                    formatAmount(s.amount, s.token.decimals)
                  )}
                </Typography>
                {isPricesLoading || isEstimateLoading ? (
                  <Skeleton width={80} />
                ) : (
                  <Typography sx={{ minWidth: 100, textAlign: 'end' }}>
                    {intl.formatNumber(converted, currencyFormat)}
                  </Typography>
                )}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
};
