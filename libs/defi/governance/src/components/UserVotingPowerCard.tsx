import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { Skeleton } from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ConnectedButton, useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';

import type { CardProps } from '@mui/material';

export const UserVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        address: tokens.mainnet.veOGV.address,
        abi: tokens.mainnet.veOGV.abi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: tokens.mainnet.veOGV.address,
        abi: tokens.mainnet.veOGV.abi,
        functionName: 'totalSupply',
      },
    ],
  });

  const balance = +formatUnits(
    data?.[0]?.result ?? 0n,
    tokens.mainnet.veOGV.decimals,
  );
  const total = +formatUnits(
    data?.[1]?.result ?? 0n,
    tokens.mainnet.veOGV.decimals,
  );

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My voting power' })}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>{tokens.mainnet.veOGV.symbol}</Typography>
        <Stack direction="row" spacing={1}>
          <TokenIcon
            symbol={tokens.mainnet.veOGV.symbol}
            width={20}
            sx={{ transform: 'translateY(4px)' }}
          />

          <Typography>
            {isLoading ? <Skeleton width={60} /> : formatAmount(balance)}
          </Typography>
        </Stack>
      </CardContent>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography>
          {intl.formatMessage({
            defaultMessage: 'Percentage of total voting power',
          })}
        </Typography>
        <Typography>
          {isLoading ? (
            <Skeleton width={60} />
          ) : (
            intl.formatNumber(balance / total, {
              style: 'percent',
              maximumFractionDigits: 2,
            })
          )}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {isConnected ? (
          <>
            <Button variant="outlined" color="secondary" sx={{ fontSize: 12 }}>
              {intl.formatMessage({
                defaultMessage: 'Delegate my voting power',
              })}
            </Button>
            <Button variant="outlined" color="secondary" sx={{ fontSize: 12 }}>
              {intl.formatMessage({ defaultMessage: 'View my stake' })}
            </Button>
          </>
        ) : (
          <ConnectedButton
            variant="outlined"
            color="secondary"
            sx={{ fontSize: 12 }}
          />
        )}
      </CardActions>
    </Card>
  );
};
