import { Box, Stack, Typography } from '@mui/material';
import { Card } from '@origin/shared/components';
import { useIntl } from 'react-intl';

interface Props {
  tokenQuantity: number;
  tokenValue?: string;
  tokenAbbrevation: string;
  price?: string;
  curve?: string;
}

export function SwapRoute({
  tokenQuantity,
  tokenValue,
  price,
  curve,
  tokenAbbrevation,
}: Props) {
  const intl = useIntl();

  const isQuantity = tokenQuantity > 0;
  return (
    <Card
      title={intl.formatMessage({ defaultMessage: 'Swap Routes' })}
      sxCardTitle={{
        borderBottom: 'none',
        ...(isQuantity
          ? {
              backgroundColor: (theme) => theme.palette.background.paper,
              borderTopRightRadius: (theme) => theme.shape.borderRadius,
              borderTopLeftRadius: (theme) => theme.shape.borderRadius,
            }
          : {}),
      }}
      sxCardContent={{
        paddingTop: 0,
        ...(isQuantity
          ? {
              backgroundColor: (theme) => theme.palette.background.paper,
              borderBottomRightRadius: (theme) => theme.shape.borderRadius,
              borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
            }
          : {}),
      }}
      sx={{
        ...(isQuantity
          ? {
              background: (theme) => theme.palette.background.gradient3,
              p: '2px',
            }
          : {}),
      }}
    >
      <Stack
        gap={1.5}
        sx={{
          backgroundColor: 'background.default',
          p: 3.5,
          fontSize: (theme) => theme.typography.pxToRem(14),
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography color="primary.contrastText">
            {isQuantity ? tokenQuantity : 0}&nbsp;
            {tokenAbbrevation}
            &nbsp;
            <Box
              component="span"
              sx={{
                fontSize: (theme) => theme.typography.pxToRem(12),
              }}
            >
              {intl.formatMessage({ defaultMessage: '(estimate)' })}
            </Box>
          </Typography>
          <Typography
            sx={{
              background: (theme) => theme.palette.background.gradientSuccess,
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
          >
            {isQuantity ? intl.formatMessage({ defaultMessage: 'Best' }) : ''}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            '& p': {
              fontSize: (theme) => theme.typography.pxToRem(12),
              color: 'primary.text',
            },
          }}
        >
          <Typography>
            {isQuantity
              ? intl.formatMessage(
                  {
                    defaultMessage:
                      '≈ {value} after fees Effective price: {price}',
                  },
                  { value: tokenValue, price }
                )
              : '-'}
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            {isQuantity ? (
              <>
                <Box
                  component="img"
                  src="https://app.oeth.com/images/gas.png"
                  sx={{ mr: 0.5 }}
                />
                {curve}&nbsp;
                {intl.formatMessage({ defaultMessage: 'ETH curve' })}
              </>
            ) : (
              '-'
            )}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
