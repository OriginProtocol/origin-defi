import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { TokenChip } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const ApyCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader title="APY" />
      <Divider />
      <CardContent>
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: '30-day trailing',
          })}
          value={intl.formatNumber(0.274, {
            style: 'percent',
            maximumFractionDigits: 2,
          })}
          {...valueLabelProps}
        />
      </CardContent>
    </Card>
  );
};

export const TvlCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'TVL' })} />
      <Divider />
      <CardContent>
        <ValueLabel
          label={
            <TokenChip
              token={tokens.mainnet.ETH}
              iconProps={{ sx: { fontSize: 24 } }}
            />
          }
          value={intl.formatNumber(1440, {
            notation: 'compact',
            maximumFractionDigits: 2,
          })}
          {...valueLabelProps}
        />
      </CardContent>
    </Card>
  );
};

export const AboutCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {intl.formatMessage({
              defaultMessage: 'About this vault',
            })}
          </Typography>
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage:
                'The ARM stETH Redemption Vault provides instant ETH liquidity for stETH users with zero slippage. It earns yield by buying discounted stETH from the market and then redeeming the stETH for ETH 1-1 using Lido’s withdrawal queue.',
            })}
          </Typography>
          <Link
            href="https://docs.originprotocol.com/protocol/arm"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              fontWeight: 'medium',
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Learn more',
            })}
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const VaultBalanceCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Your vault balance' })}
      />
      <Divider />
      <CardContent>
        <ValueLabel
          label={
            <TokenChip
              token={tokens.mainnet.ETH}
              iconProps={{ sx: { fontSize: 24 } }}
            />
          }
          value={intl.formatNumber(50.23, {
            maximumFractionDigits: 2,
          })}
          {...valueLabelProps}
        />
      </CardContent>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row-reverse',
  sx: { justifyContent: 'space-between' },
  valueProps: { variant: 'featured3', sx: { fontWeight: 'bold' } },
};
