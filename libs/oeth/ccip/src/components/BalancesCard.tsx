import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import {
  ChainIcon,
  ExternalLink,
  LoadingLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  ConnectedButton,
  getTokenPriceKey,
  useTokenPrices,
  useWatchBalance,
} from '@origin/shared/providers';
import { getFormatPrecision, tokenHolderLink } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';

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
  const { address: userAddress } = useAccount();
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
        <ChainIcon chainId={chain.id} />
        <Box>{chain.id === arbitrum.id ? 'Arbitrum' : chain.name}</Box>
        {token.address && userAddress && (
          <ExternalLink
            href={tokenHolderLink(chain, token.address, userAddress)}
          />
        )}
      </Stack>
      <Stack direction={'column'} alignItems={'end'}>
        <Stack direction={'row'} spacing={1}>
          <LoadingLabel isLoading={isLoading} sWidth={60}>
            {format(bal, {
              digits: getFormatPrecision(bal),
              decimalsRounding: 'ROUND_DOWN',
            })}
          </LoadingLabel>
          <Typography>{tokens.mainnet.wOETH.symbol}</Typography>
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
