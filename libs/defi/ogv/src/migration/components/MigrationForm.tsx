import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useOgvInfo } from '@origin/defi/shared';
import {
  InfoTooltipLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { formatDistanceToNowStrict } from 'date-fns';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useOgvLockupsQuery } from '../../queries.generated';
import { ogvToOgnRate } from '../constants';
import { ConvertButton } from './ConvertModal';

import type { StackProps, TypographyProps } from '@mui/material';

import type { Lockup } from '../../types';

export const MigrationForm = (props: StackProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const once = useRef(true);
  const { data: info, isLoading: isInfoLoading } = useOgvInfo();
  const { data: lockups, isLoading: isLockupsLoading } = useOgvLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      enabled: !!address,
      select: (data) => data.ogvLockups,
      refetchOnWindowFocus: false,
    },
  );
  const [selected, setSelected] = useState({
    balance: true,
    rewards: true,
    lockups: lockups ?? [],
  });

  useEffect(() => {
    if (!isLockupsLoading && once.current) {
      setSelected((prev) => ({ ...prev, lockups: lockups ?? [] }));
      once.current = false;
    }
    if (isNilOrEmpty(lockups)) {
      setSelected((prev) => ({ ...prev, lockups: [] }));
    }
  }, [isLockupsLoading, lockups]);

  const handleAllSelect = () => {
    if (selected.lockups.length === lockups?.length) {
      setSelected((prev) => ({ ...prev, lockups: [] }));
    } else {
      setSelected((prev) => ({ ...prev, lockups: lockups ?? [] }));
    }
  };

  const handleLockupSelect = (lockup: Lockup) => {
    const idx = selected.lockups?.findIndex((l) => l.id === lockup.id) ?? -1;
    if (idx > -1) {
      setSelected((prev) => ({
        ...prev,
        lockups: remove(idx, 1, prev.lockups),
      }));
    } else {
      setSelected((prev) => ({ ...prev, lockups: [...prev.lockups, lockup] }));
    }
  };

  const ogvTotal = useMemo(
    () =>
      Object.entries(selected).reduce((acc, [k, v]) => {
        let toAdd = 0n;

        if (k === 'balance' && v && info?.ogvBalance) {
          toAdd += info?.ogvBalance;
        }
        if (k === 'rewards' && v && info?.veOgvRewards) {
          toAdd += info.veOgvRewards;
        }
        if (k === 'lockups' && !isNilOrEmpty(v)) {
          toAdd += (v as Lockup[]).reduce(
            (a, c) => a + BigInt(c?.amount ?? 0),
            0n,
          );
        }

        return acc + toAdd;
      }, 0n),
    [info?.veOgvRewards, info?.ogvBalance, selected],
  );

  const isConvertDisabled =
    isInfoLoading || isLockupsLoading || ogvTotal === 0n;

  return (
    <Stack {...props}>
      <Grid2 container spacing={5}>
        <Grid2
          xs={12}
          md={7}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <Typography variant="h4">
            {intl.formatMessage({
              defaultMessage: 'Select which balances you wish to convert',
            })}
          </Typography>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'The amount of OGV in your wallet',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Your OGV balance' })}
          </InfoTooltipLabel>
          <SuccessCard
            isLoading={isInfoLoading}
            isSuccess={info?.ogvBalance === 0n}
            successLabel={intl.formatMessage({
              defaultMessage: 'No OGV to convert',
            })}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.balance}
                  onChange={() => {
                    setSelected((prev) => ({
                      ...prev,
                      balance: !prev.balance,
                    }));
                  }}
                />
              }
              disableTypography
              label={
                <Stack direction="row" alignItems="center" spacing={1} pl={1}>
                  <TokenIcon
                    token={tokens.mainnet.OGV}
                    outlined
                    sx={{ fontSize: 24 }}
                  />
                  <Typography {...valueProps}>
                    {intl.formatNumber(
                      +formatUnits(
                        info?.ogvBalance ?? 0n,
                        tokens.mainnet.OGV.decimals,
                      ),
                      { notation: 'compact', maximumSignificantDigits: 4 },
                    )}
                  </Typography>
                </Stack>
              }
            />
          </SuccessCard>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'The amount of pending rewards allocated to you',
            })}
          >
            {intl.formatMessage({
              defaultMessage: 'Your Unclaimed OGV Rewards',
            })}
          </InfoTooltipLabel>
          <SuccessCard
            isLoading={isInfoLoading}
            isSuccess={info?.veOgvRewards === 0n}
            successLabel={intl.formatMessage({
              defaultMessage: 'No rewards available to claim',
            })}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.rewards}
                  onChange={() => {
                    setSelected((prev) => ({
                      ...prev,
                      rewards: !prev.rewards,
                    }));
                  }}
                />
              }
              disableTypography
              label={
                <Stack direction="row" alignItems="center" spacing={1} pl={1}>
                  <TokenIcon
                    token={tokens.mainnet.OGV}
                    outlined
                    sx={{ fontSize: 24 }}
                  />
                  <Typography {...valueProps}>
                    {formatAmount(
                      info?.veOgvRewards ?? 0n,
                      tokens.mainnet.OGV.decimals,
                    )}
                  </Typography>
                </Stack>
              }
            />
          </SuccessCard>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'Your veOGV staked positions',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Your veOGV Lockups' })}
          </InfoTooltipLabel>
          <SuccessCard
            isLoading={isLockupsLoading}
            isSuccess={lockups?.length === 0}
            successLabel={intl.formatMessage({
              defaultMessage: 'No existing lockups to convert',
            })}
            p={0}
          >
            <LockupsList
              lockups={lockups}
              selectedLockups={selected.lockups}
              onSelectAllLockups={handleAllSelect}
              onSelectLockup={handleLockupSelect}
            />
          </SuccessCard>
        </Grid2>
        <Grid2
          xs={12}
          md={5}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'All selected balance',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Balance to Convert' })}
          </InfoTooltipLabel>
          <SummaryCard ogv={ogvTotal} />
          <ConvertButton
            variant="action"
            ogvBalance={selected.balance ? info?.ogvBalance ?? 0n : 0n}
            ogvRewards={selected.rewards ? info?.veOgvRewards ?? 0n : 0n}
            veOgvlockups={selected.lockups}
            disabled={isConvertDisabled}
          >
            {intl.formatMessage({ defaultMessage: 'Convert to OGN' })}
          </ConvertButton>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

