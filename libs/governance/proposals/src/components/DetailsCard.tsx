import { useMemo } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ExternalLink,
  LoadingLabel,
  MiddleTruncated,
  ValueLabel,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useContractRead } from 'wagmi';

import { useProposalQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const DetailsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    { proposalId },
    { enabled: !!proposalId, select: (data) => data?.ogvProposalById },
  );

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Details' })} />

      <Stack>
        <CardContent>
          <Typography variant="h5" pb={3}>
            {intl.formatMessage({ defaultMessage: 'Description' })}
          </Typography>
          <LoadingLabel
            isLoading={isProposalLoading}
            sWidth={200}
            color="text.secondary"
            pb={3}
          >
            {proposal?.description}
          </LoadingLabel>
        </CardContent>
        <CardContent>
          <Typography variant="h5" pb={3}>
            {intl.formatMessage({ defaultMessage: 'Details' })}
          </Typography>
          <Stack spacing={1}>
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'Created' })}
              value={intl.formatDate(new Date(proposal?.timestamp), {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23',
              })}
            />
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'Last updated' })}
              value={intl.formatDate(new Date(proposal?.lastUpdated), {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23',
              })}
            />
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'Start block' })}
              value={proposal?.startBlock}
            />
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'End block' })}
              value={proposal?.endBlock}
            />
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'Quorum' })}
              value={intl.formatMessage(
                {
                  defaultMessage: '{balance} {symbol}',
                },
                {
                  balance: formatAmount(
                    BigInt(proposal?.quorum ?? 0),
                    tokens.mainnet.veOGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 5 },
                  ),
                  symbol: tokens.mainnet.veOGV.symbol,
                },
              )}
            />
          </Stack>
        </CardContent>
        <CardContent>
          <Typography variant="h5" pb={3}>
            {intl.formatMessage({ defaultMessage: 'Actions' })}
          </Typography>
          <Actions />
        </CardContent>
      </Stack>
    </Card>
  );
};

const vl: Partial<ValueLabelProps> = {
  direction: 'row',
  labelProps: {
    fontSize: 14,
    width: 1,
  },
  valueProps: {
    fontSize: 14,
    width: 1,
  },
};

const columnHelper = createColumnHelper<{
  address: string;
  functionName: string;
  argumentType: string;
  args: string;
}>();

function Actions(props: StackProps) {
  const intl = useIntl();
  const { proposalId } = useParams();
  const { data: actions, isLoading: isActionsLoading } = useContractRead({
    address: contracts.mainnet.OUSDGovernance.address,
    abi: contracts.mainnet.OUSDGovernance.abi,
    functionName: 'getActions',
    args: [BigInt(proposalId)],
    enabled: !!proposalId,
    select: (data) =>
      data?.[0]?.map((_, i) => {
        const res = /^([a-zA-Z0-9]+)\((.+)\)$/.exec(data[2][i]);

        return {
          address: data[0][i],
          functionName: res[1],
          argumentType: res[2],
          args: data[3][i],
        };
      }),
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor('address', {
        header: intl.formatMessage({ defaultMessage: 'Contract' }),
        cell: (info) => (
          <ExternalLink
            href={`https://etherscan.io/address/${info.getValue()}`}
          >
            <MiddleTruncated maxWidth={60}>{info.getValue()}</MiddleTruncated>
          </ExternalLink>
        ),
      }),
      columnHelper.accessor('functionName', {
        header: intl.formatMessage({ defaultMessage: 'Function' }),
      }),
      columnHelper.accessor('argumentType', {
        header: intl.formatMessage({ defaultMessage: 'Argument types' }),
        cell: (info) => (
          <Typography sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {info.getValue()}
          </Typography>
        ),
      }),
      columnHelper.accessor('args', {
        header: intl.formatMessage({ defaultMessage: 'Arguments' }),
        cell: (info) => (
          <Typography sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {info.getValue()}
          </Typography>
        ),
      }),
    ],
    [intl],
  );

  const table = useReactTable({
    data: actions ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Stack {...props}>
      {isActionsLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5rem"
        >
          <CircularProgress size={20} />
        </Box>
      ) : isNilOrEmpty(actions) ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5rem"
        >
          <Typography>
            {intl.formatMessage({ defaultMessage: 'No actions' })}
          </Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      width: header.getSize(),
                      p: 1,
                      color: 'text.secondary',
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      p: 1,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
}
