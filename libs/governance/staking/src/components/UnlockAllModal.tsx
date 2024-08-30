import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  CheckCircle,
  FaArrowUpRightRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { TxButton, useFormat, useTxButton } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNowStrict } from 'date-fns';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useOgnStakingApy } from '../hooks';
import { useUserLockupsQuery } from '../queries.generated';

import type {
  ButtonProps,
  DialogContentProps,
  DialogProps,
  StackProps,
} from '@mui/material';
import type {
  GasPrice,
  WriteTransactionCallbacks,
  WriteTransactionParameters,
} from '@origin/shared/providers';
import type { MouseEvent } from 'react';

import type { Lockup } from '../types';

export const UnlockAllModal = (props: DialogProps) => {
  const intl = useIntl();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const [view, setView] = useState('form');
  const { data: lockups } = useUserLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data.ogvLockups },
  );
  const { gasPrice, callbacks, params } = useTxButton({
    enableGas: true,
    params: {
      contract: tokens.mainnet.veOGV,
      functionName: 'unstake',
      args: [lockups?.map((l) => BigInt(l.lockupId)) ?? []],
    },
    activity: {
      type: 'transaction',
      title: intl.formatMessage({ defaultMessage: 'Unlock all' }),
      subtitle: intl.formatMessage(
        {
          defaultMessage:
            '{count,plural, =1{# position} other{# positions}} unlocked',
        },
        { count: lockups?.length ?? 0 },
      ),
    },
    callbacks: {
      onWriteSuccess: () => {
        setView('success');
        queryClient.invalidateQueries({
          queryKey: [
            useUserLockupsQuery.getKey({ address: address ?? ZERO_ADDRESS }),
          ],
        });
      },
    },
  });

  return (
    <Dialog {...props} maxWidth="sm" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Unlock All Stakes' })}
        <IconButton
          onClick={(evt) => {
            props?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      {view === 'form' ? (
        <FormView
          params={params}
          callbacks={callbacks}
          gasPrice={gasPrice}
          lockups={lockups}
        />
      ) : (
        <SuccessView
          onClose={(evt) => {
            props?.onClose?.(evt, 'backdropClick');
          }}
        />
      )}
    </Dialog>
  );
};

type FormViewProps = {
  params: WriteTransactionParameters;
  callbacks: WriteTransactionCallbacks;
  gasPrice: GasPrice | undefined | null;
  lockups: Lockup[] | undefined;
} & DialogContentProps;

function FormView({
  params,
  callbacks,
  gasPrice,
  lockups,
  ...rest
}: FormViewProps) {
  const intl = useIntl();

  return (
    <DialogContent
      {...rest}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3, ...rest?.sx }}
    >
      <Stack sx={{ borderRadius: 1, backgroundColor: 'grey.900' }}>
        <Stack
          direction="row"
          sx={{
            px: 3,
            pt: 2,
            pb: 1,
            '> *': { width: 1, color: 'text.secondary' },
          }}
        >
          <Typography>{tokens.mainnet.OGV.symbol}</Typography>
          <Typography
            sx={{
              textAlign: 'end',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Time Remaining' })}
          </Typography>
          <Typography
            sx={{
              textAlign: 'end',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Voting Power' })}
          </Typography>
        </Stack>
        <Divider />
        {lockups?.map((lockup) => (
          <LockupRow key={lockup.id} lockup={lockup} />
        ))}
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Gas:' })}
        </Typography>
        <LoadingLabel
          sx={{ fontWeight: 'medium' }}
          isLoading={gasPrice === undefined}
        >
          ~{format(gasPrice?.gasCostUsd ?? from(0), 2)}
        </LoadingLabel>
      </Stack>
      <TxButton
        variant="action"
        label={intl.formatMessage({ defaultMessage: 'Unlock All' })}
        params={params}
        callbacks={callbacks}
      />
    </DialogContent>
  );
}

type LockupRowProps = {
  lockup: Lockup;
} & StackProps;

function LockupRow({ lockup, ...rest }: LockupRowProps) {
  const { formatAmount } = useFormat();

  return (
    <Stack
      direction="row"
      {...rest}
      sx={[
        {
          px: 3,
          pt: 1,
          pb: 2,
          alignItems: 'center',
          '> *': { width: 1 },
          ...rest?.sx,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <TokenIcon token={tokens.mainnet.OGV} />
        <Typography>
          {formatAmount(BigInt(lockup.amount), tokens.mainnet.OGV.decimals)}
        </Typography>
      </Stack>
      <Typography
        sx={{
          textAlign: 'end',
        }}
      >
        {formatDistanceToNowStrict(new Date(lockup.end), {
          unit: 'month',
          roundingMethod: 'floor',
        })}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <TokenIcon token={tokens.mainnet.veOGV} />
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          {formatAmount(
            BigInt(lockup.veogv),
            tokens.mainnet.veOGV.decimals,
            undefined,
            { notation: 'compact', maximumSignificantDigits: 4 },
          )}
        </Typography>
      </Stack>
    </Stack>
  );
}

type SuccessViewProps = {
  onClose: (evt: MouseEvent<HTMLButtonElement>) => void;
} & DialogContentProps;

function SuccessView({ onClose, ...rest }: SuccessViewProps) {
  const intl = useIntl();
  const { data: ognApy, isLoading: isOgnApyLoading } = useOgnStakingApy();

  return (
    <DialogContent
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...rest?.sx,
      }}
    >
      <Stack
        useFlexGap
        spacing={1}
        sx={{
          alignItems: 'center',
          maxWidth: 350,
        }}
      >
        <CheckCircle sx={{ fontSize: 100, m: 2 }} />
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Unlock Successful' })}
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
          }}
        >
          {intl.formatMessage({
            defaultMessage:
              'Your OGV Tokens are unlocked. Convert your OGV to OGN to earn staking rewards.',
          })}
        </Typography>
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Current OGN Staking vAPY',
          })}
          labelProps={{ sx: { textAlign: 'center' } }}
          value={intl.formatNumber((ognApy?.ognApy ?? 0) / 100, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
          isLoading={isOgnApyLoading}
          valueProps={{
            sx: {
              fontSize: 32,
              fontWeight: 700,
              background:
                'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          }}
          labelInfoTooltip={intl.formatMessage({
            defaultMessage: 'Max APY on OGN',
          })}
          spacing={0.5}
          sx={{ mt: 2 }}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 4,
          width: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ height: 44 }}
        >
          {intl.formatMessage({ defaultMessage: 'Done' })}
        </Button>
        <Button
          href="https://originprotocol.eth.limo/#/more/migration"
          target="_blank"
          rel="noopener noreferrer nofollow"
          fullWidth
          variant="connect"
          sx={{ height: 44 }}
        >
          {intl.formatMessage({ defaultMessage: 'Convert OGV' })}&nbsp;
          <FaArrowUpRightRegular />
        </Button>
      </Stack>
    </DialogContent>
  );
}

export const UnlockAllButton = (props: ButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...props}
        onClick={(e) => {
          setOpen(true);
          props?.onClick?.(e);
        }}
      />
      <UnlockAllModal
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