type LockupsListProps = {
  lockups: Lockup[] | undefined;
  selectedLockups: Lockup[];
  onSelectAllLockups: () => void;
  onSelectLockup: (lockup: Lockup) => void;
} & StackProps;

function LockupsList({
  lockups,
  selectedLockups,
  onSelectAllLockups,
  onSelectLockup,
  ...rest
}: LockupsListProps) {
  const intl = useIntl();

  return (
    <Stack {...rest} flexGrow={1} divider={<Divider flexItem />}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ p: 2, '> *': { color: 'text.secondary' } }}
      >
        <FormControlLabel
          control={
            <Checkbox
              indeterminate={
                selectedLockups.length > 0 &&
                selectedLockups.length !== lockups?.length
              }
              checked={selectedLockups.length === lockups?.length}
              onChange={onSelectAllLockups}
            />
          }
          label={intl.formatMessage({ defaultMessage: 'OGV' })}
          sx={{ m: 0, gap: 1.5, width: 0.5 }}
        />
        <Typography sx={{ width: 0.25 }}>
          {intl.formatMessage({ defaultMessage: 'veOGV' })}
        </Typography>
        <Typography sx={{ width: 0.25 }}>
          {intl.formatMessage({ defaultMessage: 'Time Remaining' })}
        </Typography>
      </Stack>
      {lockups?.map((lockup) => (
        <LockupRow
          key={lockup.id}
          lockup={lockup}
          isSelected={selectedLockups.some((l) => l.id === lockup.id)}
          onSelectLockup={onSelectLockup}
        />
      ))}
    </Stack>
  );
}

type LockupRowProps = {
  lockup: Lockup;
  isSelected: boolean;
  onSelectLockup: (lockup: Lockup) => void;
} & StackProps;

