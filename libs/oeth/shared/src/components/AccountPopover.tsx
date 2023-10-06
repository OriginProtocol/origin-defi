import {
  Box,
  Button,
  Divider,
  Popover,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Icon, LinkIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { AddressLabel } from '@origin/shared/providers';
import { map, prop } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount, useBalance, useContractReads, useDisconnect } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

const balanceTokens = [
  tokens.mainnet.OETH,
  tokens.mainnet.WOETH,
  tokens.mainnet.WETH,
  tokens.mainnet.rETH,
  tokens.mainnet.frxETH,
  tokens.mainnet.sfrxETH,
  tokens.mainnet.stETH,
];

interface Props {
  anchor: HTMLElement | null;
  setAnchor: (value: HTMLButtonElement | null) => void;
}

export function AccountPopover({ anchor, setAnchor }: Props) {
  const intl = useIntl();
  const theme = useTheme();
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: eth, isLoading: ethLoading } = useBalance({
    address,
    token: tokens.mainnet.ETH.address,
    enabled: isConnected,
    watch: true,
  });
  const { data: balances, isLoading: balancesLoading } = useContractReads({
    contracts: balanceTokens.map((t) => ({
      address: t.address,
      abi: t.abi,
      functionName: 'balanceOf',
      args: [address],
    })),
    watch: true,
    enabled: isConnected,
    select: map(prop('result')),
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
        <Stack
          alignItems="center"
          gap={1.5}
          sx={{ px: 2, py: 3 }}
          direction="row"
        >
          <Icon src={`/images/${connector?.id.toLowerCase()}-icon.svg`} />
          <AddressLabel address={address} short />
          <LinkIcon
            size={10}
            url={`https://etherscan.io/address/${address}`}
            sx={{ transform: 'translateY(5%)' }}
          />
        </Stack>
        <Divider />
        <Stack sx={{ px: 2, py: 3 }} gap={2}>
          <BalanceRow
            token={tokens.mainnet.ETH}
            balance={+formatUnits(eth?.value ?? 0n, 18)}
            isBalanceLoading={ethLoading}
          />
          {balanceTokens.map((tok, i) => (
            <BalanceRow
              key={tok.name}
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
      <Box component="img" src={token.icon} sx={{ width: 20 }} />
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
