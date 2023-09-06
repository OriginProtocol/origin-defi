import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';
import { currencyFormat, quantityFormat } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { SwapInfo } from './SwapInfo';

import type { Route } from './SwapRoute';

interface Props {
  route: Route;
  selected: number;
  index: number;
  onSelect: (index: number) => void;
}

export function SwapRouteAccordionItem({
  route,
  selected,
  index,
  onSelect,
}: Props) {
  const theme = useTheme();
  const intl = useIntl();
  return (
    <Box
      sx={{
        borderRadius: 1,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'grey.800',
        paddingInline: 2,
        paddingBlock: 1,

        ...(selected === index
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
      onClick={() => onSelect(index)}
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
            src={route.icon as string}
            sx={{
              height: (theme) => theme.typography.pxToRem(24),
              width: (theme) => theme.typography.pxToRem(24),
            }}
          />
          <Box>
            <Typography color="primary.contrastText" variant="body2">
              {intl.formatNumber(route.quantity, quantityFormat)}
              &nbsp;
              <Box component="span" color="text.secondary">
                ({intl.formatNumber(route.value, currencyFormat)})
              </Box>
            </Typography>
            <Typography color="primary.contrastText" variant="body2">
              {route.type === 'swap'
                ? intl.formatMessage(
                    { defaultMessage: 'Swap via {name}' },
                    { name: route.name },
                  )
                : intl.formatMessage(
                    { defaultMessage: 'Swap for {name}' },
                    { name: route.name },
                  )}
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            '& p': { textAlign: { xs: 'left', md: 'right' } },
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Rate&nbsp;
            <SwapInfo />
            &nbsp;
            <Box component="span" color="primary.contrastText">
              1:{intl.formatNumber(route.rate, quantityFormat)}
            </Box>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Est gas:&nbsp;
            <Box component="span" color="primary.contrastText">
              ~{intl.formatNumber(route.transactionCost, currencyFormat)}
            </Box>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
