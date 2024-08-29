import { Card, Stack, Typography } from '@mui/material';
import { MultiTokenIcon, ValueLabel } from '@origin/shared/components';
import { useGasPrice, useRedeemState } from '@origin/shared/providers';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import type { CardProps, TypographyProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const RedeemSplitCard = (props: Omit<CardProps, 'children'>) => {
  const intl = useIntl();
  const [
    { vaultContract, amountIn, amountOut, gas, rate, split, isEstimateLoading },
  ] = useRedeemState();
  const { data: gasPrice, isLoading: gasPriceLoading } = useGasPrice(
    gas,
    vaultContract.chainId,
  );

  const isSelected = !isEstimateLoading && amountOut > 0n;
  const isDisabled = !isEstimateLoading && amountOut === 0n;
  const isEmptyValue = amountIn === 0n;

  return (
    <Card
      {...props}
      sx={[
        {
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
        },
        amountIn > 0n && {
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
          },
        },
        isDisabled
          ? { opacity: 0.5, cursor: 'default' }
          : isSelected
            ? {
                borderColor: 'primary.main',
                backgroundColor: 'background.highlight',
              }
            : {},
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
      role="button"
    >
      <Stack useFlexGap>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            mb: 1.5,
          }}
        >
          <Typography
            noWrap
            sx={{
              fontWeight: 500,
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Redeem for mix via Origin Vault',
            })}
          </Typography>
          <MultiTokenIcon tokens={split.map((s) => s.token)} size={1.25} />
        </Stack>
        <Stack spacing={1.25}>
          <ValueLabel
            {...valueLabelProps}
            label={intl.formatMessage({ defaultMessage: 'Wait time:' })}
            value={
              isEmptyValue ? (
                <EmptyValue />
              ) : (
                intl.formatMessage({ defaultMessage: 'Instant' })
              )
            }
            isLoading={isEstimateLoading}
          />
          <ValueLabel
            {...valueLabelProps}
            label={intl.formatMessage({ defaultMessage: 'Rate:' })}
            value={
              isEmptyValue ? (
                <EmptyValue />
              ) : (
                intl.formatMessage(
                  { defaultMessage: '1:{rate}' },
                  {
                    rate: format(from(rate ?? 0), 3),
                  },
                )
              )
            }
            isLoading={isEstimateLoading}
          />
          <ValueLabel
            {...valueLabelProps}
            label={intl.formatMessage({ defaultMessage: 'Gas:' })}
            value={
              isEmptyValue ? (
                <EmptyValue />
              ) : (
                intl.formatMessage(
                  { defaultMessage: '~{value}' },
                  { value: format(gasPrice?.gasCostUsd ?? from(0), 2) },
                )
              )
            }
            isLoading={isEstimateLoading || gasPriceLoading}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

function EmptyValue(props: TypographyProps) {
  return (
    <Typography
      {...props}
      sx={[
        {
          color: 'text.secondary',
          pr: 0.5,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      -
    </Typography>
  );
}

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  sx: { justifyContent: 'space-between', minWidth: 120 },
  labelProps: {
    variant: 'body3',
    sx: { fontWeight: 'medium', color: 'text.secondary' },
  },
  valueProps: { sx: { fontWeight: 'medium' } },
};
