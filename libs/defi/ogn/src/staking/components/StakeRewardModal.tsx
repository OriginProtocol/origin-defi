import { useEffect, useMemo, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  Slider,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useOgnInfo, useOgvInfo } from '@origin/defi/shared';
import {
  BigIntInput,
  InfoTooltipLabel,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  DefaultWallet,
  FaChevronDownRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { ConnectedButton, useFormat } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useDebouncedEffect } from '@react-hookz/web';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { addMonths, formatDuration } from 'date-fns';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStakingAPY } from '../hooks';
import { useOgvLockupsQuery } from '../queries.generated';

import type { ButtonProps, DialogProps, StackProps } from '@mui/material';
import type { ChangeEvent, MouseEvent } from 'react';

import type { Lockup } from '../types';

export const StakeRewardModal = (props: DialogProps) => {
  const intl = useIntl();
  const { formatAmount, formatQuantity } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const [amount, setAmount] = useState(0n);
  const [duration, setDuration] = useState(0);
  const [isBalanceInputVisible, setIsBalanceInputVisible] = useState(false);
  const [addToExisting, setAddToExisting] = useState(false);
  const [lockupId, setLockupId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: staking, refetch } = useStakingAPY(
    amount === 0n ? 100n : amount,
    duration,
    {
      enabled: false,
    },
  );

  useDebouncedEffect(
    () => {
      if (duration > 0) {
        refetch();
      }
    },
    [amount, duration],
    800,
  );

  useEffect(() => {
    if (isLoading && (!isNilOrEmpty(staking?.stakingAPY) || duration === 0)) {
      setIsLoading(false);
    }
  }, [amount, staking, duration, isLoading]);

  const handleAmountChange = (val: bigint) => {
    setIsLoading(duration > 0);
    setAmount(val);
  };

  const handleMaxClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    if (amount !== info?.ognBalance) {
      setAmount(info?.ognBalance ?? 0n);
      setIsBalanceInputVisible(true);
    }
  };

  const handleToggleAddToExisiting = (event: ChangeEvent<HTMLInputElement>) => {
    setAddToExisting(event.target.checked);
    setLockupId(null);
  };

  const handleSelectLockup = (lockupId: string) => {
    setLockupId((prev) => (prev === lockupId ? null : lockupId));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDurationChange = (_: any, newValue: number | number[]) => {
    setIsLoading(true);
    setDuration(newValue as number);
  };

  const votingPowerPercent =
    (staking?.veOGVReceived ?? 0) /
    +formatUnits(info?.xOgnTotalSupply ?? 0n, tokens.mainnet.xOGN.decimals);

  return (
    <Dialog {...props} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Stake rewards' })}
        <IconButton
          onClick={(evt) => {
            props?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack mb={3}>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'The amount of OGN you want to lock',
            })}
            mb={1.5}
            color="text.secondary"
            fontWeight="medium"
          >
            {intl.formatMessage({
              defaultMessage: 'Available to claim and add to your stake ',
            })}
          </InfoTooltipLabel>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: 3,
              backgroundColor: 'background.highlight',
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
            <Stack direction="row" alignItems="center" spacing={1}>
              <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 28 }} />
              <Typography variant="body2" fontWeight="bold">
                {tokens.mainnet.OGN.symbol}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Accordion
          expanded={isBalanceInputVisible}
          disabled={isInfoLoading || info?.ognBalance === 0n}
          onChange={() => {
            setIsBalanceInputVisible(not);
          }}
          sx={{
            border: 'none',
            mb: 3,
            '&.Mui-disabled': { backgroundColor: 'transparent' },
          }}
        >
          <AccordionSummary
            expandIcon={<FaChevronDownRegular />}
            sx={{ pr: 1 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width={1}
              mr={2}
            >
              <InfoTooltipLabel
                tooltipLabel={intl.formatMessage({
                  defaultMessage:
                    'Select the additional OGN you would like to stake with your rewards',
                })}
                color="text.secondary"
                fontWeight="medium"
              >
                {intl.formatMessage({
                  defaultMessage: 'Stake additional OGN from your wallet',
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
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 1.5, pb: 0 }}>
            <BigIntInput
              value={amount}
              decimals={tokens.mainnet.OGN.decimals}
              onChange={handleAmountChange}
              endAdornment={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 28 }} />
                  <Typography variant="body2" fontWeight="bold">
                    {tokens.mainnet.OGN.symbol}
                  </Typography>
                </Stack>
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
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={addToExisting}
          sx={{
            border: 'none',
            mb: 3,
          }}
        >
          <AccordionSummary sx={{ pl: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={addToExisting}
                  onChange={handleToggleAddToExisiting}
                  size="small"
                />
              }
              label={
                <InfoTooltipLabel
                  tooltipLabel={intl.formatMessage({
                    defaultMessage:
                      'Select the lockup you want to add your OGN to',
                  })}
                  color="text.secondary"
                  fontWeight="medium"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add to existing lockup',
                  })}
                </InfoTooltipLabel>
              }
            />
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 1.5, pb: 0 }}>
            <LockupSelect
              lockupId={lockupId}
              onLockupSelect={handleSelectLockup}
            />
          </AccordionDetails>
        </Accordion>
        <Collapse in={!addToExisting}>
          <Stack mb={3}>
            <InfoTooltipLabel
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The length of time you will lock up your OGN in order to receive yield and voting power. There is no way to unstake before your withdrawal date.',
              })}
              mb={1.5}
              color="text.secondary"
              fontWeight="medium"
            >
              {intl.formatMessage({ defaultMessage: 'Lock-up Duration' })}
            </InfoTooltipLabel>
            <Stack
              spacing={2}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                p: 3,
                backgroundColor: 'background.highlight',
              }}
            >
              <Stack
                direction="row"
                alignItems="baseline"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap={1}
              >
                <Typography variant="featured3" minWidth={170} mr={1}>
                  {duration === 0
                    ? intl.formatMessage({ defaultMessage: '0 months' })
                    : formatDuration(
                        {
                          years: Math.floor(duration / 12),
                          months: duration % 12,
                        },
                        {
                          format: ['years', 'months'],
                        },
                      )}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="mono" color="text.secondary">
                    {intl.formatMessage({ defaultMessage: 'Lock up Ends:' })}
                  </Typography>
                  <Typography minWidth={92}>
                    {intl.formatDate(addMonths(new Date(), duration), {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>
              </Stack>
              <Box>
                <Slider
                  value={duration}
                  onChange={handleDurationChange}
                  min={0}
                  max={12}
                  step={1}
                  marks={[
                    {
                      value: 0,
                      label: 0,
                    },
                    {
                      value: 3,
                      label: intl.formatMessage({ defaultMessage: '3m' }),
                    },
                    {
                      value: 6,
                      label: intl.formatMessage({ defaultMessage: '6m' }),
                    },
                    {
                      value: 9,
                      label: intl.formatMessage({ defaultMessage: '9m' }),
                    },
                    {
                      value: 12,
                      label: intl.formatMessage({ defaultMessage: '1y' }),
                    },
                  ]}
                />
              </Box>
            </Stack>
          </Stack>
        </Collapse>
        <Stack mb={3}>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The variable APY currently being earned on staked xOGN.',
            })}
            mb={1.5}
            color="text.secondary"
            fontWeight="medium"
          >
            {intl.formatMessage({ defaultMessage: 'Current Staking vAPY' })}
          </InfoTooltipLabel>
          <Stack
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: 3,
            }}
          >
            <LoadingLabel
              variant="featured3"
              fontWeight="bold"
              color="primary"
              sWidth={60}
              isLoading={isLoading}
            >
              ~
              {intl.formatNumber((staking?.stakingAPY ?? 0) / 100, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
        </Stack>
        <Stack mb={3}>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The amount of xOGN you will receive today in return for your lock-up. The more xOGN you have, the more voting power you have and the more staking rewards you will earn.',
            })}
            mb={1.5}
            color="text.secondary"
            fontWeight="medium"
          >
            {intl.formatMessage({
              defaultMessage: 'Locked Tokens Received Now',
            })}
          </InfoTooltipLabel>
          <Stack
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: 3,
            }}
          >
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
                  isLoading={isLoading && amount > 0n}
                  sWidth={60}
                >
                  {amount > 0n
                    ? formatQuantity(staking?.veOGVReceived)
                    : '0.00'}
                </LoadingLabel>
                <TokenIcon token={tokens.mainnet.xOGN} sx={{ fontSize: 28 }} />
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
                    'The percentage of total Origin DeFi DAO voting power represented by this lock-up.',
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
                      amount > 0n
                        ? intl.formatNumber(votingPowerPercent, {
                            style: 'percent',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                          })
                        : '0.00%',
                  },
                )}
                valueProps={{ variant: 'body3', fontWeight: 'medium' }}
                sx={{ alignItems: 'flex-end' }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Button variant="action" fullWidth>
          {intl.formatMessage({ defaultMessage: 'Stake rewards' })}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

type LockupSelectProps = {
  lockupId: string | null;
  onLockupSelect: (lockupId: string) => void;
} & StackProps;

const columnHelper = createColumnHelper<Lockup>();

function LockupSelect({
  lockupId,
  onLockupSelect,
  ...rest
}: LockupSelectProps) {
  const intl = useIntl();
  const { address } = useAccount();
  const { data: govInfo } = useOgvInfo();
  const { data } = useOgvLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      select: (data) => data?.ogvLockups,
      enabled: !!address,
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: intl.formatMessage({ defaultMessage: 'OGN' }),
        cell: (info) =>
          intl.formatNumber(
            +formatUnits(BigInt(info.getValue()), tokens.mainnet.OGN.decimals),
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            },
          ),
      }),
      columnHelper.accessor('end', {
        header: intl.formatMessage({ defaultMessage: 'Lock-up Ends' }),
        cell: (info) =>
          intl.formatDate(info.getValue(), {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
      }),
      columnHelper.accessor('veogv', {
        id: 'vp',
        header: intl.formatMessage({ defaultMessage: 'Voting power' }),
        cell: (info) =>
          intl.formatNumber(
            +formatUnits(
              BigInt(info.getValue()) ?? 0n,
              tokens.mainnet.xOGN.decimals,
            ) /
              +formatUnits(
                govInfo?.veOgvTotalSupply ?? 1n,
                tokens.mainnet.xOGN.decimals,
              ),
            {
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            },
          ),
      }),
      columnHelper.display({
        id: 'action',
        cell: (info) => {
          return (
            <Radio
              checked={lockupId === info.row.original.lockupId}
              onChange={() => {
                onLockupSelect(info.row.original.lockupId);
              }}
              size="small"
            />
          );
        },
      }),
    ],
    [govInfo?.veOgvTotalSupply, intl, lockupId, onLockupSelect],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack
      {...rest}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        backgroundColor: 'background.highlight',
        ...rest?.sx,
      }}
    >
      <Typography fontWeight="medium" p={3}>
        {intl.formatMessage({ defaultMessage: 'Select lockup' })}
      </Typography>
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ width: 1 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      width: header.getSize(),
                      textAlign: index === 0 ? 'start' : 'end',
                      color: 'text.secondary',
                      py: 2,
                    }}
                  >
                    <Typography noWrap variant="caption1" fontWeight="medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      textAlign: index === 0 ? 'start' : 'end',
                      py: 1,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Stack>
  );
}

export const StakeRewardButton = (props: ButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConnectedButton
        {...props}
        onClick={(e) => {
          setOpen(true);
          props?.onClick?.(e);
        }}
      />
      <StakeRewardModal
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
