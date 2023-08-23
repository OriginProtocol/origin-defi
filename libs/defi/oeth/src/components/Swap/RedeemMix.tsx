import { Stack, Card, alpha, Box, Typography, Divider } from '@mui/material';
import { Mix } from 'libs/shared/components/src/Mix';
import { Redeem, Route } from './SwapRoute';
import { useIntl } from 'react-intl';
import { currencyFormat, quantityFormat } from '@origin/shared/components';
import { SwapInfo } from './SwapInfo';
import { Icon } from 'libs/shared/components/src/top-nav/Icon';

interface Props {
  onSelect: (index: number) => void;
  index: number;
  selected: number;
  route: Route;
  // no idea if this prop makes sense 🤪 -> prob it needs to be refactored
  composition: {
    icon: string;
    name: string;
    quantity: number;
    value: number;
  }[];
}

export function RedeemMix({
  route,
  index,
  selected,
  onSelect,
  composition,
}: Props) {
  const intl = useIntl();
  return (
    <Card
      sx={{
        border: '1px solid',
        // @ts-expect-error border is overwritten in hover
        borderColor: 'grey.800',
        borderRadius: 1 / 2,
        paddingInline: 0,
        paddingBlock: 1,
        boxShadow: 'none',
        cursor: 'pointer',
        ...(selected === index
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
      onClick={() => onSelect(index)}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ paddingInline: { xs: 1, md: 1.5 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ paddingBlockEnd: 1, maxWidth: { xs: '50%', md: 'none' } }}
          gap={1}
        >
          <Mix
            imgSrc={route.icon as string[]}
            size={1.5}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          />
          <Box>
            <Typography color="primary.contrastText">
              {intl.formatNumber(route.quantity, quantityFormat)}&nbsp;
              <Box
                component="span"
                sx={{
                  color: 'text.secondary',
                  fontSize: (theme) => theme.typography.pxToRem(12),
                  fontWeight: 400,
                  fontStyle: 'normal',
                  lineHeight: (theme) => theme.typography.pxToRem(20),
                }}
              >
                ({intl.formatNumber(route.value, currencyFormat)})
              </Box>
            </Typography>
            <Typography variant="body2" color="primary.contrastText">
              {route.name}
            </Typography>
          </Box>
        </Stack>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'right' }}
          >
            {intl.formatMessage({ defaultMessage: 'Gas:' })}&nbsp;
            <Box component="span" sx={{ color: 'primary.contrastText' }}>
              ~{intl.formatNumber(route.transactionCost, currencyFormat)}
            </Box>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'right' }}
          >
            {intl.formatMessage({ defaultMessage: 'Waiting time:' })}&nbsp;
            <Box component="span" sx={{ color: 'primary.contrastText' }}>
              {/* TODO better handling of this duration */}~
              {(route as Redeem).waitTime}
            </Box>
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <Stack
        justifyContent="flex-end"
        component={Typography}
        variant="body2"
        color="text.secondary"
        alignItems="center"
        direction="row"
        sx={{ paddingBlock: 1, paddingInline: { xs: 1, md: 1.5 } }}
      >
        {intl.formatMessage({ defaultMessage: 'Rate' })}&nbsp;
        <Box
          component="span"
          sx={{ color: 'primary.contrastText', marginInlineEnd: 0.5 }}
        >
          1:{route.rate}
        </Box>
        &nbsp;
        <SwapInfo />
      </Stack>
      <Divider sx={{ marginBlockEnd: 1 }} />

      {composition.map((item) => (
        <Stack
          component={Typography}
          direction="row"
          variant="body2"
          alignItems="center"
          justifyContent="space-between"
          sx={{ paddingBlock: 1, paddingInline: { xs: 1, md: 1.5 } }}
        >
          <Stack direction="row" gap={1} alignItems="center" sx={{ flex: 1 }}>
            <Icon src={item.icon} />
            <Box component="span" sx={{ color: 'primary.contrastText' }}>
              {item.name}
            </Box>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ flex: 1 }}
          >
            <Box
              component="span"
              sx={{
                color: 'primary.contrastText',
                textAlign: 'right',
                flexBasis: '3rem',
              }}
            >
              {intl.formatNumber(item.quantity, quantityFormat)}
            </Box>
            <Box
              component="span"
              sx={{ color: 'text.secondary', textAlign: 'right' }}
            >
              {intl.formatNumber(item.value, currencyFormat)}
            </Box>
          </Stack>
        </Stack>
      ))}
    </Card>
  );
}
