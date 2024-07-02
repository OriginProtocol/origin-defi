import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { LrtWithdrawalStatus } from '@origin/prime/shared';
import { Countdown, LoadingLabel, TokenIcon } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import {
  TxButton,
  useFormat,
  useTokenPrice,
  useTxButton,
} from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { add } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount, useBlockNumber } from 'wagmi';

import { WAITING_BLOCK_AMOUNT } from '../constants';
import { useUserWithdrawalsQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';

import type { UserWithdrawalsQuery } from '../queries.generated';

export const ClaimView = () => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: withdrawals, isLoading: iswithdrawalsLoading } =
    useUserWithdrawalsQuery(
      { address: address ?? ZERO_ADDRESS },
      {
        enabled: isConnected,
        select: (data) =>
          data?.lrtWithdrawalRequests?.filter(
            (r) => r.status === LrtWithdrawalStatus.Requested,
          ) ?? [],
      },
    );

  if (iswithdrawalsLoading) {
    return (
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={350}
      >
        <CircularProgress size={36} />
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack divider={<Divider />}>
        {isNilOrEmpty(withdrawals) ? (
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={350}
          >
            <Typography variant="h5">
              {intl.formatMessage({ defaultMessage: 'No withdrawal to claim' })}
            </Typography>
          </Stack>
        ) : (
          withdrawals?.map((r) => <ClaimCard key={r.id} request={r} />)
        )}
      </Stack>
    </Stack>
  );
};

type ClaimCardProps = {
  request: UserWithdrawalsQuery['lrtWithdrawalRequests'][number];
} & StackProps;

const ClaimCard = ({ request, ...rest }: ClaimCardProps) => {
  const intl = useIntl();
  const { formatCurrency, formatAmount } = useFormat();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: price, isLoading: isPriceLoading } = useTokenPrice('OETH_USD');
  const { params, callbacks, gasPrice } = useTxButton({
    params: {
      contract: contracts.mainnet.lrtDepositPool,
      functionName: 'claimWithdrawal',
      args: [
        {
          staker: request.withdrawal.staker as HexAddress,
          delegatedTo: request.withdrawal.delegatedTo as HexAddress,
          withdrawer: request.withdrawal.withdrawer as HexAddress,
          nonce: BigInt(request.withdrawal.nonce),
          startBlock: Number(request.withdrawal.startBlock),
          strategies: request.withdrawal.strategies as HexAddress[],
          shares: request.withdrawal?.shares?.map((s) => BigInt(s)) ?? [],
        },
      ],
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
    enableGas: true,
  });

  const targetDate = add(new Date(request.timestamp), { days: 7 });
  const isClaimDisabled =
    request.blockNumber + WAITING_BLOCK_AMOUNT > (blockNumber ?? 0);
  const available = isClaimDisabled ? 0n : BigInt(request.assetAmount);
  const pending = isClaimDisabled ? BigInt(request.assetAmount) : 0n;
  const availableConverted =
    (price ?? 0) * +formatUnits(available, tokens.mainnet.OETH.decimals);
  const pendingConverted =
    (price ?? 0) * +formatUnits(pending, tokens.mainnet.OETH.decimals);

  return (
    <Stack p={3} {...rest}>
      <Stack direction="row" alignItems="center" mb={4}>
        <Stack width={0.5}>
          <Typography color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Wait time' })}
          </Typography>
          <Countdown
            targetDate={targetDate}
            valueLabelProps={{
              labelProps: { sx: { display: 'none' } },
              valueProps: { fontSize: 32, fontWeight: 'medium' },
            }}
            showUnits
          />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction="row" justifyContent="space-around" width={0.5} px={2}>
          <Stack alignItems="flex-start">
            <Typography variant="subtitle2" color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'Available' })}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <TokenIcon token={tokens.mainnet.OETH} />
              <Typography fontSize={16} fontWeight="medium">
                {formatAmount(available)}
              </Typography>
            </Stack>
            <LoadingLabel
              variant="subtitle2"
              color="text.secondary"
              isLoading={isPriceLoading}
            >
              {formatCurrency(availableConverted)}
            </LoadingLabel>
          </Stack>
          <Stack alignItems="flex-start">
            <Typography variant="subtitle2" color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'Pending' })}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <TokenIcon token={tokens.mainnet.OETH} />
              <Typography fontSize={16} fontWeight="medium">
                {formatAmount(pending)}
              </Typography>
            </Stack>
            <LoadingLabel
              variant="subtitle2"
              color="text.secondary"
              isLoading={isPriceLoading}
            >
              {formatCurrency(pendingConverted)}
            </LoadingLabel>
          </Stack>
        </Stack>
      </Stack>
      <TxButton
        params={params}
        callbacks={callbacks}
        label={intl.formatMessage({ defaultMessage: 'Claim OETH' })}
        disabled={isClaimDisabled}
        sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60, mb: 2 }}
      />
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {intl.formatMessage(
          { defaultMessage: 'Approximative gas cost: {gas}' },
          { gas: formatCurrency(gasPrice?.gasCostUsd) },
        )}
      </Typography>
    </Stack>
  );
};
