import {
  alpha,
  Box,
  Button,
  Divider,
  Popover,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Icon, LinkIcon, MiddleTruncated } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { formatAmount } from '@origin/shared/utils';
import { map, prop } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount, useBalance, useContractReads, useDisconnect } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

const balanceTokens = [
  tokens.mainnet.WETH,
  tokens.mainnet.rETH,
  tokens.mainnet.frxETH,
  tokens.mainnet.sfrxETH,
  tokens.mainnet.stETH,
];

const padding = { paddingInline: 2, paddingBlock: 3 };

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
  });
  const { data: balances, isLoading: balancesLoading } = useContractReads({
    contracts: balanceTokens.map((t) => ({
      address: t.address,
      abi: t.abi,
      functionName: 'balanceOf',
      args: [address],
    })),
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
            md: `min(${theme.typography.pxToRem(300)}, 90vw)`,
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
          sx={padding}
        >
          <Typography color="primary.contrastText">
            {intl.formatMessage({ defaultMessage: 'Account' })}
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 7,
              paddingInline: 2.375,
              paddingBlock: 1.25,
              fontSize: '0.75rem',
              lineHeight: '0.75rem',
              '&:hover': {
                background: (theme) => alpha(theme.palette.common.white, 0.05),
              },
            }}
            color="secondary"
            disableElevation
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
          sx={padding}
          direction="row"
          color="primary.contrastText"
        >
          <Icon src={`/images/${connector?.id.toLowerCase()}-icon.svg`} />
          <MiddleTruncated>{address}</MiddleTruncated>
          <LinkIcon
            url={`https://etherscan.io/address/${address}`}
            sx={{ transform: 'translateY(5%)' }}
          />
        </Stack>
        <Divider />
        <Stack sx={padding} gap={2}>
          <BalanceRow
            token={tokens.mainnet.ETH}
            balance={eth.value}
            isBalanceLoading={ethLoading}
          />
          {balanceTokens.map((tok, i) => (
            <BalanceRow
              key={tok.name}
              token={tok}
              balance={balances?.[i] ?? 0n}
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
  balance: bigint;
  isBalanceLoading: boolean;
} & StackProps;

function BalanceRow({
  token,
  balance,
  isBalanceLoading,
  ...rest
}: BalanceRowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      color="primary.contrastText"
      gap={1}
      {...rest}
    >
      <Box component="img" src={token.icon} sx={{ width: 20 }} />
      <Typography minWidth={60}>
        {isBalanceLoading ? (
          <Skeleton width={60} />
        ) : (
          formatAmount(balance, token.decimals)
        )}
      </Typography>
      <Typography color="text.secondary">{token.symbol}</Typography>
    </Stack>
  );
}
