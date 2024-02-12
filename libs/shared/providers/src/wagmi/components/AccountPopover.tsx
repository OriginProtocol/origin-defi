import {
  Button,
  Divider,
  Popover,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { ExternalLink, TokenIcon, WalletIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount, useDisconnect } from 'wagmi';

import { useWatchBalance, useWatchContracts } from '../hooks';
import { AddressLabel } from './AddressLabel';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

interface Props {
  balanceTokens?: Token[];
  anchor: HTMLElement | null;
  setAnchor: (value: HTMLButtonElement | null) => void;
}

export function AccountPopover({ anchor, setAnchor, balanceTokens }: Props) {
  const intl = useIntl();
  const theme = useTheme();
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: eth, isLoading: ethLoading } = useWatchBalance();
  const { data: balances, isLoading: balancesLoading } = useWatchContracts({
    contracts: balanceTokens?.map((t) => ({
      address: t.address,
      abi: t.abi,
      functionName: 'balanceOf',
      args: [address],
    })),
    query: {
      enabled: isConnected,
    },
  });

  function close() {
    setAnchor(null);
  }

  if (!isConnected) return null;

  return (
    <Popover
      open={!!anchor}
      anchorEl={anchor}
      onClose={close}
      anchorOrigin={{
        vertical: 50,
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPopover-paper': {
          borderRadius: 1,
          width: (theme) => ({
            xs: '90vw',
            md: `min(${theme.typography.pxToRem(250)}, 90vw)`,
          }),
          [theme.breakpoints.down('md')]: {
            left: '0 !important',
            right: 0,
            marginInline: 'auto',
          },
        },
      }}
    >
      <Stack>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{ px: 2, py: 1.5 }}
        >
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Account' })}
          </Typography>
          <Button
            onClick={() => {
              disconnect();
              close();
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Disconnect' })}
          </Button>
        </Stack>
        <Divider />
        <Stack alignItems="center" sx={{ px: 2, py: 3 }} direction="row">
          <WalletIcon
            walletName={connector?.name}
            sx={{ width: 20, height: 20, mr: 1.5 }}
          />
          <ExternalLink href={`https://etherscan.io/address/${address}`}>
            <AddressLabel address={address} short />
          </ExternalLink>
        </Stack>
        <Divider />
        <Stack sx={{ px: 2, py: 3 }} gap={2}>
          <BalanceRow
            token={tokens.mainnet.ETH}
            balance={+formatUnits(eth ?? 0n, 18)}
            isBalanceLoading={ethLoading}
          />
          {!isNilOrEmpty(balanceTokens) &&
            balanceTokens.map((tok, i) => (
              <BalanceRow
                key={tok.symbol}
                token={tok}
                balance={
                  +formatUnits(
                    (balances?.[i] as unknown as bigint) ?? 0n,
                    tok.decimals,
                  )
                }
                isBalanceLoading={balancesLoading}
              />
            ))}
        </Stack>
      </Stack>
    </Popover>
  );
}

type BalanceRowProps = {
  token: Token;
  balance: number;
  isBalanceLoading: boolean;
} & StackProps;

function BalanceRow({
  token,
  balance,
  isBalanceLoading,
  ...rest
}: BalanceRowProps) {
  const intl = useIntl();

  return (
    <Stack direction="row" alignItems="center" gap={1} {...rest}>
      <TokenIcon symbol={token.symbol} sx={{ width: 20, height: 20 }} />
      <Typography>
        {isBalanceLoading ? (
          <Skeleton width={38} />
        ) : (
          intl.formatNumber(balance, {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          })
        )}
      </Typography>
      <Typography>{token.symbol}</Typography>
    </Stack>
  );
}
