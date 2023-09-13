import { alpha, Box, Card, CardHeader, Stack, Typography } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { usePrices } from '@origin/shared/providers';
import { currencyFormat, quantityFormat } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { routeActionLabel, routeActionLogos } from '../constants';

import type { EstimatedSwapRoute } from '../types';

export type SwapRouteCardProps = {
  isSelected: boolean;
  isBest: boolean;
  onSelect: (route: EstimatedSwapRoute) => void;
  route: EstimatedSwapRoute;
};

export function SwapRouteCard({
  isSelected,
  isBest,
  onSelect,
  route,
}: SwapRouteCardProps) {
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
    <Card
      sx={{
        paddingInline: 1.5,
        paddingBlockEnd: 2,
        paddingBlockStart: 3,
        boxShadow: 'none',
        cursor: 'pointer',
        border: (theme) => `1px solid ${theme.palette.grey[800]}`,
        borderRadius: 1,
        ...(isSelected
          ? {
              background: `linear-gradient(var(--mui-palette-grey-800), var(--mui-palette-grey-800)) padding-box,
             linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%) border-box;`,
              borderColor: 'transparent',
            }
          : {
              '&:hover': {
                borderColor: 'transparent',
                background: (
                  theme,
                ) => `linear-gradient(var(--mui-palette-grey-800), var(--mui-palette-grey-800)) padding-box,
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
      role="button"
      onClick={() => onSelect(route)}
    >
      <CardHeader
        sx={{
          padding: 0,
          '& .MuiCardHeader-title': {
            lineHeight: '0.85rem',
          },
        }}
        title={
          <>
            <Stack
              direction="row"
              alignItems="center"
              gap={0.5}
              sx={{ position: 'relative' }}
            >
              <Box
                component="img"
                src={routeActionLogos[route.action]}
                sx={{
                  height: '1rem',
                  width: '1rem',
                }}
              ></Box>
              <Typography color="primary.contrastText" variant="body1">
                {intl.formatNumber(estimatedAmount, quantityFormat)}&nbsp;
                <Typography
                  color="text.secondary"
                  variant="body2"
                  component="span"
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'inline-block',
                    },
                  }}
                >
                  ({intl.formatNumber(convertedAmount, currencyFormat)})
                </Typography>
              </Typography>

              {isBest ? (
                <Box
                  sx={{
                    position: 'absolute',
                    borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
                    background: (theme) => theme.palette.background.gradient1,
                    color: 'primary.contrastText',
                    fontSize: (theme) => theme.typography.pxToRem(12),
                    top: (theme) => theme.spacing(-3),
                    right: (theme) => theme.spacing(-2),
                    paddingInline: 1,
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'Best' })}
                </Box>
              ) : undefined}
            </Stack>

            <Typography
              color="text.secondary"
              variant="body2"
              component="span"
              sx={{
                display: {
                  xs: 'inline-block',
                  md: 'none',
                },
              }}
            >
              ({intl.formatNumber(estimatedAmount, quantityFormat)})
            </Typography>
          </>
        }
      ></CardHeader>

      <Typography
        color="primary.contrastText"
        variant="body2"
        sx={{ marginBlock: { xs: 1.5, md: 1 } }}
      >
        {intl.formatMessage(routeActionLabel[route.action])}
      </Typography>
      <Stack gap={0.5}>
        <Stack
          component={Typography}
          direction="row"
          gap={1}
          justifyContent="space-between"
          variant="body2"
          color="text.secondary"
        >
          <span>{intl.formatMessage({ defaultMessage: 'Rate:' })}</span>
          <Box component="span" color="primary.contrastText">
            1:{route.rate}
          </Box>
        </Stack>
        <Stack
          component={Typography}
          direction="row"
          gap={1}
          justifyContent="space-between"
          variant="body2"
          color="text.secondary"
        >
          <span>
            {intl.formatMessage({
              defaultMessage: 'Gas:',
            })}
          </span>
          <Box component="span" color="primary.contrastText">
            ~{intl.formatNumber(gas, currencyFormat)}
          </Box>
        </Stack>
        {/*route.type === 'redeem' ? (
          <Stack
            component={Typography}
            direction="row"
            gap={1}
            justifyContent="space-between"
            variant="body2"
            color="text.secondary"
          >
            <span>
              {intl.formatMessage({
                defaultMessage: 'Wait time:',
              })}
            </span>            
            <Box
              component="span"
              color={
                route.waitTime === '1 min'
                  ? 'primary.contrastText'
                  : 'error.main'
              }
            >
              ~{route.waitTime}
            </Box>
          </Stack>
        ) : undefined */}
      </Stack>
    </Card>
  );
}
