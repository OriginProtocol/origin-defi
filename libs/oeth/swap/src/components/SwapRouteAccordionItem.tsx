import { alpha, Box, Stack, Typography } from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { usePrices } from '@origin/shared/providers';
import { currencyFormat, quantityFormat } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { routeActionLabel, routeActionLogos } from '../constants';

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
  const { data: prices } = usePrices();

  const estimatedAmount = +formatUnits(
    route.estimatedAmount,
    route.tokenOut.decimals,
  );
  const convertedAmount =
    (prices?.[route.tokenOut.symbol] ?? 1) * estimatedAmount;
  const gas = +formatUnits(route.gas, tokens.mainnet.ETH.decimals);

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
            src={routeActionLogos[route.action]}
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
              {intl.formatMessage(routeActionLabel[route.action])}
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
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {intl.formatMessage({ defaultMessage: 'Rate' })}&nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage: 'Exchange rate',
              })}
            />
            &nbsp;
            <Box component="span">
              1:{intl.formatNumber(route.rate, quantityFormat)}
            </Box>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Est gas' })}&nbsp;
            <Box component="span">
              ~{intl.formatNumber(gas, currencyFormat)}
            </Box>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
