import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  InfoTooltip,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useReadContracts } from 'wagmi';

import type { CardProps } from '@mui/material';

export const assets = [
  tokens.mainnet.OETH,
  tokens.mainnet.stETH,
  tokens.mainnet.mETH,
  tokens.mainnet.ETHx,
  tokens.mainnet.sfrxETH,
  tokens.mainnet.swETH,
  tokens.mainnet.rETH,
];

export const AssetDepositedCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { data, isLoading } = useReadContracts({
    contracts: assets.map((a) => ({
      address: contracts.mainnet.lrtDepositPool.address,
      abi: contracts.mainnet.lrtDepositPool.abi,
      functionName: 'getTotalAssetDeposits',
      args: [a.address],
    })),
  });

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Assets Deposited' })}
      />
      <CardContent>
        <Grid2 container spacing={3}>
          {assets.map((a, i) => (
            <Grid2 key={a.symbol} xs={6}>
              <Stack spacing={0.5}>
                <Stack direction="row" gap={0.5} alignItems="center">
                  <TokenIcon symbol={a.symbol} sx={{ width: 20, height: 20 }} />
                  <Typography fontWeight="medium" color="text.secondary">
                    {a.symbol}
                  </Typography>
                  <InfoTooltip tooltipLabel={a.name} />
                </Stack>
                <LoadingLabel
                  isLoading={isLoading}
                  fontWeight="medium"
                  fontSize={16}
                >
                  {formatAmount(data?.[i]?.result as unknown as bigint)}
                </LoadingLabel>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  );
};
