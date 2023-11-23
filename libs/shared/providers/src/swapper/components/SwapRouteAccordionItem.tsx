import { alpha, Box, Skeleton, Stack, Typography } from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { currencyFormat, quantityFormat } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useGasPrice } from '../../gas';
import { usePrices } from '../../prices';
import { useSwapRouteAllowance } from '../hooks';
import { useSwapState } from '../state';

import type { EstimatedSwapRoute } from '../types';

export type SwapRouteAccordionItemProps = {
  route: EstimatedSwapRoute;
  isSelected: boolean;
  onSelect: (route: EstimatedSwapRoute) => void;
};

export function SwapRouteAccordionItem({
  route,
  isSelected,
  onSelect,
}: SwapRouteAccordionItemProps) {
  const intl = useIntl();
  const [{ amountIn, isSwapRoutesLoading, swapActions }] = useSwapState();
  const { data: prices } = usePrices();
  const {
    data: swapGasPrice,
    isLoading: swapGasPriceLoading,
    isFetching: swapGasPriceFetching,
  } = useGasPrice(route.gas, {
    refetchInterval: 30e3,
    enabled: route.gas > 0n,
  });
  const {
    data: approvalGasPrice,
    isLoading: approvalGasPriceLoading,
    isFetching: approvalGasPriceFetching,
  } = useGasPrice(route.approvalGas, {
    refetchInterval: 30e3,
    enabled: route.approvalGas > 0n,
  });
  const { data: allowance } = useSwapRouteAllowance(route);

  const estimatedAmount = +formatUnits(
    route.estimatedAmount,
    route.tokenOut.decimals,
  );
  const convertedAmount =
    (prices?.[route.tokenOut.symbol] ?? 1) * estimatedAmount;
  const isGasLoading =
    isSwapRoutesLoading ||
    (swapGasPriceLoading && swapGasPriceFetching) ||
    (approvalGasPriceLoading && approvalGasPriceFetching);
  const gasPrice =
    (swapGasPrice?.gasCostUsd ?? 0) +
    (allowance < amountIn ? approvalGasPrice?.gasCostUsd ?? 0 : 0);
  const routeLabel = swapActions[route.action].routeLabel;

  return (
    <Box
      sx={{
        borderRadius: 1,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'grey.800',
        paddingInline: 2,
        paddingBlock: 1,

        ...(isSelected
          ? {
              borderColor: 'transparent',
              background: (theme) =>
                `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}) padding-box,
              linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
            }
          : {
              ':hover': {
                borderColor: 'transparent',
                background: (theme) =>
                  `linear-gradient(${theme.palette.grey[800]}, ${
                    theme.palette.grey[800]
                  }) padding-box,
              linear-gradient(90deg, ${alpha(
                theme.palette.primary.main,
                0.4,
              )} 0%, ${alpha(
                theme.palette.primary.dark,
                0.4,
              )} 100%) border-box;`,
              },
            }),
      }}
      onClick={() => onSelect(route)}
      role="button"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={1}
        flexWrap="wrap"
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ flex: { xs: '0 0 100%', md: 1 } }}
        >
          <Box
            component="img"
            src={route.tokenOut.icon}
            sx={{ height: 24, width: 24 }}
          />
          <Box>
            <Typography variant="body2">
              {intl.formatNumber(estimatedAmount, quantityFormat)}
              &nbsp;
              <Box component="span" color="text.secondary">
                ({intl.formatNumber(convertedAmount, currencyFormat)})
              </Box>
            </Typography>
            <Typography variant="body2">
              {intl.formatMessage(routeLabel)}
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={(theme) => ({
            '& p': { textAlign: { xs: 'left', md: 'right' } },
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            },
          })}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              '.value': { color: 'text.primary' },
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Rate' })}&nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage: 'Exchange rate',
              })}
            />
            :&nbsp;
            {isSwapRoutesLoading ? (
              <Skeleton width={60} />
            ) : (
              <span className="value">
                1:{intl.formatNumber(route.rate, quantityFormat)}
              </span>
            )}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ '.value': { color: 'text.primary' } }}
          >
            {intl.formatMessage({ defaultMessage: 'Est gas:' })}&nbsp;
            {isGasLoading ? (
              <Skeleton width={60} />
            ) : (
              <span className="value">
                ~{intl.formatNumber(gasPrice, currencyFormat)}
              </span>
            )}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
