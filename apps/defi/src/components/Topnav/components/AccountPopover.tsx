import { useState } from 'react';

import {
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { ActivityTile, useActivityState } from '@origin/defi/shared';
import {
  BadgeIcon,
  ClickAwayPopover,
  ClipboardButton,
  NetworkIcon,
  TokenIcon,
  ValueLabel,
  WalletIcon,
} from '@origin/shared/components';
import { getTokenById, tokens } from '@origin/shared/contracts';
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
import {
  getFormatPrecision,
  isInArray,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { format, from, mul } from 'dnum';
import { descend, filter, pipe, sort, take } from 'ramda';
import { useIntl } from 'react-intl';
import { mainnet } from 'viem/chains';
import { useAccount, useConfig, useDisconnect, useWalletClient } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { Activity } from '@origin/defi/shared';
import type { ClickAwayPopoverProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

export const AccountPopover = (
  props: Omit<ClickAwayPopoverProps, 'children'>,
) => {
  const intl = useIntl();
  const { address, connector, chain } = useAccount();
  const [selectedChainId, setSelectedChainId] = useState(
    chain?.id ?? mainnet.id,
  );
  const { disconnect } = useDisconnect();
  const [tab, setTab] = useState<'balances' | 'activities'>('balances');

  const handleSelectChain = (chainId: number) => {
    setSelectedChainId(chainId);
  };

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
      <ChainSelector
        selectedChainId={selectedChainId}
        onSelectChain={handleSelectChain}
      />
      <Divider />
      <Tabs
        value={tab}
        onChange={(_, value) => {
          setTab(value);
        }}
        sx={{ minHeight: 0 }}
      >
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Tokens' })}
          value="balances"
          sx={(theme) => ({
            ...theme.typography.body3,
            fontWeight: 'medium',
            mx: 1,
            py: 1.5,
          })}
        />
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Activity' })}
          value="activities"
          sx={(theme) => ({
            ...theme.typography.body3,
            fontWeight: 'medium',
            py: 1.5,
          })}
        />
      </Tabs>
      <Divider />
      {tab === 'balances' ? (
        <BalanceList selectedChainId={selectedChainId} />
      ) : (
        <ActivityList selectedChainId={selectedChainId} />
      )}
    </ClickAwayPopover>
  );
};

type ChainSelectorProps = {
  selectedChainId: number;
  onSelectChain: (chainId: number) => void;
} & StackProps;

function ChainSelector({
  selectedChainId,
  onSelectChain,
  ...rest
}: ChainSelectorProps) {
  const { chains } = useConfig();

  return (
    <Stack direction="row" alignItems="center" {...rest}>
      {chains.map((c) => (
        <Button
          key={c.id}
          onClick={() => {
            onSelectChain(c.id);
          }}
          variant="text"
          fullWidth
          sx={{
            borderRadius: 0,
            backgroundColor:
              c.id === selectedChainId ? 'primary.faded' : 'transparent',
          }}
        >
          <NetworkIcon chainId={c.id} />
        </Button>
      ))}
    </Stack>
  );
}

const balanceTokens = [
  tokens.mainnet.ETH,
  tokens.mainnet.WETH,
  tokens.mainnet.OETH,
  tokens.mainnet.OUSD,
  tokens.mainnet.OGN,
  tokens.arbitrum.ETH,
  tokens.arbitrum.WETH,
  tokens.arbitrum.wOETH,
  tokens.base.ETH,
  tokens.base.WETH,
  tokens.base.superOETHb,
  tokens.base.wsuperOETHb,
  tokens.optimism.ETH,
  tokens.optimism.WETH,
];

type BalanceListProps = { selectedChainId: number } & StackProps;

function BalanceList({ selectedChainId, ...rest }: BalanceListProps) {
  const { data: balances, isLoading: balancesLoading } = useWatchBalances({
    tokens: balanceTokens ?? [],
  });
  const { data: prices, isLoading: isPricesLoading } = useTokenPrices(
    balanceTokens?.map((t) => getTokenPriceKey(t)),
  );

  return (
    <Stack px={2} py={3} spacing={2} {...rest}>
      {balanceTokens
        .filter((t) => t.chainId === selectedChainId)
        .map((tok) => (
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

const tokensToAdd = [tokens.base.superOETHb.id, tokens.base.wsuperOETHb.id];

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
  const intl = useIntl();
  const { isConnected, connector } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleAddTokenToWallet = () => {
    walletClient?.watchAsset({
      type: 'ERC20',
      options: {
        address: token.address ?? ZERO_ADDRESS,
        decimals: token.decimals,
        symbol: token.symbol,
      },
    });
  };

  return (
    <Stack direction="row" alignItems="center" gap={1} {...rest}>
      <TokenIcon token={token} sx={{ fontSize: 32 }} outlined />
      <Stack flexGrow={1}>
        <ValueLabel
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="text.primary"
              >
                {token.symbol}
              </Typography>
              {isInArray(token.id, tokensToAdd) && isConnected && (
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Add to metamask',
                  })}
                >
                  <Button
                    variant="link"
                    color="secondary"
                    onClick={handleAddTokenToWallet}
                  >
                    <WalletIcon
                      walletName={connector?.name}
                      sx={{ fontSize: 12 }}
                    />
                  </Button>
                </Tooltip>
              )}
            </Stack>
          }
          value={format(balance, {
            digits: getFormatPrecision(balance),
            decimalsRounding: 'ROUND_DOWN',
          })}
          isLoading={isBalanceLoading}
          direction="row"
          justifyContent="space-between"
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

type ActivityListProps = { selectedChainId: number } & StackProps;

function ActivityList({ selectedChainId, ...rest }: ActivityListProps) {
  const [{ activities, maxVisible }] = useActivityState();

  const sortedActivities = pipe(
    filter((a: Activity) => {
      const { chainId } = getTokenById(a.tokenIdIn);

      return chainId === selectedChainId;
    }),
    sort(descend((a: Activity) => a?.createdOn ?? a.status)),
    take(maxVisible),
  )(activities) as Activity[];

  if (isNilOrEmpty(sortedActivities)) {
    return <EmptyActivity />;
  }

  return (
    <Stack
      {...rest}
      sx={{
        pt: 3,
        pb: 1.5,
        maxHeight: '50dvh',
        overflowY: 'auto',
        overflowX: 'hidden',
        ...rest?.sx,
      }}
    >
      {sortedActivities.map((a) => (
        <ActivityTile
          key={a.id}
          activity={a}
          sx={{ width: 1, px: 3, py: 1.5 }}
        />
      ))}
    </Stack>
  );
}

function EmptyActivity(props: StackProps) {
  const intl = useIntl();

  return (
    <Stack {...props} justifyContent="center" alignItems="center" py={5}>
      <Typography color="text.secondary">
        {intl.formatMessage({ defaultMessage: 'No Activity' })}
      </Typography>
    </Stack>
  );
}
