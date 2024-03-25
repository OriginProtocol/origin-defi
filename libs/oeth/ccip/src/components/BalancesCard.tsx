import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { ChainIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  ConnectedButton,
  getTokenPriceKey,
  useTokenPrices,
  useWatchBalance,
} from '@origin/shared/providers';
import { formatAmount } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { parseEther } from 'viem';
import { arbitrum, mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

export const BalancesCard = (params: { title: string }) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const priceKey = getTokenPriceKey(tokens.mainnet.wOETH, 'USD');
  const result = useTokenPrices([priceKey]);
  const srcPrice = result.data?.[priceKey];

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={params.title} />
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

export const BalanceRow = (props: {
  chain: Chain;
  token: Token;
  usdRate: number | undefined;
}) => {
  const { data: balance, isLoading } = useWatchBalance(props.token);
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
        <ChainIcon chainId={props.chain.id} />
        <Box>
          {props.chain.id === arbitrum.id ? 'Arbitrum' : props.chain.name}
        </Box>
      </Stack>
      <Stack direction={'column'} alignItems={'end'}>
        <Stack direction={'row'} spacing={1}>
          {!isLoading && balance !== undefined ? (
            <Typography>{formatAmount(balance)}</Typography>
          ) : (
            <Skeleton width={60} />
          )}
          <Typography>wOETH</Typography>
        </Stack>
        {balance !== undefined && props.usdRate && (
          <Box color={'text.secondary'}>
            {`$${formatAmount(
              (balance * parseEther(props.usdRate.toString())) /
                1_000000000_000000000n,
              18,
              '0.00',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 },
            )}`}
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
