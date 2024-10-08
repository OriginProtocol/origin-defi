import { Card, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  useFormat,
  useTokenPrice,
  useWatchBalance,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const WsuperOethbStats = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected } = useAccount();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    '8453:wsuperOETHb_8453:ETH',
  );
  const { data: bal, isLoading: isBalLoading } = useWatchBalance({
    token: tokens.base.wsuperOETHb,
  });

  const wSuperOethbEthValue = mul(
    [bal ?? 0n, tokens.base.wsuperOETHb.decimals],
    price ?? 0,
  );

  return (
    <Card
      {...props}
      sx={[
        {
          backgroundColor: 'background.default',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'wsuperOETHb Balance' })}
          value={
            isConnected
              ? formatAmount(bal, tokens.base.wsuperOETHb.decimals)
              : '-'
          }
          isLoading={isConnected && isBalLoading}
        />
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Current value (ETH)' })}
          value={
            isConnected
              ? format(wSuperOethbEthValue, {
                  digits: getFormatPrecision(wSuperOethbEthValue),
                  decimalsRounding: 'ROUND_DOWN',
                })
              : '-'
          }
          isLoading={isConnected && isPriceLoading}
        />
      </Stack>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  valueProps: { variant: 'featured2', sx: { fontWeight: 'bold' } },
  sx: { width: 1, alignItems: 'center', p: 3 },
};
