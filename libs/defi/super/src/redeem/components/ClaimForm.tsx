import { useMemo, useState } from 'react';

import {
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import { SectionCard, useTxButton } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import {
  FaArrowUpRightRegular,
  FaCircleCheckRegular,
  FaClockRegular,
} from '@origin/shared/icons';
import { TxButton, useRefresher } from '@origin/shared/providers';
import {
  getFormatPrecision,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { add, eq, format, from } from 'dnum';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount, useConfig } from 'wagmi';

import { useWithdrawalRequests } from '../hooks';

import type { StackProps } from '@mui/material';
import type { Dnum } from 'dnum';

import type { WithdrawalRequest } from '../types';

export const ClaimForm = (props: StackProps) => {
  const intl = useIntl();
  const { address } = useAccount();
  const config = useConfig();
  const queryClient = useQueryClient();
  const [selectedClaimIds, setSelectedClaimIds] = useState<bigint[]>([]);
  const { data, isLoading: isRequestsLoading } = useWithdrawalRequests();
  const requests = data?.filter((r) => !r.claimed);
  const { startRefresh, status } = useRefresher<WithdrawalRequest[]>({
    queryKey: useWithdrawalRequests.getKey(address ?? ZERO_ADDRESS),
    queryFn: useWithdrawalRequests.fetcher(config, queryClient),
    isResultProcessed: (prev, next) =>
      prev.filter((r) => r.claimed).length <
      next.filter((r) => r.claimed).length,
    onSettled: () => {
      setSelectedClaimIds([]);
      queryClient.invalidateQueries();
    },
  });
  const args =
    selectedClaimIds.length === 1
      ? {
          contract: contracts.base.superOETHbVault,
          functionName: 'claimWithdrawal',
          args: [selectedClaimIds[0]],
        }
      : {
          contract: contracts.base.superOETHbVault,
          functionName: 'claimWithdrawals',
          args: [selectedClaimIds],
        };
  const selectedAmount = useMemo(
    () =>
      selectedClaimIds.reduce((acc, curr) => {
        const req = requests?.find((r) => r.requestId === curr);

        return add([req?.amount ?? 0n, tokens.mainnet.WETH.decimals], acc);
      }, from(0)),
    [requests, selectedClaimIds],
  );
  const { params, callbacks, gasPrice, isWriteGasLoading } = useTxButton({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: args as any,
    callbacks: {
      onTxSigned: () => {
        startRefresh(data);
      },
    },
    activity: {
      type: 'claim-withdrawal',
      status: 'idle',
      amountIn: selectedAmount[0],
      tokenIdIn: tokens.mainnet.WETH.id,
    },
    enableGas: true,
  });

  const handleClaimClick = (requestId: bigint) => () => {
    const idx = selectedClaimIds.findIndex((id) => id === requestId);
    if (idx === -1) {
      setSelectedClaimIds((prev) => [...prev, requestId]);
    } else {
      setSelectedClaimIds((prev) => remove(idx, 1, prev));
    }
  };

  return (
    <Stack {...props}>
      <SectionCard
        title={intl.formatMessage({ defaultMessage: 'Your claims' })}
        titleProps={{ fontWeight: 'medium' }}
        cardProps={{
          sx: {
            backgroundColor: 'background.highlight',
            borderRadius: 3,
          },
        }}
        mb={3}
      >
        <Stack divider={<Divider />}>
          {isRequestsLoading ? (
            <Stack
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '5rem',
              }}
            >
              <CircularProgress size={24} />
            </Stack>
          ) : isNilOrEmpty(requests) ? (
            <Stack
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '5rem',
              }}
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'You have no withdrawal requests',
                })}
              </Typography>
            </Stack>
          ) : (
            requests?.map((r) => (
              <ClaimRow
                key={r.id}
                request={r}
                selected={selectedClaimIds.includes(r.requestId)}
                onSelect={handleClaimClick(r.requestId)}
                isProcessing={
                  selectedClaimIds.includes(r.requestId) && status === 'polling'
                }
              />
            ))
          )}
        </Stack>
      </SectionCard>
      <Collapse in={!isNilOrEmpty(selectedClaimIds)}>
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Approximate gas cost:',
          })}
          value={`$${format(gasPrice?.gasCostUsd ?? from(0), { digits: 3, decimalsRounding: 'ROUND_UP' })}`}
          isLoading={isWriteGasLoading}
          direction="row"
          sx={{ justifyContent: 'space-between', mb: 3 }}
          labelProps={{
            variant: 'body3',
            sx: { color: 'text.primary', fontWeight: 'medium' },
          }}
        />
      </Collapse>
      <TxButton
        params={params}
        callbacks={callbacks}
        variant="action"
        disabled={isNilOrEmpty(selectedClaimIds) || status === 'polling'}
        label={
          status === 'polling'
            ? intl.formatMessage({ defaultMessage: 'Processing' })
            : intl.formatMessage(
                { defaultMessage: 'Claim{amount}' },
                {
                  amount: eq(selectedAmount, 0)
                    ? ''
                    : ` ${format(selectedAmount, {
                        digits: getFormatPrecision(selectedAmount),
                        decimalsRounding: 'ROUND_DOWN',
                      })} ${tokens.mainnet.WETH.symbol}`,
                },
              )
        }
      />
    </Stack>
  );
};

