import {
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
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
  tokens.mainnet.WETH,
  tokens.mainnet.OETH,
  tokens.mainnet.stETH,
  tokens.mainnet.rETH,
  tokens.mainnet.ETHx,
  tokens.mainnet.swETH,
  tokens.mainnet.sfrxETH,
  tokens.mainnet.mETH,
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
            <Grid2 key={a.symbol} size={6}>
              <Stack spacing={0.5}>
                <Stack
                  direction="row"
                  sx={{
                    gap: 0.5,
                    alignItems: 'center',
                  }}
                >
                  <TokenIcon
                    token={a.symbol === 'WETH' ? tokens.mainnet.ETH : a}
                    sx={{ width: 20, height: 20 }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 'medium',
                      color: 'text.secondary',
                    }}
                  >
                    {a.symbol === 'WETH' ? tokens.mainnet.ETH.symbol : a.symbol}
                  </Typography>
                  <InfoTooltip
                    tooltipLabel={
                      a.symbol === 'WETH' ? tokens.mainnet.ETH.name : a.name
                    }
                  />
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