function LockupRow({
  lockup,
  isSelected,
  onSelectLockup,
  ...rest
}: LockupRowProps) {
  const { formatAmount } = useFormat();

  return (
    <Stack direction="row" px={2} py={1} alignItems="center" {...rest}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isSelected}
            onChange={() => {
              onSelectLockup(lockup);
            }}
          />
        }
        disableTypography
        label={
          <Stack direction="row" spacing={1} alignItems="center" pl={1.5}>
            <TokenIcon
              token={tokens.mainnet.OGV}
              outlined
              sx={{ fontSize: 24 }}
            />
            <Typography {...valueProps}>
              {formatAmount(BigInt(lockup.amount), tokens.mainnet.OGV.decimals)}
            </Typography>
          </Stack>
        }
        sx={{ width: 0.5, m: 0 }}
      />
      <Typography sx={{ width: 0.25, transform: 'translateY(2px) ' }}>
        {formatAmount(
          BigInt(lockup.veogv),
          tokens.mainnet.veOGV.decimals,
          undefined,
          { notation: 'compact' },
        )}
      </Typography>
      <Typography sx={{ width: 0.25, transform: 'translateY(2px) ' }}>
        {formatDistanceToNowStrict(new Date(lockup.end), {
          unit: 'month',
          roundingMethod: 'floor',
        })}
      </Typography>
    </Stack>
  );
}

type SummaryCardProps = { ogv: bigint } & StackProps;

function SummaryCard({ ogv, ...rest }: SummaryCardProps) {
  const intl = useIntl();

  const converted =
    +formatUnits(ogv, tokens.mainnet.OGV.decimals) * ogvToOgnRate;

  return (
    <Stack
      {...rest}
      divider={<Divider />}
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
    >
      <Stack px={3} py={2} spacing={0.5}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'OGV balance' })}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <TokenIcon
            token={tokens.mainnet.OGV}
            outlined
            sx={{ fontSize: 32 }}
          />
          <Typography variant="h3" fontWeight={500}>
            {intl.formatNumber(+formatUnits(ogv, tokens.mainnet.OGV.decimals))}
          </Typography>
        </Stack>
      </Stack>
      <Stack px={3} py={2} spacing={0.5}>
        <ValueLabel
          direction="row"
          justifyContent="space-between"
          label={intl.formatMessage({ defaultMessage: 'You will get:' })}
          value={
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <TokenIcon token={tokens.mainnet.OGN} />
              <Typography>{intl.formatNumber(converted)}</Typography>
            </Stack>
          }
        />
        <ValueLabel
          direction="row"
          justifyContent="space-between"
          label={intl.formatMessage({ defaultMessage: 'Conversion Rate:' })}
          value={intl.formatMessage(
            { defaultMessage: '1 OGV = {rate} OGN' },
            { rate: ogvToOgnRate },
          )}
        />
      </Stack>
    </Stack>
  );
}

type SuccessCardProps = {
  successLabel: string;
  isSuccess: boolean;
  isLoading: boolean;
} & StackProps;

function SuccessCard({
  successLabel,
  isSuccess,
  isLoading,
  children,
  ...rest
}: SuccessCardProps) {
  if (isLoading) {
    return (
      <Stack {...cardStackProps} justifyContent="center" p={2} minHeight={68}>
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (isSuccess) {
    return (
      <Stack
        {...cardStackProps}
        p={2}
        direction="row"
        alignItems="center"
        spacing={2}
        minHeight={68}
      >
        <TokenIcon token={tokens.mainnet.OGV} outlined sx={{ fontSize: 24 }} />
        <Typography {...valueProps}>{successLabel}</Typography>
      </Stack>
    );
  }

  return (
    <Stack {...cardStackProps} {...rest}>
      {children}
    </Stack>
  );
}

const valueProps: TypographyProps = {
  fontSize: 20,
};

const cardStackProps: StackProps = {
  direction: 'row',
  alignItems: 'center',
  p: 2,
  spacing: 1,
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  bgcolor: 'background.highlight',
};
