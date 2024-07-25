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
import { TxButton } from '@origin/shared/providers';
import {
  getFormatPrecision,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { add, eq, format, from } from 'dnum';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useWithdrawalRequests } from '../hooks';
import { useWithdrawalRequestsQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';
import type { Dnum } from 'dnum';

import type { WithdrawalRequest } from '../types';

export const ClaimForm = (props: StackProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const [selectedClaimIds, setSelectedClaimIds] = useState<bigint[]>([]);
  const { data: requests, isLoading: isRequestsLoading } =
    useWithdrawalRequests({
      select: (data) => data?.filter((r) => !r.claimed),
    });
  const args =
    selectedClaimIds.length === 1
      ? {
          contract: contracts.mainnet.OETHVault,
          functionName: 'claimWithdrawal',
          args: [selectedClaimIds[0]],
        }
      : {
          contract: contracts.mainnet.OETHVault,
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
    params: args as any,
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            useWithdrawalRequestsQuery.getKey({
              address: address ?? ZERO_ADDRESS,
            }),
          ],
        });
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
            <Stack justifyContent="center" alignItems="center" minHeight="5rem">
              <CircularProgress size={24} />
            </Stack>
          ) : isNilOrEmpty(requests) ? (
            <Stack justifyContent="center" alignItems="center" minHeight="5rem">
              <Typography color="text.secondary">
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
          value={`$${format(gasPrice?.gasCostUsd ?? from(0), 2)}`}
          isLoading={isWriteGasLoading}
          direction="row"
          justifyContent="space-between"
          labelProps={{
            variant: 'body3',
            color: 'text.primary',
            fontWeight: 'medium',
          }}
          mb={3}
        />
      </Collapse>
      <TxButton
        params={params}
        callbacks={callbacks}
        variant="action"
        disabled={isNilOrEmpty(selectedClaimIds)}
        label={intl.formatMessage(
          { defaultMessage: 'Claim{amount}' },
          {
            amount: eq(selectedAmount, 0)
              ? ''
              : ` ${format(selectedAmount, getFormatPrecision(selectedAmount))} ${tokens.mainnet.WETH.symbol}`,
          },
        )}
      />
    </Stack>
  );
};

type ClaimRowProps = {
  request: WithdrawalRequest;
  selected: boolean;
  onSelect: () => void;
} & StackProps;

const ClaimRow = ({ request, selected, onSelect, ...rest }: ClaimRowProps) => {
  const amt = [request?.amount ?? 0n, tokens.mainnet.WETH.decimals] as Dnum;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      p={2}
      justifyContent="space-between"
      {...rest}
    >
      <FormControlLabel
        control={<Checkbox checked={request.claimable && selected} />}
        label={
          <Stack
            direction="row"
            alignItems="baseline"
            spacing={0.5}
            color={request.claimable ? 'text.primary' : 'text.secondary'}
          >
            <Typography variant="body2" fontWeight="medium">
              {format(amt, getFormatPrecision(amt))}
            </Typography>
            <Typography variant="caption1">
              {tokens.mainnet.WETH.symbol}
            </Typography>
          </Stack>
        }
        onChange={onSelect}
        disabled={!request.claimable}
        disableTypography
      />
      <Stack direction="row" alignItems="center" spacing={1}>
        <ClaimChip claimable={request.claimable} />
        <Button
          variant="outlined"
          color="secondary"
          href={`https://etherscan.io/tx/${request.txHash}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <FaArrowUpRightRegular sx={{ fontSize: 16 }} />
        </Button>
      </Stack>
    </Stack>
  );
};

type ClaimChipProps = { claimable: boolean } & StackProps;

const ClaimChip = ({ claimable, ...rest }: ClaimChipProps) => {
  const intl = useIntl();

  const icon = claimable ? (
    <FaCircleCheckRegular sx={{ color: 'success.dark' }} />
  ) : (
    <FaClockRegular sx={{ color: 'warning.dark' }} />
  );
  const label = claimable
    ? intl.formatMessage({ defaultMessage: 'Ready' })
    : intl.formatMessage({ defaultMessage: 'Pending' });

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      color={claimable ? 'success.dark' : 'warning.dark'}
      bgcolor={claimable ? 'success.faded' : 'warning.faded'}
      px={2}
      py={1}
      borderRadius={2}
      {...rest}
    >
      {icon}
      <Typography color={claimable ? 'success.dark' : 'warning.dark'}>
        {label}
      </Typography>
    </Stack>
  );
};
