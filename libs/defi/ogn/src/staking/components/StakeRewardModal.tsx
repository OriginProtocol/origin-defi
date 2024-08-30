import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
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
import {
  useApprovalButton,
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
import { useDebouncedEffect } from '@react-hookz/web';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { addMonths, formatDuration } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStartLockupPolling } from '../hooks';
import { useOgnLockupsQuery } from '../queries.generated';

import type { DialogProps, StackProps } from '@mui/material';
import type { ConnectedButtonProps } from '@origin/shared/providers';
import type { ChangeEvent, MouseEvent } from 'react';

import type { Lockup } from '../types';

export const StakeRewardModal = (props: DialogProps) => {
  const intl = useIntl();
  const { formatAmount, formatQuantity } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { address } = useAccount();
  const startPolling = useStartLockupPolling();
  const once = useRef(false);
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const [amount, setAmount] = useState(0n);
  const [duration, setDuration] = useState(12);
  const [addToExisting, setAddToExisting] = useState(false);
  const [lockupId, setLockupId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: staking, refetch } = useXOgnStakingApy(
    amount === 0n ? undefined : amount,
    duration,
    {
      enabled: false,
    },
  );
  const {
    allowance,
    params: approvalParams,
    callbacks: approvalCallbacks,
    label: approvalLabel,
  } = useApprovalButton({
    token: tokens.mainnet.OGN,
    amount:
      amount +
      (info?.xOgnRewards ?? 0n) +
      parseUnits('1', tokens.mainnet.OGN.decimals),
    spender: tokens.mainnet.xOGN.address,
    enableAllowance: true,
  });
  const { params: writeParams, callbacks: writeCallbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'stake',
      args: [
        amount,
        getMonthDurationToSeconds(duration),
        address ?? ZERO_ADDRESS,
        true,
        addToExisting && lockupId ? BigInt(lockupId) : BigInt(-1),
      ],
    },
    callbacks: {
      onWriteSuccess: () => {
        startPolling(addToExisting && lockupId ? lockupId : undefined);
        props?.onClose?.({}, 'backdropClick');
      },
    },
    activity: {
      type: 'stake',
      status: 'idle',
      tokenIdIn: tokens.mainnet.OGN.id,
      amountIn: amount + (info?.xOgnRewards ?? 0n),
      monthDuration: duration,
    },
  });

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
    if (
      !once.current &&
      !isInfoLoading &&
      info?.ognBalance &&
      info.ognBalance > 0n
    ) {
      setAmount(info.ognBalance);
      once.current = true;
    }
  }, [info?.ognBalance, isInfoLoading]);

  useEffect(() => {
    if (
      isLoading &&
      (!isNilOrEmpty(staking?.xOgnApyPercentage) || duration === 0)
    ) {
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
    const dur = Number(newValue);
    if (dur >= 1) {
      setIsLoading(true);
      setDuration(dur);
    }
  };

  const showOgnInput =
    !isInfoLoading && !!info?.ognBalance && info?.ognBalance > 0n;
  const votingPowerPercent =
    (staking?.xOgnPreview ?? 0) /
    +formatUnits(info?.xOgnTotalSupply ?? 0n, tokens.mainnet.xOGN.decimals);
  const isApprovalNeeded =
    !isNilOrEmpty(allowance) &&
    (allowance ?? 0n) < amount + (info?.xOgnRewards ?? 0n);
  const isStakeDisabled =
    (!addToExisting && duration === 0) ||
    (addToExisting && isNilOrEmpty(lockupId)) ||
    isApprovalNeeded;

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
      <DialogContent sx={{ px: 0 }}>
        <Stack
          sx={{
            mb: 3,
            px: 3,
          }}
        >
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
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: 3,
              backgroundColor: 'background.highlight',
            }}
          >
            <LoadingLabel
              variant="h6"
              sx={{ fontWeight: 'bold' }}
              isLoading={isInfoLoading}
            >
              {formatAmount(
                info?.xOgnRewards ?? 0n,
                tokens.mainnet.OGN.decimals,
              )}
            </LoadingLabel>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
              }}
            >
              <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 28 }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {tokens.mainnet.OGN.symbol}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Collapse in={showOgnInput}>
          <Stack
            sx={{
              mb: 3,
              px: 3,
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 1,
                mb: 1.5,
              }}
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
            <BigIntInput
              value={amount}
              decimals={tokens.mainnet.OGN.decimals}
              onChange={handleAmountChange}
              endAdornment={
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 28 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
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
          </Stack>
        </Collapse>
        <Divider />
        <Accordion
          expanded={addToExisting}
          sx={{
            border: 'none',
            my: 3,
          }}
        >
          <AccordionSummary sx={{ pl: 4, pr: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={addToExisting}
                  onChange={handleToggleAddToExisiting}
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
          <AccordionDetails sx={{ px: 3, pt: 1.5, pb: 0 }}>
            <LockupSelect
              lockupId={lockupId}
              onLockupSelect={handleSelectLockup}
            />
          </AccordionDetails>
        </Accordion>
        <Collapse in={!addToExisting}>
          <Stack
            sx={{
              mb: 3,
              px: 3,
            }}
          >
            <InfoTooltipLabel
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The length of time you will lock up your OGN in order to receive yield and voting power. There is no way to unstake before your withdrawal date.',
              })}
              mb={1.5}
              color="text.secondary"
              fontWeight="medium"
            >
              {intl.formatMessage({ defaultMessage: 'Lockup Duration' })}
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
                sx={{
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  rowGap: 1,
                }}
              >
                <Typography
                  variant="featured3"
                  sx={{
                    minWidth: 170,
                    mr: 1,
                  }}
                >
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
                  <Typography
                    variant="mono"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Lockup Ends:' })}
                  </Typography>
                  <Typography
                    sx={{
                      minWidth: 92,
                    }}
                  >
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
        <Stack
          sx={{
            mb: 3,
            px: 3,
          }}
        >
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
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
              sWidth={60}
              isLoading={isLoading}
            >
              ~
              {intl.formatNumber(staking?.xOgnApyPercentage ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
        </Stack>
        <Stack
          sx={{
            px: 3,
          }}
        >
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The amount of xOGN you will receive today in return for your lockup. The more xOGN you have, the more voting power you have and the more staking rewards you will earn.',
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
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                rowGap: 1,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <LoadingLabel
                  variant="featured3"
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                  isLoading={isLoading && amount > 0n}
                  sWidth={60}
                >
                  {amount > 0n
                    ? formatQuantity(staking?.xOgnPreview ?? 0n)
                    : '0.00'}
                </LoadingLabel>
                <TokenIcon token={tokens.mainnet.xOGN} sx={{ fontSize: 28 }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
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
                      amount > 0n
                        ? intl.formatNumber(votingPowerPercent ?? 0, {
                            style: 'percent',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                          })
                        : '0.00%',
                  },
                )}
                valueProps={{ variant: 'body3', sx: { fontWeight: 'medium' } }}
                sx={{ alignItems: 'flex-end' }}
              />
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Collapse in={isApprovalNeeded}>
          <TxButton
            params={approvalParams}
            callbacks={approvalCallbacks}
            label={approvalLabel}
            variant="action"
            fullWidth
            sx={{ mb: 1.5 }}
          />
        </Collapse>
        <TxButton
          params={writeParams}
          callbacks={writeCallbacks}
          variant="action"
          fullWidth
          label={intl.formatMessage({ defaultMessage: 'Stake rewards' })}
          disabled={isStakeDisabled}
        />
      </DialogActions>
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
  const { data: govInfo } = useOgnInfo();
  const { data } = useOgnLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      select: (data) => data?.esLockups,
      enabled: !!address,
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: intl.formatMessage({ defaultMessage: 'OGN' }),
        cell: (info) =>
          intl.formatNumber(
            +formatUnits(
              BigInt(info.getValue() ?? 0),
              tokens.mainnet.OGN.decimals,
            ),
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            },
          ),
      }),
      columnHelper.accessor('end', {
        header: intl.formatMessage({ defaultMessage: 'Lockup Ends' }),
        cell: (info) =>
          intl.formatDate(info.getValue(), {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
      }),
      columnHelper.accessor('points', {
        id: 'vp',
        header: intl.formatMessage({ defaultMessage: 'Voting power' }),
        cell: (info) =>
          intl.formatNumber(
            +formatUnits(
              BigInt(info.getValue() ?? 0),
              tokens.mainnet.xOGN.decimals,
            ) /
              +formatUnits(
                govInfo?.xOgnTotalSupply ?? 1n,
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
    [govInfo?.xOgnTotalSupply, intl, lockupId, onLockupSelect],
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
      <Typography
        sx={{
          fontWeight: 'medium',
          p: 3,
        }}
      >
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
                    sx={[
                      {
                        width: header.getSize(),
                        color: 'text.secondary',
                        py: 2,
                      },
                      index === 0
                        ? {
                            textAlign: 'start',
                          }
                        : {
                            textAlign: 'end',
                          },
                    ]}
                  >
                    <Typography
                      noWrap
                      variant="caption1"
                      sx={{
                        fontWeight: 'medium',
                      }}
                    >
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
                    sx={[
                      {
                        py: 1,
                      },
                      index === 0
                        ? {
                            textAlign: 'start',
                          }
                        : {
                            textAlign: 'end',
                          },
                    ]}
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

export const StakeRewardButton = (props: ConnectedButtonProps) => {
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
