import { Card, Stack, Typography } from '@mui/material';
import { LoadingLabel, MultiTokenIcon } from '@origin/shared/components';
import {
  useFormat,
  useGasPrice,
  useRedeemState,
} from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import type { CardProps, StackProps, TypographyProps } from '@mui/material';

export const RedeemSplitCard = (props: Omit<CardProps, 'children'>) => {
  const intl = useIntl();
  const { formatCurrency, formatQuantity } = useFormat();
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
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        ...(amountIn > 0n && {
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }),
        ...(isDisabled
          ? { opacity: 0.5, cursor: 'default' }
          : isSelected
            ? {
                borderColor: 'primary.main',
                backgroundColor: 'background.highlight',
              }
            : {}),
        ...props?.sx,
      }}
      role="button"
    >
      <Stack useFlexGap>
        <Stack {...rowProps} mb={1.5}>
          <Typography noWrap fontWeight={500}>
            {intl.formatMessage({
              defaultMessage: 'Redeem for mix via Origin Vault',
            })}
          </Typography>
          <MultiTokenIcon tokens={split.map((s) => s.token)} size={1} />
        </Stack>
        <Stack spacing={1.25}>
          <Stack {...rowProps}>
            <Typography {...labelProps}>
              {intl.formatMessage({ defaultMessage: 'Wait time:' })}
            </Typography>
            {isEmptyValue ? (
              <EmptyValue />
            ) : (
              <LoadingLabel isLoading={isEstimateLoading}>
                {intl.formatMessage({ defaultMessage: 'Instant' })}
              </LoadingLabel>
            )}
          </Stack>
          <Stack {...rowProps}>
            <Typography {...labelProps}>
              {intl.formatMessage({ defaultMessage: 'Rate:' })}
            </Typography>
            {isEmptyValue ? (
              <EmptyValue />
            ) : (
              <LoadingLabel isLoading={isEstimateLoading}>
                1:{formatQuantity(rate)}
              </LoadingLabel>
            )}
          </Stack>
          <Stack {...rowProps}>
            <Typography {...labelProps}>
              {intl.formatMessage({ defaultMessage: 'Gas:' })}
            </Typography>
            {isEmptyValue ? (
              <EmptyValue />
            ) : (
              <LoadingLabel isLoading={isEstimateLoading || gasPriceLoading}>
                ~{formatCurrency(gasPrice?.gasCostUsd)}
              </LoadingLabel>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

function EmptyValue(props: TypographyProps) {
  return (
    <Typography color="text.secondary" pr={0.5} {...props}>
      -
    </Typography>
  );
}

const rowProps: StackProps = {
  direction: 'row',
  sx: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
  },
};

const labelProps: TypographyProps = {
  color: 'text.secondary',
  variant: 'mono',
};
