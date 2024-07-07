import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel, NetworkIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  ConnectedButton,
  getTokenPriceKey,
  useTokenPrices,
  useWatchBalance,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';

import type { SupportedChain } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';
import type { Chain } from 'viem/chains';

export const BalancesCard = ({ title }: { title: string }) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const priceKey = getTokenPriceKey(tokens.mainnet.wOETH);
  const result = useTokenPrices([priceKey]);
  const srcPrice = result.data?.[priceKey];

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        {isConnected ? (
          <Stack spacing={3}>
            <BalanceRow
              chain={mainnet}
              token={tokens.mainnet.wOETH}
              usdRate={srcPrice}
            />
            <BalanceRow
              chain={arbitrum}
              token={tokens.arbitrum.wOETH}
              usdRate={srcPrice}
            />
          </Stack>
        ) : (
          <Stack spacing={3} alignItems={'center'}>
            <Typography>
              {intl.formatMessage({
                defaultMessage: 'Connect your wallet to see your balances',
              })}
            </Typography>
            <ConnectedButton />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export const BalanceRow = ({
  chain,
  token,
  usdRate,
}: {
  chain: Chain;
  token: Token;
  usdRate: Dnum | undefined;
}) => {
  const { data: balance, isLoading } = useWatchBalance({ token });

  const bal = [balance ?? 0n, token.decimals] as Dnum;
  const converted = mul([balance ?? 0n, token.decimals], usdRate ?? 0);

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
        <NetworkIcon chainId={chain.id as SupportedChain} />
        <Typography fontWeight="medium">
          {chain.id === arbitrum.id ? 'Arbitrum' : chain.name}
        </Typography>
      </Stack>
      <Stack direction={'column'} alignItems={'end'}>
        <Stack direction={'row'} spacing={1}>
          <LoadingLabel isLoading={isLoading} sWidth={60} fontWeight="medium">
            {format(bal, {
              digits: getFormatPrecision(bal),
              decimalsRounding: 'ROUND_DOWN',
            })}
          </LoadingLabel>
          <Typography fontWeight="medium">
            {tokens.mainnet.wOETH.symbol}
          </Typography>
        </Stack>
        {balance !== undefined && usdRate && (
          <Typography color={'text.secondary'}>
            ${format(converted, 2)}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
