import { useState } from 'react';

import {
  Badge,
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
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
  ApprovalNotification,
  BridgeNotification,
  getTokenPriceKey,
  RedeemNotification,
  SwapNotification,
  ThemeModeIconButton,
  TransactionNotification,
  useActivityState,
  useFormat,
  UserAvatar,
  useTokenPrices,
  useWatchBalances,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { produce } from 'immer';
import { descend, pipe, sort, take } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount, useDisconnect } from 'wagmi';

import type { StackProps } from '@mui/material';
import type {
  ClickAwayPopoverProps,
  NotificationSnackProps,
} from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { Activity } from '@origin/shared/providers';

export const AccountPopover = (
  props: Omit<ClickAwayPopoverProps, 'children'>,
) => {
  const intl = useIntl();
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const [tab, setTab] = useState<'balances' | 'activities'>('balances');

  if (!address) {
    return null;
  }

  return (
    <ClickAwayPopover
      {...props}
      paperProps={{
        sx: {
          minWidth: 350,
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
          <Badge
            badgeContent={
              <WalletIcon walletName={connector?.name} sx={{ fontSize: 10 }} />
            }
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{
              '& .MuiBadge-badge': {
                p: 0,
                minWidth: 0,
                minHeight: 0,
                width: 16,
                height: 16,
                mb: 0.75,
                border: '1px solid',
                borderColor: 'background.highlight',
                backgroundColor: 'background.default',
              },
            }}
          >
            <UserAvatar width={32} />
          </Badge>
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
      <Tabs
        value={tab}
        onChange={(_, value) => {
          setTab(value);
        }}
      >
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Tokens' })}
          value="balances"
          sx={(theme) => ({
            ...theme.typography.body3,
            fontWeight: 'medium',
            py: 1,
            mx: 1,
          })}
        />
        <Tab
          label={intl.formatMessage({ defaultMessage: 'Activity' })}
          value="activities"
          sx={(theme) => ({
            ...theme.typography.body3,
            fontWeight: 'medium',
            py: 1,
          })}
        />
      </Tabs>
      <Divider />
      {tab === 'balances' ? <BalanceList /> : <ActivityList />}
    </ClickAwayPopover>
  );
};

const balanceTokens = [
  tokens.mainnet.ETH,
  tokens.mainnet.OETH,
  tokens.mainnet.OUSD,
];

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
          balance={+formatUnits(balances?.[tok.symbol] ?? 0n, tok.decimals)}
          price={prices?.[getTokenPriceKey(tok)] ?? 0}
          isBalanceLoading={balancesLoading}
          isPriceLoading={isPricesLoading}
        />
      ))}
    </Stack>
  );
}

type BalanceRowProps = {
  token: Token;
  balance: number;
  price: number;
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
  const { formatCurrency } = useFormat();

  return (
    <Stack direction="row" alignItems="center" gap={1} {...rest}>
      <TokenIcon token={token} sx={{ fontSize: 32 }} outlined />
      <Stack flexGrow={1}>
        <ValueLabel
          label={token.symbol}
          value={intl.formatNumber(balance, {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
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
          value={formatCurrency(balance * price)}
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

function ActivityList(props: StackProps) {
  const intl = useIntl();
  const [{ activities, maxVisible }, setActivityState] = useActivityState();

  const sortedActivities = pipe(
    sort(descend((a: Activity) => a.createdOn)),
    take(maxVisible),
  )(activities) as Activity[];

  if (isNilOrEmpty(sortedActivities)) {
    return <EmptyActivity />;
  }

  const handleClearAll = () => {
    setActivityState(
      produce((state) => {
        state.activities = [];
      }),
    );
  };

  return (
    <Stack>
      <Stack pt={3} pb={1.5} {...props}>
        {sortedActivities.map(
          (a) =>
            ({
              approval: (
                <ApprovalNotification
                  key={a.id}
                  {...a}
                  {...notificationProps}
                />
              ),
              bridge: (
                <BridgeNotification key={a.id} {...a} {...notificationProps} />
              ),
              redeem: (
                <RedeemNotification key={a.id} {...a} {...notificationProps} />
              ),
              swap: (
                <SwapNotification key={a.id} {...a} {...notificationProps} />
              ),
              transaction: (
                <TransactionNotification
                  key={a.id}
                  {...a}
                  title={
                    a?.title ??
                    intl.formatMessage({
                      defaultMessage: 'New transaction',
                    })
                  }
                  subtitle={a?.subtitle ?? ''}
                  {...notificationProps}
                />
              ),
            })[a.type],
        )}
      </Stack>
      <Divider />
      <Stack
        px={3}
        py={2}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          color="secondary"
          disabled={isNilOrEmpty(sortedActivities)}
          onClick={handleClearAll}
        >
          {intl.formatMessage({ defaultMessage: 'Clear' })}
        </Button>
      </Stack>
    </Stack>
  );
}

const notificationProps: Partial<NotificationSnackProps> = {
  sx: { px: 3, py: 1.5 },
};

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