type ClaimRowProps = {
  request: WithdrawalRequest;
  selected: boolean;
  onSelect: () => void;
  isProcessing: boolean;
} & StackProps;

const ClaimRow = ({
  request,
  selected,
  onSelect,
  isProcessing,
  ...rest
}: ClaimRowProps) => {
  const amt = [request?.amount ?? 0n, tokens.mainnet.WETH.decimals] as Dnum;
  const disabled = !request.claimable || isProcessing;

  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        {
          alignItems: 'center',
          p: 2,
          justifyContent: 'space-between',
          overflowX: 'hidden',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <FormControlLabel
        control={<Checkbox checked={request.claimable && selected} />}
        label={
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'baseline',
              color: request.claimable ? 'text.primary' : 'text.secondary',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'medium',
              }}
            >
              {format(amt, {
                digits: getFormatPrecision(amt),
                decimalsRounding: 'ROUND_DOWN',
              })}
            </Typography>
            <Typography variant="caption1">
              {tokens.mainnet.WETH.symbol}
            </Typography>
          </Stack>
        }
        onChange={onSelect}
        disabled={disabled}
        disableTypography
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <ClaimChip claimable={request.claimable} isProcessing={isProcessing} />
        <Button
          variant="outlined"
          color="secondary"
          href={`https://basescan.org/tx/${request.txHash}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <FaArrowUpRightRegular sx={{ fontSize: 16 }} />
        </Button>
      </Stack>
    </Stack>
  );
};

type ClaimChipProps = {
  claimable: boolean;
  isProcessing: boolean;
} & StackProps;

const ClaimChip = ({ claimable, isProcessing, ...rest }: ClaimChipProps) => {
  const intl = useIntl();

  const icon = isProcessing ? (
    <CircularProgress size={16} />
  ) : claimable ? (
    <FaCircleCheckRegular sx={{ color: 'success.dark' }} />
  ) : (
    <FaClockRegular sx={{ color: 'warning.dark' }} />
  );
  const label = isProcessing
    ? intl.formatMessage({ defaultMessage: 'Processing' })
    : claimable
      ? intl.formatMessage({ defaultMessage: 'Ready' })
      : intl.formatMessage({ defaultMessage: 'Pending' });
  const color = isProcessing
    ? 'primary.main'
    : claimable
      ? 'success.dark'
      : 'warning.dark';
  const backgroundColor = isProcessing
    ? 'primary.faded'
    : claimable
      ? 'success.faded'
      : 'warning.faded';

  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        {
          alignItems: 'center',
          color,
          backgroundColor,
          px: 2,
          py: 1,
          borderRadius: 2,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {icon}
      <Typography
        sx={{
          color: color,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};