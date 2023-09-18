import {
  Box,
  Card,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { tokens } from '@origin/shared/contracts';
import { useGasPrice, usePrices } from '@origin/shared/providers';
import {
  currencyFormat,
  formatAmount,
  quantityFormat,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { MIX_TOKEN } from '../constants';
import { useRedeemState } from '../state';

import type { CardProps } from '@mui/material';

export function RouteCard(props: Omit<CardProps, 'onSelect'>) {
  const intl = useIntl();
  const { data: prices } = usePrices();
  const [{ amountOut, gas, rate, isEstimateLoading }] = useRedeemState();
  const { data: gasPrice, isLoading: gasPriceLoading } = useGasPrice(gas);

  const estimatedAmount = +formatUnits(amountOut, MIX_TOKEN.decimals);
  const convertedAmount =
    (prices?.[tokens.mainnet.WETH.symbol] ?? 1) * estimatedAmount;

  return (
    <Card
      {...props}
      sx={{
        paddingInline: 1.5,
        paddingBlockEnd: 2,
        paddingBlockStart: 3,
        boxShadow: 'none',
        borderRadius: 1,
        height: 1,
        ...props?.sx,
      }}
    >
      <CardHeader
        sx={{
          padding: 0,
        }}
        title={
          <Grid2 container spacing={0.5} position="relative">
            <Grid2 display="flex" alignItems="center">
              {isEstimateLoading ? (
                <Skeleton variant="circular" width={16} height={16} />
              ) : (
                <Box
                  component="img"
                  src={'/images/protocols/origin.svg'}
                  height={16}
                  width={16}
                  mr={0.5}
                />
              )}
            </Grid2>
            <Grid2 display="flex" alignItems="center">
              <Typography color="primary.contrastText" variant="body1">
                {isEstimateLoading ? (
                  <Skeleton width={100} />
                ) : (
                  formatAmount(amountOut, MIX_TOKEN.decimals)
                )}
              </Typography>
            </Grid2>
            <Grid2 display="flex" alignItems="center">
              <Typography color="text.secondary" variant="body2" noWrap>
                {isEstimateLoading ? (
                  <Skeleton width={60} />
                ) : (
                  `(${intl.formatNumber(convertedAmount, currencyFormat)})`
                )}
              </Typography>
            </Grid2>
            <Box
              sx={{
                position: 'absolute',
                borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
                background: (theme) => theme.palette.background.gradient1,
                color: 'primary.contrastText',
                fontSize: (theme) => theme.typography.pxToRem(12),
                top: (theme) => theme.spacing(-3),
                right: (theme) => theme.spacing(-1),
                paddingInline: 1,
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Best' })}
            </Box>
          </Grid2>
        }
      ></CardHeader>

      <Typography
        color="primary.contrastText"
        variant="body2"
        sx={{ marginBlock: { xs: 1.5, md: 1 } }}
      >
        {isEstimateLoading ? (
          <Skeleton width={80} />
        ) : (
          intl.formatMessage({
            defaultMessage: 'Request withdrawal via OETH vault',
          })
        )}
      </Typography>
      <Stack gap={0.5}>
        <Stack
          direction="row"
          gap={1}
          justifyContent="space-between"
          color="text.secondary"
        >
          <Typography variant="body2">
            {intl.formatMessage({ defaultMessage: 'Rate:' })}
          </Typography>
          <Typography color="primary.contrastText" variant="body2">
            {isEstimateLoading ? (
              <Skeleton width={60} />
            ) : (
              `1:${intl.formatNumber(rate, quantityFormat)}`
            )}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          justifyContent="space-between"
          color="text.secondary"
        >
          <Typography variant="body2">
            {intl.formatMessage({ defaultMessage: 'Gas:' })}
          </Typography>
          <Typography color="primary.contrastText" variant="body2">
            {isEstimateLoading || gasPriceLoading ? (
              <Skeleton width={60} />
            ) : (
              `~${intl.formatNumber(gasPrice?.gasCostUsd, currencyFormat)}`
            )}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          justifyContent="space-between"
          color="text.secondary"
        >
          <Typography variant="body2">
            {intl.formatMessage({ defaultMessage: 'Wait time:' })}
          </Typography>
          <Typography color="primary.contrastText" variant="body2">
            {isEstimateLoading ? (
              <Skeleton width={60} />
            ) : (
              intl.formatMessage({ defaultMessage: '~3 days' })
            )}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
