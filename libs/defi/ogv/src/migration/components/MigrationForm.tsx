import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { TokenChip, useOgvInfo } from '@origin/defi/shared';
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

import { ogvToOgnRate } from '../constants';
import { useOgvLockupsQuery } from '../queries.generated';
import { ConvertButton } from './ConvertModal';

import type { CardProps, StackProps } from '@mui/material';

import type { Lockup } from '../types';
import type { ConvertButtonProps } from './ConvertModal';

export const MigrationForm = (props: StackProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const once = useRef(true);
  const { data: info, isLoading: isInfoLoading } = useOgvInfo();
  const { data: lockups, isLoading: isLockupsLoading } = useOgvLockupsQuery(
    { address: address?.toLowerCase() ?? ZERO_ADDRESS },
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
      <Grid container spacing={5}>
        <Grid
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          size={{
            xs: 12,
            md: 7,
          }}
        >
          <Typography
            variant="featured3"
            sx={{
              fontWeight: 'medium',
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Select which balances you wish to convert',
            })}
          </Typography>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'The amount of OGV in your wallet',
            })}
            fontWeight="medium"
          >
            {intl.formatMessage({ defaultMessage: 'Your OGV Balance' })}
          </InfoTooltipLabel>
          <Stack {...cardStackProps}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.balance && !!info?.ogvBalance}
                  onChange={() => {
                    setSelected((prev) => ({
                      ...prev,
                      balance: !prev.balance,
                    }));
                  }}
                />
              }
              label={intl.formatNumber(
                +formatUnits(
                  info?.ogvBalance ?? 0n,
                  tokens.mainnet.OGV.decimals,
                ),
                { notation: 'compact', maximumSignificantDigits: 4 },
              )}
              disabled={isInfoLoading || info?.ogvBalance === 0n}
              slotProps={{
                typography: { variant: 'featured2', fontWeight: 'bold' },
              }}
            />
            <TokenChip
              token={tokens.mainnet.OGV}
              iconProps={{ outlined: true, sx: { fontSize: 28 } }}
              labelProps={{ variant: 'body2', fontWeight: 'bold' }}
            />
          </Stack>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'The amount of pending rewards allocated to you',
            })}
            fontWeight="medium"
          >
            {intl.formatMessage({
              defaultMessage: 'Your Unclaimed OGV Rewards',
            })}
          </InfoTooltipLabel>
          <Stack {...cardStackProps}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.rewards && !!info?.veOgvRewards}
                  onChange={() => {
                    setSelected((prev) => ({
                      ...prev,
                      rewards: !prev.rewards,
                    }));
                  }}
                />
              }
              label={formatAmount(
                info?.veOgvRewards ?? 0n,
                tokens.mainnet.OGV.decimals,
              )}
              disabled={isInfoLoading || info?.veOgvRewards === 0n}
              slotProps={{
                typography: { variant: 'featured2', fontWeight: 'bold' },
              }}
            />
            <TokenChip
              token={tokens.mainnet.OGV}
              iconProps={{ outlined: true, sx: { fontSize: 28 } }}
              labelProps={{ variant: 'body2', fontWeight: 'bold' }}
            />
          </Stack>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'Your veOGV staked positions',
            })}
            fontWeight="medium"
          >
            {intl.formatMessage({ defaultMessage: 'Your veOGV Lockups' })}
          </InfoTooltipLabel>
          <Stack
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              backgroundColor: 'background.highlight',
            }}
          >
            <LockupsList
              lockups={lockups}
              selectedLockups={selected.lockups}
              onSelectAllLockups={handleAllSelect}
              onSelectLockup={handleLockupSelect}
            />
          </Stack>
        </Grid>
        <Grid
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <SummaryCard
            ogv={ogvTotal}
            convertProps={{
              ogvBalance: selected.balance ? (info?.ogvBalance ?? 0n) : 0n,
              ogvRewards: selected.rewards ? (info?.veOgvRewards ?? 0n) : 0n,
              veOgvlockups: selected.lockups,
              disabled: isConvertDisabled,
            }}
          />
        </Grid>
      </Grid>
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

  if (isNilOrEmpty(lockups)) {
    return (
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {intl.formatMessage({ defaultMessage: 'No lockups to convert' })}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      {...rest}
      divider={<Divider flexItem />}
      sx={[
        {
          flexGrow: 1,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          p: 2,
          '> *': { color: 'text.secondary' },
        }}
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
          sx={{ m: 0, gap: 3, width: 0.5 }}
        />
        <Typography sx={{ textAlign: 'end', width: 0.5 }}>
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
    <Stack
      direction="row"
      {...rest}
      sx={[
        {
          px: 2,
          py: 1,
          alignItems: 'center',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={isSelected}
            onChange={() => {
              onSelectLockup(lockup);
            }}
          />
        }
        label={formatAmount(
          BigInt(lockup.amount),
          tokens.mainnet.OGV.decimals,
          undefined,
          { minimumFractionDigits: 3, maximumFractionDigits: 3 },
        )}
        sx={{ width: 0.5, m: 0, gap: 3 }}
        slotProps={{
          typography: { fontWeight: 'bold' },
        }}
      />
      <Typography sx={{ textAlign: 'end', width: 0.5 }}>
        {formatDistanceToNowStrict(new Date(lockup.end), {
          unit: 'month',
          roundingMethod: 'floor',
        })}
      </Typography>
    </Stack>
  );
}

type SummaryCardProps = {
  ogv: bigint;
  convertProps: ConvertButtonProps;
} & CardProps;

function SummaryCard({ ogv, convertProps, ...rest }: SummaryCardProps) {
  const intl = useIntl();

  const converted =
    +formatUnits(ogv ?? 0n, tokens.mainnet.OGV.decimals) * ogvToOgnRate;

  return (
    <Card {...rest}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Balance to Convert' })}
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="featured2"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {intl.formatNumber(
              +formatUnits(ogv ?? 0n, tokens.mainnet.OGV.decimals),
            )}
          </Typography>
          <TokenChip
            token={tokens.mainnet.OGV}
            iconProps={{ outlined: true, sx: { fontSize: 28 } }}
            labelProps={{ variant: 'body2', fontWeight: 'bold' }}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack spacing={3}>
          <ValueLabel
            direction="row"
            sx={{ justifyContent: 'space-between' }}
            label={intl.formatMessage({ defaultMessage: 'You will get:' })}
            labelProps={{ variant: 'body3' }}
            value={
              <Stack
                direction="row"
                spacing={0.75}
                sx={{
                  alignItems: 'center',
                }}
              >
                <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 20 }} />
                <Typography
                  sx={{
                    fontWeight: 'medium',
                  }}
                >
                  {intl.formatNumber(converted)}
                </Typography>
              </Stack>
            }
          />
          <ValueLabel
            direction="row"
            sx={{ justifyContent: 'space-between' }}
            label={intl.formatMessage({ defaultMessage: 'Conversion rate:' })}
            labelProps={{ variant: 'body3' }}
            value={intl.formatMessage(
              { defaultMessage: '1 OGV = {rate} OGN' },
              { rate: ogvToOgnRate },
            )}
            valueProps={{ sx: { fontWeight: 'medium' } }}
          />
        </Stack>
      </CardContent>
      <CardContent sx={{ pt: 0 }}>
        <ConvertButton variant="action" fullWidth {...convertProps}>
          {intl.formatMessage({ defaultMessage: 'Convert to OGN' })}
        </ConvertButton>
      </CardContent>
    </Card>
  );
}

const cardStackProps: StackProps = {
  direction: 'row',
  spacing: 1,
  sx: {
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 3,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
    backgroundColor: 'background.highlight',
  },
};
