import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  SectionCard,
  TokenChip,
  useOgnInfo,
  useTxButton,
  useXOgnStakingApy,
} from '@origin/defi/shared';
import {
  BigIntInput,
  InfoTooltipLabel,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { DefaultWallet, FaXmarkRegular } from '@origin/shared/icons';
import { ConnectedButton, TxButton, useFormat } from '@origin/shared/providers';
import {
  getMonthDurationToSeconds,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useDebouncedEffect, useMountEffect } from '@react-hookz/web';
import { differenceInMonths, formatDistanceToNowStrict } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStartLockupPolling } from '../hooks';

import type { ButtonProps, DialogProps } from '@mui/material';
import type { ChangeEvent, MouseEvent } from 'react';

import type { Lockup } from '../types';

export type AddToLockupModalProps = {
  lockup: Lockup;
} & DialogProps;

export const AddToLockupModal = ({
  lockup,
  ...rest
}: AddToLockupModalProps) => {
  const monthDuration = Math.max(
    0,
    differenceInMonths(new Date(lockup.end), new Date()),
  );

  const intl = useIntl();
  const { formatQuantity, formatAmount } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { isConnected, address } = useAccount();
  const startPolling = useStartLockupPolling();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const [amount, setAmount] = useState(0n);
  const [addRewards, setAddRewards] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: staking,
    isLoading: isStakingApyLoading,
    refetch,
  } = useXOgnStakingApy(
    amount + (addRewards && info?.xOgnRewards ? info.xOgnRewards : 0n),
    monthDuration,
    {
      enabled: false,
    },
  );
  const { params: writeParams, callbacks: writeCallbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'stake',
      args: [
        amount,
        getMonthDurationToSeconds(monthDuration),
        address ?? ZERO_ADDRESS,
        addRewards,
        BigInt(lockup.lockupId),
      ],
    },
    activity: {
      endIcon: <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 36 }} />,
      title: intl.formatMessage({
        defaultMessage: 'Add OGN to lockup',
      }),
      subtitle: intl.formatMessage(
        {
          defaultMessage: 'Add {amount} OGN to existing lockup',
        },
        {
          amount: intl.formatNumber(
            +formatUnits(amount, tokens.mainnet.OGN.decimals),
            { notation: 'compact', maximumSignificantDigits: 4 },
          ),
        },
      ),
    },
    callbacks: {
      onWriteSuccess: () => {
        startPolling(lockup.lockupId);
        rest?.onClose?.({}, 'backdropClick');
      },
    },
  });

  useMountEffect(() => {
    refetch();
  });

  useDebouncedEffect(
    () => {
      if (amount > 0n || (addRewards && (info?.xOgnRewards ?? 0n) > 0n)) {
        refetch();
      }
    },
    [amount, addRewards],
    800,
  );

  useEffect(() => {
    if (isLoading && !isNilOrEmpty(staking?.xOgnApyPercentage)) {
      setIsLoading(false);
    }
  }, [
    addRewards,
    amount,
    isLoading,
    isStakingApyLoading,
    staking?.xOgnApyPercentage,
  ]);

  const handleAmountChange = (val: bigint) => {
    setIsLoading(true);
    setAmount(val);
  };

  const handleMaxClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    if (amount !== info?.ognBalance) {
      setIsLoading(true);
      setAmount(info?.ognBalance ?? 0n);
    }
  };

  const handleToggleAddRewards = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    if (info?.xOgnRewards) {
      setIsLoading(true);
      setAddRewards(evt.target.checked);
    }
  };

  const xOgnReceived = amount === 0n ? 0 : staking?.xOgnPreview;
  const votingPowerPercent =
    (xOgnReceived ?? 0) /
    +formatUnits(
      (info?.xOgnTotalSupply as unknown as bigint) ?? 1n,
      tokens.mainnet.OGN.decimals,
    );
  const isStakeDisabled =
    !isConnected || isInfoLoading || isLoading || amount === 0n;

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Add to lockup' })}
        <IconButton
          onClick={(evt) => {
            rest?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width={1}
          mb={1.5}
        >
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'Select the additional OGN you would like to add to your lockup',
            })}
            color="text.secondary"
            fontWeight="medium"
          >
            {intl.formatMessage({
              defaultMessage: 'Amount to add',
            })}
          </InfoTooltipLabel>
          <Button variant="link" onClick={handleMaxClick}>
            <DefaultWallet sx={{ fontSize: 20, mr: 1 }} />
            <Typography noWrap>
              {formatAmount(
                info?.ognBalance ?? 0n,
                tokens.mainnet.OGN.decimals,
              )}
            </Typography>
          </Button>
        </Stack>
        <BigIntInput
          value={amount}
          decimals={tokens.mainnet.OGN.decimals}
          onChange={handleAmountChange}
          endAdornment={
            <TokenChip
              token={tokens.mainnet.OGN}
              iconProps={{ sx: { fontSize: 28 } }}
              labelProps={{ variant: 'body2', fontWeight: 'bold' }}
            />
          }
          inputProps={{ sx: { p: 0, height: 40 } }}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'background.highlight',
            border: '1px solid',
            borderColor: 'divider',
            ...theme.typography.h6,
          }}
        />
        <Accordion
          expanded={addRewards}
          sx={{
            border: 'none',
            my: 3,
          }}
        >
          <AccordionSummary>
            <FormControlLabel
              disabled={isInfoLoading || info?.xOgnRewards === 0n}
              disableTypography
              control={
                <Switch
                  checked={addRewards}
                  onChange={handleToggleAddRewards}
                />
              }
              label={
                <Typography color="text.secondary" fontWeight="medium">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Add unclaimed rewards ({rewards} OGN)',
                    },
                    {
                      rewards: formatAmount(
                        info?.xOgnRewards ?? 0n,
                        tokens.mainnet.OGN.decimals,
                      ),
                    },
                  )}
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1.5, pb: 0, px: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                p: 3,
              }}
            >
              <LoadingLabel
                variant="h6"
                fontWeight="bold"
                isLoading={isInfoLoading}
              >
                {formatAmount(
                  info?.xOgnRewards ?? 0n,
                  tokens.mainnet.OGN.decimals,
                )}
              </LoadingLabel>
              <TokenChip
                token={tokens.mainnet.OGN}
                iconProps={{ sx: { fontSize: 28 } }}
                labelProps={{ variant: 'body2', fontWeight: 'bold' }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Stack
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.highlight',
            mb: 3,
          }}
        >
          <Typography p={3}>
            {intl.formatMessage({ defaultMessage: 'Adding to lockup' })}
          </Typography>
          <Divider />
          <Stack direction="row" justifyContent="space-between" px={3} py={2}>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'OGN' })}
            </Typography>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Time remaining' })}
            </Typography>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Voting power' })}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" px={3} py={2}>
            <Typography>
              {intl.formatNumber(
                +formatUnits(
                  BigInt(lockup.amount),
                  tokens.mainnet.OGN.decimals,
                ),
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                },
              )}
            </Typography>
            <Typography>
              {formatDistanceToNowStrict(new Date(lockup.end), {
                unit: 'month',
                roundingMethod: 'floor',
              })}
            </Typography>
            <Typography>
              {intl.formatNumber(
                +formatUnits(
                  BigInt(lockup.points) ?? 0n,
                  tokens.mainnet.xOGN.decimals,
                ) /
                  +formatUnits(
                    info?.xOgnTotalSupply ?? 1n,
                    tokens.mainnet.xOGN.decimals,
                  ),
                {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                },
              )}
            </Typography>
          </Stack>
        </Stack>
        <SectionCard
          title={intl.formatMessage({
            defaultMessage: 'Total voting power',
          })}
          titleProps={{ color: 'text.secondary', fontWeight: 'medium' }}
          titleInfoTooltip={intl.formatMessage({
            defaultMessage:
              'The updated amount of xOGN you will receive by adding OGN to this lockup.',
          })}
          cardProps={{
            sx: { backgroundColor: 'transparent' },
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              rowGap={1}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <LoadingLabel
                  variant="featured3"
                  fontWeight="bold"
                  color="primary"
                  isLoading={isLoading}
                  sWidth={60}
                >
                  {formatQuantity(
                    staking?.xOgnPreview,
                    tokens.mainnet.xOGN.decimals,
                    '0.00',
                  )}
                </LoadingLabel>
                <TokenIcon
                  token={tokens.mainnet.xOGN}
                  outlined
                  sx={{ fontSize: 28 }}
                />
                <Typography variant="body2" fontWeight="bold">
                  {tokens.mainnet.xOGN.symbol}
                </Typography>
              </Stack>
              <ValueLabel
                label={intl.formatMessage({
                  defaultMessage: 'Voting Power',
                })}
                labelInfoTooltip={intl.formatMessage({
                  defaultMessage:
                    'The percentage of total Origin DeFi DAO voting power represented by this lockup.',
                })}
                labelProps={{ variant: 'mono' }}
                isLoading={isLoading && amount > 0n}
                value={intl.formatMessage(
                  { defaultMessage: '{tilt}{value}' },
                  {
                    tilt:
                      votingPowerPercent <= 1e-6 && votingPowerPercent > 0
                        ? `~ `
                        : '',
                    value:
                      amount > 0n || addRewards
                        ? intl.formatNumber(votingPowerPercent, {
                            style: 'percent',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                          })
                        : '-',
                  },
                )}
                valueProps={{ variant: 'body3', fontWeight: 'medium' }}
                sx={{ alignItems: 'flex-end' }}
              />
            </Stack>
          </CardContent>
        </SectionCard>
      </DialogContent>
      <DialogActions>
        <TxButton
          params={writeParams}
          callbacks={writeCallbacks}
          label={intl.formatMessage({ defaultMessage: 'Stake' })}
          disabled={isStakeDisabled}
          variant="action"
          fullWidth
        />
      </DialogActions>
    </Dialog>
  );
};

export type AddButtonProps = {
  lockup: Lockup;
} & ButtonProps;

export const AddButton = ({ lockup, ...rest }: AddButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConnectedButton
        {...rest}
        onClick={(e) => {
          setOpen(true);
          rest?.onClick?.(e);
        }}
      />
      <AddToLockupModal
        key={open ? 'open' : 'closed'}
        lockup={lockup}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
