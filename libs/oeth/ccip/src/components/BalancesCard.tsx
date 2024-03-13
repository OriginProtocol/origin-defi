import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { ChainIcon } from '@origin/shared/components';
import { formatAmount } from '@origin/shared/utils';
import { arbitrum, mainnet } from 'viem/chains';

import type { Chain } from 'viem/chains';

export const BalancesCard = (params: { title: string }) => {
  return (
    <Card sx={{ width: { xs: 350, sm: 550 } }}>
      <CardHeader title={params.title} />
      <CardContent>
        <Stack spacing={3}>
          <BalanceRow chain={mainnet} amount={0n} />
          <BalanceRow chain={arbitrum} amount={0n} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export const BalanceRow = (props: { chain: Chain; amount: bigint }) => {
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
      <Box>{`${formatAmount(props.amount)} wOETH`}</Box>
    </Stack>
  );
};
