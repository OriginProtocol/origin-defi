import { Button, Divider, Stack } from '@mui/material';
import {
  BadgeIcon,
  ClickAwayPopover,
  ClipboardButton,
  TokenIcon,
  ValueLabel,
  WalletIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaArrowRightFromBracketRegular,
  FaCopyRegular,
} from '@origin/shared/icons';
import {
  AddressLabel,
  getTokenPriceKey,
  ThemeModeIconButton,
  UserAvatar,
  useTokenPrices,
  useWatchBalances,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, from, mul } from 'dnum';
import { useAccount, useDisconnect } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { ClickAwayPopoverProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

export const AccountPopover = (
  props: Omit<ClickAwayPopoverProps, 'children'>,
) => {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();

  if (!address) {
    return null;
  }

  return (
    <ClickAwayPopover
      {...props}
      paperProps={{
        sx: {
          minWidth: 350,
          maxWidth: 370,
          mt: 1,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.highlight',
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={3}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <BadgeIcon
            badgeContent={
              <WalletIcon walletName={connector?.name} sx={{ fontSize: 10 }} />
            }
          >
            <UserAvatar width={32} />
          </BadgeIcon>
          <AddressLabel
            address={address}
            variant="body1"
            fontWeight="medium"
            sx={{ maxWidth: 70 }}
          />
          <ClipboardButton
            value={address}
            variant="text"
            color="secondary"
            size="small"
            hideLabel
          >
            <FaCopyRegular />
          </ClipboardButton>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ThemeModeIconButton
            variant="outlined"
            color="secondary"
            size="small"
          />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => {
              disconnect();
            }}
          >
            <FaArrowRightFromBracketRegular sx={{ fontSize: 14 }} />
          </Button>
        </Stack>
      </Stack>
      <Divider />
      <BalanceList />
    </ClickAwayPopover>
  );
};

const balanceTokens = [tokens.mainnet.ETH, tokens.mainnet.OETH];

function BalanceList(props: StackProps) {
  const { data: balances, isLoading: balancesLoading } = useWatchBalances({
    tokens: balanceTokens ?? [],
  });
  const { data: prices, isLoading: isPricesLoading } = useTokenPrices(
    balanceTokens?.map((t) => getTokenPriceKey(t)),
  );

  return (
    <Stack px={2} py={3} spacing={2} {...props}>
      {balanceTokens.map((tok) => (
        <BalanceRow
          key={tok.symbol}
          token={tok}
          balance={[balances?.[tok.id] ?? 0n, tok.decimals]}
          price={prices?.[getTokenPriceKey(tok)] ?? from(0)}
          isBalanceLoading={balancesLoading}
          isPriceLoading={isPricesLoading}
        />
      ))}
    </Stack>
  );
}

type BalanceRowProps = {
  token: Token;
  balance: Dnum;
  price: Dnum;
  isBalanceLoading: boolean;
  isPriceLoading: boolean;
} & StackProps;

function BalanceRow({
  token,
  balance,
  price,
  isBalanceLoading,
  isPriceLoading,
  ...rest
}: BalanceRowProps) {
  return (
    <Stack direction="row" alignItems="center" gap={1} {...rest}>
      <TokenIcon token={token} sx={{ fontSize: 32 }} outlined />
      <Stack flexGrow={1}>
        <ValueLabel
          label={token.symbol}
          value={format(balance, {
            digits: getFormatPrecision(balance),
            decimalsRounding: 'ROUND_DOWN',
          })}
          isLoading={isBalanceLoading}
          direction="row"
          justifyContent="space-between"
          labelProps={{
            variant: 'body2',
            fontWeight: 'bold',
            color: 'text.primary',
          }}
          valueProps={{
            variant: 'body2',
            fontWeight: 'bold',
            color: 'text.primary',
            textAlign: 'end',
          }}
        />
        <ValueLabel
          label={token.name}
          value={`$${format(mul(balance, price), 2)}`}
          isLoading={isPriceLoading}
          direction="row"
          justifyContent="space-between"
          labelProps={{
            variant: 'body3',
          }}
          valueProps={{
            variant: 'caption1',
            color: 'text.secondary',
            textAlign: 'end',
          }}
        />
      </Stack>
    </Stack>
  );
}
